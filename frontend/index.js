console.log("I am in index.js")

const notesUrl = 'http://localhost:3000/notes'
const projectUrl = 'http://localhost:3000/projects'
const link = 'https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg'
const toggleBtn = document.getElementById('toggle-pan')
const drawingBtn = document.getElementById('toggle-drawing')


class Canvas {

    initCanvas(id) {
        return new fabric.Canvas(id, {
            width: window.innerWidth * .75,
            height: window.innerHeight,
            selection: false
            })
        }

        toggleMode(mode){

            if(mode === modes.pan) {
                if(currentMode === modes.pan) {
                currentMode = ' '
                } else {
                currentMode = modes.pan
                workspace.isDrawingMode = false
                workspace.renderAll()
                }
        
            } else if (mode === modes.drawing) {
                if (currentMode === modes.drawing) {
                currentMode = ' '
                workspace.isDrawingMode = false
                workspace.renderAll()
                } else {
                    currentMode = modes.drawing
                    workspace.freeDrawingBrush.color = color 
                    workspace.freeDrawingBrush.width = 18
                    workspace.isDrawingMode = true
                    workspace.renderAll()
                }
            }
            
        }

        deleteItem(){
            const thing = workspace.getActiveObject()
            workspace.remove(thing)
            workspace.renderAll()
            }

            setPanEvents(canvas){

                canvas.on('mouse:move', (event) => {
                    if (mousePressed && currentMode === modes.pan) {
                    canvas.setCursor('grab')
                    canvas.renderAll()
                    const mEvent = event.e; 
                    const movement = new fabric.Point(mEvent.movementX, mEvent.movementY) 
                    canvas.relativePan(movement)
                    } else if (mousePressed && currentMode === modes.drawing) {
                      
                    }
                   
                })
                
                canvas.on('mouse:down', (event) => {
                    mousePressed = true
                    if (currentMode === modes.pan)
                    canvas.setCursor('crosshair')
                    canvas.renderAll()
                })
                
                canvas.on('mouse:up', (event) => {
                     mousePressed = false;
                     canvas.setCursor('default')
                     canvas.renderAll()
                })
                
            }

            setColor(){
                const picker = document.getElementById('colorPicker')
                picker.addEventListener('change', (event) => {
                    color = event.target.value
                    workspace.freeDrawingBrush.color = color 
                    workspace.renderAll()
                })
            
            }

            imgAdded(e){
                const img = document.getElementById("imgUpload")
                const file = img.files[0];
                reader.readAsDataURL(file);
            }
        }


class Project {

    getProjects(){
        fetch(projectUrl).then(response=>response.json()).then(resp => {this.projectList(resp)})
    }


   projectList(projects){
        let projectDropDown = projects.map(proj => {
            return `<option value="${proj.id}">${proj.title}</option>`
        }).join('')
        document.getElementById('project-list').innerHTML = projectDropDown
    }


    getProject(){
        let id = document.getElementById('project-select').value
        fetch(`${projectUrl}/${id}`)
        .then(res=>res.json())
        .then(data => workspace.loadFromJSON(data.canvas))
        workspace.renderAll();
        note.loadProjectNotes();
        const oldComments = document.querySelector('div.comments');
        oldComments.innerText=" ";
        
        let opts = document.getElementById('project-select')
        document.getElementById('project-title').value = opts.options[opts.selectedIndex].text
       }




    postProject(){
    
        let title = document.getElementById('project-title')
        let config = {
            method: 'POST', 
            body: JSON.stringify({
                canvas: JSON.stringify(workspace),
                title: title.value}),
                headers: {
                  'Content-Type':   'application/json',
                   'Accept': 'application/json'
                  }
                };
    
            fetch(projectUrl, config)
            .then(resp=>resp.json())
            .then(data=>alert(data.message))
            project.getSavedProject();
            }


            getSavedProject(){
                let id = project.getProjects().length 
                fetch(`${projectUrl}/${parseInt(id)}`)
                .then(res=>res.json())
                .then(data=>workspace.loadFromJSON(data.canvas))
                workspace.requestrenderAll();
                // note.loadProjectNotes();
                // const oldComments = document.querySelector('div.comments');
                // oldComments.innerText=" ";
                    }


            projectSelectListener() {
                document.getElementById('project-select').addEventListener('click', function(event) {
                event.preventDefault();
                project.getProject();

                })
            }

            projectSubmit() {
               document.getElementById("project-submit").addEventListener("click", function(event){
                event.preventDefault();
                project.postProject();
                })
            
            }

}

class Note { 

   loadProjectNotes(){
        const createP = (comments) => {
        let p = document.createElement('p')
        div.append(p)
        p.innerText = comments 
        }
        const div = document.querySelector('div.comments')
        let id = document.getElementById('project-select').value
         fetch(`${projectUrl}/${id}/notes`)
        .then(res=>res.json())
        .then(data=>data.map(comments=>comments.content))
        .then(info=>info.forEach(element=>createP(element)))
    }

    postNote(){
    
        let note = document.getElementById('note');
        const form = document.querySelector('form.notes')
        const projectId = document.getElementById('project-select').value
        const div = document.querySelector('div.comments')
        let config = {
            method: 'POST', 
            body: JSON.stringify({
                project_id: projectId,
                content: note.value}),
                headers: {
                  'Content-Type':   'application/json',
                   'Accept': 'application/json'
                  }
                };
    
            fetch(notesUrl, config)
            .then(resp=>resp.json())
            
           let p = document.createElement('p');
            p.style.color = "white";
            p.innerText = note.value;
            div.append(p);
            note.value = " "
        }

        noteListener() {
         document.querySelector('div#notes input#submit').addEventListener('click', function(event) {
            event.preventDefault();
            note.postNote();
                }
    
         )}
}


const canvas = new Canvas();
const workspace = canvas.initCanvas("canvas");
const text = new fabric.Text("Upload an image to get started, or choose a new project from the list above. Then feel free to delete me 🙃", {fill: 'pink', fontSize: 20, fontFamily: 'helvetica'});  
workspace.add(text)
let mousePressed = false; 
let color ='#ff1493';
let currentMode;


const modes = {
    pan:'pan',
    drawing: 'drawing'
}

const toggleMode = canvas.toggleMode; 
const deleteItem = canvas.deleteItem;
const reader = new FileReader()
canvas.setPanEvents(workspace)
canvas.setColor()
const img = document.getElementById('imgUpload')
img.addEventListener('change', canvas.imgAdded)
reader.addEventListener("load", ()=> { 
    fabric.Image.fromURL(reader.result, img => {
        workspace.add(img)
        workspace.requestRenderAll()
    })
})

const project = new Project();
project.getProjects();
project.projectSelectListener();
project.projectSubmit();

const note = new Note();
note.noteListener();




