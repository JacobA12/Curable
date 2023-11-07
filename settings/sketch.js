function setup() {
  createCanvas(displayWidth, displayHeight);
}

function preload(){
   img = loadImage('../assets/progress.jpg');
   img.resize(600, 600);
}

function draw() {
  image(img,(width - img.width) / 2, (height - img.height) / 2, 600, 600);
}
