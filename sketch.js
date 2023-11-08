
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
  textSize(40)
  text('Curable',(windowWidth / 2 - 70), (scaler / 2));
  fill(254,245,218);
  textFont('Palatino')
}
function buttons() {
  var scaleScreen = windowHeight / 5;
  var buttonSpace = (windowHeight - scaleScreen) / 5 ;
  var buttonSeperator = scaleScreen / 5; 

  buttonTypingGame = createButton('Typing Game');
  buttonTypingGame.size(windowWidth - 100,buttonSpace);
  buttonTypingGame.position(50,buttonSpace + (buttonSeperator * 1));
  buttonTypingGame.style('font-size','24px');
  buttonTypingGame.style('font-text','Garamont')
  buttonTypingGame.style('background-color',color(254,245,218));
  buttonTypingGame.style('cursor','pointer');
  buttonTypingGame.style('font-family', 'Palatino');
  buttonTypingGame.style('borderColor', "black")
  buttonTypingGame.style('borderWidth',"5px")
  buttonTypingGame.style('font-size',"40px");
  buttonTypingGame.mousePressed(() => {
    window.location.href = "typingGame/typingGame.html";
  });
  
  
  //////
  buttonSnake = createButton('Snake Game');
  buttonSnake.size(windowWidth - 100,buttonSpace);
  buttonSnake.position(50,(buttonSpace * 2) + (buttonSeperator * 2));
  buttonSnake.style('font-size','24px');
  buttonSnake.style('background-color',color(254,245,218));
  buttonSnake.style('cursor','pointer');
  buttonSnake.style('font-family', 'Palatino');
  buttonSnake.style('borderColor', "black")
  buttonSnake.style('borderWidth',"5px")
  buttonSnake.style('font-size',"40px");
  buttonSnake.mousePressed(() => {
    window.location.href = "snakeGame/snakeGame.html";
  });
  ///////
  buttonTappingGame = createButton('Tapping Game');
  buttonTappingGame.size(windowWidth - 100, buttonSpace);
  buttonTappingGame.position(50,(buttonSpace * 3) + (buttonSeperator * 3));
  buttonTappingGame.style('font-size','24px');
  buttonTappingGame.style('background-color',color(254,245,218));
  buttonTappingGame.style('cursor','pointer');
  buttonTappingGame.style('font-family', 'Palatino');
  buttonTappingGame.style('borderColor', "black")
  buttonTappingGame.style('borderWidth',"5px")
  buttonTappingGame.style('font-size',"40px");
  buttonTappingGame.mousePressed(() => {
    window.location.href = "tappingGame/index.html";
  });
  ///////
  buttonDrawing = createButton('Drawing Game');
  buttonDrawing.size(windowWidth - 100, buttonSpace);
  buttonDrawing.position(50,(buttonSpace * 4) + (buttonSeperator * 4));
  buttonDrawing.style('font-size','24px');
  buttonDrawing.style('background-color',color(254,245,218));
  buttonDrawing.style('cursor','pointer');
  buttonDrawing.style('font-family', 'Palatino');
  buttonDrawing.style('borderColor', "black")
  buttonDrawing.style('borderWidth',"5px")
  buttonDrawing.style('font-size',"40px");
  buttonDrawing.mousePressed(() => {
    window.location.href = "settings/index.html";
  });
  ///////
}


