class CreateReferralChannels < ActiveRecord::Migration[7.0]
  def change
    create_table :referral_channels do |t|
      t.string :name, null: false
      t.string :source
      t.integer :user_count, default: 0
      t.float :conversion_rate, default: 0.0
      
      t.timestamps
    end
    
    # Add index for performance
    add_index :referral_channels, :name, unique: true
    add_index :referral_channels, :user_count
  end
end