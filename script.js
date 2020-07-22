let body = document.querySelector('body');
let eyeLogo = document.querySelector('#eye-logo');
let startScreen = document.querySelector('.splash-screen');

let moves = 0;

let canvas = document.createElement('canvas');
canvas.width = "575";
canvas.height = "600";

let firstEye;
let secondEye;

let preventClick = [];

for (let i=0; i< 4; i++){
    preventClick[i] = []
   for (let j=0; j < 4; j++){
     preventClick[i][j] = false
  }
}

let soundOn = true;

let backgroundMusic = new Audio();
backgroundMusic.loop = "true";
let clickSound = new Audio("click.mp3");
clickSound.volume = 0.1;



// make sure click is only played when sound is turned on
function playClickSound() {
    if (soundOn === true) {
        clickSound.play();
    }
}

// start game
eyeLogo.addEventListener('click', function(event){
    clickSound.play();
    setTimeout(startGame, 500);
      function startGame() {
        body.removeChild(startScreen);
        body.appendChild(canvas);
        bringInEyes();
        fillBoard();
        backgroundMusic.src = "snowflake.mp3";
        backgroundMusic.play();
      }
});

// create context, fill canvas in black
let ctx = canvas.getContext('2d');


//add responsiveness for mobile version
let mql = window.matchMedia('(max-width: 600px)');
if (mql.matches) {
    canvas.width = canvas.width*0.60;
    canvas.height = canvas.height*0.60;
    ctx.scale(0.60, 0.60);
}


ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


// show number of moves on screen
function displayMoves() {
    ctx.beginPath();
    ctx.clearRect(50, 525, 150, 100);
    ctx.fillStyle = 'white';
    ctx.font = "20px Montserrat";
    if (mql.matches) {
        ctx.font = "25px Montserrat";
    }
    ctx.beginPath();
    ctx.fillText(`moves: ${moves}`, 50, 550);
}

// show sound switch on screen
function displaySoundSwitch(state) {
    ctx.beginPath();
    if (mql.matches) {
        ctx.clearRect(400, 525, 150, 100);
        ctx.fillStyle = 'white';
        ctx.font = "25px Montserrat";
        ctx.beginPath();
        ctx.fillText(`sound ${state}`, 400, 550);
    }
    else {
        ctx.clearRect(430, 525, 150, 100);
        ctx.fillStyle = 'white';
        ctx.font = "12px Montserrat";
        ctx.beginPath();
        ctx.fillText(`turn sound ${state}`, 430, 550);
    }
}

// create sound off/on switch
function turnSoundOnOff() {
    if (soundOn === true) {
        displaySoundSwitch('on');
        backgroundMusic.pause();
        soundOn = false;
    }
    else {
        displaySoundSwitch('off');
        backgroundMusic.play();
        soundOn = true;
    }
}




// draw open eye of different colors
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


// draw closed eyelid in various stages of closedness
function drawClosedEye(startX, startY, middleY) {

    ctx.strokeStyle = 'black';
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, middleY, startX+100, startY);
    ctx.lineTo(startX+100, startY-27);
    ctx.lineTo(startX, startY-27);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.moveTo(startX, startY);
    ctx.quadraticCurveTo(startX+50, middleY, startX+100, startY);
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



/*
ANIMATIONS
*/

// animate eye from open to closed
function closeEye(startX, startY, intervalTimeout, matrixRow, matrixColumn) {
    let closingPos = checkClickPosition(startX, startY);

    let i = 0;
    let droop = startY-50;
    console.log('inside close eye');
    let intervalID = setInterval(drawNextEyeState, 5);
    function drawNextEyeState() {
      if (i === 100) {
        clearInterval(intervalID);
        clearTimeout(intervalTimeout);
        preventClick[matrixRow][matrixColumn] = false;
      } else {
        drawClosedEye(startX, startY, droop);
        i++;
        droop += 1;
      }
    }
} 

// add 1 sec delay before eye starts closing
function closeEyeSlowly(startX, startY, matrixRow, matrixColumn) {

    let closingPos = checkClickPosition(startX, startY);

    if (eyesMatrix[closingPos[0]][closingPos[1]].closing === false) {

    eyesMatrix[closingPos[0]][closingPos[1]].closing = true;

    

    console.log('inside close eye slowly');
    preventClick[matrixRow][matrixColumn] = true;
    let intervalTimeout = setTimeout(startClosingEye, 1000);
    function startClosingEye() {
        console.log('inside timeout');
        eyesMatrix[closingPos[0]][closingPos[1]].closing = false;
        preventClick[matrixRow][matrixColumn] = true;
        closeEye(startX, startY, intervalTimeout, matrixRow, matrixColumn);
    }
    }
}


// open eye
function openEye(startX, startY, color) {
    drawEye(startX, startY, color);
}


// make one closed eye after the after appear on screen
function bringInEyes() {
    
    let x = 50;
    let y = 175;
    let i = 1;

    let intervalID = setInterval(bringInLid, 50);
    function bringInLid() {
        if (i === 17) {
            clearInterval(intervalID);
        }
        else {
            drawClosedEye(x, y, y+50);
            x+= 125;
            if (i%4 === 0) {
                x = 50;
                y += 100;
            }
            i++;
        }
    }
}



// place open eyes with closed eyes on top on board
function fillBoard () {

    setTimeout(fillEyes, 800);
    function fillEyes() {
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
            drawClosedEye(x, y, y+50);
            x += 125;
        }
        x = 50;
        y += 100;
    }
    displayMoves();
    displaySoundSwitch('off');
}
}


// draw one row of eye lids
function drawRowOfLids (y) {
    let x = 50; 
    
        for (let i = 0; i<4; i++) {
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.quadraticCurveTo(x+50, y+50, x+100, y);
        ctx.stroke();
         x += 125;
     }
}

// move row of eye lids move down the screen, erasing anything above them
function dropEyes() {
    let i = 0;
    let y = 175;
    
    setTimeout(dropRows, 1500);
    function dropRows() {
    let intervalID = setInterval(dropRow, 20);
    function dropRow () {
        if (y === canvas.height) {
            clearInterval(intervalID);
        }
        else {
            ctx.clearRect(0, 0, canvas.width, y+30);
            drawRowOfLids(y);
            y += 10;
        }
    }
    }
}


// fill the board with eyes all of the same, randomly picked color
function drawUnicolorEyes() {  
    let i = 0;
    let j = 0;
    let k = 0;
    let x = 50;
    let y = 175;
    let randomColor = eyeColors[Math.floor(Math.random()*8)];

    setTimeout(drawRandomEyes, 500);
    function drawRandomEyes() {
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            drawEye(x, y, randomColor);
            x += 125;
        }
        x = 50;
        y += 100;
    }
    y += 10;
    }
}

// close all eyes on the board at the same time
function closeAllEyes() {
    let i = 0;
    let j = 0;
    let k = 0;
    let x = 50;
    let y = 175;

    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            closeEyeSlowly(x, y);
            x += 125;
        }
        x = 50;
        y += 100;
    }
    y += 10;
}

// animation to be played at the end of the game
function endAnimationEyes() {
    drawUnicolorEyes();
    closeAllEyes();
    if (!mql.matches) {
        dropEyes();
    }
}


// check which row and column was clicked
function checkClickPosition(mouseX, mouseY) {

    let row;
    let column;


    if (mouseX >=430 && mouseX <= 550 && mouseY >= 525 && mouseY <= 575) {
        turnSoundOnOff();
        return null;
    }

    if (mouseX >= 50 && mouseX <= 150) {
        column = 0;
    }
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
    }
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


// go through all eyes to see if they were found
function checkIfWon() {
    let won = true;
    let i; 
    let j;
    for (i = 0; i < 4; i++) {
        for (j = 0; j < 4; j++) {
            let eye = eyesMatrix[i][j];
            if (eye.found === false) {
                won = false;
            }
        }
    }
    return won;
}



// change from main game to game over screen
function endGame() {
    backgroundMusic.pause();
    backgroundMusic.src ="/star.mp3";
    if (soundOn === true) {
        backgroundMusic.play();
    }
    body.removeChild(canvas);
    let endScreen = document.createElement('div');
    endScreen.classList.add('game-over-screen');
    let endText = `<h2>Well played.</h2><p>You won in ${moves} moves.<br>Do you want to try again?<br><br>Click on the eye.</p>`;
    endScreen.innerHTML = endText;
    body.appendChild(endScreen);
    
    let eyeLogoEnd = document.createElement('img');
    eyeLogoEnd.src = "eye2.png";
    eyeLogoEnd.classList.add('eye-logo-end');
    endScreen.appendChild(eyeLogoEnd);

    eyeLogoEnd.addEventListener('click', function(event){
        playClickSound();

        setTimeout(startOver, 1000);
        function startOver() {
            window.location.reload(false);
      }
    });
}

// end game with slight delay after last pair was found
function endGameSlowly() {
    setTimeout(frame3, 2800);
    function frame3() {
        endGame();
    }
}


let moveStarted = false;

// click on cards, finish move after two cards, leave open if pair, close if not
canvas.addEventListener ('click', function(event){
    let canvasLeft = canvas.offsetLeft + canvas.clientLeft;
    let canvasTop = canvas.offsetTop + canvas.clientTop;
    let x = event.pageX - canvasLeft;
    let y = event.pageY - canvasTop;
  
    let matrixPosition = checkClickPosition(x, y);

    // for phones
    if (mql.matches) {
        matrixPosition = checkClickPosition(x*1.66, y*1.66);
    }

    let matrixRow;
    let matrixColumn;
    
    if (matrixPosition != null) {

        matrixRow = matrixPosition[0];
        matrixColumn = matrixPosition[1];
        console.log(preventClick);
        if (eyesMatrix[matrixRow][matrixColumn].found === false && preventClick[matrixRow][matrixColumn] === false) {
            console.log(matrixRow, matrixColumn);
            console.log(preventClick[matrixRow][matrixColumn]);
            moveStarted = !moveStarted;

            if (moveStarted) {
                firstEye = eyesMatrix[matrixRow][matrixColumn];
            
                openEye(firstEye.x, firstEye.y, firstEye.color);
                firstEye.closing = false;
                playClickSound();
                moves ++;
            }
            else if (firstEye != eyesMatrix[matrixRow][matrixColumn]) {
                secondEye = eyesMatrix[matrixRow][matrixColumn];

                openEye(secondEye.x, secondEye.y, secondEye.color);
                secondEye.closing = false;
                playClickSound();

                if (firstEye.color === secondEye.color && firstEye != secondEye) {
                    firstEye.found = true;
                    secondEye.found = true;
                    if (checkIfWon() === true) {
                        endAnimationEyes();
                        endGameSlowly();
                    };
                }
                else  {
                    closeEyeSlowly(firstEye.x, firstEye.y, matrixRow, matrixColumn);
                    closeEyeSlowly(secondEye.x, secondEye.y, matrixRow, matrixColumn);
                }
            
            }
            else {
                moveStarted = true;
            }
        }
    }

    displayMoves();
})



