Rails.application.routes.draw do
  # Root route points to the landing page
  root 'home#index'
  
  # API Routes
  namespace :api do
    # Waitlist endpoints
    post '/waitlist', to: 'waitlist#create'
    get '/referral/:code', to: 'waitlist#show_referral'
    
    # Analytics endpoints
    namespace :analytics do
      get '/overview', to: 'analytics#overview'
      
      # Daily stats
      get '/daily-stats', to: 'analytics#daily_stats'
      post '/daily-stats', to: 'analytics#create_daily_stats'
      
      # Geographic stats
      get '/geographic-stats', to: 'analytics#geographic_stats'
      post '/geographic-stats', to: 'analytics#create_geographic_stats'
      
      # Referral channels
      get '/referral-channels', to: 'analytics#referral_channels'
      post '/referral-channels', to: 'analytics#create_referral_channel'
      
      # Top referrers
      get '/top-referrers', to: 'analytics#top_referrers'
      
      # Export
      get '/export', to: 'analytics#export_data'
    end
  end
  
  # Fallback route to handle client-side routing
  get '*path', to: 'home#index', constraints: lambda { |req|
    !req.xhr? && req.format.html? && !req.path.start_with?('/api/')
  }
end