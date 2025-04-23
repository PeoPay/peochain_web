class ApplicationController < ActionController::Base
  # Protect from forgery for API and web requests
  protect_from_forgery with: :exception
  
  # Skip CSRF token verification for API endpoints
  skip_before_action :verify_authenticity_token, if: :json_request?
  
  # Add JSON response helpers
  def json_success(data, status = :ok)
    render json: { success: true, data: data }, status: status
  end
  
  def json_error(message, status = :bad_request)
    render json: { success: false, message: message }, status: status
  end
  
  private
  
  def json_request?
    request.format.json? || request.path.include?('/api/')
  end
  
  # Authentication method for protected endpoints
  def authenticate_request
    unless valid_api_key?
      json_error("Unauthorized access. Valid API key required.", :unauthorized)
      return false
    end
    true
  end
  
  def valid_api_key?
    # Simple API key check - would use more secure method in production
    api_key = request.headers['X-API-Key'] || params[:api_key]
    api_key.present? && api_key == ENV['API_KEY']
  end
end