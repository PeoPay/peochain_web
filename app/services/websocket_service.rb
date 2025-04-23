class WebsocketService
  # Define event types
  WAITLIST_EVENTS = %w[NEW_SIGNUP NEW_REFERRAL ANALYTICS_UPDATE].freeze
  
  class << self
    # Publish an event to all connected clients through ActionCable
    def publish_event(event_type, data)
      return unless WAITLIST_EVENTS.include?(event_type)
      
      begin
        ActionCable.server.broadcast('waitlist_channel', {
          type: event_type,
          data: data
        })
        
        # If Redis is configured, publish to Redis as well
        publish_to_redis(event_type, data) if redis_configured?
        
        true
      rescue => e
        Rails.logger.error "Failed to publish WebSocket event: #{e.message}"
        false
      end
    end
    
    # Publish a new signup event
    def publish_signup(email, position, referral_code)
      publish_event('NEW_SIGNUP', {
        email: email,
        position: position,
        referralCode: referral_code
      })
    end
    
    # Publish a new referral event
    def publish_referral(referral_code, count)
      publish_event('NEW_REFERRAL', {
        referralCode: referral_code,
        count: count
      })
    end
    
    # Publish an analytics update event
    def publish_analytics_update(total_signups, total_referrals)
      publish_event('ANALYTICS_UPDATE', {
        totalSignups: total_signups,
        totalReferrals: total_referrals
      })
    end
    
    private
    
    # Check if Redis is configured
    def redis_configured?
      Rails.application.config.action_cable.url.present?
    end
    
    # Publish to Redis for cross-instance communication
    def publish_to_redis(event_type, data)
      redis = Redis.new(url: ENV['REDIS_URL'])
      redis.publish('peochain:events', {
        type: event_type,
        data: data
      }.to_json)
    rescue => e
      Rails.logger.error "Failed to publish to Redis: #{e.message}"
    end
  end
end