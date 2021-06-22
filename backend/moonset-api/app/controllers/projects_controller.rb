class ProjectsController < ApplicationController
    def index
        project = Project.all
        render json: project
        #add project_params - accepts title and canvas via json(?)
    end

    def create 
        #FILL IN THE BODY HERE
    end 
end
