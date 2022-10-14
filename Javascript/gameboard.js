// eslint-disable-next-line no-use-before-define, import/prefer-default-export
import { Ship } from "./ship";

// Function to generate positions on grid
// based on size of ship + starting grid position.
function generateGridPosition(size, x, y, direction) {
  const arr = [];

  for (let index = 0; index < size; index += 1) {
    // Used to place ship horizontal och vertically
    if (direction === "Vertical") {
      arr.push([x, y + index]);
    } else {
      arr.push([x + index, y]); // Default to horizontal placement
    }
  }
  return arr;
}

// Gameboard factory
export default class Gameboard {
  constructor() {
    this.activeShips = [];
  }

  placeShip = (size, x, y, direction) => {
    const shipObj = new Ship(size);
    const position = generateGridPosition(size, x, y, direction);
    this.activeShips.push({ shipObj, position });
  };
}
