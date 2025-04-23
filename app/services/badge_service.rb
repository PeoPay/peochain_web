class BadgeService
  # Award badges based on referral count
  def self.check_referral_badges(user)
    referral_count = user.waitlist_entries.sum(:referral_count)
    
    # Check for referral badges
    if referral_count >= 50
      award_badge_if_eligible(user, 'referral_master', "Referred 50+ users")
    elsif referral_count >= 20
      award_badge_if_eligible(user, 'referral_expert', "Referred 20+ users")
    elsif referral_count >= 10
      award_badge_if_eligible(user, 'referral_pro', "Referred 10+ users")
    elsif referral_count >= 5
      award_badge_if_eligible(user, 'referral_enthusiast', "Referred 5+ users")
    elsif referral_count >= 1
      award_badge_if_eligible(user, 'first_referral', "Made first referral")
    end
  end
  
  # Award badges based on educational content completion
  def self.check_education_badges(user, completed_modules)
    # Early adopter badge
    if user.created_at < 30.days.from_now.beginning_of_day
      award_badge_if_eligible(user, 'early_adopter', "Joined during the early access period")
    end
    
    # Badge for completing introduction module
    if completed_modules.include?('blockchain_basics')
      award_badge_if_eligible(user, 'blockchain_novice', "Completed Blockchain Basics module")
    end
    
    # Badge for completing advanced modules
    if (completed_modules & ['defi_fundamentals', 'smart_contracts', 'tokenomics']).size >= 3
      award_badge_if_eligible(user, 'blockchain_adept', "Completed 3+ advanced modules")
    end
    
    # Badge for completing all modules
    all_modules = ['blockchain_basics', 'defi_fundamentals', 'smart_contracts', 'tokenomics', 'security']
    if (all_modules - completed_modules).empty?
      award_badge_if_eligible(user, 'blockchain_master', "Completed all education modules")
    end
  end
  
  # Award badges based on engagement
  def self.check_engagement_badges(user, engagement_data)
    # Check login streak
    if engagement_data[:login_streak] >= 30
      award_badge_if_eligible(user, 'monthly_enthusiast', "Logged in for 30 consecutive days")
    elsif engagement_data[:login_streak] >= 7
      award_badge_if_eligible(user, 'weekly_enthusiast', "Logged in for 7 consecutive days")
    end
    
    # Check forum activity
    if engagement_data[:forum_posts] >= 50
      award_badge_if_eligible(user, 'community_leader', "Posted 50+ times in community forums")
    elsif engagement_data[:forum_posts] >= 10
      award_badge_if_eligible(user, 'community_contributor', "Posted 10+ times in community forums")
    end
    
    # Check if participated in testnet
    if engagement_data[:testnet_participation]
      award_badge_if_eligible(user, 'testnet_pioneer', "Participated in PeoChain testnet")
    end
  end
  
  # Award special event badges
  def self.award_event_badge(user, event_name)
    case event_name
    when 'launch_day'
      award_badge_if_eligible(user, 'launch_day_participant', "Participated in launch day events")
    when 'ama_session'
      award_badge_if_eligible(user, 'ama_participant', "Participated in an AMA session")
    when 'hackathon'
      award_badge_if_eligible(user, 'hackathon_participant', "Participated in PeoChain Hackathon")
    when 'beta_tester'
      award_badge_if_eligible(user, 'beta_tester', "Helped test PeoChain before launch")
    end
  end
  
  private
  
  # Helper method to award badge if user doesn't already have it
  def self.award_badge_if_eligible(user, badge_name, context = nil)
    badge = Badge.find_by(name: badge_name)
    return false unless badge && badge.is_active
    
    user.award_badge(badge, context)
  end
end