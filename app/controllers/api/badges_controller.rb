module Api
  class BadgesController < ApiController
    before_action :authenticate_user, except: [:index, :show, :categories]
    before_action :set_badge, only: [:show, :update, :destroy]
    before_action :require_admin, only: [:create, :update, :destroy]
    
    # GET /api/badges
    def index
      @badges = Badge.active
      
      if params[:category].present?
        @badges = @badges.by_category(params[:category])
      end
      
      if params[:type].present?
        @badges = @badges.by_type(params[:type])
      end
      
      render json: @badges, status: :ok
    end
    
    # GET /api/badges/:id
    def show
      render json: @badge, status: :ok
    end
    
    # POST /api/badges
    def create
      @badge = Badge.new(badge_params)
      
      if @badge.save
        render json: @badge, status: :created
      else
        render json: { errors: @badge.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # PUT/PATCH /api/badges/:id
    def update
      if @badge.update(badge_params)
        render json: @badge, status: :ok
      else
        render json: { errors: @badge.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # DELETE /api/badges/:id
    def destroy
      @badge.destroy
      head :no_content
    end
    
    # GET /api/badges/categories
    def categories
      @categories = BadgeCategory.ordered.includes(:badges)
      render json: @categories, include: [:badges], status: :ok
    end
    
    # GET /api/badges/user
    def user_badges
      @user = current_user
      @badges = @user.badges.includes(:badge_category)
      
      render json: {
        badges: @badges,
        featured: @user.featured_badges,
        recent: @user.recent_badges,
        by_category: @user.badges_by_category
      }, status: :ok
    end
    
    # POST /api/badges/:id/award
    def award
      @badge = Badge.find(params[:id])
      @user = User.find(params[:user_id])
      
      if @badge.award_to(@user, params[:context])
        render json: { message: "Badge awarded successfully" }, status: :ok
      else
        render json: { error: "User already has this badge" }, status: :unprocessable_entity
      end
    end
    
    # POST /api/badges/progress
    def update_progress
      @badge = Badge.find(params[:badge_id])
      @user = current_user
      
      @badge.update_progress(@user, params[:progress].to_i)
      
      render json: {
        badge: @badge,
        progress: @user.badge_progress(@badge),
        awarded: @user.has_badge?(@badge)
      }, status: :ok
    end
    
    private
    
    def set_badge
      @badge = Badge.find(params[:id])
    end
    
    def badge_params
      params.require(:badge).permit(
        :name, :description, :icon, :badge_type, :required_points,
        :is_active, :category, :badge_category_id, criteria: {}
      )
    end
    
    def require_admin
      unless current_user&.admin?
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end