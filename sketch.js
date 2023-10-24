function setup() {
  createCanvas(500,500);
  buttons();
}
function mainScreen() {
  background(400,100,100);
  strokeWeight(5); 
  rect(-10,-10,600,85)
  fill(0, 102, 153);
  textSize(40)
  text('Curable',177, 50);
  fill(0,200,500);
  textFont('Palatino')
}
var mode = "mainScreen";
function draw() {
 if (mode == "mainScreen") {
    mainScreen();
  } else if (mode == "profileScreen") {
   profileScreen();
  } else if (mode == "settingsScreen") {
    settingsScreen();
  } else if (mode == "FIXME") {
    screen4();
  } else if (mode == "FIXME") {
    screen4();
  } else if (mode == "FIXME") {
    screen4();
  }
  
}

function buttons() {
  buttonTypingGame = createButton('Typing Game');
  buttonTypingGame.size(400,75);
  buttonTypingGame.position(50,100);
  buttonTypingGame.style('font-size','24px');
  buttonTypingGame.style('font-text','Garamont')
  buttonTypingGame.style('background-color',color(200,300,100));
  //////
  buttonSnake = createButton('Snake Game');
  buttonSnake.size(400,75);
  buttonSnake.position(50,200);
  buttonSnake.style('font-size','24px');
  buttonSnake.style('background-color',color(400,50,20));
  ///////
  buttonChaseCheese = createButton('Chase the Cheese');
  buttonChaseCheese.size(400,75);
  buttonChaseCheese.position(50,300);
  buttonChaseCheese.style('font-size','24px');
  buttonChaseCheese.style('background-color',color(50,400,300));
  ///////
  buttonDrawing = createButton('Drawing Game');
  buttonDrawing.size(400,75);
  buttonDrawing.position(50,400);
  buttonDrawing.style('font-size','24px');
  buttonDrawing.style('background-color',color(200,100,500));
  ///////
  buttonProfile = createButton('Profile');
  buttonProfile.position(425,17)
  buttonProfile.size(60,40)
  buttonProfile.style('background-color',color(500,200,300));
  buttonProfile.style('font-size','13px')
  buttonProfile.mousePressed(profileScreen);
}
function profileScreen () {
  mode = "profileScreen";
  buttonTypingGame.hide();
  buttonSnake.hide();
  buttonChaseCheese.hide();
  buttonDrawing.hide();
  buttonProfile.hide(); ///// Hide all the buttons from the user view
  
  background(400,100,100);
  strokeWeight(5); 
  rect(-10,-10,600,85)
  fill(0, 102, 153);
  textSize(40);
  text('Profile',177, 50);
  fill(0,200,500);
  textFont('Palatino')
  
  buttonSettings = createButton('Settings');
  buttonSettings.size(400,75);
  buttonSettings.position(50,150);
  buttonSettings.style('font-size','24px');
  buttonSettings.style('background-color',color(0,500,300));
  buttonSettings.mousePressed(settingsScreen);
  
  buttonAchievements = createButton('Achievements');
  buttonAchievements.size(400,75);
  buttonAchievements.position(50,275);
  buttonAchievements.style('font-size','24px');
  buttonAchievements.style('background-color',color(200,200,300));
  
  buttonReturnHome = createButton('Return Home');
  buttonReturnHome.size(200,75);
  buttonReturnHome.position(150,400);
  buttonReturnHome.style('font-size','24px');
  buttonReturnHome.style('background-color',color(100,400,100));
}
function settingsScreen() {
  mode = "settingsScreen";
  buttonReturnHome.hide()
  }
