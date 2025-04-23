class UserBadge < ApplicationRecord
  belongs_to :user
  belongs_to :badge
  
  # Validations
  validates :user_id, uniqueness: { scope: :badge_id, message: "already has this badge" }
  
  # Scopes
  scope :featured, -> { where(is_featured: true) }
  scope :recently_awarded, -> { order(awarded_at: :desc) }
  scope :by_badge_type, ->(badge_type) { joins(:badge).where(badges: { badge_type: badge_type }) }
  
  # Callbacks
  after_create :notify_user
  
  private
  
  # Send notification to user about new badge
  def notify_user
    # This would typically integrate with a notification system
    # For now, we'll use ActionCable to broadcast the event
    ActionCable.server.broadcast(
      "user_#{user_id}",
      {
        type: 'NOTIFICATION',
        title: 'New Badge Earned!',
        message: "You've earned the #{badge.name} badge!",
        badge_id: badge_id,
        badge_name: badge.name,
        badge_icon: badge.icon
      }
    )
  end
end