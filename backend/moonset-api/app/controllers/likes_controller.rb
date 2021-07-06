class LikesController < ApplicationController
    
    def index 
    likes = Like.all
    render json: likes 
    end 
    
    def create 
        byebug
        project = Project.find(params[:project_id])
    end
    
    def show
       like = Like.find(params[:id])
    end 
end 