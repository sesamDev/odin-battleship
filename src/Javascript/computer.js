import Player from "./player";

export default class Computer extends Player {
  constructor(name) {
    super(name);
    this.turn = false;
    this.availableMoves = (() => {
      const arr = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          arr.push([j + 1, i + 1]);
        }
      }
      return arr;
    })();
  }

  attack() {
    const randAttackPos = this.#getRandomPosition();
    console.log(`Attack pos: ${randAttackPos}`);
    console.log(this.#removePosFromAvailableMoves(randAttackPos));
    return [randAttackPos[0], randAttackPos[1]];
  }

  // Return a random position [x,y], used for the attack func.
  // Cannot return a given position more than once.
  #getRandomPosition() {
    const posArr = this.availableMoves;
    const randIndex = Math.floor(Math.random() * posArr.length);

    return posArr[randIndex];
  }

  // Used so #getRandomPosition wont get same position more than once.
  #removePosFromAvailableMoves(pos) {
    const arr = this.availableMoves;
    const newArr = arr.filter((p) => p !== pos);
    this.availableMoves = newArr;
  }
}
