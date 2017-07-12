const canvasWidth = 1000;
const canvasHeight = 400;
const platformWidth = 375;
const platformHeight = 10;
const startPlatformWidth = 1200;

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
        this.velY -= 7;
        this.idle = false;
        this.gimli.canJump = false;
        this.jumpAnimation();
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
