require_relative "boot"

# Pick the frameworks you want:
require "active_record/railtie"
require "action_controller/railtie"
require "action_view/railtie"
require "action_mailer/railtie"
require "active_job/railtie"
require "action_cable/engine"
require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module PeoChain
  class Application < Rails::Application
    # Initialize configuration defaults for Rails 7.0
    config.load_defaults 7.0

    # Set timezone
    config.time_zone = 'UTC'
    
    # Use SQL instead of Active Record's schema dumper when creating the database
    config.active_record.schema_format = :sql
    
    # Configure rate limiting
    config.middleware.use(
      Rack::Attack,
      Rack::Attack.throttle('api/waitlist', limit: 5, period: 1.hour) do |req|
        req.ip if req.path.start_with?('/api/waitlist')
      end
    )
    
    # Configure CORS for API
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins '*'
        resource '/api/*',
          headers: :any,
          methods: [:get, :post, :options]
      end
    end
    
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration can go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded after loading
    # the framework and any gems in your application.
    
    # Configure Action Cable
    config.action_cable.mount_path = '/cable'
    config.action_cable.allowed_request_origins = [/http:\/\/*/, /https:\/\/*/]
    
    # Configure Redis if URL is available
    if ENV['REDIS_URL'].present?
      config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }
      config.action_cable.url = ENV['REDIS_URL']
    end
  end
end