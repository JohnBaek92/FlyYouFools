const platformColor = "rgba(120,120,120,1)";
const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 280;
const platformHeight = 10;

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

  updatePlatform(){
    this.x -= this.xVel;
    if(this.x < -280) {
      this.y = this.randomNumber(100, 300);
      this.x = this.x+280 + canvasWidth;
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
