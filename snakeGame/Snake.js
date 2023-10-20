class Snake {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.xspeed = 1;
    this.yspeed = 1;
    this.total = 0;
    this.tail = [];

    this.eat = function (pos) {
      let d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        this.total++;
        scoreDisplayElement.innerText = this.total;
        if (this.total >= bestScoreDisplayElement.innerText) {
          bestScoreDisplayElement.innerText = this.total;
        }
        return true;
      } else {
        return false;
      }
    };

    this.dir = function (x, y) {
      this.xspeed = x;
      this.yspeed = y;
    };

    this.death = function () {
      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          console.log("starting over");
          scoreDisplayElement.innerText = 0;
          tryAgainSound2.play();
          this.x = width / 2;
          this.y = height / 2;
          this.total = 0;
          this.tail = [];
        }
      }
    };

    this.update = function () {
      if (this.total === this.tail.length) {
        for (let index = 0; index < this.tail.length - 1; index++) {
          this.tail[index] = this.tail[index + 1];
        }
      }
      this.tail[this.total - 1] = createVector(this.x, this.y);

      this.x = this.x + this.xspeed * scl;
      this.y = this.y + this.yspeed * scl;
      this.x = constrain(this.x, 0, width - scl);
      this.y = constrain(this.y, 0, height - scl);
    };
    this.show = function () {
      fill(255);
      for (let i = 0; i < this.tail.length; i++) {
        rect(this.tail[i].x, this.tail[i].y, scl, scl);
      }
      rect(this.x, this.y, scl, scl);
    };
  }
}
