class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_default_response_format
  
  protected
  
  # Authenticate the user from session or token
  def authenticate_user
    @current_user = User.find_by(id: session[:user_id])
    
    unless @current_user
      # Try to authenticate via token
      authenticate_with_token
    end
    
    unless @current_user
      render json: { error: "Authentication required" }, status: :unauthorized
    end
  end
  
  # Authenticate via token in header
  def authenticate_with_token
    auth_header = request.headers['Authorization']
    if auth_header && auth_header.start_with?('Bearer ')
      token = auth_header.split('Bearer ').last
      @current_user = User.find_by(auth_token: token)
    end
  end
  
  # Get the current authenticated user
  def current_user
    @current_user
  end
  
  # Helper method to check if request format is JSON
  def set_default_response_format
    request.format = :json unless params[:format]
  end
  
  # Error handling for API
  def render_error(message, status = :unprocessable_entity)
    render json: { error: message }, status: status
  end
end