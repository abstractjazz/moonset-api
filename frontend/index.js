console.log("I am in index.js")

const notesUrl = 'http://localhost:3000/notes'
const projectUrl = 'http://localhost:3000/projects'
const link = 'https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg'
const toggleBtn = document.getElementById('toggle-pan')
const drawingBtn = document.getElementById('toggle-drawing')
const btnFocus = (element, bgColor) => {
    element.style.backgroundColor = bgColor
}

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
                canvas.isDrawingMode = false
                canvas.renderAll()
                }
        
            } else if (mode === modes.drawing) {
                if (currentMode === modes.drawing) {
                currentMode = ' '
                canvas.isDrawingMode = false
                canvas.renderAll()
                } else {
                    currentMode = modes.drawing
                    canvas.freeDrawingBrush.color = color 
                    canvas.freeDrawingBrush.width = 18
                    canvas.isDrawingMode = true
                    canvas.renderAll()
                }
            }
            
        }

        deleteItem(){
            const thing = canvas.getActiveObject()
            canvas.remove(thing)
            canvas.renderAll()
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
                    canvas.freeDrawingBrush.color = color 
                    canvas.renderAll()
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
        fetch(projectUrl).then(response=>response.json()).then(resp => {projectList(resp)})
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
        .then(data => canvas.loadFromJSON(data.canvas))
        canvas.renderAll();
        loadProjectNotes();
        oldComments = document.querySelector('div.comments')
        oldComments.innerText=" ";
       }


    postProject(){
    
        let title = document.getElementById('project-title');
        let config = {
            method: 'POST', 
            body: JSON.stringify({
                canvas: JSON.stringify(canvas),
                title: title.value}),
                headers: {
                  'Content-Type':   'application/json',
                   'Accept': 'application/json'
                  }
                };
    
            fetch(projectUrl, config)
            .then(resp=>resp.json())
            .then(data=>alert(data.message))
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
    


}


const canvas = initCanvas("canvas");
const text = new fabric.Text("Upload an image to get started. Then feel free to delete me 🙃", {fill: "pink", fontSize: 20, fontFamily: 'helvetica'});  
canvas.add(text)
let mousePressed = false; 
let color ='#ff1493';


let currentMode;

const modes = {
    pan:'pan',
    drawing: 'drawing'
}

const reader = new FileReader()


setPanEvents(canvas)
setColor()
const img = document.getElementById('imgUpload')
img.addEventListener('change', imgAdded)

reader.addEventListener("load", ()=> { 
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img)
        canvas.requestRenderAll()
    })
})





getProjects();









document.querySelector('div#notes input#submit').addEventListener('click', function(event) {
    event.preventDefault();
   postNote();
})


document.getElementById('project-select').addEventListener('click', function(event) {
    event.preventDefault();
    getProject();
})







document.getElementById("project-submit").addEventListener("click", function(event){
    event.preventDefault();
    postProject();
})




