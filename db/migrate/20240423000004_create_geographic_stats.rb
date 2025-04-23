class CreateGeographicStats < ActiveRecord::Migration[7.0]
  def change
    create_table :geographic_stats do |t|
      t.string :region, null: false
      t.integer :user_count, default: 0
      t.integer :referral_count, default: 0
      t.float :conversion_rate, default: 0.0
      
      t.timestamps
    end
    
    # Add index for performance
    add_index :geographic_stats, :region, unique: true
    add_index :geographic_stats, :user_count
  end
end