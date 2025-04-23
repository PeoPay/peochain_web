class CreateUserBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :user_badges do |t|
      t.references :user, null: false, foreign_key: true
      t.references :badge, null: false, foreign_key: true
      t.datetime :awarded_at, null: false, default: -> { 'CURRENT_TIMESTAMP' }
      t.integer :progress, default: 0  # For badges with partial progress
      t.boolean :is_featured, default: false  # For badges displayed on user profile
      t.string :achievement_context  # Additional context about how badge was earned
      
      t.timestamps
    end
    
    # Add unique constraint to prevent duplicate badges
    add_index :user_badges, [:user_id, :badge_id], unique: true
  end
end