class HomeController < ApplicationController
  def index

  end

  def sign_in
    render 'users/sessions/new'
  end

  def sign_up
    render 'users/registrations/new'
  end

end
