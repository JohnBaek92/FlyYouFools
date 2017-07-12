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
