import Gameboard from "./gameboard";
import Player from "./player";
import Computer from "./computer";
import UI from "./ui";
import "../CSS/style.css";

// Main game loop
const playerGameboard = new Gameboard();
const aiGameboard = new Gameboard();
let gameOver = false;

const player = new Player("Sebastian");
const aiPlayer = new Computer("HAL");

// Just while testing
playerGameboard.placeShip(Gameboard.shipType.carrier.size, 10, 1, "Vertical");
playerGameboard.placeShip(Gameboard.shipType.battleship.size, 1, 2, "Horizontal");
playerGameboard.placeShip(Gameboard.shipType.destroyer.size, 1, 3, "Horizontal");
playerGameboard.placeShip(Gameboard.shipType.submarine.size, 1, 4, "Horizontal");
playerGameboard.placeShip(Gameboard.shipType.patrolBoat.size, 1, 5, "Horizontal");

// aiGameboard.placeShip(Gameboard.shipType.carrier.size, 1, 1, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.battleship.size, 1, 2, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.destroyer.size, 1, 3, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.submarine.size, 1, 4, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.patrolBoat.size, 1, 5, "Horizontal");

Gameboard.placeShipsAtRandomLocation(aiGameboard.placeShip);
// Render UI
UI.render();
UI.showPlacedShips(playerGameboard.activeShips, "P1");
UI.showPlacedShips(aiGameboard.activeShips, "P2");

// Place ships
// P1 starts
player.turn = true;
const boardContainers = document.querySelectorAll(".board-container");
boardContainers.forEach((container) => {
  container.addEventListener("click", (e) => {
    if (!gameOver) {
      const { pos } = e.target.dataset;
      const posArray = UI.screenPositionToGridPosition(pos);
      aiGameboard.receiveAttack(posArray[0], posArray[1]);
      // render hit if it's a hit
      UI.renderHits(aiGameboard, "P2"); // render hit if it's a hit
      // else render missed shot
      UI.renderMissedShots(aiGameboard, "P2"); // else render missed shot
      // check if gameover
      console.log(aiGameboard.hasAllShipsSunk());
      if (aiGameboard.hasAllShipsSunk()) {
        console.log("Gameover!");
        gameOver = true;
      }
      // switch turn
      if (player.turn) {
        player.turn = false;
        aiPlayer.turn = true;
      } else {
        player.turn = true;
        aiPlayer.turn = false;
      }
    }
  });
});
// ###Loop starts here###
// P1 attacks
// check for hit
