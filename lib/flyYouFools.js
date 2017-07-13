import Game from './game.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = 1000;
  canvas.height = 400;
  const game = new Game(canvas, ctx);
  game.gameLoop();

  let modal = document.getElementById('usernameModal');
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  modal.style.display = "block";
  let usernameSubmit = document.getElementById('usernameSubmit');
  let usernameInput = document.getElementById('usernameInput');
  usernameSubmit.onclick = function(e) {
    game.username = usernameInput.value;
    modal.style.display = "none";
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 83:
        if(game.currentState === 'splashScreen') {
          game.currentState = 'gameOn';
          game.startGame();
        }
        break;
        case 80:
        if(game.currentState !== 'gameOver') {
          game.pauseGame();
          LOTRMusic.pause();
        }
        break;
        case 82:
        if(game.currentState === 'gameOver') {
          game.currentState = 'gameOn';
          game.restart();
        }
        break;
        case 87:
        if (game.currentState === 'gameOn') {
          game.gimli.gimliMovements();
        }
        break;
        case 84:
        game.toggleSound();
      }
    });
  };

});
