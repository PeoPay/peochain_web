# Initialize the Analytics Service

# Create a singleton instance of the analytics service
Rails.configuration.analytics_service = AnalyticsService.new(
  url: ENV['INFLUXDB_URL'],
  token: ENV['INFLUXDB_TOKEN'],
  bucket: ENV['INFLUXDB_BUCKET'] || 'peochain_analytics',
  org: ENV['INFLUXDB_ORG'] || 'peochain',
  enabled: !Rails.env.test? # Disable in test environment
)

# Define a global helper to access the analytics service
module AnalyticsHelper
  def analytics_service
    Rails.configuration.analytics_service
  end
end

# Include helper module in controllers
ActiveSupport.on_load(:action_controller) do
  include AnalyticsHelper
end