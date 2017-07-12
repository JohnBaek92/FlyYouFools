// const Game = require("./game.js");
//
// document.addEventListener("DOMContentLoaded", () => {
//   const newGame = new Game();
//   debugger
//   document.addEventListener("keydown", newGame.startGame.bind(newGame), false);
// });


import Game from './game.js';



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 400;
  const game = new Game(canvas, ctx);
  game.gameLoop();

  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 13:
        if(game.currentState === 'splashScreen') {
          game.currentState = 'gameOn';
          game.startGame();
        }
        break;
      case 80:
          game.pauseGame();
        break;
      case 82:
      debugger
        if(game.currentState === 'gameOver') {
          console.log("restart");
          game.currentState = 'gameOn';
          game.restart();
        }
        break;
      case 32:
      if (game.currentState === 'gameOn') {
        game.gimli.gimliMovements();
      }
        break;
    }
  });
});
