require 'fileutils'

class Author::SiteStoragesController < Author::AuthorController

  include Author

  before_action :authenticate_user!, except: [:show]
  before_action :set_author_site_storage,
                only: [:show, :edit, :update, :activate, :destroy, :publish]

  layout :resolve_layout

  # GET /author/site_storages
  # GET /author/site_storages.json
  def index
    @author_site_storages = SiteStorage.fetch_data(current_user)
  end

  # GET /author/site_storages/1
  # GET /author/site_storages/1.json
  def show
    @storage = {}
    if File.exist?(@target_path)
      @storage = @author_site_storage.get_storage_data

      mode = SiteType.find_by_name(params[:mode])
      @storage[:mode] = mode.name unless mode.nil?

      activated = @author_site_storage.get_activated

      unless activated.nil?
        @storage[:version] = activated.version
        @storage[:content] = activated.content
      end

    end unless @author_site_storage.nil?
  end

  # GET /author/site_storages/new
  def new
    @author_site_types = SiteType.order(:name)
    @author_site_storage = SiteStorage.new
    render '/partials/form', locals: {title: 'key'}
  end

  # GET /author/site_storages/1/edit
  def edit
    @widget_categories = WidgetCategory.order(:name_value)
    render '/partials/form', locals: {title: 'key'}
  end

  # POST /author/site_storages
  # POST /author/site_storages.json
  def create

    @author_site_storage = SiteStorage.create_data(author_site_storage_params)

    target = get_target_url(@author_site_storage.key)
    FileUtils.cp_r "#{Rails.root}/lib/tasks/site/default", target

    respond_to do |format|
      if File.exist?(target)
        if @author_site_storage.save
          format.html { redirect_to author_site_storages_path, notice: t('success_create') }
          format.json { render :index, status: :created, location: @author_site_storage }
        else
          FileUtils.rm_r(target)
          format.html { render :form }
          format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
        end
      else
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :not_found }
      end
    end
  end

  # PATCH/PUT /author/site_storages/1
  # PATCH/PUT /author/site_storages/1.json
  def update

    if request.xhr?
      version = @author_site_storage.build_new_version(
          params[:author_site_storage][:content],
          params[:activate],
          params[:screenshot]
      )
      params[:author_site_storage][:publish] = 'false'
      params[:author_site_storage].delete :content
    else
      version = @author_site_storage.author_site_versions.find(params[:author_site_storage][:activated_version])
      params[:author_site_storage].delete :activated_version
    end

    update_handler(version)

    respond_to do |format|
      if @activated.nil?
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      else
        notice = t('success_update')
        if request.xhr?
          data = {
              storage: {
                  key: @author_site_storage.key,
                  content: @activated.content
              },
              version: @activated.version,
              activated: @activated.activated,
              mode: @author_site_storage.author_site_type.name,
              notice: notice,
              updated_by: current_user.original_email,
              updated_at: @activated.author_item.updated_at.strftime('%Y %b %d %I:%M:%S%p %Z')
          }
          format.json {
            render json: data, status: :ok
          }
        else
          format.html { redirect_to author_site_storages_path, notice: notice }
          format.json { render :index, status: :ok, location: @author_site_storage }
        end
      end
    end
  end

  def publish
    published = @author_site_storage.publish
    if @author_site_storage.update({publish: !published})
      respond_to do |format|
        format.html { redirect_to author_site_storages_path, notice: t('success_update') }
        format.json if request.xhr?
      end
    else
      format.json { render json: @author_site_storage.errors, status: :unprocessable_entity } if request.xhr?
      format.html { redirect_to author_site_storages_path, status: :unprocessable_entity }
    end
  end

  def activate

    respond_to do |format|
      if update_activation
        notice = t('success_activation')
        if request.xhr?
          data = {
              storage: {
                  key: @author_site_storage.key,
                  content: @version.content
              },
              version: @version.version,
              activated: @version.activated,
              mode: @author_site_storage.author_site_type.name,
              notice: notice
          }
          format.json {
            render json: data, status: :ok
          }
        else
          format.html { redirect_to author_site_storages_path, notice: notice }
          format.json { render :index, status: :ok, location: @author_site_storage }
        end
      else
        format.html { render :form }
        format.json { render json: @author_site_storage.errors, status: :unprocessable_entity }
      end

    end

  end

  # DELETE /author/site_storages/1
  # DELETE /author/site_storages/1.json
  def destroy
    FileUtils.rm_r(@target_path) if File.exist?(@target_path)

    @author_site_storage.destroy
    respond_to do |format|
      format.html { redirect_to author_site_storages_url, notice: t('success_delete') }
      format.json { head :no_content }
    end
  end

  def activate_site_version(version=nil)
    activated = @author_site_storage.get_activated

    puts t('undefined_activation') if activated.nil?

    if version.nil?
      puts t('undefined_version')
      version = @author_site_storage.author_site_versions.last
    end

    @activated = version.is_current?(activated) ?
        activated :
        version.deactivate_other
  end

  def deactivate_site_version(version=nil)
    activated = @author_site_storage.get_activated

    puts t('undefined_activation') if activated.nil?
    puts t('undefined_version') if version.nil?
    puts t('deactivate_nonactive_version') if version != activated

    version.deactivate
  end

  private

  def resolve_layout
    case action_name
      when 'show'
        'application'
      else
        'author'
    end
  end

  def update_handler(version)
    current_version = version || @author_site_storage.author_site_versions.last
    update_widget_connections unless request.xhr?
    update_version_activation(current_version) if @author_site_storage.update(author_site_storage_params)
  end

  def update_widget_connections

    widget_ids = params[:author_site_storage][:author_site_storage_widget_ids]
    widgets = Widget.find(widget_ids.reject(&:blank?)) rescue []

    @author_site_storage.author_site_storage_widgets.delete_all
    @author_site_storage.author_widgets << widgets unless widgets.blank?
    @author_site_storage.author_item.touch
    params[:author_site_storage].delete :author_site_storage_widget_ids

  end

  def update_version_activation(version)
    activate_site_version(version)
    @activated.author_item.touch
  end

  def update_activation

    mode = SiteType.where(
        name: params[:author_site_type][:name]
    ).first

    updated = update_version_activation(params[:author_site_version][:version])

    if mode.nil?
      puts t('undefined_mode')
      updated = false
    else
      updated = @author_site_storage.update(
          {
              site_type_id: mode.id,
              user_id: current_user.id
          }
      ) unless @author_site_storage.author_site_type == mode if updated
    end

    updated
  end

  def get_target_url(key)
    "#{Rails.root}/app/assets/javascripts/public/#{key}"
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_site_storage
    @author_site_types = SiteType.order(:name)
    @author_site_storage = SiteStorage.where(key: params[:key]).first ||
        SiteStorage.where(key: params[:id]).first

    versions = @author_site_storage.author_site_versions
    @versions = {
        all: versions,
        activated: versions.where(activated: true).first
    }
    @target_path = get_target_url(@author_site_storage.key) unless @author_site_storage.nil?
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_site_storage_params
    params.require(:author_site_storage).permit(
        :key,
        :site_type_id,
        :publish,
        :public,
        :activated_version,
        author_item_attributes: [],
        author_site_storage_widget_ids: [],
        author_site_versions_attributes: [
            :id,
            :version,
            :activated
        ],
        author_site_types_attributes: [
            :name
        ]
    )
  end

end
