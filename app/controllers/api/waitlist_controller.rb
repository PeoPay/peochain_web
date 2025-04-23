module Api
  class WaitlistController < ApiController
    # Rate limiting configuration
    WAITLIST_RATE_LIMIT = 5  # Requests per time window
    WAITLIST_RATE_WINDOW = 3600  # Time window in seconds (1 hour)
    REFERRAL_RATE_LIMIT = 20  # Requests per time window
    REFERRAL_RATE_WINDOW = 60  # Time window in seconds (1 minute)
    
    # Apply rate limiting to waitlist signup
    before_action :check_waitlist_rate_limit, only: [:create]
    
    # Apply rate limiting to referral lookup
    before_action :check_referral_rate_limit, only: [:show_referral]
    
    # POST /api/waitlist
    def create
      # Validate required parameters
      unless params[:email].present?
        return render_error(400, "Email is required")
      end
      
      # Check if email already exists in waitlist
      existing_entry = WaitlistEntry.find_by(email: params[:email])
      if existing_entry
        return render json: {
          message: "Email already registered",
          position: existing_entry.position,
          referralCode: existing_entry.referral_code
        }
      end
      
      # Create new waitlist entry
      entry = WaitlistEntry.new(
        email: params[:email],
        ip_address: request.remote_ip,
        region: params[:region] || detect_region,
        referred_by: params[:referredBy],
        user_agent: request.user_agent
      )
      
      # Set position based on current count
      entry.position = WaitlistEntry.count + 1
      
      if entry.save
        # Record signup in analytics
        analytics_service.record_signup({
          email: entry.email,
          region: entry.region,
          referral_code: entry.referral_code,
          referred_by: entry.referred_by
        }) if defined?(analytics_service)
        
        # Increment referral count for the referrer
        if entry.referred_by.present?
          referrer = WaitlistEntry.find_by(referral_code: entry.referred_by)
          if referrer
            referrer.increment!(:referral_count)
            
            # Record referral in analytics
            analytics_service.record_referral({
              email: entry.email,
              referred_by: entry.referred_by,
              converted: true
            }) if defined?(analytics_service)
            
            # Broadcast referral event
            WebsocketService.publish_referral(
              entry.referred_by,
              referrer.referral_count
            )
          end
        end
        
        # Broadcast signup event
        WebsocketService.publish_signup(
          entry.email,
          entry.position,
          entry.referral_code
        )
        
        # Return success response
        render json: {
          message: "Successfully joined waitlist",
          position: entry.position,
          referralCode: entry.referral_code
        }, status: :created
      else
        render_error(422, "Failed to join waitlist", entry.errors)
      end
    end
    
    # GET /api/referral/:code
    def show_referral
      referral_code = params[:code]
      
      # Find waitlist entry by referral code
      entry = WaitlistEntry.find_by(referral_code: referral_code)
      
      if entry
        render json: {
          referralCode: entry.referral_code,
          referralCount: entry.referral_count,
          position: entry.position
        }
      else
        render_error(404, "Referral code not found")
      end
    end
    
    private
    
    def waitlist_params
      params.permit(:email, :region, :referredBy)
    end
    
    def detect_region
      # A simple region detection based on IP (would be expanded in production)
      "unknown"
    end
    
    def check_waitlist_rate_limit
      # In a production app, this would use Redis or a similar mechanism
      # Simplified version for demo
      client_ip = request.remote_ip
      
      # Add rate limiting logic here
      # For now, we'll always allow the request
      true
    end
    
    def check_referral_rate_limit
      # Similar to waitlist rate limit
      client_ip = request.remote_ip
      
      # Add rate limiting logic here
      # For now, we'll always allow the request
      true
    end
  end
end