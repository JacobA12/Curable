//credits - Jaden for the sounds

let object;
let object2;
let player;
let rad = 15;
let scl = 2;
let timer = 5;
let points = 0;
let currentLevel = 1;
let timerDeduction = 1 / 60;
let homeButton;

//speed and direction of ball
let dx = 0;
let dy = 0;

let wrong;
let right;
let backgroundMusic;
let lego;

function preload() {
  wrong = loadSound("../assets/wrong.wav");
  right = loadSound("../assets/right.wav");
  lego = loadSound("../assets/lego.mp3");
  backgroundMusic = loadSound("../assets/jacob_game_lol.wav");
}

function setup() {
  soundFormats("wav", "mp3");
  createCanvas(600, 600);

  object = createVector(random(width), random(height));
  object2 = createVector(random(width), random(height));
  lego.play();
  backgroundMusic.loop();

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
  background(254, 245, 218);

  // Check if there's at least one touch point
  if (touches.length > 0) {
    player = createVector(touches[0].x, touches[0].y);
  }
  //Timer
  ////////////////////////////////////////////
  timer -= timerDeduction;
  //timer runs out
  if (timer <= 0) {
    text("stop", 200, 200);
    wrong.play();
    noLoop();
  }
  if (timer <= timer / 2) {
    timerDeduction = 3 / 60;
  }

  textSize(24);
  text("Timer:", 465, 30);
  text(parseFloat(timer.toFixed(1)), 545, 30);
  ////////////////////////////////////////////

  //ball
  fill("red");
  ellipse(object.x, object.y, rad * scl);

  //second ball for level 2

  //change x and y of object here to make it move
  /* changeSpeed();
  checkBounds(); */

  let length = map(timer, 0, 5, 0, 200);
  fill("green");
  rect(20, 20, 10, length);

  textSize(48);
  textStyle(BOLD);
  text(points, 300, 40);

  textSize(24);
  text(currentLevel, 577, 575);
  text("Current Level:", 415, 575);

  nextLevel();
}

function touchStarted() {
  // Check if player exists
  if (player) {
    let dis = p5.Vector.dist(player, object);
    let dis2;

    if (dis <= rad) {
      object = createVector(random(width), random(height));
      points++;
      timer += 0.5;
      right.play();
    }
  }
  return false;
}

function nextLevel() {
  switch (currentLevel) {
    case 1:
      if (points >= 5) {
        currentLevel++;
        timer = 5;
        points = 0;
      }
      break;
    case 2:
      if (points >= 5) {
        currentLevel++;
        timer = 5;
        points = 0;
      }
      rad = 15 * 0.75;
      break;
    case 3:
      //add victory screen
      if (points >= 5) {
        drawWinningScreen();
        noLoop();
      }
      break;
    default:
      console.log("ERROR, default case in next level function");
      break;
  }
}

function drawWinningScreen() {
  fill("black");
  rect(0, 0, width, height);
  fill("green");
  textSize(48);
  textStyle(BOLD);
  text("Winner!", 200, 300);
}

//color change when ball is clicked
//add two objects that need to be clicked
//make an object move around the screen
//make the game look nicer

/* 
    Add Levels
----------------------
  1st Level: Simple with regular timer, normal balls. Needs to get score of 30 or greater to move onto the next level.

  2nd Level: Make the circle smaller, regular timer, Need score of 30 or greater to move onto the next level. 
    -If a certain time passes before touch, then the ball dissapears and you lose a point. 
    -Add a second ball that is a different color. If this circle is pressed, then more points are awarded. Make it smaller. Make appearance random somehow. 
    -As score approaches the goal, balls will disappear faster. 
    -

    3rd Level: Ball size changes between certain parameters every time ball is touched. 
    -If a certain time passes before touch, then the ball dissapears and you lose a point. 
    -Add a third ball that is red, when pressed a point is taken away. 
    -All balls are moving
    -Balls will move faster as the user approaches the goal.
*/

/*
1. **Speed Variation**: The speed of the ball could increase as the player progresses in the game. This would require the player to tap faster and make the game more challenging.

2. **Multiple Balls**: Introduce more than one ball on the screen at a time. The player would have to tap all of them within a certain time limit.

3. **Special Balls**: Include special balls that give extra points or extra time when tapped.

4. **Obstacles**: Add obstacles on the screen that the player must avoid tapping. If an obstacle is tapped, points could be deducted or time could be reduced.
 */
