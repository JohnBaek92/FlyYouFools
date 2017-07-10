/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Platform = __webpack_require__(3);
const Gimli = __webpack_require__(2);
const Background = __webpack_require__(4);

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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(0);

document.addEventListener("DOMContentLoaded", () => {
  const newGame = new Game();
  document.addEventListener("keydown", newGame.startGame.bind(newGame), false);
});


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 375;
const platformHeight = 10;


class Gimli {
  constructor(game, ctx, platforms) {
    this.ctx = ctx;
    this.game = game;
    this.platforms = platforms;
    this.frames = 0;
    this.idle = false;
    this.gravity = 0.06;
    this.gravitySpeed = 0;
    this.velX = 0;
    this.velY = 0;
    this.score = 0;
    this.gimli = {
      spriteWalkCounter: 0,
      spriteJumpCounter: 0,
      spriteIdleCounter: 0,
      x: 0,
      y: 0,
      width: 2,
      height: 2,
      jumping: false,
      walking: false,
      src: "assets/gimliWalks.png"
    };

    this.spriteIdleAnimation = [
      {
        x: 2,
        y: 4,
        width: 39,
        height: 45,
      },
      {
        x: 42,
        y: 4,
        width: 39,
        height: 45,
      },

      {
        x: 82,
        y: 4,
        width: 37,
        height: 45,
      },
      {
        x: 122,
        y: 4,
        width: 37,
        height: 45,
      }
    ];

    this.spriteWalkArray = [
      {
        x: 2,
        y: 4,
        width: 39,
        height: 45,
      },
      {
        x: 42,
        y: 4,
        width: 39,
        height: 45,
      },

      {
        x: 82,
        y: 4,
        width: 37,
        height: 45,
      },
      {
        x: 122,
        y: 4,
        width: 37,
        height: 45,
      },
      {
        x: 166,
        y: 4,
        width: 37,
        height: 45,
      },
      {
        x: 206,
        y: 4,
        width: 37,
        height: 45,
      },
    ];

    this.spriteJumpArray = [
      {
        x: 246,
        y: 4,
        width: 37,
        height: 45
      },
      {
        x: 286,
        y: 4,
        width: 46,
        height: 45
      },
      {
        x: 333,
        y: 4,
        width: 60,
        height: 53
      },
    ];

    this.gimliMovements = this.gimliMovements.bind(this);
    this.gimliStop = this.gimliStop.bind(this);
    this.checkPlatformCollision = this.checkPlatformCollision.bind(this);
  }

  update(){
    console.log(this.velY);
    this.checkPlatformCollision();
    this.frames++
    if (this.frames > 5) {
      this.idle = true;
    }

    if (this.idle){
      this.gimli.spriteIdleCounter += 0.05;
    }

    this.gimli.y += this.velY;
    console.log(this.gimli.x);
    this.velY += this.gravity;
    if (this.gimli.y < 0) {
      this.gimli.y = 0;
      this.velY = 0;
    }
    if (this.gimli.x < 0) {
     this.gimli.x = 1;
    }
   if (this.gimli.y + this.gimli.height > 400) {
    this.game.gameOver = true;
    }
  }

  drawGimli() {
    this.frame++;
    let img = new Image();
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(this.gimli.x,this.gimli.y, 80, 80);

    img.src = this.gimli.src;
    if (this.gimli.jumping){
    this.ctx.drawImage(img, this.spriteJumpArray[this.gimli.spriteJumpCounter % 3].x,
      this.spriteJumpArray[this.gimli.spriteJumpCounter % 3].y,
      this.spriteJumpArray[this.gimli.spriteJumpCounter % 3].width,
      this.spriteJumpArray[this.gimli.spriteJumpCounter % 3].height,
      this.gimli.x, this.gimli.y, 80, 80);
    } else if (this.idle ){
      this.ctx.drawImage(img, this.spriteIdleAnimation[Math.floor(this.gimli.spriteIdleCounter) % 4].x,
        this.spriteIdleAnimation[Math.floor(this.gimli.spriteIdleCounter) % 4].y,
        this.spriteIdleAnimation[Math.floor(this.gimli.spriteIdleCounter) % 4].width,
        this.spriteIdleAnimation[Math.floor(this.gimli.spriteIdleCounter) % 4].height,
        this.gimli.x, this.gimli.y, 80, 80);
    } else {
    this.ctx.drawImage(img, this.spriteWalkArray[this.gimli.spriteWalkCounter % 4].x,
      this.spriteJumpArray[this.gimli.spriteJumpCounter % 3].y,
      this.spriteWalkArray[this.gimli.spriteWalkCounter % 4].width,
      this.spriteJumpArray[this.gimli.spriteJumpCounter % 3].height,
      this.gimli.x, this.gimli.y, 80, 80);
    }
  }

  jumpAnimation(){
    this.gimli.jumping = true;
    setTimeout(() => {
      this.gimli.spriteJumpCounter ++;
      setTimeout(() => {
        this.gimli.spriteJumpCounter ++;
        this.gimli.jumping = false;
        this.gimli.spriteJumpCounter = 0;
      }, 400);
    }, 90);
  }

  gimliMovements(e) {
    switch(e.keyCode) {
      case 32: //space bar
        this.velY -= 7;
        this.idle = false;
        this.jumpAnimation();
        break;
    }
  }



  gimliStop(e) {
    this.frames = 0;
  }

  checkPlatformCollision() {
    for (let i = 0; i < this.platforms.length; i++) {
      if(this.velY > 0 &&
        (this.gimli.y + 80 >= this.platforms[i].y) &&
        (this.gimli.y + 80 <= this.platforms[i].y + platformHeight) &&
        (this.gimli.x + 80 >= this.platforms[i].x) &&
        (this.gimli.x <= this.platforms[i].x + platformWidth))
        {
          debugger
          this.gimli.y = this.platforms[i].y - 80;
          this.velY = 0;
        }
        else {
        }
    }
  }
}

module.exports = Gimli;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map