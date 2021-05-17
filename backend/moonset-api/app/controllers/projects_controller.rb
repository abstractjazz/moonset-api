class ProjectsController < ApplicationController
    def index
        project = Project.all
        render json: project
    end
end
