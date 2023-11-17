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
  background("white");
  touchMoved();

  fill(204, 101, 192, 127);
  stroke(127, 63, 120);
  createShape(targetShape);
  if (touches.length > 0) {
    stroke(2);
    fill("gray");
    ellipse(touches[0].x, touches[0].y, 40, 40, 45);
  }

  if (!isTracing) {
    // Add this block
    score--;
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

    // Calculate the distance from the point to each line of the triangle
    let d1 = distToSegment(point, v1, v2);
    let d2 = distToSegment(point, v2, v3);
    let d3 = distToSegment(point, v3, v1);

    // If the point is close to any of the lines, the user is tracing the shape
    if (d1 < threshold || d2 < threshold || d3 < threshold) {
      isTracing = true;
    } else {
      isTracing = false;
    }
  }
}

function touchEnded() {
  calculateScore();
  isTracing = false; // Add this line
}

function calculateScore() {
  if (isTracing) {
    // The user is tracing the shape correctly, so the score remains the same
  } else {
    // The user deviated from the trace, so they lose points
    score--;
  }
  console.log(score);
}
function distToSegment(point, v, w) {
  let l2 = distSq(v, w);
  if (l2 === 0) return distSq(point, v);
  let t = ((point.x - v.x) * (w.x - v.x) + (point.y - v.y) * (w.y - v.y)) / l2;
  t = max(0, min(1, t));
  return sqrt(
    distSq(point, createVector(v.x + t * (w.x - v.x), v.y + t * (w.y - v.y)))
  );
}
function distSq(v, w) {
  return pow(v.x - w.x, 2) + pow(v.y - w.y, 2);
}

function createShape() {
  if (currentLevel === 1) {
    triangle(v1.x, v1.y, v2.x, v2.y, v3.x, v3.y);
  }
}
