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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Platform = __webpack_require__(4);
const Gimli = __webpack_require__(3);
const Background = __webpack_require__(1);

const platformColor = "rgba(120,120,120,1)";
const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 280;
const platformHeight = 10;
const numPlatforms = 4;

class Game {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;

    this.background = new Background(this.canvas, this.ctx, 2);

    this.score = 0;
    this.gameID = 0;
    this.currentState = "splashScreen";

    window.platforms = this.platforms;
    this.startPlatform = [];
    this.platforms = [];
    this.canvasYSeperator = [[45,100], [101, 200], [201, 300], [301, 330]];
    this.canvasXSeperator = [[150,150], [201,201], [350, 350], [275,275], [75,75]];

    this.gameLoop = this.gameLoop.bind(this);
    this.splashScreen = this.splashScreen.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.createPlatforms = this.createPlatforms.bind(this);
    this.gimli = new Gimli(this, this.ctx, this.platforms, this.startPlatform);
  }

  startGame(){
    this.createStartPlatform();
    setTimeout(() => this.createPlatforms() , 500);
    window.addEventListener("keydown", this.gimli.gimliMovements, false);
    window.addEventListener("keyup", this.gimli.gimliStop, false);
    setTimeout(() => this.startPlatform.pop(), 5000);
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

  splashScreen() {
    const img = new Image();
    img.src = "assets/gandalf.jpg";
    this.ctx.drawImage(img, 0, 0, 502, 294, 0, 0, canvasWidth, canvasHeight);
  }

  pauseGame() {
    debugger
  if (this.currentState === 'gameOn') {
    this.currentState = 'paused';

  } else {
    console.log('unpaused');
    this.gameID = window.requestAnimationFrame(this.gameLoop);
    this.currentState = 'gameOn';

  }
}

  // pauseGame() {
  //   if(this.currentState === 'gameOn') {
  //     this.currentState = 'paused';
  //   } else {
  //     this.currentState = 'gameOn';
  //   }
  // }

  gameOn() {
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
  }

  gameOver(){
    this.clearCanvas();
    console.log("gameOver");
  }

  gameLoop() {
    switch(this.currentState) {
      case 'splashScreen':
        this.splashScreen();
        break;
      case 'gameOn':
        this.gameOn();
        break;
      case 'gameOver':
        this.gameOver();
        break;
      default:
        this.splashScreen();
    }

    if (this.currentState !== 'paused' ) {
       this.gameID = window.requestAnimationFrame(this.gameLoop);
    } else {
       window.cancelAnimationFrame(this.gameID);
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


/***/ }),
/* 1 */
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__game_js__);
// const Game = require("./game.js");
//
// document.addEventListener("DOMContentLoaded", () => {
//   const newGame = new Game();
//   debugger
//   document.addEventListener("keydown", newGame.startGame.bind(newGame), false);
// });






document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 400;
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js___default.a(canvas, ctx);
  game.gameLoop();

  document.addEventListener('keypress', (e) => {
    switch (e.keyCode) {
      case 13:
      console.log('yo');
        if(game.currentState === 'splashScreen') {
          game.currentState = 'gameOn';
          game.startGame();
        }
        break;
      case 112:

          game.pauseGame();

        break;
      default:
        console.log('Invalid Key');
    }
  });

});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 375;
const platformHeight = 10;
const startPlatformWidth = 1000;

class Gimli {
  constructor(game, ctx, platforms, startPlatform) {
    this.ctx = ctx;
    this.game = game;
    this.startPlatform = startPlatform;
    this.platforms = platforms;
    this.frames = 0;
    this.idle = false;
    this.gravity = 0.20;
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
      canJump: false,
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
    this.checkPlatformCollision();
    this.frames++;
    if (this.frames > 5) {
      this.idle = true;
    }

    if (this.idle){
      this.gimli.spriteIdleCounter += 0.05;
    }

    this.gimli.y += this.velY;
    this.velY += this.gravity;
    if (this.gimli.y < 0) {
      this.gimli.y = 0;
      this.velY = 0;
    }
   if (this.gimli.y + this.gimli.height > 400) {
    this.game.currentState = 'gameOver';
    }
  }

  drawGimli() {
    this.frame++;
    let img = new Image();
    img.src = this.gimli.src;

    this.ctx.fillStyle = '#FFFFFF';

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
    if(this.gimli.canJump === true) {
      switch(e.keyCode) {
        case 32: //space bar
        this.velY -= 7;
        this.idle = false;
        this.gimli.canJump = false;
        this.jumpAnimation();
        break;
      }
    }
  }



  gimliStop(e) {
    this.frames = 0;
  }

  checkPlatformCollision() {
    if(this.startPlatform[0]) {
      if(this.velY > 0 &&
        (this.gimli.y + 80 >= this.startPlatform[0].y) &&
        (this.gimli.y + 80 <= this.startPlatform[0].y + platformHeight) &&
        (this.gimli.x + 80 >= this.startPlatform[0].x) &&
        (this.gimli.x <= this.startPlatform[0].x + startPlatformWidth))
        {
          this.gimli.y = this.startPlatform[0].y - 80;
          this.velY = 0;
          this.gimli.canJump = true;
        }
        else {
      }
    }
    for (let i = 0; i < this.platforms.length; i++) {
      if(this.velY > 0 &&
        (this.gimli.y + 80 >= this.platforms[i].y) &&
        (this.gimli.y + 80 <= this.platforms[i].y + platformHeight) &&
        (this.gimli.x + 80 >= this.platforms[i].x) &&
        (this.gimli.x <= this.platforms[i].x + platformWidth))
        {
          this.gimli.y = this.platforms[i].y - 80;
          this.velY = 0;
          this.gimli.canJump = true;
        }
        else {
        }
    }
  }
}

module.exports = Gimli;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

const platformColor = "rgba(120,120,120,1)";
const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 280;
const platformHeight = 10;
const startPlatformWidth = 1000;

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map