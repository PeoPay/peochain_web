module Api
  class AnalyticsController < ApiController
    # All endpoints require authentication
    before_action :authenticate_request
    
    # Get analytics overview
    def overview
      # Calculate total signups
      total_signups = WaitlistEntry.count
      
      # Calculate total referrals
      total_referrals = WaitlistEntry.sum(:referral_count)
      
      # Calculate average referrals per user
      avg_referrals_per_user = total_signups > 0 ? (total_referrals.to_f / total_signups) : 0
      
      # Get top referrers
      top_referrers = WaitlistEntry.top_referrers(5)
      
      # Get latest daily stats
      daily_stats = DailyWaitlistStat.latest(30)
      
      # Get top referral channels
      top_channels = ReferralChannel.top_channels(5)
      
      # Get top regions
      top_regions = GeographicStat.top_regions(5)
      
      json_success({
        totalSignups: total_signups,
        totalReferrals: total_referrals,
        avgReferralsPerUser: avg_referrals_per_user,
        topReferrers: top_referrers,
        dailyStats: daily_stats,
        topChannels: top_channels,
        topRegions: top_regions
      })
    end
    
    # Get daily stats
    def daily_stats
      if params[:start_date].present? && params[:end_date].present?
        begin
          start_date = Date.parse(params[:start_date])
          end_date = Date.parse(params[:end_date])
          stats = DailyWaitlistStat.date_range(start_date, end_date)
        rescue ArgumentError
          return json_error("Invalid date format. Use YYYY-MM-DD format.")
        end
      else
        stats = DailyWaitlistStat.latest(params[:limit] || 30)
      end
      
      json_success(stats)
    end
    
    # Create or update daily stats
    def create_daily_stats
      @stat = DailyWaitlistStat.find_or_initialize_by(date: params[:date])
      
      if @stat.update(daily_stats_params)
        json_success(@stat, :created)
      else
        json_error(@stat.errors.full_messages.join(', '))
      end
    end
    
    # Get geographic stats
    def geographic_stats
      stats = GeographicStat.all
      json_success(stats)
    end
    
    # Create or update geographic stats
    def create_geographic_stats
      @stat = GeographicStat.find_or_initialize_by(region: params[:region])
      
      if @stat.update(geographic_stats_params)
        json_success(@stat, :created)
      else
        json_error(@stat.errors.full_messages.join(', '))
      end
    end
    
    # Get referral channels
    def referral_channels
      channels = ReferralChannel.all
      json_success(channels)
    end
    
    # Create or update referral channel
    def create_referral_channel
      @channel = ReferralChannel.find_or_initialize_by(channel_name: params[:channel_name])
      
      if @channel.update(referral_channel_params)
        json_success(@channel, :created)
      else
        json_error(@channel.errors.full_messages.join(', '))
      end
    end
    
    # Get top referrers
    def top_referrers
      limit = params[:limit] || 10
      referrers = WaitlistEntry.top_referrers(limit.to_i)
      json_success(referrers)
    end
    
    # Export analytics data
    def export
      # Create a zip file containing all analytics data
      require 'zip'
      require 'csv'
      
      # Create a temporary file for the zip
      zip_file = Tempfile.new(['analytics_export', '.zip'])
      
      begin
        # Create a new zip file
        Zip::File.open(zip_file.path, Zip::File::CREATE) do |zipfile|
          # Add waitlist entries CSV
          zipfile.get_output_stream('waitlist.csv') do |out|
            out.write generate_waitlist_csv
          end
          
          # Add daily stats CSV
          zipfile.get_output_stream('daily_stats.csv') do |out|
            out.write generate_daily_stats_csv
          end
          
          # Add regions CSV
          zipfile.get_output_stream('regions.csv') do |out|
            out.write generate_regions_csv
          end
          
          # Add channels CSV
          zipfile.get_output_stream('channels.csv') do |out|
            out.write generate_channels_csv
          end
          
          # Add summary text
          zipfile.get_output_stream('summary.txt') do |out|
            out.write generate_summary_text
          end
        end
        
        # Send the file
        send_file zip_file.path, type: 'application/zip', disposition: 'attachment', filename: 'peochain_analytics.zip'
      ensure
        # Close and delete the temp file
        zip_file.close
        zip_file.unlink
      end
    end
    
    private
    
    def daily_stats_params
      params.permit(:date, :signup_count, :total_referrals, :conversion_rate, metadata: {})
    end
    
    def geographic_stats_params
      params.permit(:region, :user_count, :engagement_score)
    end
    
    def referral_channel_params
      params.permit(:channel_name, :referral_count, :conversion_rate)
    end
    
    # CSV generation methods
    def generate_waitlist_csv
      CSV.generate do |csv|
        csv << ['Id', 'Full Name', 'Email', 'Referral Code', 'Referred By', 'Referral Count', 'User Type', 'Created At']
        
        WaitlistEntry.find_each do |entry|
          csv << [
            entry.id,
            entry.full_name,
            entry.email,
            entry.referral_code,
            entry.referred_by,
            entry.referral_count,
            entry.user_type,
            entry.created_at
          ]
        end
      end
    end
    
    def generate_daily_stats_csv
      CSV.generate do |csv|
        csv << ['Date', 'Signup Count', 'Total Referrals', 'Conversion Rate']
        
        DailyWaitlistStat.order(date: :asc).find_each do |stat|
          csv << [
            stat.date,
            stat.signup_count,
            stat.total_referrals,
            stat.conversion_rate
          ]
        end
      end
    end
    
    def generate_regions_csv
      CSV.generate do |csv|
        csv << ['Region', 'User Count', 'Engagement Score']
        
        GeographicStat.order(user_count: :desc).find_each do |stat|
          csv << [
            stat.region,
            stat.user_count,
            stat.engagement_score
          ]
        end
      end
    end
    
    def generate_channels_csv
      CSV.generate do |csv|
        csv << ['Channel', 'Referral Count', 'Conversion Rate']
        
        ReferralChannel.order(referral_count: :desc).find_each do |channel|
          csv << [
            channel.channel_name,
            channel.referral_count,
            channel.conversion_rate
          ]
        end
      end
    end
    
    def generate_summary_text
      total_signups = WaitlistEntry.count
      total_referrals = WaitlistEntry.sum(:referral_count)
      avg_referrals = total_signups > 0 ? (total_referrals.to_f / total_signups).round(2) : 0
      top_referrer = WaitlistEntry.top_referrers(1).first
      top_region = GeographicStat.top_regions(1).first
      
      <<-SUMMARY
PeoChain Analytics Export
Generated on: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}

Summary:
- Total waitlist signups: #{total_signups}
- Total referrals: #{total_referrals}
- Average referrals per user: #{avg_referrals}
- Top referrer: #{top_referrer&.full_name || 'None'} (#{top_referrer&.referral_count || 0} referrals)
- Top region: #{top_region&.region || 'None'} (#{top_region&.user_count || 0} users)

This export contains the following files:
- waitlist.csv: All waitlist entries
- daily_stats.csv: Daily signup and referral statistics
- regions.csv: Geographic distribution data
- channels.csv: Referral channel performance
      SUMMARY
    end
  end
end