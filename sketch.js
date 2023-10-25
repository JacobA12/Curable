let settingsButton;
let snakeGameButton;
let typingGameButton;

function setup() {
  noCanvas();

  settingsButton = createButton('Settings');
  settingsButton.mousePressed(() => window.location.href='settings/index.html');

  snakeGameButton = createButton('Snake Game!');
  snakeGameButton.mousePressed(() => window.location.href='snakeGame/snakeGame.html');

  typingGameButton = createButton('Typing Game!');
  typingGameButton.mousePressed(() => window.location.href='typingGame/typingGame.html');
}

function draw() {
  // put drawing code here
}
