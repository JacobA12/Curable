let targetShape;
let userPath = [];
let score = 0;
let currentLevel = 1;

function setup() {
  createCanvas(600, 600);

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

}

function touchStarted() {
  userPath = [];


  return false;
}

function touchMoved() {
  if (touches.length > 0) {
    let point = createVector(touches[0].x, touches[0].y);
    userPath.push(point);
    
  }
}

function touchEnded() {
  calculateScore();
}

function calculateScore() {
  // Implement your scoring algorithm here
  // You can compare the userPath with the targetShape to determine accuracy
  // Update the score variable accordingly
}

function createShape() {
    if (currentLevel === 1) {
      triangle(300, 200, 200, 400, 400, 400);
    }
}

