# Create Badge Categories
puts "Creating badge categories..."
categories = [
  {
    name: "Referrals",
    description: "Badges earned by referring others to PeoChain",
    icon: "users",
    display_order: 1
  },
  {
    name: "Education",
    description: "Badges earned by completing educational content",
    icon: "book-open",
    display_order: 2
  },
  {
    name: "Engagement",
    description: "Badges earned through platform engagement",
    icon: "activity",
    display_order: 3
  },
  {
    name: "Events",
    description: "Special badges for participating in events",
    icon: "calendar",
    display_order: 4
  }
]

categories.each do |category_attrs|
  BadgeCategory.find_or_create_by!(name: category_attrs[:name]) do |category|
    category.assign_attributes(category_attrs)
  end
end

# Create Badges
puts "Creating badges..."

# Get category references
referral_category = BadgeCategory.find_by(name: "Referrals")
education_category = BadgeCategory.find_by(name: "Education")
engagement_category = BadgeCategory.find_by(name: "Engagement")
events_category = BadgeCategory.find_by(name: "Events")

# Referral badges
referral_badges = [
  {
    name: "first_referral",
    description: "First Steps: Referred your first person to PeoChain",
    badge_type: "achievement",
    required_points: 1,
    badge_category: referral_category,
    category: "referral",
    icon: "award"
  },
  {
    name: "referral_enthusiast",
    description: "Network Builder: Referred 5+ people to PeoChain",
    badge_type: "achievement",
    required_points: 5,
    badge_category: referral_category,
    category: "referral",
    icon: "users"
  },
  {
    name: "referral_pro",
    description: "Community Advocate: Referred 10+ people to PeoChain",
    badge_type: "achievement",
    required_points: 10,
    badge_category: referral_category,
    category: "referral",
    icon: "share-2"
  },
  {
    name: "referral_expert",
    description: "Influence Leader: Referred 20+ people to PeoChain",
    badge_type: "achievement",
    required_points: 20,
    badge_category: referral_category,
    category: "referral",
    icon: "trending-up"
  },
  {
    name: "referral_master",
    description: "Viral Sensation: Referred 50+ people to PeoChain",
    badge_type: "achievement",
    required_points: 50,
    badge_category: referral_category,
    category: "referral",
    icon: "star"
  }
]

# Education badges
education_badges = [
  {
    name: "blockchain_novice",
    description: "First Steps: Completed the Blockchain Basics module",
    badge_type: "achievement",
    badge_category: education_category,
    category: "education",
    icon: "book"
  },
  {
    name: "blockchain_adept",
    description: "Knowledge Seeker: Completed 3+ advanced blockchain modules",
    badge_type: "achievement",
    badge_category: education_category,
    category: "education",
    icon: "book-open"
  },
  {
    name: "blockchain_master",
    description: "Blockchain Scholar: Completed all educational modules",
    badge_type: "achievement",
    badge_category: education_category,
    category: "education",
    icon: "award"
  }
]

# Engagement badges
engagement_badges = [
  {
    name: "weekly_enthusiast",
    description: "Consistency: Logged in for 7 consecutive days",
    badge_type: "achievement",
    required_points: 7,
    badge_category: engagement_category,
    category: "engagement",
    icon: "clock"
  },
  {
    name: "monthly_enthusiast",
    description: "Dedication: Logged in for 30 consecutive days",
    badge_type: "achievement",
    required_points: 30,
    badge_category: engagement_category,
    category: "engagement",
    icon: "calendar"
  },
  {
    name: "community_contributor",
    description: "Voice of the Community: Posted 10+ times in forums",
    badge_type: "achievement",
    required_points: 10,
    badge_category: engagement_category,
    category: "engagement",
    icon: "message-circle"
  },
  {
    name: "community_leader",
    description: "Community Pillar: Posted 50+ times in forums",
    badge_type: "achievement",
    required_points: 50,
    badge_category: engagement_category,
    category: "engagement",
    icon: "users"
  },
  {
    name: "early_adopter",
    description: "Pioneer: Joined during the early access period",
    badge_type: "special",
    badge_category: engagement_category,
    category: "engagement",
    icon: "zap"
  }
]

# Event badges
event_badges = [
  {
    name: "testnet_pioneer",
    description: "Testnet Pioneer: Participated in the PeoChain testnet",
    badge_type: "special",
    badge_category: events_category,
    category: "event",
    icon: "code"
  },
  {
    name: "launch_day_participant",
    description: "Day One: Participated in launch day events",
    badge_type: "special",
    badge_category: events_category,
    category: "event",
    icon: "play"
  },
  {
    name: "ama_participant",
    description: "Curious Mind: Participated in an AMA session",
    badge_type: "special",
    badge_category: events_category,
    category: "event",
    icon: "mic"
  },
  {
    name: "hackathon_participant",
    description: "Builder: Participated in the PeoChain Hackathon",
    badge_type: "special",
    badge_category: events_category,
    category: "event",
    icon: "code"
  },
  {
    name: "beta_tester",
    description: "Quality Assurance: Helped test PeoChain before launch",
    badge_type: "special",
    badge_category: events_category,
    category: "event",
    icon: "tool"
  }
]

# Create all badges
[referral_badges, education_badges, engagement_badges, event_badges].flatten.each do |badge_attrs|
  Badge.find_or_create_by!(name: badge_attrs[:name]) do |badge|
    badge.assign_attributes(badge_attrs)
  end
end

puts "Badge seed completed: Created #{BadgeCategory.count} categories and #{Badge.count} badges"