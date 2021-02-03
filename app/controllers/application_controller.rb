class ApplicationController < ActionController::Base

  def current_user
    token = session[:token].to_s
    email = Base64.decode64(token)
    User.find_by(email: email)
  end
end
