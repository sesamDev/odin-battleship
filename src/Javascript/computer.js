import Player from "./player";

export default class Computer extends Player {
  constructor(name) {
    super(name);
    this.turn = false;
  }
}
