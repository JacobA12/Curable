//to edit HTML elements in JS
const scoreDisplayElement = document.getElementById("scoreNum");
const bestScoreDisplayElement = document.getElementById("bestScoreNum");
const levelNumDisplayElement = document.getElementById("levelNum");

//var declaration
let obstacles = [];
let currentLevel = 1;
let scl = 20;
let food;
let pause = false;
let homeButton;
let resetButton;

//sound declaration
let victorySound;
let victorySound2;
let tryAgainSound;
let tryAgainSound2;
let moveSound;
let backgroundMusic;
let lego;

function preload() {
  victorySound = loadSound("../assets/victorySound.wav");
  victorySound2 = loadSound("../assets/victorySound2.wav");
  tryAgainSound = loadSound("../assets/tryAgainSound.wav");
  tryAgainSound2 = loadSound("../assets/tryAgainSound2.wav");
  moveSound = loadSound("../assets/move.mp3");
  backgroundMusic = loadSound("../assets/jacob_game_lol.wav");
  lego = loadSound("../assets/lego.mp3");
}

function setup() {
  soundFormats("mp3", "ogg", "wav");
  lego.play();
  backgroundMusic.loop();
  createCanvas(600, 600);
  s = new Snake();
  drawLevel();
  nextLevel();
  frameRate(10);
  pickLocation();

  homeButton = createButton("Home");
  homeButton.id("myButton");
  homeButton.class("home");
  homeButton.style("background-color", color(254, 245, 218));
  homeButton.style("font-family", "Palatino");
  homeButton.position(0, 0);
  homeButton.mousePressed(() => {
    window.location.href = "../index.html";
  });

  resetButton = createButton("Reset Food");
  resetButton.id("myButton");
  resetButton.class("reset");
  resetButton.style("font-family", "Palatino");
  resetButton.position(0, 75);

  resetButton.mousePressed(() => {
    pickLocation();
  });
}

function pickLocation() {
  //creating a grid of cells
  let cols = floor(width / scl); //calculates number of columns
  let rows = floor(height / scl); //calculates number of rows
  let foodX, foodY;

  //will search for for a spot for the food until a free position is found (not blocked by a wall)
  do {
    foodX = floor(random(cols));
    foodY = floor(random(rows));
  } while (!isPositionFree(foodX * scl, foodY * scl));

  food = createVector(foodX, foodY);
  food.mult(scl); //used for vector multiplication to a scalar
}

function draw() {
  background("green");
  //checks all states
  if (s.eat(food)) {
    pickLocation();
    victorySound2.play();
  }
  s.death();
  s.update();
  directionChanged = false;
  s.show();
  fill(255, 0, 100);
  //draws food
  rect(food.x, food.y, scl, scl);

  //draws obstacles
  for (let obstacle of obstacles) {
    obstacle.show();
  }
}

//controls
let directionChanged = false;
function keyPressed() {
  if (directionChanged) {
    return;
  }
  if (keyCode === UP_ARROW || keyCode === 87) {
    if (s.yspeed != -1 && s.yspeed != 1) {
      moveSound.play();
    }
    s.dir(0, -1);
    directionChanged = true;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    if (s.yspeed != 1 && s.yspeed != -1) {
      moveSound.play();
    }
    s.dir(0, 1);
    directionChanged = true;
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    if (s.xspeed != 1 && s.xspeed != -1) {
      moveSound.play();
    }
    s.dir(1, 0);
    directionChanged = true;
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    if (s.xspeed != -1 && s.xspeed != 1) {
      //will not play sound twice if already going that direction
      moveSound.play();
    }
    s.dir(-1, 0);
    directionChanged = true;
  }
}

//checks score to requirements
function nextLevel() {
  if (scoreDisplayElement.innerText >= 3 && !(currentLevel >= 2)) {
    currentLevel = 2;
    obstacles = [];
    drawLevel();
  } else if (scoreDisplayElement.innerText >= 3 && !(currentLevel >= 3)) {
    currentLevel = 3;
    obstacles = [];
    drawLevel();
  } else if (scoreDisplayElement.innerText >= 3 && !(currentLevel >= 4)) {
    currentLevel = 4;
    obstacles = [];
    drawLevel();
  } else if (scoreDisplayElement.innerText >= 3 && !(currentLevel >= 5)) {
    currentLevel = 5;
    obstacles = [];
    drawWinningScreen();
  } else if (!(currentLevel > 1)) {
    currentLevel = 1;
    drawLevel();
  }
  levelNumDisplayElement.innerText = currentLevel;
}

//used magical numbers for the for loops until I created levels that I liked
function drawLevel() {
  if (currentLevel === 1) {
    for (let index = 0; index < 10; index++) {
      obstacles.push(new Obstacle(200 - 20 * index, 200));
      obstacles.push(new Obstacle(300 - 20 * index, 100));
      obstacles.push(new Obstacle(200 - 20 * index, 500));
      obstacles.push(new Obstacle(400, 200 + 15 * index));
    }
  } else if (currentLevel === 2) {
    for (let index = 0; index < 23; index++) {
      obstacles.push(new Obstacle(460 - 20 * index, 100));
      obstacles.push(new Obstacle(480, 200 + 20 * index));
      obstacles.push(new Obstacle(160 - 20 * index, 340));
      obstacles.push(new Obstacle(300, 340 + 20 * (index % 10)));
    }
  } else if (currentLevel === 3) {
    for (let index = 0; index < 28; index++) {
      obstacles.push(new Obstacle(560 - 20 * index, 560));
      obstacles.push(new Obstacle(20, 20 + 20 * (index % 25)));
      obstacles.push(new Obstacle(200, 200 + (20 % index)));
      obstacles.push(new Obstacle(200, 280 + (20 % index)));
      obstacles.push(new Obstacle(200, 360 + (20 % index)));
      obstacles.push(new Obstacle(300, 200 + (20 % index)));
      obstacles.push(new Obstacle(300, 280 + (20 % index)));
      obstacles.push(new Obstacle(300, 360 + (20 % index)));
      obstacles.push(new Obstacle(400, 200 + (20 % index)));
      obstacles.push(new Obstacle(400, 280 + (20 % index)));
      obstacles.push(new Obstacle(400, 360 + (20 % index)));
      obstacles.push(new Obstacle(560, 20 + 20 * (index % 25)));
    }
  } else if (currentLevel === 4) {
    for (let index = 0; index < 28; index++) {
      obstacles.push(new Obstacle(560 - 20 * index, 560));
      obstacles.push(new Obstacle(20, 20 + 20 * (index % 25)));
      obstacles.push(new Obstacle(200, 140 + (20 % index)));
      obstacles.push(new Obstacle(200, 240 + (20 % index)));
      obstacles.push(new Obstacle(200, 340 + (20 % index)));
      obstacles.push(new Obstacle(300, 140 + (20 % index)));
      obstacles.push(new Obstacle(300, 240 + (20 % index)));
      obstacles.push(new Obstacle(300, 340 + (20 % index)));
      obstacles.push(new Obstacle(400, 140 + (20 % index)));
      obstacles.push(new Obstacle(400, 240 + (20 % index)));
      obstacles.push(new Obstacle(400, 340 + (20 % index)));
      obstacles.push(new Obstacle(560, 20 + 20 * (index % 25)));
    }
    for (let index = 0; index < 20; index++) {
      obstacles.push(new Obstacle(80, 60 + 20 * index));
      obstacles.push(new Obstacle(500, 60 + 20 * index));
      obstacles.push(new Obstacle(480 - 20 * index, 20));
      obstacles.push(new Obstacle(480 - 20 * index, 480));
    }
  }
}
function isPositionFree(x, y) {
  for (let obstacle of obstacles) {
    //compares the positions of the obsatcle to the given x and y. Returning true if it is free.
    if (
      x < obstacle.x + scl &&
      x + scl > obstacle.x &&
      y < obstacle.y + scl &&
      y + scl > obstacle.y
    ) {
      return false;
    }
  }
  return true;
}
function drawWinningScreen() {
  fill("black");
  rect(0, 0, width, height);
  fill("green");
  textSize(48);
  textStyle(BOLD);
  text("Winner!", 200, 300);
  noLoop();
}

function mousePressed(){ //bei click Pause, bei 2. click weiter
  if(pause==false){
    noLoop();
    pause=true;
  }else{
    loop();
    pause = false;
  }
}