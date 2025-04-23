Rails.application.routes.draw do
  # Root path
  root 'home#index'
  
  # API routes
  namespace :api do
    # Waitlist resources
    resources :waitlist, only: [:create] do
      collection do
        get 'referral/:code', to: 'waitlist#referral'
      end
    end
    
    # Analytics resources
    resources :analytics, only: [] do
      collection do
        get 'overview'
        get 'daily-stats'
        post 'daily-stats'
        get 'geographic-stats'
        post 'geographic-stats'
        get 'referral-channels'
        post 'referral-channels'
        get 'top-referrers'
        get 'export'
      end
    end
    
    # Badge resources
    resources :badges do
      collection do
        get 'categories'
        get 'user'
        post 'progress'
      end
      
      member do
        post 'award'
      end
    end
    
    # Badge category resources
    resources :badge_categories do
      member do
        get 'users'
      end
    end
  end
  
  # Action Cable routes
  mount ActionCable.server => '/cable'
  
  # Catch-all route to handle SPA routing
  get '*path', to: 'home#index', constraints: ->(request) do
    !request.xhr? && request.format.html?
  end
end