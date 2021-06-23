class ProjectsController < ApplicationController
    def index
        projects = Project.all
        render json: projects
        #add project_params - accepts title and canvas via json(?)
    end

    def create 
        project = Project.create(project_params)
        project.save
    end 

    def show
    project = Project.find_by(title: params[:project][:title])
    end 

    private 

    def project_params 
        params.require(:project).permit(:title, :canvas)
    end 
end
