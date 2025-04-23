class ReferralChannel < ApplicationRecord
  # Validations
  validates :channel_name, presence: true, uniqueness: true
  validates :referral_count, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :conversion_rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  
  # Scopes
  scope :top_channels, -> (limit = 10) { order(referral_count: :desc).limit(limit) }
  
  # Methods to record a referral
  def self.record_referral(channel_name, converted = false)
    channel = find_or_initialize_by(channel_name: channel_name)
    
    if channel.new_record?
      channel.referral_count = 1
      channel.conversion_rate = converted ? 100 : 0
    else
      channel.referral_count += 1
      
      # Update conversion rate if converted
      if converted
        total_conversions = (channel.referral_count * channel.conversion_rate / 100.0).round + 1
        channel.conversion_rate = (total_conversions.to_f / channel.referral_count * 100).round
      else
        total_conversions = (channel.referral_count * channel.conversion_rate / 100.0).round
        channel.conversion_rate = (total_conversions.to_f / channel.referral_count * 100).round
      end
    end
    
    channel.save!
    channel
  end
end