class Snake {
  constructor() {
    this.x = 280;
    this.y = 40;
    this.xspeed = 0;
    this.yspeed = 0;
    this.total = 0;
    this.tail = [];

    this.eat = function (pos) {
      //calculates the distances between two points
      let d = dist(this.x, this.y, pos.x, pos.y);

      //checks if the distace is small enough to consider it eaten.
      //if eaten it is compared to the best score and score is updated
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

    //changes speed direction of snake
    this.dir = function (x, y) {
      // Prevent the snake from moving in the opposite direction
      if (x === -this.xspeed && y === -this.yspeed) {
        return;
      }
      this.xspeed = x;
      this.yspeed = y;
    };

    this.death = function () {
      //checks distance of snake compared to obstacle
      for (let obstacle of obstacles) {
        let d = dist(this.x, this.y, obstacle.x, obstacle.y);
        if (
          this.x < obstacle.x + scl &&
          this.x + scl > obstacle.x &&
          this.y < obstacle.y + scl &&
          this.y + scl > obstacle.y
        ) {
          //checks if level requirements are met
          nextLevel();
          scoreDisplayElement.innerText = 0; //sets score to 0
          if (!mute) {
            tryAgainSound2.play();
          }
          this.x = 280; //resets position, speed, and size
          this.y = 40;
          this.total = 0;
          this.xspeed = 0;
          this.yspeed = 0;
          this.tail = [];
        }
      }
      //checks snake position compared to itself
      for (let i = 0; i < this.tail.length; i++) {
        let pos = this.tail[i];
        let d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
          nextLevel();
          scoreDisplayElement.innerText = 0;
          if (!mute) {
            tryAgainSound2.play();
          }
          this.x = 280;
          this.y = 40;
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

      //updates head based on speed
      this.x = this.x + this.xspeed * scl;
      this.y = this.y + this.yspeed * scl;
      /* 
      keeps the snake within the bounds, also killing the snake if it hits an edge due to death logic of the 
      snake hitting itself due to the way the position of all elements in the array are updated 
      */
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
