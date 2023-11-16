
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(188,158,130);
  buttons();
}
function draw() {
  var scaler = (windowHeight / 5) - ((windowHeight / 5) / 5);
  strokeWeight(5); 
  rect(-10,-10,windowWidth + 100, scaler)
  fill(0);
  textSize(50)
  text('Curable',(windowWidth / 2 - 95), (scaler / 2));
  fill(254,245,218);
  textFont('Palatino')
}
function buttons() {
  var scaleScreen = windowHeight / 5;
  var buttonSpace = (windowHeight - scaleScreen) / 5 ;
  var buttonSeperator = scaleScreen / 5; 

  buttonTypingGame = createButton('Typing Game');
  buttonTypingGame.class("Buttons");
  buttonTypingGame.size(windowWidth - 100,buttonSpace);
  buttonTypingGame.position(50,buttonSpace + (buttonSeperator * 1));
  buttonTypingGame.mousePressed(() => {
    window.location.href = "typingGame/typingGame.html";
  });
  
  
  //////
  buttonSnake = createButton('Snake Game');
  buttonSnake.class("Buttons");
  buttonSnake.size(windowWidth - 100,buttonSpace);
  buttonSnake.position(50,(buttonSpace * 2) + (buttonSeperator * 2));
  buttonSnake.mousePressed(() => {
    window.location.href = "snakeGame/snakeGame.html";
  });
  ///////
  buttonTappingGame = createButton('Tapping Game');
  buttonTappingGame.class("Buttons");
  buttonTappingGame.size(windowWidth - 100, buttonSpace);
  buttonTappingGame.position(50,(buttonSpace * 3) + (buttonSeperator * 3));
  buttonTappingGame.mousePressed(() => {
    window.location.href = "tappingGame/index.html";
  });
  ///////
  buttonDrawing = createButton('Drawing Game');
  buttonDrawing.class("Buttons");
  buttonDrawing.size(windowWidth - 100, buttonSpace);
  buttonDrawing.position(50,(buttonSpace * 4) + (buttonSeperator * 4));
  buttonDrawing.mousePressed(() => {
    window.location.href = "drawingGame/index.html";
  });
  ///////
}


