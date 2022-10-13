/* eslint-disable no-undef */
import Gameboard from "../Javascript/gameboard";

describe("Placing ships", () => {
  test("Placing 1x1 ship", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 1, 1);
    expect(gameboard.activeShips[0].position).toStrictEqual([[1, 1]]);
  });
  test("Placing 1x3 ship", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 1, 1);
    expect(gameboard.activeShips[0].position).toStrictEqual([
      [1, 1],
      [1, 2],
      [1, 3],
    ]);
  });

  test.skip("Choosing direction and placing ship", () => {});

  test.skip("Can't place outside of board", () => {});

  test.skip("Can't place on used grid positions", () => {});
});

describe.skip("Handle attacks", () => {});
