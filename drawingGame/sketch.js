let targetShape;
let score = 0;
let currentLevel = 1;
let isTracing = false;
let threshold = 10;
let touchPos;
let homeButton;
let timer = 0;
let timeAddition = 1 / 60;

let backgroundMusic;
let offTrack;
let lego;

function preload() {
  offTrack = loadSound("../assets/offTrack2.wav");
  lego = loadSound("../assets/lego.mp3");
  backgroundMusic = loadSound("../assets/backgroundMusic.wav");
}

// Triangle vertices
let v1;
let v2;
let v3;

function setup() {
  createCanvas(600, 600);
  soundFormats("mp3", "ogg", "wav");
  lego.play();
  v1 = createVector(300, 50);
  v2 = createVector(100, 500);
  v3 = createVector(500, 500);
  targetShape = createShape();
  frameRate(5);

  homeButton = createButton("Home");
  homeButton.id("myButton");
  homeButton.class("home");
  homeButton.style("background-color", color(254, 245, 218));
  homeButton.style("font-family", "Palatino");
  homeButton.position(0, 0);
  homeButton.touchStarted(() => {
    window.location.href = "../index.html";
  });
}

function draw() {
  background("white");
  touchMoved();

  if (touches.length > 0) {
    stroke(2);
    fill("gray");
    ellipse(touches[0].x, touches[0].y, 40, 40, 45);
    calculateScore();
    updateBackgroundColor();
  }

  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  strokeWeight(17);
  createShape(currentLevel);
}

function touchStarted() {
  isTracing = true;
  return false;
}

function touchMoved() {
  if (touches.length > 0) {
    let point = createVector(touches[0].x, touches[0].y);
    line(touches[0].x, touches[0].y, pmouseX, pmouseY);
  }
}

function touchEnded() {
  isTracing = false;
}

function createShape(currentLevel) {
  switch (currentLevel) {
    case 1:
      triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
      break;
  
    default:
      break;
  }
}

function calculateScore() {
  touchPos = getTouchPosition();

  let d1 = distToSegment(touchPos, v1, v2);
  let d2 = distToSegment(touchPos, v2, v3);
  let d3 = distToSegment(touchPos, v3, v1);

  // Check if the touch is on the outline
  if (d1 <= 10 || d2 <= 10 || d3 <= 10) {
    console.log("Touch is on the outline");
    isTracing = true;
  } else {
    console.log("Touch is not on the outline");
    isTracing = false;
  }
}

// Function to calculate the distance from a point to a line segment
function distToSegment(p, v, w) {
  let l2 = distSq(v, w);
  if (l2 == 0) return distSq(p, v);
  let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = max(0, min(1, t));
  return sqrt(
    distSq(p, { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) })
  );
}

// Function to calculate the square of the distance between two points
function distSq(v, w) {
  return pow(v.x - w.x, 2) + pow(v.y - w.y, 2);
}

function getTouchPosition() {
  return createVector(touches[0].x, touches[0].y);
}

function updateBackgroundColor() {
  if (isTracing) {
    background("green");
    if (!backgroundMusic.isPlaying()) {
      backgroundMusic.play();
    }
  } else {
    background("red");
    if (!offTrack.isPlaying() && backgroundMusic.isPlaying()) {
      backgroundMusic.pause();
      offTrack.play();
    } else if (!offTrack.isPlaying()) {
      offTrack.play();
    }
  }
}
