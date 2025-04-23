module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    
    def connect
      self.current_user = find_verified_user
    end
    
    private
    
    def find_verified_user
      # Try to find user from session
      if verified_user = User.find_by(id: cookies.encrypted[:user_id])
        verified_user
      # Try to find user from auth token
      elsif auth_token = request.params[:token]
        User.find_by(auth_token: auth_token)
      else
        reject_unauthorized_connection
      end
    end
  end
end