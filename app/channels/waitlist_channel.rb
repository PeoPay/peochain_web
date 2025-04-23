class WaitlistChannel < ApplicationCable::Channel
  def subscribed
    stream_from "waitlist_channel"
    
    # Send current stats to the client upon connection
    send_current_stats
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  private
  
  def send_current_stats
    # Get the current statistics
    total_signups = WaitlistEntry.count
    total_referrals = WaitlistEntry.sum(:referral_count)
    
    # Send to the specific client
    transmit({
      type: 'CURRENT_STATS',
      data: {
        totalSignups: total_signups,
        totalReferrals: total_referrals
      }
    })
  end
end