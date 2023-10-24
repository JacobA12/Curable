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
