class CreateWaitlistEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :waitlist_entries do |t|
      t.string :full_name, null: false
      t.string :email, null: false
      t.string :referral_code, null: false
      t.string :referred_by
      t.integer :referral_count, null: false, default: 0
      t.string :user_type, null: false, default: 'user'
      t.jsonb :metadata
      
      t.timestamps
    end
    
    add_index :waitlist_entries, :email, unique: true
    add_index :waitlist_entries, :referral_code, unique: true
    add_index :waitlist_entries, :referred_by
  end
end