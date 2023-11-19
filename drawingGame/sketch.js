let targetShape;
let score = 0;
let currentLevel = 3;
let isTracing = false;
let threshold = 10;
let touchPos;
let homeButton;
let timer = 0;
let timeAddition = 1 / 60;
let pause;
let mute = false;

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
  if (!mute) {
    lego.play();
  }
  v1 = createVector(300, 50);
  v2 = createVector(100, 500);
  v3 = createVector(500, 500);

  q1 = createVector(170, 115);
  q2 = createVector(380, 190);
  q3 = createVector(450, 400);
  q4 = createVector(100, 400);

  p1 = createVector(300, 50);
  p2 = createVector(450, 250);
  p4 = createVector(150, 250);
  p3 = createVector(300, 550);
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

  pauseButton = createButton("Pause");
  pauseButton.id("myButton");
  pauseButton.class("pause");
  pauseButton.style("background-color", color(254, 245, 218));
  pauseButton.style("font-family", "Palatino");
  pauseButton.position(0, 75);
  pauseButton.touchStarted(() => {
    if (pause == false) {
      noLoop();
      pause = true;
    } else {
      loop();
      pause = false;
    }
  });

  muteButton = createButton("MUTE");
  muteButton.id("myButton");
  muteButton.class("pause");
  muteButton.style("background-color", color(254, 245, 218));
  muteButton.style("font-family", "Palatino");
  muteButton.position(0, 150);

  muteButton.touchStarted(() => {
    if (mute) {
      mute = false;
      muteButton.style("background-color", color(254, 245, 218));
    } else {
      mute = true;
      muteButton.style("background-color", color("red"));
    }
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

  if (pause) {
    strokeWeight(0);
    fill(255, 0, 0);
    textSize(60);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text("PAUSED", width / 2, height / 2);
  }
}

function touchStarted() {
  isTracing = true;
  return false;
}

function touchMoved() {
  if (touches.length > 0) {
    line(touches[0].x, touches[0].y, pmouseX, pmouseY);
  }
}

function touchEnded() {
  backgroundMusic.pause();
}

function createShape(currentLevel) {
  switch (currentLevel) {
    case 1:
      triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
      break;
    case 2:
      quad(q1.x, q1.y, q2.x, q2.y, q3.x, q3.y, q4.x, q4.y);
      break;
    case 3:
      quad(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, p4.x, p4.y);
      break;
    default:
      break;
  }
}

function calculateScore() {
  touchPos = getTouchPosition();
  let d1;
  let d2;
  let d3;
  let d4 = 11;
  if (currentLevel === 1) {
    d1 = distToSegment(touchPos, v1, v2);
    d2 = distToSegment(touchPos, v2, v3);
    d3 = distToSegment(touchPos, v3, v1);
  } else if (currentLevel === 2) {
    d1 = distToSegment(touchPos, q1, q2);
    d2 = distToSegment(touchPos, q2, q3);
    d3 = distToSegment(touchPos, q3, q4);
    d4 = distToSegment(touchPos, q4, q1);
  } else if (currentLevel === 3) {
    d1 = distToSegment(touchPos, p1, p2);
    d2 = distToSegment(touchPos, p2, p3);
    d3 = distToSegment(touchPos, p3, p4);
    d4 = distToSegment(touchPos, p4, p1);
  }

  // Check if the touch is on the outline
  if (d1 <= 10 || d2 <= 10 || d3 <= 10 || d4 <= 10) {
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
    if (!backgroundMusic.isPlaying() && !mute) {
      backgroundMusic.play();
    }
  } else {
    background("red");
    if (!offTrack.isPlaying() && backgroundMusic.isPlaying() && !mute) {
      backgroundMusic.pause();
      offTrack.play();
    } else if (!offTrack.isPlaying() && !mute) {
      offTrack.play();
    }
  }
}
