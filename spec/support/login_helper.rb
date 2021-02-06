require 'rails_helper'

module LoginHelper  
  def login(user:)
    byebug
    token = Base64.encode64(user.email)
    request.session[:token] = token
  end
end
