class ProjectsController < ApplicationController
    def index
        projects = Project.all
        render json: projects
        #add project_params - accepts title and canvas via json(?)
    end

    def create 
        project = Project.create(project_params) 
        if project.save
            render json: {status: "success", message: "SUCCESS: Project has been saved."}
        else 
            render json: {status: "error", message:"ERROR: Title must exist and be unique."}
        end 
    end 

    def show
    
    project = Project.find_by_id(params[:id])
    render json: project
    end 

    private 

    def project_params 
        params.require(:project).permit(:title, :canvas)
    end 
end
