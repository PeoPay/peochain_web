require 'influxdb-client'

class AnalyticsService
  attr_reader :influx_client, :bucket, :org, :enabled
  
  # Initialize with custom configuration or use defaults
  def initialize(config = {})
    @enabled = config[:enabled].nil? ? true : config[:enabled]
    
    # Early return if analytics is disabled
    return unless @enabled
    
    # Set up configuration
    url = config[:url] || ENV['INFLUXDB_URL']
    token = config[:token] || ENV['INFLUXDB_TOKEN']
    @bucket = config[:bucket] || ENV['INFLUXDB_BUCKET'] || 'peochain_analytics'
    @org = config[:org] || ENV['INFLUXDB_ORG'] || 'peochain'
    
    # Return if required config is missing
    unless url && token
      @enabled = false
      Rails.logger.warn "InfluxDB analytics disabled: Missing URL or token."
      return
    end
    
    # Initialize the client
    begin
      @influx_client = InfluxDB2::Client.new(url, token, 
        precision: InfluxDB2::WritePrecision::NANOSECOND,
        bucket: @bucket,
        org: @org
      )
      
      Rails.logger.info "InfluxDB analytics service initialized"
    rescue => e
      @enabled = false
      Rails.logger.error "Failed to initialize InfluxDB client: #{e.message}"
    end
  end
  
  # Record a user signup event in InfluxDB
  def record_signup(data)
    return false unless @enabled
    
    begin
      write_api = influx_client.create_write_api
      
      # Sanitize and prepare data
      email = anonymize_email(data[:email])
      region = data[:region] || 'unknown'
      referral_code = data[:referral_code]
      user_type = data[:user_type] || 'user'
      
      # Create data point
      point = InfluxDB2::Point.new(
        name: 'signup',
        tags: {
          region: region,
          user_type: user_type,
          was_referred: data[:referred_by].present?.to_s
        },
        fields: {
          email: email,
          referral_code: referral_code
        },
        time: Time.now.utc
      )
      
      # Write to InfluxDB
      write_api.write(data: point)
      true
    rescue => e
      Rails.logger.error "Failed to record signup in InfluxDB: #{e.message}"
      false
    end
  end
  
  # Record a referral event in InfluxDB
  def record_referral(data)
    return false unless @enabled
    
    begin
      write_api = influx_client.create_write_api
      
      # Create data point
      point = InfluxDB2::Point.new(
        name: 'referral',
        tags: {
          referred_by: data[:referred_by]
        },
        fields: {
          email: anonymize_email(data[:email]),
          converted: data[:converted] || false
        },
        time: Time.now.utc
      )
      
      # Write to InfluxDB
      write_api.write(data: point)
      true
    rescue => e
      Rails.logger.error "Failed to record referral in InfluxDB: #{e.message}"
      false
    end
  end
  
  # Record a general analytics event in InfluxDB
  def record_event(measurement, tags = {}, fields = {})
    return false unless @enabled
    
    begin
      write_api = influx_client.create_write_api
      
      # Create data point
      point = InfluxDB2::Point.new(
        name: measurement,
        tags: tags,
        fields: fields,
        time: Time.now.utc
      )
      
      # Write to InfluxDB
      write_api.write(data: point)
      true
    rescue => e
      Rails.logger.error "Failed to record event in InfluxDB: #{e.message}"
      false
    end
  end
  
  # Get the total number of signups
  def get_total_signup_count
    return 0 unless @enabled
    
    begin
      query_api = influx_client.create_query_api
      query = %{
        from(bucket: "#{@bucket}")
          |> range(start: -1y)
          |> filter(fn: (r) => r._measurement == "signup")
          |> count()
      }
      
      result = query_api.query(query: query)
      return 0 if result.empty?
      
      # Extract the count value from the result
      result[0].records[0].value
    rescue => e
      Rails.logger.error "Failed to get total signup count from InfluxDB: #{e.message}"
      0
    end
  end
  
  # Get the total number of referrals
  def get_total_referral_count
    return 0 unless @enabled
    
    begin
      query_api = influx_client.create_query_api
      query = %{
        from(bucket: "#{@bucket}")
          |> range(start: -1y)
          |> filter(fn: (r) => r._measurement == "referral")
          |> count()
      }
      
      result = query_api.query(query: query)
      return 0 if result.empty?
      
      # Extract the count value from the result
      result[0].records[0].value
    rescue => e
      Rails.logger.error "Failed to get total referral count from InfluxDB: #{e.message}"
      0
    end
  end
  
  # Get the number of referrals by a specific referral code
  def get_referral_count_by_code(referral_code)
    return 0 unless @enabled
    
    begin
      query_api = influx_client.create_query_api
      query = %{
        from(bucket: "#{@bucket}")
          |> range(start: -1y)
          |> filter(fn: (r) => r._measurement == "referral")
          |> filter(fn: (r) => r.referred_by == "#{referral_code}")
          |> count()
      }
      
      result = query_api.query(query: query)
      return 0 if result.empty?
      
      # Extract the count value from the result
      result[0].records[0].value
    rescue => e
      Rails.logger.error "Failed to get referral count by code from InfluxDB: #{e.message}"
      0
    end
  end
  
  # Get daily signup counts for the past N days
  def get_daily_signups(days = 30)
    return [] unless @enabled
    
    begin
      query_api = influx_client.create_query_api
      query = %{
        from(bucket: "#{@bucket}")
          |> range(start: -#{days}d)
          |> filter(fn: (r) => r._measurement == "signup")
          |> aggregateWindow(every: 1d, fn: count)
          |> yield(name: "count")
      }
      
      result = query_api.query(query: query)
      return [] if result.empty?
      
      # Transform the result into the expected format
      result.map do |table|
        table.records.map do |record|
          {
            date: record.time.strftime('%Y-%m-%d'),
            count: record.value
          }
        end
      end.flatten
    rescue => e
      Rails.logger.error "Failed to get daily signups from InfluxDB: #{e.message}"
      []
    end
  end
  
  # Get top countries by signup count
  def get_top_countries(limit = 10)
    return [] unless @enabled
    
    begin
      query_api = influx_client.create_query_api
      query = %{
        from(bucket: "#{@bucket}")
          |> range(start: -1y)
          |> filter(fn: (r) => r._measurement == "signup")
          |> group(columns: ["region"])
          |> count()
          |> sort(columns: ["_value"], desc: true)
          |> limit(n: #{limit})
      }
      
      result = query_api.query(query: query)
      return [] if result.empty?
      
      # Transform the result into the expected format
      result.map do |table|
        table.records.map do |record|
          {
            country: record.values["region"],
            count: record.value
          }
        end
      end.flatten
    rescue => e
      Rails.logger.error "Failed to get top countries from InfluxDB: #{e.message}"
      []
    end
  end
  
  # Get top referrers by referral count
  def get_top_referrers(limit = 10)
    return [] unless @enabled
    
    begin
      query_api = influx_client.create_query_api
      query = %{
        from(bucket: "#{@bucket}")
          |> range(start: -1y)
          |> filter(fn: (r) => r._measurement == "referral")
          |> group(columns: ["referred_by"])
          |> count()
          |> sort(columns: ["_value"], desc: true)
          |> limit(n: #{limit})
      }
      
      result = query_api.query(query: query)
      return [] if result.empty?
      
      # Transform the result into the expected format
      result.map do |table|
        table.records.map do |record|
          {
            code: record.values["referred_by"],
            count: record.value
          }
        end
      end.flatten
    rescue => e
      Rails.logger.error "Failed to get top referrers from InfluxDB: #{e.message}"
      []
    end
  end
  
  private
  
  # Helper method to anonymize email addresses for privacy
  def anonymize_email(email)
    return nil if email.blank?
    
    parts = email.split('@')
    return email unless parts.length == 2
    
    username = parts[0]
    domain = parts[1]
    
    # Keep first character and last character, replace the rest with stars
    if username.length > 2
      anonymized_username = username[0] + '*' * (username.length - 2) + username[-1]
    else
      anonymized_username = username
    end
    
    "#{anonymized_username}@#{domain}"
  end
end

# Singleton instance for the app
def self.analytics_service
  @analytics_service ||= AnalyticsService.new
end