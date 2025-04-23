class WaitlistEntry < ApplicationRecord
  # Validations
  validates :full_name, presence: true
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :referral_code, presence: true, uniqueness: true
  validates :user_type, presence: true, inclusion: { in: ['user', 'developer'] }
  
  # Scopes
  scope :top_referrers, -> (limit = 5) { order(referral_count: :desc).limit(limit) }
  
  # Helper methods
  def was_referred?
    referred_by.present?
  end
  
  # Callback to generate referral code if not provided
  before_validation :generate_referral_code, on: :create
  
  private
  
  def generate_referral_code
    return if referral_code.present?
    
    # Generate a unique referral code based on the email address
    base = email.split('@').first.gsub(/[^0-9a-z]/i, '').upcase
    random_part = SecureRandom.alphanumeric(6).upcase
    self.referral_code = "JOIN-#{base}-#{random_part}"
  end
end