class ReferralChannel < ApplicationRecord
  # Validations
  validates :name, presence: true, uniqueness: true
  validates :user_count, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :conversion_rate, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1 }
  
  # Default values
  attribute :user_count, :integer, default: 0
  attribute :conversion_rate, :float, default: 0.0
  
  # Scopes
  scope :top_channels, ->(limit = 10) { order(user_count: :desc).limit(limit) }
  
  # Class methods
  def self.update_or_create(name, source = nil, user_count: 0, conversion_rate: 0.0)
    # Find or create channel with the given name
    channel = find_or_initialize_by(name: name)
    
    # Update values
    channel.source = source if source.present?
    channel.user_count = user_count
    channel.conversion_rate = conversion_rate
    
    # Save the record
    channel.save
  end
  
  def self.record_signup(source, converted = false)
    # Skip if no source provided
    return if source.blank?
    
    # Find or create channel with the given source
    channel = find_or_initialize_by(name: source)
    
    # Set source if not already set
    channel.source ||= source
    
    # Increment counter
    channel.user_count += 1
    
    # Update conversion rate if converted
    if converted
      # Approximate conversion rate based on new conversion
      # This is a simplified approach; in production, you'd want to store
      # total conversions and calculate rate from that
      channel.conversion_rate = ((channel.conversion_rate * (channel.user_count - 1)) + 1) / channel.user_count
    end
    
    # Save the record
    channel.save
  end
end