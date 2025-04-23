class User < ApplicationRecord
  has_secure_password
  
  # Associations
  has_many :waitlist_entries, dependent: :destroy
  has_many :user_badges, dependent: :destroy
  has_many :badges, through: :user_badges
  
  # Validations
  validates :username, presence: true, uniqueness: true, 
            format: { with: /\A[a-zA-Z0-9_]+\z/, message: "can only contain letters, numbers, and underscores" }
  validates :email, presence: true, uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP, message: "must be a valid email address" }
  
  # Callbacks
  before_save :downcase_email
  
  # Scopes
  scope :with_badges, -> { joins(:user_badges).distinct }
  scope :with_badge, ->(badge_id) { joins(:user_badges).where(user_badges: { badge_id: badge_id }) }
  scope :with_category_badges, ->(category_id) { 
    joins(user_badges: { badge: :badge_category })
    .where(badge_categories: { id: category_id })
    .distinct
  }
  
  # Instance methods
  
  # Get all featured badges for this user
  def featured_badges
    user_badges.featured.includes(:badge).map(&:badge)
  end
  
  # Get recently earned badges
  def recent_badges(limit = 5)
    user_badges.recently_awarded.includes(:badge).limit(limit).map(&:badge)
  end
  
  # Award a badge to this user
  def award_badge(badge, context = nil)
    return false if has_badge?(badge)
    
    user_badges.create!(
      badge: badge,
      awarded_at: Time.current,
      achievement_context: context
    )
  end
  
  # Check if user has a specific badge
  def has_badge?(badge)
    badge_id = badge.is_a?(Badge) ? badge.id : badge
    user_badges.exists?(badge_id: badge_id)
  end
  
  # Get all badges organized by category
  def badges_by_category
    result = {}
    
    BadgeCategory.ordered.each do |category|
      category_badges = badges.where(badge_category_id: category.id)
      result[category.name] = category_badges if category_badges.any?
    end
    
    # Add uncategorized badges
    uncategorized = badges.where(badge_category_id: nil)
    result['Uncategorized'] = uncategorized if uncategorized.any?
    
    result
  end
  
  # Get badge progress for a specific badge
  def badge_progress(badge)
    user_badge = user_badges.find_by(badge_id: badge.id)
    return 0 unless user_badge
    
    if user_badge.awarded_at.present?
      100 # Fully completed
    else
      # Calculate percentage based on progress and required points
      required = badge.required_points.to_f
      return 0 if required.zero?
      
      [(user_badge.progress.to_f / required * 100).to_i, 99].min # Cap at 99% until awarded
    end
  end
  
  private
  
  def downcase_email
    self.email = email.downcase if email.present?
  end
end