class LikesController < ApplicationController
    
    def index 
    likes = Like.all
    render json: likes 
    end 
    
    def create 
       byebug
       like = Like.create(like_params)
       like.save 
       
    end
    
    def show
       like = Like.find(params[:id])
    end 
end 

private 

    def like_params 
        params.require(:like).permit(:project_id)
    end 