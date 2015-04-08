require 'rmagick'
require 'fileutils'

class Author::WidgetsController < Author::AuthorController

  include Author
  include Magick

  require "#{Rails.root}/lib/tasks/widget_generator.rb"
  require "#{Rails.root}/lib/base_lib.rb"
  require 'open-uri'
  require 'uri'
  require 'uuid'

  before_action :set_author_widget_category, only: [:create, :update, :destroy]
  before_action :set_author_widget, only: [:show, :edit, :update, :destroy]
  before_action :set_clone_from, only: [:create]

  layout 'author'

  # GET /author/widgets
  # GET /author/widgets.json
  def index

    @json_data ||= {
        categories: WidgetCategory.all,
        widgets: []
    }

    method = request.env['REQUEST_METHOD']
    site = request.query_parameters['site']

    if site == params[:site]

      site_storage = SiteStorage.find_by_key(site)
      @author_widgets = site_storage.author_widgets.includes(:author_widget_category).where(visible: true).order(name: :asc)

    end if method == 'GET' if request.xhr?

    @author_widgets = Widget.all.includes(:author_widget_category).where(visible: true).order(name: :asc) if @author_widgets.nil?

    @resource = {
        items: @author_widgets.length,
        path: new_author_widget_path
    }

    @json_data[:widgets] = @author_widgets.map do |w|
      {
          id: w[:id],
          uuid: w[:uuid],
          name: w[:name],
          description: w[:description],
          dimensions: {
              width: w[:width],
              height: w[:height]
          },
          type: w.author_widget_category[:name_index],
          resource: w[:resource]
      }
    end

  end

  # GET /author/widgets/1
  # GET /author/widgets/1.json
  def show
  end

  # GET /author/widgets/new
  def new
    @author_widget = Widget.new
    render action: :form
  end

  # GET /author/widgets/1/edit
  def edit
    render action: :form
  end

  # POST /author/widgets
  # POST /author/widgets.json
  def create

    @author_widget = @category.author_widgets.build(author_widget_params) unless @category.nil?

    if @author_widget.nil?
      respond_to { |format| error_handler_on_create(format) }
    else

      uuid = UUID.new
      @author_widget.uuid = uuid.generate

      respond_to do |format|
        if generate_widget and @author_widget.save

          @widget_lib.update_seed

          if request.xhr?
            data = {
                widget: @author_widget,
                category: @category
            }
            format.json {
              render json: data, status: 200
            }
          else
            format.html { redirect_to @author_widget, notice: 'Widget was successfully created.' }
            format.json { render :show, status: :created, location: @author_widget }
          end
        else
          error_handler_on_create(format)
        end
      end
    end
  end

  # PATCH/PUT /author/widgets/1
  # PATCH/PUT /author/widgets/1.json
  def update

    author_widget_params[:widget_category_id] = @category.id

    respond_to do |format|

      if @author_widget.update(author_widget_params)
        if request.xhr?
          widget = WidgetLib::Generate.new
          widget.init_params(@author_widget.resource)
          widget.generate_css(@author_widget.thumbnail)
          format.json { render :show, status: :ok, location: @author_widget }
        else
          format.html { redirect_to @author_widget, notice: 'Widget was successfully updated.' }
          format.json { render :show, status: :ok, location: @author_widget }
        end
      else
        format.html { render :edit }
        format.json { render json: @author_widget.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /author/widgets/1
  # DELETE /author/widgets/1.json
  def destroy
    @author_widget.destroy
    respond_to do |format|
      format.html { redirect_to author_widgets_url, notice: 'Widget was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

  def generate_widget
    @widget_lib = WidgetLib::Generate.new
    @widget_lib.init_params(@author_widget.resource)
    generate = false
    begin
      logger.info '>>>>> Do it'
      @widget_lib.set_clone(@clone_from)
      @widget_lib.do_it
      logger.info '>>>>> Generate Css'
      @widget_lib.generate_css(uri? ? to_base64 : to_image)
      generate = true
    rescue
      logger.info '>>>>> Rescue: Remove widget'
      @widget_lib.remove_widget_dir
      @author_widget.errors.add(:error, 'Thumbnail file size is too big')
      generate = false
    end
    generate
  end

  def uri?
    uri = URI.parse(@author_widget.thumbnail)
    %w( http https ).include?(uri.scheme) && live?
  rescue URI::BadURIError
    false
  rescue URI::InvalidURIError
    false
  end

  def live?
    uri = URI(@author_widget.thumbnail)
    request = Net::HTTP.new uri.host
    response = request.request_head uri.path
    logger.info ">>>>> Live: #{response.inspect}"
    response.code.to_i == 200
  end

  def to_base64
    logger.info '>>>>> Start to->base64'
    img = BaseLib.img.allowed?(@author_widget.thumbnail)
    logger.info ">>>>> Allowed: #{img.inspect}"
    if img
      data_uri = BaseLib.img.data_uri(img)
      @author_widget.thumbnail = data_uri
      data_uri
    else
      logger.info ">>>>> Rescue Data-Uri: #{@author_widget.thumbnail}"
      @author_widget.thumbnail
    end
  end

  def to_image
    logger.info 'Start to->image'
    BaseLib.img.to_img(@author_widget.thumbnail)
  end

  def set_author_widget_category
    @category = WidgetCategory.find_by_name_index(params[:author_widget_category][:name_index])
  end

  # Use callbacks to share common setup or constraints between actions.
  def set_author_widget
    @author_widget = Widget.find(params[:id])
  end

  def set_clone_from
    clone_from = Widget.find_by_resource(params[:author_widget_clone])
    @clone_from = clone_from.resource rescue 'empty'
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def author_widget_params
    params.require(:author_widget).permit(:name, :description, :thumbnail, :width, :height, :resource, :visible)
  end

  def error_handler_on_create(format)
    if request.xhr?
      format.json {
        render json: @author_widget.errors, status: 400
      }
    else
      format.html { render :new }
      format.json { render json: @author_widget.errors, status: :unprocessable_entity }
    end
  end
end
