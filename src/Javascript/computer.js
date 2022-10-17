import Player from "./player";

export default class Computer extends Player {
  constructor(name) {
    super(name);
    this.turn = false;
  }

  attack() {
    const randX = Math.floor(Math.random() * 10) + 1; // Returns a random integer from 1 to 2:
    const randY = Math.floor(Math.random() * 10) + 1; // Returns a random integer from 1 to 2:

    return [randX, randX];
  }
}
