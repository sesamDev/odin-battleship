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
        boardContainer.appendChild(gridSquare);
      }
    }
    fragmnt.appendChild(boardContainer);
    return fragmnt;
  }
}
