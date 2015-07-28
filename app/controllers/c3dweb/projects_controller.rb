class C3dweb::ProjectsController < ApplicationController

  def index

  end

  def new
  end

  def show

  end

  def viewer
    render :layout => false
    @id = params[:id]
  end
end
