class CreateGeographicStats < ActiveRecord::Migration[7.0]
  def change
    create_table :geographic_stats do |t|
      t.string :region, null: false
      t.integer :user_count, null: false, default: 0
      t.integer :engagement_score, null: false, default: 0
      
      t.timestamps
    end
    
    add_index :geographic_stats, :region, unique: true
  end
end