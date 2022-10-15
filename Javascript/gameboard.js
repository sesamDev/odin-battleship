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

function checkPositionValid(size, x, y, direction) {
  const maxGridXY = [10, 10];
  const minGridXY = [1, 1];
  const pos = generateGridPosition(size, x, y, direction);

  for (let index = 0; index < size; index++) {
    if (pos[index][0] > maxGridXY[0] || pos[index][0] < minGridXY[0]) {
      // Need to loop through these [ [ 9, 1 ], [ 10, 1 ], [ 11, 1 ] ]
      return false;
    }
    if (pos[index][1] > maxGridXY[1] || pos[index][1] < minGridXY[1]) {
      return false;
    }
  }

  return true;
}

// Gameboard factory
export default class Gameboard {
  constructor() {
    this.activeShips = [];
  }

  placeShip = (size, x, y, direction) => {
    const shipObj = new Ship(size);
    let position = [];
    if (checkPositionValid(size, x, y, direction)) {
      position = generateGridPosition(size, x, y, direction);
      this.activeShips.push({ shipObj, position });
      return "Placed ship";
    }
    return "Invalid placement";
  };
}
