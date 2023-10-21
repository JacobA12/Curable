const scoreDisplayElement = document.getElementById("scoreNum");
const bestScoreDisplayElement = document.getElementById("bestScoreNum");
const levelNumDisplayElement = document.getElementById("levelNum");
let snake;
let obstacles = [];
let currentLevel = 4;
let scl = 20;

// Add as many as you want
let food;
let victorySound;
let victorySound2;
let tryAgainSound;
let tryAgainSound2;
let moveSound;

function preload() {
  victorySound = loadSound("assets/victorySound.wav");
  victorySound2 = loadSound("assets/victorySound2.wav");
  tryAgainSound = loadSound("assets/tryAgainSound.wav");
  tryAgainSound2 = loadSound("assets/tryAgainSound2.wav");
  moveSound = loadSound("assets/move.mp3");
}

function setup() {
  soundFormats("mp3", "ogg", "wav");
  createCanvas(600, 600);
  s = new Snake();
  drawLevel();
  nextLevel();

  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);
  let foodX, foodY;

  do {
    foodX = floor(random(cols));
    foodY = floor(random(rows));
  } while (!isPositionFree(foodX * scl, foodY * scl));

  food = createVector(foodX, foodY);
  food.mult(scl);
}

function draw() {
  background("green");

  if (s.eat(food)) {
    pickLocation();
    victorySound2.play();
  }
  s.death();
  s.update();
  s.show();
  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

  for (let obstacle of obstacles) {
    obstacle.show();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    if (s.yspeed != -1) {
      moveSound.play();
    }
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    if (s.yspeed != 1) {
      moveSound.play();
    }
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    if (s.xspeed != 1) {
      moveSound.play();
    }
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    if (s.xspeed != -1) {
      //will not play sound twice if already going that direction
      moveSound.play();
    }
    s.dir(-1, 0);
  }
}

function nextLevel() {
  if (scoreDisplayElement.innerText >= 15 && !(currentLevel >= 2)) {
    currentLevel = 2;
    obstacles = [];
    drawLevel();
  } else if (scoreDisplayElement.innerText >= 20 && !(currentLevel >= 3)) {
    currentLevel = 3;
    obstacles = [];
    drawLevel();
  } else if (scoreDisplayElement.innerText >= 25 && !(currentLevel === 4)) {
    currentLevel = 4;
    obstacles = [];
    drawLevel();
  } else if (!(currentLevel > 1)) {
    currentLevel = 1;
    drawLevel();
  }
  levelNumDisplayElement.innerText = currentLevel;
}

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
