class BadgeChannel < ApplicationCable::Channel
  def subscribed
    # Stream from user-specific channel
    stream_from "user_#{current_user.id}" if current_user
    
    # Stream from global badge announcements
    stream_from "badge_announcements"
  end
  
  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
  end
  
  # Client can request badge updates
  def fetch_badges
    badges = current_user.badges.includes(:badge_category)
    
    # Send current badges to the client
    transmit({
      type: 'BADGES_LIST',
      badges: badges.as_json(include: :badge_category),
      featured: current_user.featured_badges.as_json,
      recent: current_user.recent_badges.as_json
    })
  end
  
  # Client can update featured badges
  def update_featured(data)
    badge_id = data['badge_id']
    featured = data['featured']
    
    user_badge = current_user.user_badges.find_by(badge_id: badge_id)
    
    if user_badge
      user_badge.update(is_featured: featured)
      
      # Confirm update to client
      transmit({
        type: 'FEATURED_UPDATED',
        badge_id: badge_id,
        featured: featured
      })
    end
  end
end