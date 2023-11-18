let targetShape;
let score = 0;
let currentLevel = 1;
let isTracing = false;
let threshold = 10;

// Triangle vertices
let v1;
let v2;
let v3;

function setup() {
  createCanvas(600, 600);
  v1 = createVector(300, 50);
  v2 = createVector(100, 500);
  v3 = createVector(500, 500);
  targetShape = createShape();
}

function draw() {
  background("gray");
  touchMoved();

  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  createShape(targetShape);
  if (touches.length > 0) {
    stroke(2);
    fill("gray");
    ellipse(touches[0].x, touches[0].y, 40, 40, 45);
  }
}

function touchStarted() {
  userPath = [];
  isTracing = true;

  return false;
}

function touchMoved() {
  fill("red");
  stroke(40);
  if (touches.length > 0) {
    let point = createVector(touches[0].x, touches[0].y);
    drawnLine = line(touches[0].x, touches[0].y, pmouseX, pmouseY);
  }
}

function touchEnded() {
  isTracing = false;
}

function createShape() {
  if (currentLevel === 1) {
    triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
  }
}
