module Api
  class BadgeCategoriesController < ApiController
    before_action :authenticate_user, except: [:index, :show]
    before_action :set_category, only: [:show, :update, :destroy]
    before_action :require_admin, only: [:create, :update, :destroy]
    
    # GET /api/badge_categories
    def index
      @categories = BadgeCategory.ordered
      
      render json: @categories, status: :ok
    end
    
    # GET /api/badge_categories/:id
    def show
      render json: @category, include: [:badges], status: :ok
    end
    
    # POST /api/badge_categories
    def create
      @category = BadgeCategory.new(category_params)
      
      if @category.save
        render json: @category, status: :created
      else
        render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # PUT/PATCH /api/badge_categories/:id
    def update
      if @category.update(category_params)
        render json: @category, status: :ok
      else
        render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
      end
    end
    
    # DELETE /api/badge_categories/:id
    def destroy
      @category.destroy
      head :no_content
    end
    
    # GET /api/badge_categories/:id/users
    def users
      @category = BadgeCategory.find(params[:id])
      @users = User.with_category_badges(@category.id)
                   .select(:id, :username, :email)
                   .limit(100)
      
      render json: @users, status: :ok
    end
    
    private
    
    def set_category
      @category = BadgeCategory.find(params[:id])
    end
    
    def category_params
      params.require(:badge_category).permit(:name, :description, :icon, :display_order)
    end
    
    def require_admin
      unless current_user&.admin?
        render json: { error: "Unauthorized" }, status: :unauthorized
      end
    end
  end
end