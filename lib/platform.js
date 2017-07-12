const platformColor = "rgba(120,120,120,1)";
const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 280;
const platformHeight = 10;
const startPlatformWidth = 1200;

class Platform {
  constructor(x, y, canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.xVel = 5;

    this.drawPlatform = this.drawPlatform.bind(this);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  updatePlatform(score){
    if(score > 1000 && score < 1999) {
      this.xVel = 7;
    } else if (score > 2000 && score < 2999) {
      this.xVel = 9;
    } else if (score > 3000 && score < 3999) {
      this.xVel = 11;
    } else if (score > 4000 && score < 4999) {
      this.xVel = 13;
    } else if (score > 5000 && score < 5999) {
      this.xVel = 15;
    }
    this.x -= this.xVel;
    if(this.x < -280) {
      this.y = this.randomNumber(130, 300);
      this.x = this.x+280 + canvasWidth;
    }
    this.drawPlatform();
  }

  updateStartPlatform() {
    this.x -= this.xVel;
    this.drawStartPlatform();
  }

  drawPlatform() {
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.fillStyle = platformColor;
    this.ctx.fillRect(this.x, this.y, platformWidth, platformHeight);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  drawStartPlatform(){
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, startPlatformWidth, platformHeight);
    this.ctx.fillStyle = platformColor;
    this.ctx.fillRect(this.x, this.y, startPlatformWidth, platformHeight);
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

module.exports = Platform;
