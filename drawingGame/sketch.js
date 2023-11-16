let circles = [];
let accurCircles = [];
let startTime = 0;
let timeToAdd = 4000; // 4 seconds
let drawnLine;
let currentOrder = 0;
let accuracy = 100;

function setup() {
  createCanvas(700, 450);
  background(0);
  noSmooth();
  strokeWeight(7);

  // Create rollover circles
  //circle 1 to 2
  circles.push(createCircle(200, 100, 20, "1", 0));
  accurCircles.push(createAccurCircle(190, 120, 20, "1.0", 1));
  accurCircles.push(createAccurCircle(180, 140, 20, "1.1", 2));
  accurCircles.push(createAccurCircle(170, 160, 20, "1.2", 3));
  accurCircles.push(createAccurCircle(160, 180, 20, "1.3", 4));

  //circle 2 to 3
  circles.push(createCircle(150, 200, 20, "2", 5));
  for (let index = 0; index < 4; index++) {
    accurCircles.push(
      createAccurCircle(
        140 - 10 * index,
        220 + 20 * index,
        20,
        "2." + index.toString(),
        6 + index
      )
    );
  }
  //circle 3 to 4
  circles.push(createCircle(100, 300, 20, "3", 10));
  for (let index = 0; index < 4; index++) {
    accurCircles.push(
      createAccurCircle(
        120 + 20 * index,
        300,
        20,
        "3." + index.toString(),
        11 + index
      )
    );
  }
  //circles 4 to 5
  circles.push(createCircle(200, 300, 20, "4", 15));
  for (let index = 0; index < 4; index++) {
    accurCircles.push(
      createAccurCircle(
        220 + 20 * index,
        300,
        20,
        "4." + index.toString(),
        16 + index
      )
    );
  }
  //circles 5 to 6
  circles.push(createCircle(300, 300, 20, "5"), 20);
  for (let index = 0; index < 4; index++) {
    accurCircles.push(
      createAccurCircle(
        290 - 10 * index,
        280 - 20 * index,
        20,
        "5." + index.toString(),
        21 + index
      )
    );
  }
  //circles 6 to 1
  circles.push(createCircle(250, 200, 20, "6"), 25);
  for (let index = 0; index < 4; index++) {
    accurCircles.push(
      createAccurCircle(
        240 - 10 * index,
        180 - 20 * index,
        20,
        "6." + index.toString(),
        26 + index
      )
    );
  }
}

// Define a function to create a circle with text
function createCircle(x, y, diameter, label, order) {
  fill(255);
  ellipse(x, y, diameter, diameter);
  fill(0);
  textSize(5);
  textAlign(CENTER, CENTER);
  text(label, x, y);

  console.log(order);

  return { x, y, diameter, label, order, intersected: false };
}

function createAccurCircle(x, y, diameter, label, order) {
  fill(255);
  ellipse(x, y, diameter, diameter);
  fill(0);
  textSize(5);
  textAlign(CENTER, CENTER);
  text(label, x, y);

  console.log(order);

  return { x, y, diameter, label, order, intersected: false };
}

function resetSelection() {
  selectedCircles = [];
}

function draw() {
  stroke(255, 0, 0);
  touchMoved();

  textSize(48);
  textStyle(BOLD);
  text(accuracy, 300, 40);
}
function touchMoved() {
  // your touch related logic here
  if (touches.length > 0) {
    drawnLine = line(touches[0].x, touches[0].y, pmouseX, pmouseY);
  }

  // prevent default
  return false;
}
function resetGame() {
  resetSelection();
  resetDrawing();
}

function resetDrawing() {
  selectedCircles = [];
}

function circleFill(circle, fillColor) {
  fill(fillColor);
  ellipse(circle.x, circle.y, circle.diameter, circle.diameter);
  fill(0);
  textSize(10);
  textAlign(CENTER, CENTER);
  text(circle.label, circle.x, circle.y);
}

let lineStart, lineEnd;

function touchStarted() {
  lineStart = createVector(mouseX, mouseY);
}

function touchMoved() {
  // your touch related logic here
  if (touches.length > 0) {
    lineEnd = createVector(mouseX, mouseY);
    drawnLine = line(touches[0].x, touches[0].y, pmouseX, pmouseY);
    checkAccuracy();
  }

  // prevent default
  return false;
}

function checkAccuracy() {
  let prevIntersected;

  circles.forEach((circle) => {
    let circleCenter = createVector(circle.x, circle.y);
    let startDist = p5.Vector.dist(lineStart, circleCenter);
    let endDist = p5.Vector.dist(lineEnd, circleCenter);
    if (
      (startDist <= circle.diameter / 2 || endDist <= circle.diameter / 2) &&
      !circle.intersected &&
      circle != prevIntersected
    ) {
      if (circle.order === currentOrder) {
        console.log(`The line intersects circle ${circle.label}`);
        circle.intersected = true;
        prevIntersected = circle;
        currentOrder++;
      } else {
        console.log(`Circle ${circle.label} was skipped`);
        accuracy -= 0.03; // decrease accuracy by .03 for each skipped circle
        currentOrder++;
      }
    }
  });
  accurCircles.forEach((circle) => {
    let circleCenter = createVector(circle.x, circle.y);
    let startDist = p5.Vector.dist(lineStart, circleCenter);
    let endDist = p5.Vector.dist(lineEnd, circleCenter);
    if (
      (startDist <= circle.diameter / 2 || endDist <= circle.diameter / 2) &&
      !circle.intersected &&
      circle != prevIntersected
    ) {
      if (circle.order === currentOrder) {
        console.log(`The line intersects circle ${circle.label}`);
        circle.intersected = true;
        prevIntersected = circle;
        currentOrder++;
      } else {
        console.log(`Circle ${circle.label} was skipped`);
        accuracy -= 0.03; // decrease accuracy by .03 for each skipped circle
        currentOrder++;
      }
    }
  });
}
