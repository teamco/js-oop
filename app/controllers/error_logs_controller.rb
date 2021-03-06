class ErrorLogsController < Author::AuthorController
  before_action :set_error_log, only: [:show]

  # GET /error_logs
  # GET /error_logs.json
  def index
    @error_logs_all = ErrorLog.fetch_data(current_user)
    @error_logs = @error_logs_all.paginate(page: params[:page], per_page: 15)
  end

  # GET /error_logs/1
  # GET /error_logs/1.json
  def show
  end

  def handle_js
    @log = [ErrorLog.handle_js_error(current_user, params[:error_log])]
  end

  def fix
    JSON.parse(params[:data]).each do |x|
      log = ErrorLog.find_by_id(x['id'])
      log.update_attribute('is_fixed', !log.is_fixed)
    end unless params[:data].nil?
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_error_log
    @error_log = current_user.error_logs.where(id: params[:id]).first
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def error_log_params
    params[:error_log]
  end
end
