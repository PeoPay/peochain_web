class User < ApplicationRecord
  # Validations
  validates :username, presence: true, uniqueness: true
  validates :password, presence: true
  
  # Additional security measures would be implemented here
  # For example, has_secure_password if using bcrypt
  
  # In production, don't store plain text passwords
  # This is just for migration compatibility
end