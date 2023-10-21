class Obstacle {
    constructor(){
      this.x = floor(random(width / scl)) * scl;
      this.y = floor(random(height / scl)) * scl;
      this.length = random(1, 5);
      this.width = random(1, 3);
    }
  }
  