module ApplicationCable
  class Connection < ActionCable::Connection::Base
    # No authentication required for public channels
  end
end