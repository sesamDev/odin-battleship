// eslint-disable-next-line no-use-before-define, import/prefer-default-export
export { Ship };

class Ship {
  constructor(length) {
    this.length = length;
    this.hitsTaken = 0;
  }

  hit = () => {
    this.hitsTaken += 1;
    return "Ship hit";
  };

  isSunk = () => this.hitsTaken === this.length;
}
