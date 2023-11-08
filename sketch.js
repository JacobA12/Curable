let settingsButton;
let snakeGameButton;
let typingGameButton;

let backgroundImage;
function preload() {
  backgroundImage = loadImage("assets/backgroundImage.jpg");
}
function setup() {
  createCanvas(displayWidth, displayHeight);

  let title = createElement("h2", "GUI");
  title.id("myTitle");

  snakeGameButton = createButton("Snake Game!");
  snakeGameButton.id("myButton");
  snakeGameButton.class("snake");
  snakeGameButton.mousePressed(() => {
    snakeGameButton.style("background-color", "green");
    window.location.href = "snakeGame/snakeGame.html";
  });

  typingGameButton = createButton("Typing Game!");
  typingGameButton.id("myButton");
  typingGameButton.class("typing");
  typingGameButton.mousePressed(() => {
    typingGameButton.style("background-color", "green");
    window.location.href = "typingGame/typingGame.html";
  });

  settingsButton = createButton("Tapping Game!");
  settingsButton.id("myButton");
  settingsButton.class("tappingGame");
  settingsButton.mousePressed(() => {
    settingsButton.style("background-color", "green");
    window.location.href = "tappingGame/index.html";
  });

  settingsButton = createButton("Settings");
  settingsButton.id("myButton");
  settingsButton.class("settings");
  settingsButton.mousePressed(() => {
    settingsButton.style("background-color", "green");
    window.location.href = "settings/index.html";
  });
}

function draw() {
  background(backgroundImage);
}
