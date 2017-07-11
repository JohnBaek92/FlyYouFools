const Platform = require("./platform.js");
const Gimli = require("./gimli.js");
const Background = require("./background.js");

const platformColor = "rgba(120,120,120,1)";
const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 280;
const platformHeight = 10;
const numPlatforms = 4;

class Game {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext('2d');

    this.background = new Background(this.canvas, this.ctx, 2);

    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;

    window.platforms = this.platforms;
    this.startPlatform = [];
    this.platforms = [];
    this.canvasYSeperator = [[45,100], [101, 200], [201, 300], [301, 330]];
    this.canvasXSeperator = [[150,150], [201,201], [350, 350], [275,275], [75,75]];

    this.gameLoop = this.gameLoop.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.createPlatforms = this.createPlatforms.bind(this);
  }

  startGame(e){
    if(e.key === "Enter") {
      this.createStartPlatform();
      setTimeout(() => this.createPlatforms() , 500);
      this.gimli = new Gimli(this, this.ctx, this.platforms, this.startPlatform);
      window.addEventListener("keydown", this.gimli.gimliMovements, false);
      window.addEventListener("keyup", this.gimli.gimliStop, false);
      setTimeout(() => this.startPlatform.pop(), 5000);
      this.gameLoop();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createStartPlatform() {
    let x = 200;
    let y = 300;
    let startPlatform = new Platform(x, y, this.canvas, this.ctx);
    this.startPlatform.push(startPlatform);
  }

  createPlatforms() {
    let x;
    let y;
    let xPlacementArray = [canvasWidth+280, canvasWidth+520, canvasWidth+840, canvasWidth+1120];
    let yPlacementArray = [300, 250, 200, 150];
    for(let i = 0; i < numPlatforms; i++) {
      x = xPlacementArray.pop();
      y = yPlacementArray.pop();
      let newPlatform = new Platform(x, y, this.canvas, this.ctx);
      this.platforms.push(newPlatform);
    }
  }

  drawGimli() {
    this.gimli.drawGimli();
  }

  drawBackground() {
    this.background.update();
    this.background.render();
  }

  gameLoop() {
    if(this.gameOver === false) {
      this.clearCanvas();
      this.drawBackground();
      this.updateScore();
      if(this.score < 250 && this.startPlatform[0]) {
        this.startPlatform[0].updateStartPlatform();
      }
      for(let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].updatePlatform(this.score);
      }
      this.drawGimli();
      this.gimli.update();
      window.requestAnimationFrame(this.gameLoop);
    } else {
      this.clearCanvas();
      console.log('gameOver');
    }
  }

  updateScore() {
    this.ctx.font = "27px sans-serif";
    this.ctx.fillText(`score: ${this.score}`, 430, 25);
    this.ctx.strokeText(`score: ${this.score}`, 430, 25);
    this.score += 1;
  }
}

module.exports = Game;
