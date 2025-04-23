class GeographicStat < ApplicationRecord
  # Validations
  validates :region, presence: true, uniqueness: true
  validates :user_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :referral_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :conversion_rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
  
  # Default values
  attribute :user_count, :integer, default: 0
  attribute :referral_count, :integer, default: 0
  attribute :conversion_rate, :float, default: 0.0
  
  # Scopes
  scope :top_regions, ->(limit = 10) { order(user_count: :desc).limit(limit) }
  
  # Class methods
  def self.update_or_create(region, user_count: 0, referral_count: 0)
    # Find or create stats for the given region
    stat = find_or_initialize_by(region: region)
    
    # Update values
    stat.user_count = user_count
    stat.referral_count = referral_count
    
    # Calculate conversion rate if there are users
    if user_count > 0
      stat.conversion_rate = referral_count.to_f / user_count
    else
      stat.conversion_rate = 0.0
    end
    
    # Save the record
    stat.save
  end
  
  def self.record_signup(region, was_referred = false)
    # Skip if no region provided
    return if region.blank?
    
    # Find or create stats for the given region
    stat = find_or_initialize_by(region: region)
    
    # Increment counters
    stat.user_count += 1
    stat.referral_count += 1 if was_referred
    
    # Update conversion rate
    stat.conversion_rate = stat.referral_count.to_f / stat.user_count
    
    # Save the record
    stat.save
  end
end