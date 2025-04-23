class CreateWaitlistEntries < ActiveRecord::Migration[7.0]
  def change
    create_table :waitlist_entries do |t|
      t.string :email, null: false
      t.string :referral_code, null: false
      t.integer :position, null: false
      t.integer :referral_count, default: 0
      t.string :ip_address
      t.string :user_agent
      t.string :region
      t.string :referred_by
      
      t.timestamps
    end
    
    # Add indexes for performance
    add_index :waitlist_entries, :email, unique: true
    add_index :waitlist_entries, :referral_code, unique: true
    add_index :waitlist_entries, :position
    add_index :waitlist_entries, :referred_by
    add_index :waitlist_entries, :region
  end
end