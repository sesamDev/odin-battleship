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

describe("Handle attacks", () => {
  test("Receive attack return coordinates of impact if nothing is hit", () => {
    const gameboard = new Gameboard();
    const attackPos = [2, 1];
    expect(gameboard.receiveAttack(attackPos[0], attackPos[1])).toBe(`Nothing hit at ${attackPos}`);
  });

  test("Trigger hit function on ship if it's hit", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(3, 1, 1, "Horizontal");

    expect(gameboard.receiveAttack(1, 1)).toBe("Ship hit");
  });

  test("Save coordinates of missed shots so they can be rendered", () => {
    const gameboard = new Gameboard();
    gameboard.receiveAttack(1, 1);
    expect(gameboard.missedShots.length).not.toBe(0);
  });
  test("Are some ships still floating?", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 1, 1, "Horizontal");
    expect(gameboard.hasAllShipsSunk()).toBe(false);
  });
  test("Have all ships been sunk?", () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 1, 1, "Horizontal");
    gameboard.placeShip(1, 2, 2, "Horizontal");
    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(2, 2);

    expect(gameboard.hasAllShipsSunk()).toBe(true);
  });
});
