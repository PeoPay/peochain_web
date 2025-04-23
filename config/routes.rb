Rails.application.routes.draw do
  # API Routes
  namespace :api do
    # Waitlist routes
    post '/waitlist', to: 'waitlist#create'
    get '/referral/:code', to: 'waitlist#referral'
    
    # Analytics routes (all require authentication)
    get '/analytics/overview', to: 'analytics#overview'
    get '/analytics/daily-stats', to: 'analytics#daily_stats'
    post '/analytics/daily-stats', to: 'analytics#create_daily_stats'
    get '/analytics/geographic-stats', to: 'analytics#geographic_stats'
    post '/analytics/geographic-stats', to: 'analytics#create_geographic_stats'
    get '/analytics/referral-channels', to: 'analytics#referral_channels'
    post '/analytics/referral-channels', to: 'analytics#create_referral_channel'
    get '/analytics/top-referrers', to: 'analytics#top_referrers'
    get '/analytics/export', to: 'analytics#export'
  end
  
  # Static pages for the frontend
  root 'home#index'
  
  # Route all other requests to the React app
  get '*path', to: 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage' and req.path.exclude? 'api'
  }
end