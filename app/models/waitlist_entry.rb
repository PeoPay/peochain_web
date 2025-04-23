class WaitlistEntry < ApplicationRecord
  # Validations
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :referral_code, presence: true, uniqueness: true
  validates :position, presence: true, numericality: { only_integer: true, greater_than: 0 }
  
  # Default values
  attribute :referral_count, :integer, default: 0
  
  # Callbacks
  before_validation :generate_referral_code, on: :create
  before_validation :set_position, on: :create
  before_save :downcase_email
  
  # Scopes
  scope :with_referrals, -> { where('referral_count > 0') }
  scope :top_referrers, ->(limit = 10) { with_referrals.order(referral_count: :desc).limit(limit) }
  
  private
  
  def generate_referral_code
    # Only generate if not already set
    return if referral_code.present?
    
    # Generate a unique referral code based on email
    base = email.split('@').first.gsub(/[^a-zA-Z0-9]/, '')[0..5].upcase
    random_suffix = SecureRandom.alphanumeric(5).upcase
    self.referral_code = "#{base}#{random_suffix}"
    
    # Ensure uniqueness
    while WaitlistEntry.exists?(referral_code: self.referral_code)
      random_suffix = SecureRandom.alphanumeric(5).upcase
      self.referral_code = "#{base}#{random_suffix}"
    end
  end
  
  def set_position
    # Only set if not already set
    return if position.present?
    
    # Set position based on current count
    self.position = WaitlistEntry.count + 1
  end
  
  def downcase_email
    self.email = email.downcase if email.present?
  end
end