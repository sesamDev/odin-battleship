// eslint-disable-next-line no-use-before-define, import/prefer-default-export
import { Ship } from "./ship";

// Function to generate positions on grid
// based on size of ship + starting grid position.
function generateGridPosition(size, x, y) {
  const arr = [];
  for (let index = 0; index < size; index += 1) {
    arr.push([x, y + index]);
  }
  return arr;
}

// Gameboard factory
export default class Gameboard {
  constructor() {
    this.activeShips = [];
  }

  placeShip = (size, x, y) => {
    const shipObj = new Ship(size);
    const position = generateGridPosition(size, x, y);
    this.activeShips.push({ shipObj, position });
  };
}
