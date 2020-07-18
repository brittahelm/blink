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

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY+50, startX+100, startY);
    ctx.lineTo(startX+100, startY-27);
    ctx.lineTo(startX, startY-27);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY+50, startX+100, startY);
    ctx.stroke();
}


function drawQuarterOpenEye(startX, startY) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY+25, startX+100, startY);
    ctx.lineTo(startX+100, startY-27);
    ctx.lineTo(startX, startY-27);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY+25, startX+100, startY);
    ctx.stroke();
}


function drawHalfOpenEye(startX, startY) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX+100, startY);
    ctx.lineTo(startX+100, startY-27);
    ctx.lineTo(startX, startY-27);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.lineTo(startX+100, startY);
    ctx.stroke();
}


function drawThreeQuarterOpenEye(startX, startY) {
    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY-25, startX+100, startY);
    ctx.lineTo(startX+100, startY-27);
    ctx.lineTo(startX, startY-27);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, startY-25, startX+100, startY);
    ctx.stroke();
}


function closeEye(startX, startY) {
    let i = 0;
    let intervalID = setInterval(frame, 1000);
    function frame() {
      if (i === 3) {
        clearInterval(intervalID);
      } else {
        drawClosedEye(startX, startY);
        i++;
      }
    }
  } 




//  function closeEye(startX, startY) {
//     drawClosedEye(startX, startY);
// }




let moves = 0;


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
            eye.x = 50+(125*j);
            eye.y = 175+(100*i);
            drawEye(x, y, eye.color);
            drawClosedEye(x, y);
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


function checkIfWon() {
    let won = true;
    let i; 
    let j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let eye = eyesMatrix[i][j];
            if (eyesMatrix[i][j].found === false) {
                won = false;
            }
        }
    }
    return won;
}




let firstEye = eyesMatrix[0][0];
let secondEye = eyesMatrix[0][0];

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
            drawEye(firstEye.x, firstEye.y, firstEye.color);
            moves ++;
        }
        else {
            secondEye = eyesMatrix[matrixRow][matrixColumn];
            drawEye(secondEye.x, secondEye.y, secondEye.color);
            if (firstEye.color === secondEye.color && firstEye != secondEye) {
                console.log('match');
                firstEye.found = true;
                secondEye.found = true;
                console.log(firstEye);
                console.log(secondEye);
                if (checkIfWon() === true) {
                    console.log('you have won!');
                };
            }
            else {
                closeEye(firstEye.x, firstEye.y);
                closeEye(secondEye.x, secondEye.y);
            }
        }
    }
    ctx.beginPath();
    ctx.clearRect(50, 525, 150, 100);
    ctx.fillStyle = 'white';
    ctx.font = "25px Lucida Console";
    ctx.beginPath();
    ctx.fillText(`moves: ${moves}`, 50, 550);
})



