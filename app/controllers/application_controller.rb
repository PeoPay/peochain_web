class ApplicationController < ActionController::Base
  # Enable protection against CSRF attacks
  protect_from_forgery with: :exception
  
  # Rescue common exceptions
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  
  private
  
  # Handle record not found errors
  def record_not_found(exception)
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404.html", status: :not_found }
      format.json { render json: { error: "Resource not found: #{exception.message}" }, status: :not_found }
      format.any { head :not_found }
    end
  end
  
  # Handle parameter missing errors
  def parameter_missing(exception)
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/400.html", status: :bad_request }
      format.json { render json: { error: "Missing parameter: #{exception.message}" }, status: :bad_request }
      format.any { head :bad_request }
    end
  end
end