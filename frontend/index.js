console.log("I am in index.js")

// const canvas = new fabric.Canvas('canvas',{
// width: 500,
// height: 500,
// // backgroundColor: 'blue'
// });

const link = 'https://media.pitchfork.com/photos/5c7d4c1b4101df3df85c41e5/1:1/w_320/Dababy_BabyOnBaby.jpg'

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

const togglePan = () => {
    if (currentMode == modes.pan) {
        currentMode = ' '
    } else {
        currentMode = modes.pan
    }
}

const canvas = initCanvas("canvas");
let mousePressed = false; 

let currentMode;
const modes = {
    pan: 'pan'
}

setBackground(link, canvas);

canvas.on('mouse:move', (event) => {
    // console.log(event)
    if (mousePressed && currentMode === modes.pan) {
    canvas.setCursor('grab')
    canvas.renderAll()
    const mEvent = event.e; 
    //what's this .e? 
    //passing movement x and movement y into fabric constructor 
    const delta = new fabric.Point(mEvent.movementX, mEvent.movementY) 
    canvas.relativePan(delta)
    }
})

canvas.on('mouse:down', (event) => {
    // console.log(event)
    mousePressed = true;
    if (currentMode === modes.pan)
    canvas.setCursor('crosshair')
    canvas.renderAll()
})

canvas.on('mouse:up', (event) => {
     mousePressed = false;
     canvas.setCursor('default')
     canvas.renderAll()
})
