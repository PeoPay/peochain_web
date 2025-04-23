class Badge < ApplicationRecord
  belongs_to :badge_category, optional: true
  has_many :user_badges, dependent: :destroy
  has_many :users, through: :user_badges
  
  # Validations
  validates :name, presence: true, uniqueness: true
  validates :badge_type, presence: true, 
            inclusion: { in: ['achievement', 'milestone', 'special'] }
  
  # Scopes
  scope :active, -> { where(is_active: true) }
  scope :by_category, ->(category) { where(category: category) }
  scope :by_type, ->(badge_type) { where(badge_type: badge_type) }
  scope :achievements, -> { where(badge_type: 'achievement') }
  scope :milestones, -> { where(badge_type: 'milestone') }
  scope :special, -> { where(badge_type: 'special') }
  
  # Instance methods
  
  # Check if a user has earned this badge
  def earned_by?(user)
    user_badges.exists?(user_id: user.id)
  end
  
  # Award this badge to a user
  def award_to(user, context = nil)
    return false if earned_by?(user)
    
    user_badges.create!(
      user: user,
      awarded_at: Time.current,
      achievement_context: context
    )
    
    # Broadcast event for real-time notifications
    ActionCable.server.broadcast(
      "user_#{user.id}", 
      { type: 'BADGE_EARNED', badge_id: id, badge_name: name }
    )
    
    true
  end
  
  # Update progress for a user towards earning this badge
  def update_progress(user, progress_value)
    user_badge = user_badges.find_or_initialize_by(user_id: user.id)
    user_badge.progress = progress_value
    
    # Check if badge should be awarded based on progress
    if progress_value >= required_points && user_badge.awarded_at.nil?
      user_badge.awarded_at = Time.current
      
      # Broadcast event for real-time notifications
      ActionCable.server.broadcast(
        "user_#{user.id}", 
        { type: 'BADGE_EARNED', badge_id: id, badge_name: name }
      )
    end
    
    user_badge.save
  end
end