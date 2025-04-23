class DailyWaitlistStat < ApplicationRecord
  # Validations
  validates :date, presence: true, uniqueness: true
  validates :signup_count, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :total_referrals, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :conversion_rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  
  # Scopes
  scope :latest, -> (limit = 30) { order(date: :desc).limit(limit) }
  scope :date_range, -> (start_date, end_date) { where(date: start_date..end_date).order(date: :asc) }
  
  # Methods to update stats when a new signup occurs
  def self.record_signup(date, was_referred)
    stat = find_or_initialize_by(date: date)
    
    if stat.new_record?
      stat.signup_count = 1
      stat.total_referrals = was_referred ? 1 : 0
      stat.conversion_rate = was_referred ? 100 : 0
    else
      stat.signup_count += 1
      stat.total_referrals += 1 if was_referred
      
      # Recalculate conversion rate
      stat.conversion_rate = stat.signup_count > 0 ? 
        ((stat.total_referrals.to_f / stat.signup_count) * 100).round : 0
    end
    
    stat.save!
    stat
  end
end