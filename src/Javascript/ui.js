export default class UI {
  static gridXY = [10, 10];

  static render() {
    this.#appendToBody();
  }

  static #appendToBody() {
    const container = document.createElement("div");
    container.classList.add("container");
    const p1Board = this.#createGameboard();
    const p2Board = this.#createGameboard();

    container.append(p1Board, p2Board);
    document.body.append(container);
  }

  static #createGameboard() {
    const fragmnt = document.createDocumentFragment();
    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");
    for (let i = 0; i < this.gridXY[0]; i += 1) {
      for (let j = 0; j < this.gridXY[1]; j += 1) {
        const gridSquare = document.createElement("div");
        gridSquare.classList.add("grid-square");
        gridSquare.setAttribute("data-pos", `${j + 1}${i + 1}`); // +1 so that grid starts at 1,1
        boardContainer.appendChild(gridSquare);
      }
    }
    fragmnt.appendChild(boardContainer);
    return fragmnt;
  }

  static showPlacedShips(shipObjects) {
    const gridSquares = document.querySelectorAll(".grid-square");
    gridSquares.forEach((gridSquare) => {
      shipObjects.forEach((ship) => {
        ship.position.forEach((pos) => {
          if (`${pos[0]}${pos[1]}` === gridSquare.dataset.pos) {
            gridSquare.classList.add("ship");
          }
        });
      });
    });
  }
}
