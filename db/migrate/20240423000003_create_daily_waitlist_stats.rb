class CreateDailyWaitlistStats < ActiveRecord::Migration[7.0]
  def change
    create_table :daily_waitlist_stats do |t|
      t.date :date, null: false
      t.integer :signup_count, null: false, default: 0
      t.integer :total_referrals, null: false, default: 0
      t.integer :conversion_rate, null: false, default: 0
      t.jsonb :metadata
      
      t.timestamps
    end
    
    add_index :daily_waitlist_stats, :date, unique: true
  end
end