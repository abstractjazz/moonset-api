console.log("I am in index.js")

// const canvas = new fabric.Canvas('canvas',{
// width: 500,
// height: 500,
// // backgroundColor: 'blue'
// });




const link = 'https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg'
const toggleBtn = document.getElementById('toggle-pan')
const drawingBtn = document.getElementById('toggle-drawing')
const btnFocus = (element, bgColor) => {
    element.style.backgroundColor = bgColor
}

const initCanvas = (id) => {
return new fabric.Canvas(id, {
    width: 500,
    height: 500,
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
        btnFocus(toggleBtn, '');
        if(currentMode === modes.pan) {
        currentMode = ' '
        } else {
        currentMode = modes.pan
        btnFocus(toggleBtn, '#a0a0ba');
        }

    } else if (mode === modes.drawing) {
        btnFocus(drawingBtn, '#a0a0ba')
        if (currentMode === modes.drawing) {
        currentMode = ' '
        canvas.isDrawingMode = true
        canvas.renderAll()
        } else {
            currentMode = modes.drawing
        }
    }
}

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
            btnFocus(drawingBtn, '')
            canvas.isDrawingMode = false
            canvas.renderAll()
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

const canvas = initCanvas("canvas");
let mousePressed = false; 

let currentMode;
const modes = {
    pan:'pan',
    drawing: 'drawing'
}

setBackground(link, canvas)
setPanEvents(canvas)

   

function fetchUsers() {
    return fetch("http://localhost:3000/users/2")
    .then(resp => resp.json())
    .then(json =>renderUsers(json))
}

    function renderUsers(user) {
        const body = document.querySelector('body');
        const h2 = document.createElement('h2')
        h2.innerHTML = user.name
        body.appendChild(h2)
        h2.innerHTML="cool!"
        console.log(user.name)
    }

    document.addEventListener('click', function() {
    fetchUsers()
})
    


