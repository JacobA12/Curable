function setup() {
  createCanvas(displayWidth, displayHeight);

  homeButton = createButton("Home");
  homeButton.id("myButton");
  homeButton.class("home");
  homeButton.position(800,20);
  homeButton.style("background-color", color(254,245,218));
  homeButton.style('font-family','Palatino')
  homeButton.mousePressed(() => {
    window.location.href = "../index.html";
  });
}

function preload(){
   img = loadImage('../assets/progress.jpg');
   img.resize(600, 600);
}

function draw() {
  image(img,(width - img.width) / 2, (height - img.height) / 2, 600, 600);
}

