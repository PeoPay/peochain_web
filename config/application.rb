require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Peochain
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 7.0

    # Set time zone
    config.time_zone = "UTC"

    # Configure sensitive parameters which will be filtered from the log file.
    config.filter_parameters += [:password, :api_key, :token]
    
    # Enable CORS for API endpoints
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '/api/*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
    
    # Configure rate limiting
    # In a production app, we would implement rate limiting middleware here
    
    # API-only mode for API endpoints
    config.api_only = false
    
    # Enable flash messages for traditional web forms
    config.action_controller.default_protect_from_forgery = true
  end
end