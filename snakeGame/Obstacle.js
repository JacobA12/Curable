class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  show() {
    fill(0, 0, 0); // Black color for obstacles
    rect(this.x, this.y, scl, scl);
  }
}
