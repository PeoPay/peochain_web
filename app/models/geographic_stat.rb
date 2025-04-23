class GeographicStat < ApplicationRecord
  # Validations
  validates :region, presence: true, uniqueness: true
  validates :user_count, presence: true, numericality: { greater_than_or_equal_to: 0 }
  validates :engagement_score, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 100 }
  
  # Scopes
  scope :top_regions, -> (limit = 10) { order(user_count: :desc).limit(limit) }
  
  # Methods to update stats
  def self.record_signup(region)
    stat = find_or_initialize_by(region: region)
    
    if stat.new_record?
      stat.user_count = 1
      stat.engagement_score = 50 # Default middle value
    else
      stat.user_count += 1
    end
    
    stat.save!
    stat
  end
  
  def self.update_engagement(region, score_change)
    stat = find_or_initialize_by(region: region)
    
    if stat.new_record?
      stat.user_count = 1
      stat.engagement_score = [50 + score_change, 100].min
    else
      new_score = stat.engagement_score + score_change
      stat.engagement_score = [[new_score, 0].max, 100].min
    end
    
    stat.save!
    stat
  end
end