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
  static shipType = {
    carrier: { size: 5 },
    battleship: { size: 4 },
    destroyer: { size: 3 },
    submarine: { size: 3 },
    patrolBoat: { size: 2 },
  };

  constructor() {
    this.activeShips = [];
    this.occupiedPositions = [];
    this.missedShots = [];
    this.hits = [];
  }

  placeShip = (size, x, y, direction) => {
    const shipObj = new Ship(size);
    let position = [];
    if (this.#checkPositionValid(size, x, y, direction)) {
      position = generateGridPosition(size, x, y, direction);
      this.activeShips.push({ shipObj, position });
      position.forEach((pos) => {
        this.occupiedPositions.push(pos);
      });
      return "Placed ship";
    }
    return "Invalid placement";
  };

  receiveAttack(x, y) {
    const attackPos = `${x},${y}`;
    for (let i = 0; i < this.activeShips.length; i += 1) {
      const ship = this.activeShips[i];
      for (let j = 0; j < ship.position.length; j += 1) {
        const position = ship.position[j].toString();
        if (position === attackPos) {
          this.hits.push([x, y]);

          return ship.shipObj.hit();
        }
      }
    }
    this.missedShots.push([x, y]);
    return `Nothing hit at ${attackPos}`;
  }

  hasAllShipsSunk() {
    const shipStatus = [];
    for (let i = 0; i < this.activeShips.length; i += 1) {
      const ship = this.activeShips[i];
      shipStatus.push(ship.shipObj.isSunk());
    }

    if (shipStatus.includes(false)) {
      return false;
    }
    return true;
  }

  #checkPositionValid(size, x, y, direction) {
    const maxGridXY = [10, 10];
    const minGridXY = [1, 1];
    const pos = generateGridPosition(size, x, y, direction);
    if (this.#gridPositionOccupied(pos)) {
      return false;
    }
    for (let index = 0; index < size; index += 1) {
      if (pos[index][0] > maxGridXY[0] || pos[index][0] < minGridXY[0]) {
        return false;
      }
      if (pos[index][1] > maxGridXY[1] || pos[index][1] < minGridXY[1]) {
        return false;
      }
    }

    return true;
  }

  #gridPositionOccupied(pos) {
    for (let i = 0; i < this.occupiedPositions.length; i += 1) {
      for (let j = 0; j < pos.length; j += 1) {
        if (this.occupiedPositions[i].toString() === pos[j].toString()) {
          return true;
        }
      }
    }
    return false;
  }

  static placements = [
    [
      [4, 1, "Vertical"],
      [1, 9, "Horizontal"],
      [6, 3, "Horizontal"],
      [8, 7, "Horizontal"],
      [1, 2, "Horizontal"],
    ],
    [
      [4, 10, "Horizontal"],
      [4, 5, "Vertical"],
      [6, 2, "Horizontal"],
      [7, 5, "Horizontal"],
      [2, 2, "Vertical"],
    ],
  ];

  static placeShipsAtRandomLocation(func) {
    const arr = Object.values(this.shipType);
    const rand = Math.floor(Math.random() * 2); // Returns a random integer from 1 to 2:
    for (let i = 0; i < arr.length; i++) {
      const ship = arr[i];
      func(ship.size, this.placements[rand][i][0], this.placements[rand][i][1], this.placements[rand][i][2]);
    }
  }
}
