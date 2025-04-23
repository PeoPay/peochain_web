class CreateReferralChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :referral_channels do |t|
      t.string :channel_name, null: false
      t.integer :referral_count, null: false, default: 0
      t.integer :conversion_rate, null: false, default: 0
      
      t.timestamps
    end
    
    add_index :referral_channels, :channel_name, unique: true
  end
end