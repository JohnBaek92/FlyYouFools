class Background {
  constructor(canvas, ctx, speed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.xPos = 0;
    this.speed = speed;
    this.width = 1413;
    this.height = 450;
    this.backgroundImage = new Image();
    this.backgroundImage.src = 'assets/dungeon.jpg';
  }

  update() {
    this.xPos -= this.speed;
    if (this.xPos < -this.width) {
      this.xPos = 0;
    }
  }

  render() {
    for(let i = 0; i < this.canvas.width / this.width + 1; i++) {
      this.ctx.drawImage(this.backgroundImage, this.xPos + i * this.width, 0);
    }
  }
}

module.exports = Background;
