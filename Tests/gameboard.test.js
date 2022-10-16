/* eslint-disable no-undef */
import Gameboard from "../Javascript/gameboard";

describe("Placing ships", () => {
  test("Placing 1x1 ship", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 1, 1);
    expect(gameboard.activeShips[0].position).toStrictEqual([[1, 1]]);
  });
  test("Placing 1x3 ship vertical", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 1, 1, "Vertical");
    expect(gameboard.activeShips[0].position).toStrictEqual([
      [1, 1],
      [1, 2],
      [1, 3],
    ]);
  });

  test("Choosing direction and placing ship horizontal", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 1, 1, "Horizontal");
    expect(gameboard.activeShips[0].position).toStrictEqual([
      [1, 1],
      [2, 1],
      [3, 1],
    ]);
  });

  test("Can't place outside of board (Horizontally)", () => {
    const gameboard = new Gameboard();
    expect(gameboard.placeShip(3, 9, 1, "Horizontal")).toBe("Invalid placement");
  });

  test("Can't place outside of board (Vertically)", () => {
    const gameboard = new Gameboard();
    expect(gameboard.placeShip(3, 1, 9, "Vertical")).toBe("Invalid placement");
  });
  test("Can't place on used grid positions", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 1, 1, "Vertical");
    expect(gameboard.placeShip(3, 1, 1, "Vertical")).toBe("Invalid placement");
  });
});

describe.skip("Handle attacks", () => {});
