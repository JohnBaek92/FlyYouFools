const Platform = require("./platform.js");
const Gimli = require("./gimli.js");
const Background = require("./background.js");
const LOTRMusic = new Audio('assets/lotr.mp3');

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
    this.platformID = 0;
    this.currentState = "splashScreen";

    window.platforms = this.platforms;
    this.startPlatform = [];
    this.platforms = [];
    this.canvasYSeperator = [[45,100], [101, 200], [201, 300], [301, 330]];
    this.canvasXSeperator = [[150,150], [201,201], [350, 350], [275,275], [75,75]];

    this.scorePushed = false;
    this.username = "";
    this.highscores = [];
    this.songIsPlaying = true;

    this.gameLoop = this.gameLoop.bind(this);
    this.splashScreen = this.splashScreen.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.updateScore = this.updateScore.bind(this);
    this.pauseGame = this.pauseGame.bind(this);
    this.drawBackground = this.drawBackground.bind(this);
    this.createPlatforms = this.createPlatforms.bind(this);
    this.gameOver = this.gameOver.bind(this);
    this.getHighScores = this.getHighScores.bind(this);
    this.gimli = new Gimli(this, this.ctx, this.platforms, this.startPlatform);
  }

  startGame(){
    if (typeof LOTRMusic.loop == 'boolean') {
      LOTRMusic.loop = true;
    } else {
      LOTRMusic.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
      }, false);
    }
    LOTRMusic.play();
    this.createStartPlatform();
    this.platformID = setTimeout(() => this.createPlatforms() , 500);
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  createStartPlatform() {
    let x = 0;
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
    img.src = "assets/gandalfTest.jpg";
    this.ctx.drawImage(img, 0, 0, 502, 294, 0, 0, canvasWidth, canvasHeight);
  }

  pauseGame() {
    if (this.currentState === 'gameOn') {
      this.currentState = 'paused';
      LOTRMusic.pause();
    } else {
      this.gameID = window.requestAnimationFrame(this.gameLoop);
      this.currentState = 'gameOn';
      LOTRMusic.play();
    }
  }

  restart() {
    this.platforms = [];
    this.startPlatform = [];
    this.gimli = null;
    this.restarted = true;
    this.scorePushed = false;
    this.gimli = new Gimli(this, this.ctx, this.platforms, this.startPlatform);
    this.startGame();
    this.score = 0;

  }

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

  getHighScores(){
    let scoresTable = window.firebase.database().ref("scores");
    scoresTable.orderByChild("score")
      .limitToLast(5).on('value', (snapshot, highscores) => {
        highscores = [];
        snapshot.forEach((childSnapshot) => {
          highscores.push((childSnapshot.val()));
        });
        this.highscores= highscores.reverse();
      });
  }

  gameOver(){
    this.getHighScores();
    this.clearCanvas();
    this.currentState = 'gameOver';
    this.sendScore();
    this.ctx.fillStyle = "white";
    this.ctx.font = "27px sans-serif";
    this.ctx.fillText(`Gimli did not make it past the mines of Moria`, 220, 150);
    this.ctx.strokeText(`Gimli did not make it past the mines of Moria`, 220, 150);
    let textPos = this.canvas.height / 2;
    this.highscores.forEach((score) => {
      this.ctx.fillText(`${score.username}`, this.canvas.width / 2 - 200, textPos);
      this.ctx.fillText(`${score.score}`, this.canvas.width / 2 + 200, textPos);
      textPos += 30;
    });
  }

  sendScore() {
    if (!this.scorePushed) {
      this.scorePushed = true;
      let newscore = window.firebase.database().ref("scores").push();
      window.newscore = newscore;
      newscore.set({
        username: this.username,
        score: parseInt(this.score)
      });
    }
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

  toggleSound() {
  if (this.songIsPlaying) {
    this.songIsPlaying = false;
    LOTRMusic.pause();
  } else {
    this.songIsPlaying = true;
    LOTRMusic.play();
  }
}
}

module.exports = Game;
