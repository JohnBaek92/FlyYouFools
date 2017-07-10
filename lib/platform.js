const platformColor = "rgba(120,120,120,1)";
const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 375;
const platformHeight = 10;

class Platform {
  constructor(x, y, canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.xVel = 2;

    this.drawPlatform = this.drawPlatform.bind(this);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  updatePlatform(){
    this.x -= this.xVel;
    if(this.x < -375) {
      if(this.y > 45 && this.y < 100) {
        this.y = this.randomNumber(45, 100);
      } else if(this.y > 101 && this.y < 200) {
        this.y = this.randomNumber(101, 200);
      } else if (this.y > 201 && this.y < 300) {
        this.y = this.randomNumber(201, 300);
      } else {
        this.y = this.randomNumber(301, 330);
      }
      this.x = this.x+375 + canvasWidth;
    }
    this.drawPlatform();
  }

  drawPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.fillStyle = platformColor;
    this.ctx.fillRect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

module.exports = Platform;
