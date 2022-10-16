/* eslint-disable no-undef */
import { Ship } from "../src/Javascript/ship";

describe("Spawn new ship object", () => {
  const spawnedShip = new Ship(5);
  test("Ship is desired length", () => {
    expect(spawnedShip.length).toBe(5);
  });

  test("Number of hits increased", () => {
    // Ship hit once
    spawnedShip.hit();
    expect(spawnedShip.hitsTaken).toBe(1);
  });

  test("Ship has been sunk", () => {
    // Ship hit 5 times
    spawnedShip.hit();
    spawnedShip.hit();
    spawnedShip.hit();
    spawnedShip.hit();
    expect(spawnedShip.isSunk()).toBe(true);
  });
});
