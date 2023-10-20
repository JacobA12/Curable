const scoreDisplayElement = document.getElementById("scoreNum");
const bestScoreDisplayElement = document.getElementById("bestScoreNum");
let snake;
let scl = 20;

let food;
let victorySound;
let victorySound2;
let tryAgainSound;
let tryAgainSound2;
function preload() {
  victorySound = loadSound("assets/victorySound.wav");
  victorySound2 = loadSound("assets/victorySound2.wav");
  tryAgainSound = loadSound("assets/tryAgainSound.wav");
  tryAgainSound2 = loadSound("assets/tryAgainSound2.wav");
}

function setup() {
  soundFormats("mp3", "ogg", "wav");
  createCanvas(600, 600);
  s = new Snake();
  frameRate(10);
  pickLocation();
}

function pickLocation() {
  let cols = floor(width / scl);
  let rows = floor(height / scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function mousePressed() {
  s.total++;
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
}

function keyPressed() {
  if (keyCode === UP_ARROW || keyCode === 87) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW || keyCode === 65) {
    s.dir(-1, 0);
  }
}
