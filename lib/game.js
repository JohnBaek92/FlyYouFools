const Platform = require("./platform.js");
const Gimli = require("./gimli.js");


const canvasWidth = 1000;
const canvasHeight = 400;
const numPlatforms = 2;
const FPS = 30;

class Game {
  constructor() {
    this.canvas = document.getElementById("game-canvas");
    this.ctx = this.canvas.getContext('2d');


    this.score = 0;
    this.gameOver = false;
    this.gameStarted = false;

    window.platforms = this.platforms;
    this.platforms = [];
    this.canvasYSeperator = [[45,100], [101, 200], [201, 300], [301, 330]];
    this.canvasXSeperator = [[0,250], [201,500], [501, 750], [751,1000]];

    this.gameLoop = this.gameLoop.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
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

  createPlatforms() {
    let randomX;
    let randomY;
    for(let i = 0; i < numPlatforms; i++) {
      randomX = this.canvasXSeperator[Math.floor(Math.random()*this.canvasXSeperator.length)];
      randomY = this.canvasYSeperator[Math.floor(Math.random()*this.canvasYSeperator.length)];
      let x = this.randomNumber(randomX[0], randomX[1]);
      let y = this.randomNumber(randomY[0], randomY[1]);
      if(this.platforms.length !== 0 && this.canvasYSeperator.length !== 0) {
        randomX = this.canvasXSeperator[Math.floor(Math.random()*this.canvasXSeperator.length)];
        randomY = this.canvasYSeperator[Math.floor(Math.random()*this.canvasYSeperator.length)];
        x = this.randomNumber(randomX[0], randomX[1]);
        y = this.randomNumber(randomY[0], randomY[1]);
        }
      let newPlatform = new Platform(x, y, this.canvas, this.ctx);
      this.platforms.push(newPlatform);
    }
  }

  drawGimli() {
    this.gimli.drawGimli();
  }

  gameLoop() {
    if(this.gameOver === false) {
      this.clearCanvas();
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

// this.platforms.forEach((el, idx1) => {
//   if(el.x+250 < x && el.x-250 > x) {
//     debugger
//     if(x + 120 > canvasWidth) {
//       x -= 120;
//     } else {
//       x += 120;
//     }
//   if(el.y+100 < y && el.y-100 > y) {
//     if(y + 70 > canvasHeight) {
//       y -= 70;
//     } else {
//       y += 70;
//     }
//   }
// }
// });


// for(let i=0; i < this.platforms.length-1; i++) {
//   for(let j=i+1; j < this.platforms.length; j++) {
//     if(this.platforms[i].x+250 < this.platforms[j].x && this.platforms[i]-250 > this.platforms[j]
//   }
