class CreateDailyWaitlistStats < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_waitlist_stats do |t|
      t.date :date, null: false
      t.integer :signups, default: 0
      t.integer :referrals, default: 0
      t.float :conversion_rate, default: 0.0
      
      t.timestamps
    end
    
    # Add index for performance
    add_index :daily_waitlist_stats, :date, unique: true
  end
end