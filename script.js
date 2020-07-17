let canvas = document.getElementById('blinkCanvas')
canvas.style.border = '3px solid black'

let ctx = canvas.getContext('2d')

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function drawEye(startX, startY, eyeColor) {
    ctx.strokeStyle = eyeColor;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY+50, startX+100, startY);
    ctx.quadraticCurveTo(startX+50, startY-50, startX, startY);
    ctx.stroke(); 
    ctx.fillStyle = eyeColor;
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.arc(startX+50, startY, 23, 0, Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'black';
    ctx.arc(startX+50, startY, 12, 0, Math.PI*2);
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.fill();
}

function drawClosedEye(startX, startY) {
    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY+50, startX+100, startY);
    ctx.stroke();
    ctx.lineWidth = 1;
    ctx.quadraticCurveTo(startX+50, startY-50, startX, startY);
    ctx.stroke();
    ctx.quadraticCurveTo(startX+50, startY+35, startX+100, startY);
    ctx.stroke();
}


// shuffle items in array randomly
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
}


// define eye colours
let eyeColors = ['pink', 'blue', 'orange', 'purple', 'turquoise', 'coral', 'palegreen', 'gold'];

let eyes = [];



// create array of 16 objects of class Eye, two each of the 8 colours
function createEyes() {
    let i = 0;
    let j = 0;
    let color;
    for (i = 0; i < 8; i++) {
        color = eyeColors[i];
        for (j = 0; j < 2; j++) {
            let eye = new Eye(color);
            eyes.push(eye);
        }
    }
    shuffle(eyes);
    return eyes;
}

createEyes();

// rearrange array into matrix
function arrangeIntoMatrix(arr) {
    let row0 = arr.splice(0, 4);
    let row1 = arr.splice(0, 4);
    let row2 = arr.splice(0, 4);
    let row3 = arr.splice(0, 4);
    return [row0, row1, row2, row3];
}


let eyesMatrix = arrangeIntoMatrix(eyes);


// place eyes on board
function fillBoard () {
    let x = 50;
    let y = 175;
    let i; 
    let j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let eye = eyesMatrix[i][j];
            drawEye(x, y, eyesMatrix[i][j].color);
            x += 125;
        }
        x = 50;
        y += 100;
    }
}


fillBoard();




// check which row and column was clicked
function checkClickPosition(mouseX, mouseY) {
    let row;
    let column;

    if (mouseX >= 50 && mouseX <= 150) {
        column = 0;
;    }
    else if (mouseX >= 175 && mouseX <= 275) {
        column = 1;
    }
    else if (mouseX >= 300 && mouseX <= 400) {
        column = 2;
    }
    else if (mouseX >= 425 && mouseX <= 525) {
        column = 3;
    }

    else {
        return null;
    }
    
    if (mouseY >= 150 && mouseY <= 200) {
        row = 0;
;    }
    else if (mouseY >= 250 && mouseY <= 300) {
        row = 1;
    }
    else if (mouseY >= 350 && mouseY <= 400) {
        row = 2;
    }
    else if (mouseY >= 450 && mouseY <= 500) {
        row = 3;
    }

    else {
        return null;
    }

    return [row, column];
}


let firstEye;
let secondEye;

canvas.addEventListener ('click', function(event){
    let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    let canvasTop = canvas.offsetTop + canvas.clientTop;
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;
  
    let matrixPosition = checkClickPosition(x, y);

    
    if (matrixPosition != null) {
        
        canvas.classList.toggle('move-started');
        
        let matrixRow = matrixPosition[0];
        let matrixColumn = matrixPosition[1];
        

        if (canvas.classList.contains('move-started')) {
            firstEye = eyesMatrix[matrixRow][matrixColumn];
            
        }
        else {
            secondEye = eyesMatrix[matrixRow][matrixColumn];
            if (firstEye.color === secondEye.color) {
                console.log('match');
            }
        }

    }
})



