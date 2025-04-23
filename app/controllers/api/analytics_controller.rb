module Api
  class AnalyticsController < ApiController
    before_action :authenticate
    
    # GET /api/analytics/overview
    def overview
      # Collect all analytics data for the dashboard
      overview_data = {
        totalSignups: WaitlistEntry.count,
        totalReferrals: WaitlistEntry.sum(:referral_count),
        avgReferralsPerUser: average_referrals_per_user,
        topReferrers: top_referrers(10),
        dailyStats: recent_daily_stats(30),
        topChannels: top_referral_channels(5),
        topRegions: top_regions(5)
      }
      
      render json: overview_data
    end
    
    # GET /api/analytics/daily-stats
    def daily_stats
      stats = DailyWaitlistStats.order(date: :desc)
      
      # Apply date range filter if provided
      if params[:startDate].present? && params[:endDate].present?
        start_date = Date.parse(params[:startDate])
        end_date = Date.parse(params[:endDate])
        stats = stats.where(date: start_date..end_date)
      end
      
      # Apply limit if provided
      stats = stats.limit(params[:limit].to_i) if params[:limit].present?
      
      render json: stats.map { |stat| format_daily_stat(stat) }
    end
    
    # POST /api/analytics/daily-stats
    def create_daily_stats
      unless params[:date].present? && params[:signups].present?
        return render_error(400, "Date and signups are required")
      end
      
      date = Date.parse(params[:date])
      
      stat = DailyWaitlistStats.find_or_initialize_by(date: date)
      stat.signups = params[:signups].to_i
      stat.referrals = params[:referrals].to_i
      stat.conversion_rate = params[:conversionRate].to_f
      
      if stat.save
        render json: format_daily_stat(stat), status: :created
      else
        render_error(422, "Failed to create daily stats", stat.errors)
      end
    end
    
    # GET /api/analytics/geographic-stats
    def geographic_stats
      stats = GeographicStats.order(user_count: :desc)
      
      # Apply limit if provided
      stats = stats.limit(params[:limit].to_i) if params[:limit].present?
      
      render json: stats.map { |stat| format_geographic_stat(stat) }
    end
    
    # POST /api/analytics/geographic-stats
    def create_geographic_stats
      unless params[:region].present? && params[:userCount].present?
        return render_error(400, "Region and userCount are required")
      end
      
      stat = GeographicStats.find_or_initialize_by(region: params[:region])
      stat.user_count = params[:userCount].to_i
      stat.referral_count = params[:referralCount].to_i
      stat.conversion_rate = params[:conversionRate].to_f
      
      if stat.save
        render json: format_geographic_stat(stat), status: :created
      else
        render_error(422, "Failed to create geographic stats", stat.errors)
      end
    end
    
    # GET /api/analytics/referral-channels
    def referral_channels
      channels = ReferralChannel.order(user_count: :desc)
      
      # Apply limit if provided
      channels = channels.limit(params[:limit].to_i) if params[:limit].present?
      
      render json: channels.map { |channel| format_referral_channel(channel) }
    end
    
    # POST /api/analytics/referral-channels
    def create_referral_channel
      unless params[:name].present? && params[:userCount].present?
        return render_error(400, "Name and userCount are required")
      end
      
      channel = ReferralChannel.find_or_initialize_by(name: params[:name])
      channel.source = params[:source]
      channel.user_count = params[:userCount].to_i
      channel.conversion_rate = params[:conversionRate].to_f
      
      if channel.save
        render json: format_referral_channel(channel), status: :created
      else
        render_error(422, "Failed to create referral channel", channel.errors)
      end
    end
    
    # GET /api/analytics/top-referrers
    def top_referrers
      limit = params[:limit].present? ? params[:limit].to_i : 10
      
      referrers = WaitlistEntry.where("referral_count > 0")
                              .order(referral_count: :desc)
                              .limit(limit)
      
      render json: referrers.map { |entry|
        {
          email: entry.email,
          referralCode: entry.referral_code,
          referralCount: entry.referral_count,
          position: entry.position
        }
      }
    end
    
    # GET /api/analytics/export
    def export_data
      # Create a temporary directory for CSV files
      temp_dir = Rails.root.join('tmp', 'export')
      FileUtils.mkdir_p(temp_dir)
      
      # Generate CSV files
      export_waitlist_csv(temp_dir)
      export_daily_stats_csv(temp_dir)
      export_regions_csv(temp_dir)
      export_channels_csv(temp_dir)
      export_summary_txt(temp_dir)
      
      # Create a zip file
      zip_file_path = Rails.root.join('tmp', 'peochain_analytics.zip')
      
      # Create zip file using the 'zip' command
      system("cd #{temp_dir} && zip -r #{zip_file_path} *")
      
      # Send file to user and delete after sending
      send_file zip_file_path, 
                type: 'application/zip',
                disposition: 'attachment',
                filename: 'peochain_analytics.zip'
    end
    
    private
    
    def average_referrals_per_user
      total_users = WaitlistEntry.count
      total_referrals = WaitlistEntry.sum(:referral_count)
      
      return 0 if total_users.zero?
      
      (total_referrals.to_f / total_users).round(2)
    end
    
    def top_referrers(limit = 10)
      WaitlistEntry.where("referral_count > 0")
                  .order(referral_count: :desc)
                  .limit(limit)
                  .map { |entry|
                    {
                      email: entry.email,
                      referralCode: entry.referral_code,
                      referralCount: entry.referral_count,
                      position: entry.position
                    }
                  }
    end
    
    def recent_daily_stats(limit = 30)
      DailyWaitlistStats.order(date: :desc)
                        .limit(limit)
                        .map { |stat| format_daily_stat(stat) }
    end
    
    def top_referral_channels(limit = 5)
      ReferralChannel.order(user_count: :desc)
                    .limit(limit)
                    .map { |channel| format_referral_channel(channel) }
    end
    
    def top_regions(limit = 5)
      GeographicStats.order(user_count: :desc)
                     .limit(limit)
                     .map { |stat| format_geographic_stat(stat) }
    end
    
    def format_daily_stat(stat)
      {
        date: stat.date.strftime('%Y-%m-%d'),
        signups: stat.signups,
        referrals: stat.referrals,
        conversionRate: stat.conversion_rate
      }
    end
    
    def format_geographic_stat(stat)
      {
        region: stat.region,
        userCount: stat.user_count,
        referralCount: stat.referral_count,
        conversionRate: stat.conversion_rate
      }
    end
    
    def format_referral_channel(channel)
      {
        id: channel.id,
        name: channel.name,
        source: channel.source,
        userCount: channel.user_count,
        conversionRate: channel.conversion_rate
      }
    end
    
    def export_waitlist_csv(dir)
      CSV.open(File.join(dir, 'waitlist.csv'), 'wb') do |csv|
        csv << ['Email', 'Position', 'ReferralCode', 'ReferralCount', 'Region', 'JoinedAt']
        
        WaitlistEntry.find_each do |entry|
          csv << [
            entry.email,
            entry.position,
            entry.referral_code,
            entry.referral_count,
            entry.region,
            entry.created_at.strftime('%Y-%m-%d %H:%M:%S')
          ]
        end
      end
    end
    
    def export_daily_stats_csv(dir)
      CSV.open(File.join(dir, 'daily_stats.csv'), 'wb') do |csv|
        csv << ['Date', 'Signups', 'Referrals', 'ConversionRate']
        
        DailyWaitlistStats.order(date: :desc).find_each do |stat|
          csv << [
            stat.date.strftime('%Y-%m-%d'),
            stat.signups,
            stat.referrals,
            stat.conversion_rate
          ]
        end
      end
    end
    
    def export_regions_csv(dir)
      CSV.open(File.join(dir, 'regions.csv'), 'wb') do |csv|
        csv << ['Region', 'UserCount', 'ReferralCount', 'ConversionRate']
        
        GeographicStats.order(user_count: :desc).find_each do |stat|
          csv << [
            stat.region,
            stat.user_count,
            stat.referral_count,
            stat.conversion_rate
          ]
        end
      end
    end
    
    def export_channels_csv(dir)
      CSV.open(File.join(dir, 'channels.csv'), 'wb') do |csv|
        csv << ['Name', 'Source', 'UserCount', 'ConversionRate']
        
        ReferralChannel.order(user_count: :desc).find_each do |channel|
          csv << [
            channel.name,
            channel.source,
            channel.user_count,
            channel.conversion_rate
          ]
        end
      end
    end
    
    def export_summary_txt(dir)
      File.open(File.join(dir, 'summary.txt'), 'w') do |file|
        file.puts "PeoChain Analytics Export"
        file.puts "=========================="
        file.puts "Date: #{Time.now.strftime('%Y-%m-%d %H:%M:%S')}"
        file.puts ""
        file.puts "Total Signups: #{WaitlistEntry.count}"
        file.puts "Total Referrals: #{WaitlistEntry.sum(:referral_count)}"
        file.puts "Average Referrals Per User: #{average_referrals_per_user}"
        file.puts ""
        file.puts "Top 5 Referrers:"
        top_referrers(5).each_with_index do |referrer, index|
          file.puts "#{index + 1}. #{referrer[:email]} - #{referrer[:referralCount]} referrals"
        end
        file.puts ""
        file.puts "Top 5 Regions:"
        top_regions(5).each_with_index do |region, index|
          file.puts "#{index + 1}. #{region[:region]} - #{region[:userCount]} users"
        end
      end
    end
  end
end