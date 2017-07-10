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
    if (this.gimli.x + canvasWidth > 0 || this.gimli.x + canvasWidth < canvasWidth) {
     this.gimli.x += this.velX;
   }
  }

  drawGimli() {
    this.frame++;
    let img = new Image();
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
        (this.gimli.y + this.gimli.height > this.platforms[i].y -65) &&
        (this.gimli.y + this.gimli.height < this.platforms[i].y + platformHeight -65) &&
        (this.gimli.x + this.gimli.width > this.platforms[i].x) &&
        (this.gimli.x < this.platforms[i].x + platformWidth))
        {
          this.gimli.y = this.platforms[i].y - 62;
          this.velY = 0;
        }
        else {
        }
    }
  }
}

module.exports = Gimli;
