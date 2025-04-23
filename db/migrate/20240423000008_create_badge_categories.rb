class CreateBadgeCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :badge_categories do |t|
      t.string :name, null: false
      t.string :description
      t.string :icon
      t.integer :display_order, default: 0
      
      t.timestamps
    end
    
    # Add unique constraint on name
    add_index :badge_categories, :name, unique: true
    
    # Add category_id to badges and create foreign key
    add_reference :badges, :badge_category, foreign_key: true
  end
end