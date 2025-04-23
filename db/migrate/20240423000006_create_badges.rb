class CreateBadges < ActiveRecord::Migration[7.0]
  def change
    create_table :badges do |t|
      t.string :name, null: false
      t.string :description
      t.string :icon
      t.string :badge_type, null: false, default: 'achievement' # achievement, milestone, special
      t.integer :required_points, default: 0
      t.boolean :is_active, default: true
      t.string :category # referral, education, engagement, etc.
      t.jsonb :criteria, default: {}
      
      t.timestamps
    end
    
    # Add indexes for performance
    add_index :badges, :name
    add_index :badges, :badge_type
    add_index :badges, :category
  end
end