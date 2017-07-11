const Platform = require("./platform.js");
const Gimli = require("./gimli.js");
const Background = require("./background.js");

const canvasWidth = 1000;
const canvasHeight = 400;
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
    this.platforms = [];
    this.canvasYSeperator = [[45,100], [101, 200], [201, 300], [301, 330]];
    this.canvasXSeperator = [[150,150], [201,201], [350, 350], [275,275], [75,75]];

    this.gameLoop = this.gameLoop.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
  }

  startGame(e){
    if(e.key === "Enter") {
      this.createPlatforms();
      this.gimli = new Gimli(this, this.ctx, this.platforms);
      window.addEventListener("keydown", this.gimli.gimliMovements, false);
      window.addEventListener("keyup", this.gimli.gimliStop, false);
      this.gameLoop();
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // createPlatforms() {
  //   let randomX;
  //   let randomY;
  //   for(let i = 0; i < numPlatforms; i++) {
  //     randomX = this.canvasXSeperator[Math.floor(Math.random()*this.canvasXSeperator.length)];
  //     randomY = this.canvasYSeperator[Math.floor(Math.random()*this.canvasYSeperator.length)];
  //     let x = this.randomNumber(randomX[0], randomX[1]);
  //     let y = this.randomNumber(randomY[0], randomY[1]);
  //     if(this.platforms.length !== 0 && this.canvasYSeperator.length !== 0) {
  //       randomX = this.canvasXSeperator[Math.floor(Math.random()*this.canvasXSeperator.length)];
  //       randomY = this.canvasYSeperator[Math.floor(Math.random()*this.canvasYSeperator.length)];
  //       x = this.randomNumber(randomX[0], randomX[1]);
  //       y = this.randomNumber(randomY[0], randomY[1]);
  //     }
  //     let newPlatform = new Platform(x, y, this.canvas, this.ctx);
  //     this.platforms.push(newPlatform);
  //   }
  // }

  createPlatforms() {
    let x;
    let y;
    let xPlacementArray = [120, 430, 760, 1120];
    for(let i = 0; i < numPlatforms; i++) {
      x = xPlacementArray.pop();
      debugger
      y = 300;
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
      for(let i = 0; i < this.platforms.length; i++) {
        this.platforms[i].updatePlatform();
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
    this.ctx.font = "27px Arial";
    this.ctx.fillText(`score: ${this.score}`, 430, 25);
    this.ctx.strokeText(`score: ${this.score}`, 430, 25);
    this.score += 1;
  }
}

module.exports = Game;
