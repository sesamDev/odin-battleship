export default class UI {
  static gridXY = [10, 10];

  static activePlayers = 0;

  static render() {
    this.#appendToBody();
    // this.#initEventlistners();
  }

  static #appendToBody() {
    const container = document.createElement("div");
    container.classList.add("container");
    const p1Board = this.#createGameboard("Sebastian");
    const p2Board = this.#createGameboard("HAL");

    container.append(p1Board, p2Board);
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
}
