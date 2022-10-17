export default class UI {
  static gridXY = [10, 10];

  static render() {
    this.#appendToBody();
  }

  static #appendToBody() {
    const container = document.createElement("div");
    container.classList.add("container");
    const p1Board = this.#createGameboard("Sebastian");
    const p2Board = this.#createGameboard("HAL");

    container.append(p1Board, p2Board);
    document.body.append(container);
  }

  static #createGameboard(name) {
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

  // Not my best function..
  static screenPositionToGridPosition(clickedPosition) {
    let arr = [];
    if (clickedPosition.length === 2) {
      arr = clickedPosition.split("");
    }
    if (clickedPosition === "110") {
      const a = clickedPosition.split("");
      const b = a[1] + a[2];
      arr.push(a[0]);
      arr.push(b);
    }
    if (clickedPosition === "101") {
      const a = clickedPosition.split("");
      const b = a[0] + a[1];
      arr.push(b);
      arr.push(a[2]);
    }
    if (clickedPosition === "1010") {
      const a = clickedPosition.split("");
      const b = a[0] + a[1];
      arr.push(b);
      arr.push(a[2] + a[3]);
    }
    console.log(`From UI: ${arr} `);
    return clickedPosition;
  }
}
