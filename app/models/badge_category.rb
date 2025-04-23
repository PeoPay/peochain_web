class BadgeCategory < ApplicationRecord
  has_many :badges, dependent: :nullify
  
  # Validations
  validates :name, presence: true, uniqueness: true
  
  # Scopes
  scope :ordered, -> { order(display_order: :asc, name: :asc) }
  scope :with_active_badges, -> { joins(:badges).where(badges: { is_active: true }).distinct }
  
  # Instance methods
  
  # Get all active badges in this category
  def active_badges
    badges.where(is_active: true)
  end
  
  # Count users who have earned at least one badge in this category
  def user_count
    User.joins(:user_badges)
        .joins("INNER JOIN badges ON badges.id = user_badges.badge_id")
        .where(badges: { badge_category_id: id })
        .distinct
        .count
  end
end