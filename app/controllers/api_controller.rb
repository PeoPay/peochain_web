class ApiController < ApplicationController
  # Include common API functionality
  before_action :authenticate_request, except: [:public_endpoints]
  
  # Handle common errors in API endpoints
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActionController::ParameterMissing, with: :parameter_missing
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid
  
  private
  
  def public_endpoints
    # Define which endpoints are public in each controller
    []
  end
  
  def record_not_found(exception)
    json_error("Resource not found", :not_found)
  end
  
  def parameter_missing(exception)
    json_error("Required parameter missing: #{exception.param}", :bad_request)
  end
  
  def record_invalid(exception)
    json_error(exception.record.errors.full_messages.join(', '), :unprocessable_entity)
  end
  
  def ensure_json_request
    return if request.format.json?
    json_error("JSON format required", :not_acceptable)
  end
end