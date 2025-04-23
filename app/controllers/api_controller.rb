class ApiController < ApplicationController
  before_action :set_default_format
  
  # Handle ActiveRecord::RecordNotFound exceptions
  rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found
  
  # Handle validation errors
  rescue_from ActiveRecord::RecordInvalid, with: :handle_validation_error
  
  private
  
  def set_default_format
    request.format = :json
  end
  
  def handle_not_found(exception)
    render_error(404, "Resource not found: #{exception.message}")
  end
  
  def handle_validation_error(exception)
    render_error(422, "Validation failed", exception.record.errors)
  end
  
  # Helper method to authenticate API requests
  # Uses HTTP Basic Authentication for simplicity
  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      # In production, this should be more secure
      # For now, we'll use environment variables
      valid_username = ENV['API_USERNAME'] || 'admin'
      valid_password = ENV['API_PASSWORD'] || 'peochain'
      
      ActiveSupport::SecurityUtils.secure_compare(username, valid_username) &&
        ActiveSupport::SecurityUtils.secure_compare(password, valid_password)
    end
  end
end