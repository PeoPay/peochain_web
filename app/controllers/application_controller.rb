class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception
  protect_from_forgery with: :exception
  
  # Skip CSRF for API endpoints
  skip_before_action :verify_authenticity_token, if: :json_request?
  
  protected
  
  def json_request?
    request.format.json? || request.path.start_with?('/api/')
  end
  
  def render_error(status, message, errors = nil)
    error_response = { error: message }
    error_response[:errors] = errors if errors.present?
    
    render json: error_response, status: status
  end
end