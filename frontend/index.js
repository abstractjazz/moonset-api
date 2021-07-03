console.log("I am in index.js")

// const canvas = new fabric.Canvas('canvas',{
// width: 500,
// height: 500,
// // backgroundColor: 'blue'
// });

//ADD ABILITY FOR CUSTOM BACKGROUND IMAGE 
//SAVE STATE AND SUBMIT USING DIRECTION BELOW: 
//USE FABRIC'S BUILT IN TOJSON 
//https://github.com/learn-co-curriculum/fewpjs-sending-data-with-fetch/blob/solution/index.js
//ALSO CHECK HOW THEY HANDLED IN BEATMAKER 



const projectUrl = 'http://localhost:3000/projects'
const link = 'https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg'
const toggleBtn = document.getElementById('toggle-pan')
const drawingBtn = document.getElementById('toggle-drawing')
const btnFocus = (element, bgColor) => {
    element.style.backgroundColor = bgColor
}

const initCanvas = (id) => {
return new fabric.Canvas(id, {
    width: window.innerWidth,
    height: window.innerHeight,
    selection: false
    });
}

const setBackground = (url, canvas) => {
    fabric.Image.fromURL(url, (image) => {
        canvas.backgroundImage = image
        canvas.renderAll()
    })
}

const toggleMode = (mode) => {

    if(mode === modes.pan) {
        // btnFocus(toggleBtn, '')
        if(currentMode === modes.pan) {
        currentMode = ' '
        } else {
        currentMode = modes.pan
        canvas.isDrawingMode = false
        canvas.renderAll()
        // btnFocus(toggleBtn, '#a0a0ba')
        }

    } else if (mode === modes.drawing) {
        // btnFocus(drawingBtn, '#a0a0ba')
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
    // console.log(mode)
}

const deleteItem = () => {
const thing = canvas.getActiveObject()
canvas.remove(thing)
canvas.renderAll()
}

// const changeBrushToCircle = () => {
//     canvas.freeDrawingBrush = new fabric.CircleBrush(canvas)
// }

const setPanEvents = (canvas) => {

    canvas.on('mouse:move', (event) => {
        // console.log(event)
        if (mousePressed && currentMode === modes.pan) {
        canvas.setCursor('grab')
        canvas.renderAll()
        const mEvent = event.e; 
        // e is attribute of event object, the key is e, and the value is mouseover, the event 
        // console.log(event)
        //passing movement x and movement y into fabric constructor 
        const movement = new fabric.Point(mEvent.movementX, mEvent.movementY) 
        canvas.relativePan(movement)
        } else if (mousePressed && currentMode === modes.drawing) {
            // btnFocus(drawingBtn, '')
            // canvas.isDrawingMode = false
            // canvas.renderAll()
        }
        //how to delete drawing 
        //allow user to assign movement to an object
    })
    
    canvas.on('mouse:down', (event) => {
        // console.log(event)
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

const setColor = () => {
    const picker = document.getElementById('colorPicker')
    picker.addEventListener('change', (event) => {
        console.log(event.target.value)
        color = event.target.value
        canvas.freeDrawingBrush.color = color 
        canvas.renderAll()
    })

}

const imgAdded = (e) => {
    console.log(e)
    const img = document.getElementById("imgUpload")
    const file = img.files[0];
    reader.readAsDataURL(file);
}

const canvas = initCanvas("canvas");
let mousePressed = false; 
let color ='#ff1493';

let currentMode;
const modes = {
    pan:'pan',
    drawing: 'drawing'
}

const reader = new FileReader()

setBackground(link, canvas)
setPanEvents(canvas)
setColor()
const img = document.getElementById('imgUpload')
img.addEventListener('change', imgAdded)

reader.addEventListener("load", ()=> { 
    console.log(reader.result)
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img)
        canvas.requestRenderAll()
    })
})

const getProjects = () => {
fetch(projectUrl).then(response=>response.json()).then(resp => {projectList(resp)})
}

const projectList = (projects) => {
let projectDropDown = projects.map(proj => {
    return `<option value="${proj.id}">${proj.title}</option>`
}).join('')
document.getElementById('project-list').innerHTML = projectDropDown
console.log('getting projects!')
}

getProjects();


const modCanvas = new fabric.Canvas("canvas");

const getProject = () => {
    let id = document.getElementById('project-select').value
    fetch(`${projectUrl}/${id}`)
    .then(res=>res.json())
    // .then(document.open())
    .then(data => modCanvas.loadFromJSON(data.canvas))
    canvas.requestRenderAll();
   }



//    document.addEventListener('click', function() {
//     fetch(`${projectUrl}/${2}`)
//     .then(res=>res.json())
//     .then(resp=> canvasTwo.loadFromJSON(resp.canvas))
//     canvas.requestRenderAll();
    
//    })

//need to append child? 
//load from Json? 
//was using initCanvas, which seems like wrong method
//how to decipher the canvas object? back to video 


// need to find correct thing to give to initCanvas 

document.getElementById('project-select').addEventListener('click', function(event) {
    event.preventDefault();
    getProject();
    console.log(event.target)
})
 

const postProject = () => {
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
            }

    fetch(projectUrl, config)
}

//understand what's happening in this post -- 
//watch a vid in the AM

document.getElementById("submit").addEventListener("click", function(event){
    event.preventDefault();
    postProject();
})

//what's the proper action for submitting? -- FOUND IT. 
//Make a create action! 

//basic setup for posting to server. needs more work. add project_params 

// function fetchUsers() {
//     return fetch("http://localhost:3000/users/2")
//     .then(resp => resp.json())
//     .then(json =>renderUsers(json))
// }

//     function renderUsers(user) {
//         const body = document.querySelector('body');
//         const h2 = document.createElement('h2')
//         // h2.innerHTML = user.name
//         body.appendChild(h2)
//         h2.innerHTML=user.name
//         console.log(user.name)

//  }

//     // document.addEventListener('click', function() {
//     // fetchUsers()
// })
    


