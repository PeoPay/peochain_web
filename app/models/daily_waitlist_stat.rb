class DailyWaitlistStat < ApplicationRecord
  # Validations
  validates :date, presence: true, uniqueness: true
  validates :signups, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :referrals, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :conversion_rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
  
  # Default values
  attribute :signups, :integer, default: 0
  attribute :referrals, :integer, default: 0
  attribute :conversion_rate, :float, default: 0.0
  
  # Scopes
  scope :recent, ->(limit = 30) { order(date: :desc).limit(limit) }
  scope :date_range, ->(start_date, end_date) { where(date: start_date..end_date).order(date: :asc) }
  
  # Class methods
  def self.update_for_date(date, signups: 0, referrals: 0)
    # Find or create stats for the given date
    stat = find_or_initialize_by(date: date)
    
    # Update values
    stat.signups = signups
    stat.referrals = referrals
    
    # Calculate conversion rate if there are signups
    if signups > 0
      stat.conversion_rate = referrals.to_f / signups
    else
      stat.conversion_rate = 0.0
    end
    
    # Save the record
    stat.save
  end
  
  def self.record_signup(date = Date.today, was_referred = false)
    # Find or create stats for the given date
    stat = find_or_initialize_by(date: date)
    
    # Increment counters
    stat.signups += 1
    stat.referrals += 1 if was_referred
    
    # Update conversion rate
    stat.conversion_rate = stat.referrals.to_f / stat.signups
    
    # Save the record
    stat.save
  end
end