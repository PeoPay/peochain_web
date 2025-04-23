module Api
  class WaitlistController < ApiController
    # Skip authentication for public endpoints
    skip_before_action :authenticate_request, only: [:create, :referral]
    
    # Rate limiting would be implemented here
    # For example: include RateLimiting::Waitlist
    
    def create
      # Create a new waitlist entry
      @waitlist_entry = WaitlistEntry.new(waitlist_params)
      
      # Check if the user was referred
      if params[:referred_by].present?
        referrer = WaitlistEntry.find_by(referral_code: params[:referred_by])
        if referrer
          @waitlist_entry.referred_by = params[:referred_by]
          
          # Increment referrer's count after successful save
          ActiveRecord::Base.transaction do
            if @waitlist_entry.save
              referrer.increment!(:referral_count)
              # Record daily stats
              DailyWaitlistStat.record_signup(Date.today, true)
              
              # Record geographic stats if region is provided
              if params[:region].present?
                GeographicStat.record_signup(params[:region])
              end
              
              # Record channel stats if channel is provided
              if params[:channel].present?
                ReferralChannel.record_referral(params[:channel], true)
              end
            else
              raise ActiveRecord::Rollback
            end
          end
        else
          # If referral code is invalid, continue without it
          @waitlist_entry.referred_by = nil
          
          if @waitlist_entry.save
            # Record daily stats without referral
            DailyWaitlistStat.record_signup(Date.today, false)
            
            # Record geographic stats if region is provided
            if params[:region].present?
              GeographicStat.record_signup(params[:region])
            end
          end
        end
      else
        # No referral
        if @waitlist_entry.save
          # Record daily stats without referral
          DailyWaitlistStat.record_signup(Date.today, false)
          
          # Record geographic stats if region is provided
          if params[:region].present?
            GeographicStat.record_signup(params[:region])
          end
        end
      end
      
      if @waitlist_entry.persisted?
        # Entry was successfully created
        position = WaitlistEntry.count # Simple position calculation
        
        # In a real implementation, we would publish event to WebSocket here
        
        json_success({
          email: @waitlist_entry.email,
          position: position,
          referralCode: @waitlist_entry.referral_code
        }, :created)
      else
        json_error(@waitlist_entry.errors.full_messages.join(', '))
      end
    end
    
    def referral
      referral_code = params[:code]
      @entry = WaitlistEntry.find_by(referral_code: referral_code)
      
      if @entry
        json_success({
          referrerName: @entry.full_name,
          referralCount: @entry.referral_count
        })
      else
        json_error("Invalid referral code", :not_found)
      end
    end
    
    private
    
    def waitlist_params
      params.require(:waitlist_entry).permit(:full_name, :email, :user_type, metadata: {})
    end
  end
end