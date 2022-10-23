import Gameboard from "./gameboard";
import Player from "./player";
import Computer from "./computer";
import UI from "./ui";
import "../CSS/style.css";

// Create gameboards
const playerGameboard = new Gameboard();
const aiGameboard = new Gameboard();

//Create players - need to add option to set player name
const player = new Player("Sebastian");
const aiPlayer = new Computer("HAL");

// Bool that will be true when all ships have been sunk on one team.
let gameover = false;

// Just while testing - Replaced with function to place player ships by hand.
// playerGameboard.placeShip(Gameboard.shipType.carrier.size, 10, 1, "Vertical");
// playerGameboard.placeShip(Gameboard.shipType.battleship.size, 1, 2, "Horizontal");
// playerGameboard.placeShip(Gameboard.shipType.destroyer.size, 1, 3, "Horizontal");
// playerGameboard.placeShip(Gameboard.shipType.submarine.size, 1, 4, "Horizontal");
// playerGameboard.placeShip(Gameboard.shipType.patrolBoat.size, 1, 5, "Horizontal");

// "Randomly" place enemy ships
Gameboard.placeShipsAtRandomLocation(aiGameboard.placeShip);

// Render UI
UI.render(playerGameboard);
UI.showPlacedShips(playerGameboard.activeShips, "P1");

// Get the gameover screen - To be placed in UI class
const gameoverText = document.querySelector(".gameover");

// Slow down speed of game between computer and player turn.
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// P1 starts
player.turn = true;

// Get both playerboards - Could be moved to UI class
const boardContainers = document.querySelectorAll(".board-container");

// Main game loop - Fires with each player click.
boardContainers.forEach((container) => {
  container.addEventListener("click", async (e) => {
    if (!gameover) {
      // Get clicked position
      const { pos } = e.target.dataset;

      // Turn it into an array [x,y]
      const posArray = UI.screenPositionToGridPosition(pos);

      // Passing X and Y
      aiGameboard.receiveAttack(posArray[0], posArray[1]);

      // Reference to aiPlayer.attack(), returns array [x,y]
      const aiAttackPos = aiPlayer.attack();

      // Render hit if it's a hit on AI board.
      UI.renderHits(aiGameboard, "P2"); // render hit if it's a hit

      // Render missed shot on AI board.
      UI.renderMissedShots(aiGameboard, "P2"); // else render missed shot

      // Sleep to slow down game tempo
      await sleep(1000);

      // Attack players board with aiPlayer.attack()
      playerGameboard.receiveAttack(aiAttackPos[0], aiAttackPos[1]);

      // Render hit if it's a hit on player board.
      UI.renderHits(playerGameboard, "P1");

      // Render missed shot on player board.
      UI.renderMissedShots(playerGameboard, "P1");

      // Check if gameover - Need to add who won...
      if (aiGameboard.hasAllShipsSunk() || playerGameboard.hasAllShipsSunk()) {
        gameover = true;
        gameoverText.classList.remove("hide");
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

let ball = document.getElementById("shipToPick0");

// document.addEventListener("mousemove", onMouseMove);
ball.onmousedown = function (event) {
  // (1) prepare to moving: make absolute and on top by z-index
  ball.style.position = "absolute";
  ball.style.zIndex = 1000;

  // move it out of any current parents directly into body
  // to make it positioned relative to the body
  document.body.append(ball);

  // centers the ball at (pageX, pageY) coordinates
  function moveAt(pageX, pageY) {
    ball.style.left = pageX - ball.offsetWidth / 5 + "px";
    ball.style.top = pageY - ball.offsetHeight / 2 + "px";
  }

  // move our absolutely positioned ball under the pointer
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) move the ball on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // (3) drop the ball, remove unneeded handlers
  ball.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    ball.onmouseup = null;
  };
};
