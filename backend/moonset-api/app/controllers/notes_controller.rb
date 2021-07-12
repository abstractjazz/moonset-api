class NotesController < ApplicationController
    
    def index 
    project = Project.find(params[:project_id])
    notes = project.notes
    render json: notes
    end 
    
    def create 
       note = Note.create(note_params)
       project = Project.find(note.project_id)
       if note.save
       project.notes << note 
       
    end
end 
    
    def show
       note = Note.find(params[:id])
       render json: note 
    end 
end 

private 

    def note_params 
        params.require(:note).permit(:project_id, :content)
    end 