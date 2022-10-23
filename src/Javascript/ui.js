import Gameboard from "./gameboard";

export default class UI {
  static gridXY = [10, 10];

  static activePlayers = 0;

  static render(player1) {
    this.#appendToBody();
    // this.#initEventlistners();
    this.handlePlacingShips(player1);
  }

  static #appendToBody() {
    const container = document.createElement("div");
    container.classList.add("container");
    const p1Board = this.#createGameboard("Sebastian");
    const p2Board = this.#createGameboard("HAL");

    container.append(this.#gameoverScreen(), this.#generateShipsToPick(), p1Board, p2Board);
    document.body.append(container);
  }

  static #increaseActivePlayers() {
    this.activePlayers += 1;
  }

  static #createGameboard(name) {
    this.#increaseActivePlayers();
    const fragmnt = document.createDocumentFragment();
    const boardContainer = document.createElement("div");
    const playerName = document.createElement("h2");
    playerName.innerText = name;
    boardContainer.classList.add("board-container");

    boardContainer.appendChild(playerName);
    for (let i = 0; i < this.gridXY[0]; i += 1) {
      for (let j = 0; j < this.gridXY[1]; j += 1) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.setAttribute("id", `P${this.activePlayers}`);
        gridSquare.setAttribute("data-pos", `${j + 1},${i + 1}`); // +1 so that grid starts at 1,1
        boardContainer.appendChild(gridSquare);
      }
    }
    fragmnt.appendChild(boardContainer);
    return fragmnt;
  }

  static #gameoverScreen() {
    const gameoverText = document.createElement("h1");
    gameoverText.innerText = "Gameover!";
    gameoverText.classList.add("gameover");
    gameoverText.classList.add("hide");

    return gameoverText;
  }

  static #shipContainer(index) {
    const shipGrid = document.createElement("div");
    shipGrid.classList.add("ship");
    shipGrid.classList.add(`not-placed${index}`);
    return shipGrid;
  }

  static #generateShipsToPick() {
    const shipSizes = [5, 4, 3, 3, 2];
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-container");
    shipSizes.forEach((shipSize, index) => {
      const shipToPick = document.createElement("div");
      shipToPick.setAttribute("id", `shipToPick${index}`);
      for (let i = 0; i < shipSize; i++) {
        shipToPick.appendChild(this.#shipContainer(i));
      }
      shipContainer.appendChild(shipToPick);
    });
    return shipContainer;
  }

  static showPlacedShips(shipObjects, player) {
    let gridSquares;
    if (player === "P1") {
      gridSquares = document.querySelectorAll("#P1");
    } else {
      gridSquares = document.querySelectorAll("#P2");
    }

    gridSquares.forEach((gridSquare) => {
      shipObjects.forEach((ship) => {
        ship.position.forEach((pos) => {
          if (`${pos[0]}${pos[1]}` === gridSquare.dataset.pos.split(",").join("")) {
            gridSquare.classList.add("ship");
          }
        });
      });
    });
  }

  static renderMissedShots(gameboard, player) {
    const { missedShots } = gameboard;
    missedShots.forEach((grid) => {
      const gridElement = document.querySelector(`#${player}[data-pos="${grid.join(",")}"]`);
      gridElement.classList.add("missed-shot");
    });
  }

  static renderHits(gameboard, player) {
    const { hits } = gameboard;
    hits.forEach((hit) => {
      const gridElement = document.querySelector(`#${player}[data-pos="${hit.join(",")}"]`);
      gridElement.classList.add("hit");
    });
  }

  static screenPositionToGridPosition(clickedPosition) {
    const arr = clickedPosition.split(",");
    return arr;
  }

  static handlePlacingShips(player1) {
    const numberOfShips = 5;

    for (let i = 0; i < numberOfShips; i++) {
      let ship = document.getElementById(`shipToPick${i}`);
      // Save starting position
      const startLeft = ship.style.left;
      const startTop = ship.style.top;
      let hoverOverPos;

      // document.addEventListener("mousemove", onMouseMove);
      ship.onmousedown = function (event) {
        console.log(ship.childNodes.length);
        // (1) prepare to moving: make absolute and on top by z-index
        ship.style.position = "absolute";
        ship.style.zIndex = 1000;

        // move it out of any current parents directly into body
        // to make it positioned relative to the body
        document.body.append(ship);

        // centers the ship at (pageX, pageY) coordinates
        function moveAt(pageX, pageY) {
          ship.style.left = pageX - ship.offsetWidth / 5 + "px";
          ship.style.top = pageY - ship.offsetHeight / 2 + "px";
        }

        // move our absolutely positioned ship under the pointer
        moveAt(event.pageX, event.pageY);

        function onMouseMove(event) {
          moveAt(event.pageX, event.pageY);
        }

        const player = player1;

        document.addEventListener(
          "mousemove",
          (e) => {
            console.clear();
            let arr = document.elementsFromPoint(e.clientX, e.clientY);
            let nArr = arr.filter((item) => item.classList.contains("grid-square"));
            try {
              hoverOverPos = nArr[0].dataset.pos.split(",");
              console.log(hoverOverPos);
            } catch (error) {
              throw "Not hovering over grid square " + error;
            }
          },
          { passive: true }
        );

        // (2) move the ship on mousemove
        document.addEventListener("mousemove", onMouseMove);

        // (3) drop the ship, remove unneeded handlers
        ship.onmouseup = function () {
          //ship.style.pointerEvents = "all";
          if (hoverOverPos !== undefined) {
            if (
              player.placeShip(
                ship.childNodes.length,
                parseInt(hoverOverPos[0]),
                parseInt(hoverOverPos[1]),
                "Horizontal"
              ) !== "Invalid placement"
            ) {
              console.log("Placed");
              ship.remove();
            } else {
              console.log("Not placed");
              const shipContainer = document.querySelector(".ship-container");
              shipContainer.append(ship);
              ship.style.left = startLeft;
              ship.style.top = startTop;
              document.removeEventListener("mousemove", onMouseMove);
              ship.onmouseup = null;
            }
            UI.showPlacedShips(player.activeShips, "P1");
          }
        };
      };
    }
  }
}
