const Game = require("./game.js");

document.addEventListener("DOMContentLoaded", () => {
  const newGame = new Game();
  document.addEventListener("keydown", newGame.startGame.bind(newGame), false);
});
