"use strict";
(self["webpackChunkodin_battleship"] = self["webpackChunkodin_battleship"] || []).push([["main"],{

/***/ "./src/Javascript/app.js":
/*!*******************************!*\
  !*** ./src/Javascript/app.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/Javascript/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./player */ "./src/Javascript/player.js");
/* harmony import */ var _computer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computer */ "./src/Javascript/computer.js");
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ui */ "./src/Javascript/ui.js");
/* harmony import */ var _CSS_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../CSS/style.css */ "./src/CSS/style.css");






// Create gameboards
const playerGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
const aiGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();

//Create players - need to add option to set player name
const player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]("Sebastian");
const aiPlayer = new _computer__WEBPACK_IMPORTED_MODULE_2__["default"]("HAL");

// Bool that will be true when all ships have been sunk on one team.
let gameover = false;

// Just while testing - Replaced with function to place player ships by hand.
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.carrier.size, 10, 1, "Vertical");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.battleship.size, 1, 2, "Horizontal");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.destroyer.size, 1, 3, "Horizontal");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.submarine.size, 1, 4, "Horizontal");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.patrolBoat.size, 1, 5, "Horizontal");

// "Randomly" place enemy ships
_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].placeShipsAtRandomLocation(aiGameboard.placeShip);

// Render UI
_ui__WEBPACK_IMPORTED_MODULE_3__["default"].render();
_ui__WEBPACK_IMPORTED_MODULE_3__["default"].showPlacedShips(playerGameboard.activeShips, "P1");

// Get the gameover screen - To be placed in UI class
const gameoverText = document.querySelector(".gameover");

// Slow down speed of game between computer and player turn.
const sleep = ms => new Promise(r => setTimeout(r, ms));

// P1 starts
player.turn = true;

// Get both playerboards - Could be moved to UI class
const boardContainers = document.querySelectorAll(".board-container");

// Main game loop - Fires with each player click.
boardContainers.forEach(container => {
  container.addEventListener("click", async e => {
    if (!gameover) {
      // Get clicked position
      const {
        pos
      } = e.target.dataset;

      // Turn it into an array [x,y]
      const posArray = _ui__WEBPACK_IMPORTED_MODULE_3__["default"].screenPositionToGridPosition(pos);

      // Passing X and Y
      aiGameboard.receiveAttack(posArray[0], posArray[1]);

      // Reference to aiPlayer.attack(), returns array [x,y]
      const aiAttackPos = aiPlayer.attack();

      // Render hit if it's a hit on AI board.
      _ui__WEBPACK_IMPORTED_MODULE_3__["default"].renderHits(aiGameboard, "P2"); // render hit if it's a hit

      // Render missed shot on AI board.
      _ui__WEBPACK_IMPORTED_MODULE_3__["default"].renderMissedShots(aiGameboard, "P2"); // else render missed shot

      // Sleep to slow down game tempo
      await sleep(1000);

      // Attack players board with aiPlayer.attack()
      playerGameboard.receiveAttack(aiAttackPos[0], aiAttackPos[1]);

      // Render hit if it's a hit on player board.
      _ui__WEBPACK_IMPORTED_MODULE_3__["default"].renderHits(playerGameboard, "P1");

      // Render missed shot on player board.
      _ui__WEBPACK_IMPORTED_MODULE_3__["default"].renderMissedShots(playerGameboard, "P1");

      // Check if gameover - Need to add who won...
      if (aiGameboard.hasAllShipsSunk() || playerGameboard.hasAllShipsSunk()) {
        gameover = true;
        gameoverText.classList.remove("hide");
      }
      // switch turn
      if (player.turn) {
        player.turn = false;
        aiPlayer.turn = true;
      } else {
        player.turn = true;
        aiPlayer.turn = false;
      }
    }
  });
});

/***/ }),

/***/ "./src/Javascript/computer.js":
/*!************************************!*\
  !*** ./src/Javascript/computer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Computer)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/Javascript/player.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _getRandomPosition = /*#__PURE__*/new WeakSet();
var _removePosFromAvailableMoves = /*#__PURE__*/new WeakSet();
class Computer extends _player__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name) {
    super(name);
    _classPrivateMethodInitSpec(this, _removePosFromAvailableMoves);
    _classPrivateMethodInitSpec(this, _getRandomPosition);
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
    const randAttackPos = _classPrivateMethodGet(this, _getRandomPosition, _getRandomPosition2).call(this);
    console.log(`Attack pos: ${randAttackPos}`);
    console.log(_classPrivateMethodGet(this, _removePosFromAvailableMoves, _removePosFromAvailableMoves2).call(this, randAttackPos));
    return [randAttackPos[0], randAttackPos[1]];
  }
}
function _getRandomPosition2() {
  const posArr = this.availableMoves;
  const randIndex = Math.floor(Math.random() * posArr.length);
  return posArr[randIndex];
}
function _removePosFromAvailableMoves2(pos) {
  const arr = this.availableMoves;
  const newArr = arr.filter(p => p !== pos);
  this.availableMoves = newArr;
}

/***/ }),

/***/ "./src/Javascript/gameboard.js":
/*!*************************************!*\
  !*** ./src/Javascript/gameboard.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/Javascript/ship.js");
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }
// eslint-disable-next-line no-use-before-define, import/prefer-default-export


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
var _checkPositionValid = /*#__PURE__*/new WeakSet();
var _gridPositionOccupied = /*#__PURE__*/new WeakSet();
class Gameboard {
  constructor() {
    _classPrivateMethodInitSpec(this, _gridPositionOccupied);
    _classPrivateMethodInitSpec(this, _checkPositionValid);
    _defineProperty(this, "placeShip", (size, x, y, direction) => {
      const shipObj = new _ship__WEBPACK_IMPORTED_MODULE_0__.Ship(size);
      let position = [];
      if (_classPrivateMethodGet(this, _checkPositionValid, _checkPositionValid2).call(this, size, x, y, direction)) {
        position = generateGridPosition(size, x, y, direction);
        this.activeShips.push({
          shipObj,
          position
        });
        position.forEach(pos => {
          this.occupiedPositions.push(pos);
        });
        return "Placed ship";
      }
      return "Invalid placement";
    });
    this.activeShips = [];
    this.occupiedPositions = [];
    this.missedShots = [];
    this.hits = [];
  }
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
  static placeShipsAtRandomLocation(func) {
    const arr = Object.values(this.shipType);
    const rand = Math.floor(Math.random() * 2); // Returns a random integer from 1 to 2:
    for (let i = 0; i < arr.length; i++) {
      const ship = arr[i];
      func(ship.size, this.placements[rand][i][0], this.placements[rand][i][1], this.placements[rand][i][2]);
    }
  }
}
function _checkPositionValid2(size, x, y, direction) {
  const maxGridXY = [10, 10];
  const minGridXY = [1, 1];
  const pos = generateGridPosition(size, x, y, direction);
  if (_classPrivateMethodGet(this, _gridPositionOccupied, _gridPositionOccupied2).call(this, pos)) {
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
function _gridPositionOccupied2(pos) {
  for (let i = 0; i < this.occupiedPositions.length; i += 1) {
    for (let j = 0; j < pos.length; j += 1) {
      if (this.occupiedPositions[i].toString() === pos[j].toString()) {
        return true;
      }
    }
  }
  return false;
}
_defineProperty(Gameboard, "shipType", {
  carrier: {
    size: 5
  },
  battleship: {
    size: 4
  },
  destroyer: {
    size: 3
  },
  submarine: {
    size: 3
  },
  patrolBoat: {
    size: 2
  }
});
_defineProperty(Gameboard, "placements", [[[4, 1, "Vertical"], [1, 9, "Horizontal"], [6, 3, "Horizontal"], [8, 7, "Horizontal"], [1, 2, "Horizontal"]], [[4, 10, "Horizontal"], [4, 5, "Vertical"], [6, 2, "Horizontal"], [7, 5, "Horizontal"], [2, 2, "Vertical"]]]);

/***/ }),

/***/ "./src/Javascript/player.js":
/*!**********************************!*\
  !*** ./src/Javascript/player.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Player)
/* harmony export */ });
class Player {
  constructor(name) {
    this.name = name;
    this.turn = false;
  }
}

/***/ }),

/***/ "./src/Javascript/ship.js":
/*!********************************!*\
  !*** ./src/Javascript/ship.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
// eslint-disable-next-line no-use-before-define, import/prefer-default-export

class Ship {
  constructor(length) {
    _defineProperty(this, "hit", () => {
      this.hitsTaken += 1;
      return "Ship hit";
    });
    _defineProperty(this, "isSunk", () => this.hitsTaken === this.length);
    this.length = length;
    this.hitsTaken = 0;
  }
}

/***/ }),

/***/ "./src/Javascript/ui.js":
/*!******************************!*\
  !*** ./src/Javascript/ui.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ UI)
/* harmony export */ });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }
function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }
class UI {
  static render() {
    _classStaticPrivateMethodGet(this, UI, _appendToBody).call(this);
    // this.#initEventlistners();
  }

  static showPlacedShips(shipObjects, player) {
    let gridSquares;
    if (player === "P1") {
      gridSquares = document.querySelectorAll("#P1");
    } else {
      gridSquares = document.querySelectorAll("#P2");
    }
    gridSquares.forEach(gridSquare => {
      shipObjects.forEach(ship => {
        ship.position.forEach(pos => {
          if (`${pos[0]}${pos[1]}` === gridSquare.dataset.pos.split(",").join("")) {
            gridSquare.classList.add("ship");
          }
        });
      });
    });
  }
  static renderMissedShots(gameboard, player) {
    const {
      missedShots
    } = gameboard;
    missedShots.forEach(grid => {
      const gridElement = document.querySelector(`#${player}[data-pos="${grid.join(",")}"]`);
      gridElement.classList.add("missed-shot");
    });
  }
  static renderHits(gameboard, player) {
    const {
      hits
    } = gameboard;
    hits.forEach(hit => {
      const gridElement = document.querySelector(`#${player}[data-pos="${hit.join(",")}"]`);
      gridElement.classList.add("hit");
    });
  }
  static screenPositionToGridPosition(clickedPosition) {
    const arr = clickedPosition.split(",");
    return arr;
  }
}
function _appendToBody() {
  const container = document.createElement("div");
  container.classList.add("container");
  const p1Board = _classStaticPrivateMethodGet(this, UI, _createGameboard).call(this, "Sebastian");
  const p2Board = _classStaticPrivateMethodGet(this, UI, _createGameboard).call(this, "HAL");
  container.append(_classStaticPrivateMethodGet(this, UI, _gameoverScreen).call(this), p1Board, p2Board);
  document.body.append(container);
}
function _increaseActivePlayers() {
  this.activePlayers += 1;
}
function _createGameboard(name) {
  _classStaticPrivateMethodGet(this, UI, _increaseActivePlayers).call(this);
  const fragmnt = document.createDocumentFragment();
  const boardContainer = document.createElement("div");
  const playerName = document.createElement("h2");
  playerName.innerText = name;
  boardContainer.classList.add("board-container");
  boardContainer.appendChild(playerName);
  for (let i = 0; i < this.gridXY[0]; i += 1) {
    for (let j = 0; j < this.gridXY[1]; j += 1) {
      const gridSquare = document.createElement("div");
      gridSquare.classList.add("grid-square");
      gridSquare.setAttribute("id", `P${this.activePlayers}`);
      gridSquare.setAttribute("data-pos", `${j + 1},${i + 1}`); // +1 so that grid starts at 1,1
      boardContainer.appendChild(gridSquare);
    }
  }
  fragmnt.appendChild(boardContainer);
  return fragmnt;
}
function _gameoverScreen() {
  const gameoverText = document.createElement("h1");
  gameoverText.innerText = "Gameover!";
  gameoverText.classList.add("gameover");
  gameoverText.classList.add("hide");
  return gameoverText;
}
_defineProperty(UI, "gridXY", [10, 10]);
_defineProperty(UI, "activePlayers", 0);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/CSS/style.css":
/*!*****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/CSS/style.css ***!
  \*****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n}\n\n:root {\n  --grid-square-size: 3rem;\n}\n.container {\n  height: 100vh;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n.board-container {\n  width: fit-content;\n  display: grid;\n  grid-template-rows: repeat(10, var(--grid-square-size));\n  grid-template-columns: repeat(10, var(--grid-square-size));\n  gap: 2px;\n  align-self: center;\n  justify-self: center;\n}\n\n.board-container > h2 {\n  position: absolute;\n  top: 200px;\n}\n\n.grid-square {\n  border: 1px solid black;\n  border-radius: 2px;\n  background-color: rgb(142, 142, 142);\n  height: var(--grid-square-size);\n  width: var(--grid-square-size);\n}\n\n/* Style grid positions containing ships */\n.ship {\n  background-color: orange;\n}\n\n.missed-shot {\n  background-color: black;\n}\n\n.hit {\n  background-color: green;\n}\n\n.hide {\n  display: none;\n}\n\n.gameover {\n  position: absolute;\n  font-size: 15vw;\n  align-self: center;\n  justify-self: center;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/style.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,wBAAwB;AAC1B;AACA;EACE,aAAa;EACb,aAAa;EACb,qCAAqC;AACvC;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,uDAAuD;EACvD,0DAA0D;EAC1D,QAAQ;EACR,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,oCAAoC;EACpC,+BAA+B;EAC/B,8BAA8B;AAChC;;AAEA,0CAA0C;AAC1C;EACE,wBAAwB;AAC1B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,eAAe;EACf,kBAAkB;EAClB,oBAAoB;AACtB","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n}\n\n:root {\n  --grid-square-size: 3rem;\n}\n.container {\n  height: 100vh;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n.board-container {\n  width: fit-content;\n  display: grid;\n  grid-template-rows: repeat(10, var(--grid-square-size));\n  grid-template-columns: repeat(10, var(--grid-square-size));\n  gap: 2px;\n  align-self: center;\n  justify-self: center;\n}\n\n.board-container > h2 {\n  position: absolute;\n  top: 200px;\n}\n\n.grid-square {\n  border: 1px solid black;\n  border-radius: 2px;\n  background-color: rgb(142, 142, 142);\n  height: var(--grid-square-size);\n  width: var(--grid-square-size);\n}\n\n/* Style grid positions containing ships */\n.ship {\n  background-color: orange;\n}\n\n.missed-shot {\n  background-color: black;\n}\n\n.hit {\n  background-color: green;\n}\n\n.hide {\n  display: none;\n}\n\n.gameover {\n  position: absolute;\n  font-size: 15vw;\n  align-self: center;\n  justify-self: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/CSS/style.css":
/*!***************************!*\
  !*** ./src/CSS/style.css ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/CSS/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/Javascript/app.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvSmF2YXNjcmlwdC9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0phdmFzY3JpcHQvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0phdmFzY3JpcHQvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9KYXZhc2NyaXB0L3BsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvSmF2YXNjcmlwdC9zaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9KYXZhc2NyaXB0L3VpLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9DU1Mvc3R5bGUuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0NTUy9zdHlsZS5jc3M/YTFjZiIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IENvbXB1dGVyIGZyb20gXCIuL2NvbXB1dGVyXCI7XG5pbXBvcnQgVUkgZnJvbSBcIi4vdWlcIjtcbmltcG9ydCBcIi4uL0NTUy9zdHlsZS5jc3NcIjtcblxuLy8gQ3JlYXRlIGdhbWVib2FyZHNcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmNvbnN0IGFpR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xuXG4vL0NyZWF0ZSBwbGF5ZXJzIC0gbmVlZCB0byBhZGQgb3B0aW9uIHRvIHNldCBwbGF5ZXIgbmFtZVxuY29uc3QgcGxheWVyID0gbmV3IFBsYXllcihcIlNlYmFzdGlhblwiKTtcbmNvbnN0IGFpUGxheWVyID0gbmV3IENvbXB1dGVyKFwiSEFMXCIpO1xuXG4vLyBCb29sIHRoYXQgd2lsbCBiZSB0cnVlIHdoZW4gYWxsIHNoaXBzIGhhdmUgYmVlbiBzdW5rIG9uIG9uZSB0ZWFtLlxubGV0IGdhbWVvdmVyID0gZmFsc2U7XG5cbi8vIEp1c3Qgd2hpbGUgdGVzdGluZyAtIFJlcGxhY2VkIHdpdGggZnVuY3Rpb24gdG8gcGxhY2UgcGxheWVyIHNoaXBzIGJ5IGhhbmQuXG5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKEdhbWVib2FyZC5zaGlwVHlwZS5jYXJyaWVyLnNpemUsIDEwLCAxLCBcIlZlcnRpY2FsXCIpO1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUuYmF0dGxlc2hpcC5zaXplLCAxLCAyLCBcIkhvcml6b250YWxcIik7XG5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKEdhbWVib2FyZC5zaGlwVHlwZS5kZXN0cm95ZXIuc2l6ZSwgMSwgMywgXCJIb3Jpem9udGFsXCIpO1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUuc3VibWFyaW5lLnNpemUsIDEsIDQsIFwiSG9yaXpvbnRhbFwiKTtcbnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoR2FtZWJvYXJkLnNoaXBUeXBlLnBhdHJvbEJvYXQuc2l6ZSwgMSwgNSwgXCJIb3Jpem9udGFsXCIpO1xuXG4vLyBcIlJhbmRvbWx5XCIgcGxhY2UgZW5lbXkgc2hpcHNcbkdhbWVib2FyZC5wbGFjZVNoaXBzQXRSYW5kb21Mb2NhdGlvbihhaUdhbWVib2FyZC5wbGFjZVNoaXApO1xuXG4vLyBSZW5kZXIgVUlcblVJLnJlbmRlcigpO1xuVUkuc2hvd1BsYWNlZFNoaXBzKHBsYXllckdhbWVib2FyZC5hY3RpdmVTaGlwcywgXCJQMVwiKTtcblxuLy8gR2V0IHRoZSBnYW1lb3ZlciBzY3JlZW4gLSBUbyBiZSBwbGFjZWQgaW4gVUkgY2xhc3NcbmNvbnN0IGdhbWVvdmVyVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZW92ZXJcIik7XG5cbi8vIFNsb3cgZG93biBzcGVlZCBvZiBnYW1lIGJldHdlZW4gY29tcHV0ZXIgYW5kIHBsYXllciB0dXJuLlxuY29uc3Qgc2xlZXAgPSAobXMpID0+IG5ldyBQcm9taXNlKChyKSA9PiBzZXRUaW1lb3V0KHIsIG1zKSk7XG5cbi8vIFAxIHN0YXJ0c1xucGxheWVyLnR1cm4gPSB0cnVlO1xuXG4vLyBHZXQgYm90aCBwbGF5ZXJib2FyZHMgLSBDb3VsZCBiZSBtb3ZlZCB0byBVSSBjbGFzc1xuY29uc3QgYm9hcmRDb250YWluZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5ib2FyZC1jb250YWluZXJcIik7XG5cbi8vIE1haW4gZ2FtZSBsb29wIC0gRmlyZXMgd2l0aCBlYWNoIHBsYXllciBjbGljay5cbmJvYXJkQ29udGFpbmVycy5mb3JFYWNoKChjb250YWluZXIpID0+IHtcbiAgY29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBhc3luYyAoZSkgPT4ge1xuICAgIGlmICghZ2FtZW92ZXIpIHtcbiAgICAgIC8vIEdldCBjbGlja2VkIHBvc2l0aW9uXG4gICAgICBjb25zdCB7IHBvcyB9ID0gZS50YXJnZXQuZGF0YXNldDtcblxuICAgICAgLy8gVHVybiBpdCBpbnRvIGFuIGFycmF5IFt4LHldXG4gICAgICBjb25zdCBwb3NBcnJheSA9IFVJLnNjcmVlblBvc2l0aW9uVG9HcmlkUG9zaXRpb24ocG9zKTtcblxuICAgICAgLy8gUGFzc2luZyBYIGFuZCBZXG4gICAgICBhaUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKHBvc0FycmF5WzBdLCBwb3NBcnJheVsxXSk7XG5cbiAgICAgIC8vIFJlZmVyZW5jZSB0byBhaVBsYXllci5hdHRhY2soKSwgcmV0dXJucyBhcnJheSBbeCx5XVxuICAgICAgY29uc3QgYWlBdHRhY2tQb3MgPSBhaVBsYXllci5hdHRhY2soKTtcblxuICAgICAgLy8gUmVuZGVyIGhpdCBpZiBpdCdzIGEgaGl0IG9uIEFJIGJvYXJkLlxuICAgICAgVUkucmVuZGVySGl0cyhhaUdhbWVib2FyZCwgXCJQMlwiKTsgLy8gcmVuZGVyIGhpdCBpZiBpdCdzIGEgaGl0XG5cbiAgICAgIC8vIFJlbmRlciBtaXNzZWQgc2hvdCBvbiBBSSBib2FyZC5cbiAgICAgIFVJLnJlbmRlck1pc3NlZFNob3RzKGFpR2FtZWJvYXJkLCBcIlAyXCIpOyAvLyBlbHNlIHJlbmRlciBtaXNzZWQgc2hvdFxuXG4gICAgICAvLyBTbGVlcCB0byBzbG93IGRvd24gZ2FtZSB0ZW1wb1xuICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG5cbiAgICAgIC8vIEF0dGFjayBwbGF5ZXJzIGJvYXJkIHdpdGggYWlQbGF5ZXIuYXR0YWNrKClcbiAgICAgIHBsYXllckdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKGFpQXR0YWNrUG9zWzBdLCBhaUF0dGFja1Bvc1sxXSk7XG5cbiAgICAgIC8vIFJlbmRlciBoaXQgaWYgaXQncyBhIGhpdCBvbiBwbGF5ZXIgYm9hcmQuXG4gICAgICBVSS5yZW5kZXJIaXRzKHBsYXllckdhbWVib2FyZCwgXCJQMVwiKTtcblxuICAgICAgLy8gUmVuZGVyIG1pc3NlZCBzaG90IG9uIHBsYXllciBib2FyZC5cbiAgICAgIFVJLnJlbmRlck1pc3NlZFNob3RzKHBsYXllckdhbWVib2FyZCwgXCJQMVwiKTtcblxuICAgICAgLy8gQ2hlY2sgaWYgZ2FtZW92ZXIgLSBOZWVkIHRvIGFkZCB3aG8gd29uLi4uXG4gICAgICBpZiAoYWlHYW1lYm9hcmQuaGFzQWxsU2hpcHNTdW5rKCkgfHwgcGxheWVyR2FtZWJvYXJkLmhhc0FsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIGdhbWVvdmVyID0gdHJ1ZTtcbiAgICAgICAgZ2FtZW92ZXJUZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRlXCIpO1xuICAgICAgfVxuICAgICAgLy8gc3dpdGNoIHR1cm5cbiAgICAgIGlmIChwbGF5ZXIudHVybikge1xuICAgICAgICBwbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgICAgICBhaVBsYXllci50dXJuID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBsYXllci50dXJuID0gdHJ1ZTtcbiAgICAgICAgYWlQbGF5ZXIudHVybiA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KTtcbiIsImltcG9ydCBQbGF5ZXIgZnJvbSBcIi4vcGxheWVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbXB1dGVyIGV4dGVuZHMgUGxheWVyIHtcbiAgY29uc3RydWN0b3IobmFtZSkge1xuICAgIHN1cGVyKG5hbWUpO1xuICAgIHRoaXMudHVybiA9IGZhbHNlO1xuICAgIHRoaXMuYXZhaWxhYmxlTW92ZXMgPSAoKCkgPT4ge1xuICAgICAgY29uc3QgYXJyID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgICAgYXJyLnB1c2goW2ogKyAxLCBpICsgMV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0pKCk7XG4gIH1cblxuICBhdHRhY2soKSB7XG4gICAgY29uc3QgcmFuZEF0dGFja1BvcyA9IHRoaXMuI2dldFJhbmRvbVBvc2l0aW9uKCk7XG4gICAgY29uc29sZS5sb2coYEF0dGFjayBwb3M6ICR7cmFuZEF0dGFja1Bvc31gKTtcbiAgICBjb25zb2xlLmxvZyh0aGlzLiNyZW1vdmVQb3NGcm9tQXZhaWxhYmxlTW92ZXMocmFuZEF0dGFja1BvcykpO1xuICAgIHJldHVybiBbcmFuZEF0dGFja1Bvc1swXSwgcmFuZEF0dGFja1Bvc1sxXV07XG4gIH1cbiAgI2dldFJhbmRvbVBvc2l0aW9uKCkge1xuICAgIGNvbnN0IHBvc0FyciA9IHRoaXMuYXZhaWxhYmxlTW92ZXM7XG4gICAgY29uc3QgcmFuZEluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9zQXJyLmxlbmd0aCk7XG5cbiAgICByZXR1cm4gcG9zQXJyW3JhbmRJbmRleF07XG4gIH1cblxuICAjcmVtb3ZlUG9zRnJvbUF2YWlsYWJsZU1vdmVzKHBvcykge1xuICAgIGNvbnN0IGFyciA9IHRoaXMuYXZhaWxhYmxlTW92ZXM7XG4gICAgY29uc3QgbmV3QXJyID0gYXJyLmZpbHRlcigocCkgPT4gcCAhPT0gcG9zKTtcbiAgICB0aGlzLmF2YWlsYWJsZU1vdmVzID0gbmV3QXJyO1xuICB9XG59XG4iLCIvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdXNlLWJlZm9yZS1kZWZpbmUsIGltcG9ydC9wcmVmZXItZGVmYXVsdC1leHBvcnRcbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5cbi8vIEZ1bmN0aW9uIHRvIGdlbmVyYXRlIHBvc2l0aW9ucyBvbiBncmlkXG4vLyBiYXNlZCBvbiBzaXplIG9mIHNoaXAgKyBzdGFydGluZyBncmlkIHBvc2l0aW9uLlxuZnVuY3Rpb24gZ2VuZXJhdGVHcmlkUG9zaXRpb24oc2l6ZSwgeCwgeSwgZGlyZWN0aW9uKSB7XG4gIGNvbnN0IGFyciA9IFtdO1xuXG4gIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaXplOyBpbmRleCArPSAxKSB7XG4gICAgLy8gVXNlZCB0byBwbGFjZSBzaGlwIGhvcml6b250YWwgb2NoIHZlcnRpY2FsbHlcbiAgICBpZiAoZGlyZWN0aW9uID09PSBcIlZlcnRpY2FsXCIpIHtcbiAgICAgIGFyci5wdXNoKFt4LCB5ICsgaW5kZXhdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyLnB1c2goW3ggKyBpbmRleCwgeV0pOyAvLyBEZWZhdWx0IHRvIGhvcml6b250YWwgcGxhY2VtZW50XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnI7XG59XG5cbi8vIEdhbWVib2FyZCBmYWN0b3J5XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHYW1lYm9hcmQge1xuICBzdGF0aWMgc2hpcFR5cGUgPSB7XG4gICAgY2FycmllcjogeyBzaXplOiA1IH0sXG4gICAgYmF0dGxlc2hpcDogeyBzaXplOiA0IH0sXG4gICAgZGVzdHJveWVyOiB7IHNpemU6IDMgfSxcbiAgICBzdWJtYXJpbmU6IHsgc2l6ZTogMyB9LFxuICAgIHBhdHJvbEJvYXQ6IHsgc2l6ZTogMiB9LFxuICB9O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSBbXTtcbiAgICB0aGlzLm9jY3VwaWVkUG9zaXRpb25zID0gW107XG4gICAgdGhpcy5taXNzZWRTaG90cyA9IFtdO1xuICAgIHRoaXMuaGl0cyA9IFtdO1xuICB9XG5cbiAgcGxhY2VTaGlwID0gKHNpemUsIHgsIHksIGRpcmVjdGlvbikgPT4ge1xuICAgIGNvbnN0IHNoaXBPYmogPSBuZXcgU2hpcChzaXplKTtcbiAgICBsZXQgcG9zaXRpb24gPSBbXTtcbiAgICBpZiAodGhpcy4jY2hlY2tQb3NpdGlvblZhbGlkKHNpemUsIHgsIHksIGRpcmVjdGlvbikpIHtcbiAgICAgIHBvc2l0aW9uID0gZ2VuZXJhdGVHcmlkUG9zaXRpb24oc2l6ZSwgeCwgeSwgZGlyZWN0aW9uKTtcbiAgICAgIHRoaXMuYWN0aXZlU2hpcHMucHVzaCh7IHNoaXBPYmosIHBvc2l0aW9uIH0pO1xuICAgICAgcG9zaXRpb24uZm9yRWFjaCgocG9zKSA9PiB7XG4gICAgICAgIHRoaXMub2NjdXBpZWRQb3NpdGlvbnMucHVzaChwb3MpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gXCJQbGFjZWQgc2hpcFwiO1xuICAgIH1cbiAgICByZXR1cm4gXCJJbnZhbGlkIHBsYWNlbWVudFwiO1xuICB9O1xuXG4gIHJlY2VpdmVBdHRhY2soeCwgeSkge1xuICAgIGNvbnN0IGF0dGFja1BvcyA9IGAke3h9LCR7eX1gO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVTaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuYWN0aXZlU2hpcHNbaV07XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXAucG9zaXRpb24ubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgY29uc3QgcG9zaXRpb24gPSBzaGlwLnBvc2l0aW9uW2pdLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmIChwb3NpdGlvbiA9PT0gYXR0YWNrUG9zKSB7XG4gICAgICAgICAgdGhpcy5oaXRzLnB1c2goW3gsIHldKTtcblxuICAgICAgICAgIHJldHVybiBzaGlwLnNoaXBPYmouaGl0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5taXNzZWRTaG90cy5wdXNoKFt4LCB5XSk7XG4gICAgcmV0dXJuIGBOb3RoaW5nIGhpdCBhdCAke2F0dGFja1Bvc31gO1xuICB9XG5cbiAgaGFzQWxsU2hpcHNTdW5rKCkge1xuICAgIGNvbnN0IHNoaXBTdGF0dXMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYWN0aXZlU2hpcHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNoaXAgPSB0aGlzLmFjdGl2ZVNoaXBzW2ldO1xuICAgICAgc2hpcFN0YXR1cy5wdXNoKHNoaXAuc2hpcE9iai5pc1N1bmsoKSk7XG4gICAgfVxuXG4gICAgaWYgKHNoaXBTdGF0dXMuaW5jbHVkZXMoZmFsc2UpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgI2NoZWNrUG9zaXRpb25WYWxpZChzaXplLCB4LCB5LCBkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBtYXhHcmlkWFkgPSBbMTAsIDEwXTtcbiAgICBjb25zdCBtaW5HcmlkWFkgPSBbMSwgMV07XG4gICAgY29uc3QgcG9zID0gZ2VuZXJhdGVHcmlkUG9zaXRpb24oc2l6ZSwgeCwgeSwgZGlyZWN0aW9uKTtcbiAgICBpZiAodGhpcy4jZ3JpZFBvc2l0aW9uT2NjdXBpZWQocG9zKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgc2l6ZTsgaW5kZXggKz0gMSkge1xuICAgICAgaWYgKHBvc1tpbmRleF1bMF0gPiBtYXhHcmlkWFlbMF0gfHwgcG9zW2luZGV4XVswXSA8IG1pbkdyaWRYWVswXSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAocG9zW2luZGV4XVsxXSA+IG1heEdyaWRYWVsxXSB8fCBwb3NbaW5kZXhdWzFdIDwgbWluR3JpZFhZWzFdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gICNncmlkUG9zaXRpb25PY2N1cGllZChwb3MpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMub2NjdXBpZWRQb3NpdGlvbnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcG9zLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmICh0aGlzLm9jY3VwaWVkUG9zaXRpb25zW2ldLnRvU3RyaW5nKCkgPT09IHBvc1tqXS50b1N0cmluZygpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3RhdGljIHBsYWNlbWVudHMgPSBbXG4gICAgW1xuICAgICAgWzQsIDEsIFwiVmVydGljYWxcIl0sXG4gICAgICBbMSwgOSwgXCJIb3Jpem9udGFsXCJdLFxuICAgICAgWzYsIDMsIFwiSG9yaXpvbnRhbFwiXSxcbiAgICAgIFs4LCA3LCBcIkhvcml6b250YWxcIl0sXG4gICAgICBbMSwgMiwgXCJIb3Jpem9udGFsXCJdLFxuICAgIF0sXG4gICAgW1xuICAgICAgWzQsIDEwLCBcIkhvcml6b250YWxcIl0sXG4gICAgICBbNCwgNSwgXCJWZXJ0aWNhbFwiXSxcbiAgICAgIFs2LCAyLCBcIkhvcml6b250YWxcIl0sXG4gICAgICBbNywgNSwgXCJIb3Jpem9udGFsXCJdLFxuICAgICAgWzIsIDIsIFwiVmVydGljYWxcIl0sXG4gICAgXSxcbiAgXTtcblxuICBzdGF0aWMgcGxhY2VTaGlwc0F0UmFuZG9tTG9jYXRpb24oZnVuYykge1xuICAgIGNvbnN0IGFyciA9IE9iamVjdC52YWx1ZXModGhpcy5zaGlwVHlwZSk7XG4gICAgY29uc3QgcmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpOyAvLyBSZXR1cm5zIGEgcmFuZG9tIGludGVnZXIgZnJvbSAxIHRvIDI6XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHNoaXAgPSBhcnJbaV07XG4gICAgICBmdW5jKHNoaXAuc2l6ZSwgdGhpcy5wbGFjZW1lbnRzW3JhbmRdW2ldWzBdLCB0aGlzLnBsYWNlbWVudHNbcmFuZF1baV1bMV0sIHRoaXMucGxhY2VtZW50c1tyYW5kXVtpXVsyXSk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgfVxufVxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgeyBTaGlwIH07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHNUYWtlbiA9IDA7XG4gIH1cblxuICBoaXQgPSAoKSA9PiB7XG4gICAgdGhpcy5oaXRzVGFrZW4gKz0gMTtcbiAgICByZXR1cm4gXCJTaGlwIGhpdFwiO1xuICB9O1xuXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0c1Rha2VuID09PSB0aGlzLmxlbmd0aDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIGdyaWRYWSA9IFsxMCwgMTBdO1xuXG4gIHN0YXRpYyBhY3RpdmVQbGF5ZXJzID0gMDtcblxuICBzdGF0aWMgcmVuZGVyKCkge1xuICAgIHRoaXMuI2FwcGVuZFRvQm9keSgpO1xuICAgIC8vIHRoaXMuI2luaXRFdmVudGxpc3RuZXJzKCk7XG4gIH1cblxuICBzdGF0aWMgI2FwcGVuZFRvQm9keSgpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHAxQm9hcmQgPSB0aGlzLiNjcmVhdGVHYW1lYm9hcmQoXCJTZWJhc3RpYW5cIik7XG4gICAgY29uc3QgcDJCb2FyZCA9IHRoaXMuI2NyZWF0ZUdhbWVib2FyZChcIkhBTFwiKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmQodGhpcy4jZ2FtZW92ZXJTY3JlZW4oKSwgcDFCb2FyZCwgcDJCb2FyZCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoY29udGFpbmVyKTtcbiAgfVxuXG4gIHN0YXRpYyAjaW5jcmVhc2VBY3RpdmVQbGF5ZXJzKCkge1xuICAgIHRoaXMuYWN0aXZlUGxheWVycyArPSAxO1xuICB9XG5cbiAgc3RhdGljICNjcmVhdGVHYW1lYm9hcmQobmFtZSkge1xuICAgIHRoaXMuI2luY3JlYXNlQWN0aXZlUGxheWVycygpO1xuICAgIGNvbnN0IGZyYWdtbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgcGxheWVyTmFtZS5pbm5lclRleHQgPSBuYW1lO1xuICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250YWluZXJcIik7XG5cbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJOYW1lKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFhZWzBdOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkWFlbMV07IGogKz0gMSkge1xuICAgICAgICBjb25zdCBncmlkU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ3JpZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1zcXVhcmVcIik7XG4gICAgICAgIGdyaWRTcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYFAke3RoaXMuYWN0aXZlUGxheWVyc31gKTtcbiAgICAgICAgZ3JpZFNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc1wiLCBgJHtqICsgMX0sJHtpICsgMX1gKTsgLy8gKzEgc28gdGhhdCBncmlkIHN0YXJ0cyBhdCAxLDFcbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZFNxdWFyZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZyYWdtbnQuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xuICAgIHJldHVybiBmcmFnbW50O1xuICB9XG5cbiAgc3RhdGljICNnYW1lb3ZlclNjcmVlbigpIHtcbiAgICBjb25zdCBnYW1lb3ZlclRleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDFcIik7XG4gICAgZ2FtZW92ZXJUZXh0LmlubmVyVGV4dCA9IFwiR2FtZW92ZXIhXCI7XG4gICAgZ2FtZW92ZXJUZXh0LmNsYXNzTGlzdC5hZGQoXCJnYW1lb3ZlclwiKTtcbiAgICBnYW1lb3ZlclRleHQuY2xhc3NMaXN0LmFkZChcImhpZGVcIik7XG5cbiAgICByZXR1cm4gZ2FtZW92ZXJUZXh0O1xuICB9XG5cbiAgc3RhdGljIHNob3dQbGFjZWRTaGlwcyhzaGlwT2JqZWN0cywgcGxheWVyKSB7XG4gICAgbGV0IGdyaWRTcXVhcmVzO1xuICAgIGlmIChwbGF5ZXIgPT09IFwiUDFcIikge1xuICAgICAgZ3JpZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI1AxXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjUDJcIik7XG4gICAgfVxuXG4gICAgZ3JpZFNxdWFyZXMuZm9yRWFjaCgoZ3JpZFNxdWFyZSkgPT4ge1xuICAgICAgc2hpcE9iamVjdHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICAgIGlmIChgJHtwb3NbMF19JHtwb3NbMV19YCA9PT0gZ3JpZFNxdWFyZS5kYXRhc2V0LnBvcy5zcGxpdChcIixcIikuam9pbihcIlwiKSkge1xuICAgICAgICAgICAgZ3JpZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyTWlzc2VkU2hvdHMoZ2FtZWJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCB7IG1pc3NlZFNob3RzIH0gPSBnYW1lYm9hcmQ7XG4gICAgbWlzc2VkU2hvdHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgY29uc3QgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXJ9W2RhdGEtcG9zPVwiJHtncmlkLmpvaW4oXCIsXCIpfVwiXWApO1xuICAgICAgZ3JpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1pc3NlZC1zaG90XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlbmRlckhpdHMoZ2FtZWJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCB7IGhpdHMgfSA9IGdhbWVib2FyZDtcbiAgICBoaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgY29uc3QgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXJ9W2RhdGEtcG9zPVwiJHtoaXQuam9pbihcIixcIil9XCJdYCk7XG4gICAgICBncmlkRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHNjcmVlblBvc2l0aW9uVG9HcmlkUG9zaXRpb24oY2xpY2tlZFBvc2l0aW9uKSB7XG4gICAgY29uc3QgYXJyID0gY2xpY2tlZFBvc2l0aW9uLnNwbGl0KFwiLFwiKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1ncmlkLXNxdWFyZS1zaXplOiAzcmVtO1xcbn1cXG4uY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG59XFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIHZhcigtLWdyaWQtc3F1YXJlLXNpemUpKTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKSk7XFxuICBnYXA6IDJweDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyID4gaDIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAyMDBweDtcXG59XFxuXFxuLmdyaWQtc3F1YXJlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MiwgMTQyLCAxNDIpO1xcbiAgaGVpZ2h0OiB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKTtcXG59XFxuXFxuLyogU3R5bGUgZ3JpZCBwb3NpdGlvbnMgY29udGFpbmluZyBzaGlwcyAqL1xcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuLm1pc3NlZC1zaG90IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cXG4uaGlkZSB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZ2FtZW92ZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgZm9udC1zaXplOiAxNXZ3O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9DU1Mvc3R5bGUuY3NzXCJdLFwibmFtZXNcIjpbXSxcIm1hcHBpbmdzXCI6XCJBQUFBO0VBQ0Usc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLHdCQUF3QjtBQUMxQjtBQUNBO0VBQ0UsYUFBYTtFQUNiLGFBQWE7RUFDYixxQ0FBcUM7QUFDdkM7QUFDQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2IsdURBQXVEO0VBQ3ZELDBEQUEwRDtFQUMxRCxRQUFRO0VBQ1Isa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixVQUFVO0FBQ1o7O0FBRUE7RUFDRSx1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLG9DQUFvQztFQUNwQywrQkFBK0I7RUFDL0IsOEJBQThCO0FBQ2hDOztBQUVBLDBDQUEwQztBQUMxQztFQUNFLHdCQUF3QjtBQUMxQjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLHVCQUF1QjtBQUN6Qjs7QUFFQTtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixlQUFlO0VBQ2Ysa0JBQWtCO0VBQ2xCLG9CQUFvQjtBQUN0QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxufVxcblxcbjpyb290IHtcXG4gIC0tZ3JpZC1zcXVhcmUtc2l6ZTogM3JlbTtcXG59XFxuLmNvbnRhaW5lciB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XFxufVxcbi5ib2FyZC1jb250YWluZXIge1xcbiAgd2lkdGg6IGZpdC1jb250ZW50O1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKSk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgdmFyKC0tZ3JpZC1zcXVhcmUtc2l6ZSkpO1xcbiAgZ2FwOiAycHg7XFxuICBhbGlnbi1zZWxmOiBjZW50ZXI7XFxuICBqdXN0aWZ5LXNlbGY6IGNlbnRlcjtcXG59XFxuXFxuLmJvYXJkLWNvbnRhaW5lciA+IGgyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMjAwcHg7XFxufVxcblxcbi5ncmlkLXNxdWFyZSB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDIsIDE0MiwgMTQyKTtcXG4gIGhlaWdodDogdmFyKC0tZ3JpZC1zcXVhcmUtc2l6ZSk7XFxuICB3aWR0aDogdmFyKC0tZ3JpZC1zcXVhcmUtc2l6ZSk7XFxufVxcblxcbi8qIFN0eWxlIGdyaWQgcG9zaXRpb25zIGNvbnRhaW5pbmcgc2hpcHMgKi9cXG4uc2hpcCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBvcmFuZ2U7XFxufVxcblxcbi5taXNzZWQtc2hvdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLmhpdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmVlbjtcXG59XFxuXFxuLmhpZGUge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmdhbWVvdmVyIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGZvbnQtc2l6ZTogMTV2dztcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJHYW1lYm9hcmQiLCJQbGF5ZXIiLCJDb21wdXRlciIsIlVJIiwicGxheWVyR2FtZWJvYXJkIiwiYWlHYW1lYm9hcmQiLCJwbGF5ZXIiLCJhaVBsYXllciIsImdhbWVvdmVyIiwicGxhY2VTaGlwIiwic2hpcFR5cGUiLCJjYXJyaWVyIiwic2l6ZSIsImJhdHRsZXNoaXAiLCJkZXN0cm95ZXIiLCJzdWJtYXJpbmUiLCJwYXRyb2xCb2F0IiwicGxhY2VTaGlwc0F0UmFuZG9tTG9jYXRpb24iLCJyZW5kZXIiLCJzaG93UGxhY2VkU2hpcHMiLCJhY3RpdmVTaGlwcyIsImdhbWVvdmVyVGV4dCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsInNsZWVwIiwibXMiLCJQcm9taXNlIiwiciIsInNldFRpbWVvdXQiLCJ0dXJuIiwiYm9hcmRDb250YWluZXJzIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJjb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBvcyIsInRhcmdldCIsImRhdGFzZXQiLCJwb3NBcnJheSIsInNjcmVlblBvc2l0aW9uVG9HcmlkUG9zaXRpb24iLCJyZWNlaXZlQXR0YWNrIiwiYWlBdHRhY2tQb3MiLCJhdHRhY2siLCJyZW5kZXJIaXRzIiwicmVuZGVyTWlzc2VkU2hvdHMiLCJoYXNBbGxTaGlwc1N1bmsiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJhdmFpbGFibGVNb3ZlcyIsImFyciIsImkiLCJqIiwicHVzaCIsInJhbmRBdHRhY2tQb3MiLCJjb25zb2xlIiwibG9nIiwicG9zQXJyIiwicmFuZEluZGV4IiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwibGVuZ3RoIiwibmV3QXJyIiwiZmlsdGVyIiwicCIsIlNoaXAiLCJnZW5lcmF0ZUdyaWRQb3NpdGlvbiIsIngiLCJ5IiwiZGlyZWN0aW9uIiwiaW5kZXgiLCJzaGlwT2JqIiwicG9zaXRpb24iLCJvY2N1cGllZFBvc2l0aW9ucyIsIm1pc3NlZFNob3RzIiwiaGl0cyIsImF0dGFja1BvcyIsInNoaXAiLCJ0b1N0cmluZyIsImhpdCIsInNoaXBTdGF0dXMiLCJpc1N1bmsiLCJpbmNsdWRlcyIsImZ1bmMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJyYW5kIiwicGxhY2VtZW50cyIsIm1heEdyaWRYWSIsIm1pbkdyaWRYWSIsImhpdHNUYWtlbiIsInNoaXBPYmplY3RzIiwiZ3JpZFNxdWFyZXMiLCJncmlkU3F1YXJlIiwic3BsaXQiLCJqb2luIiwiYWRkIiwiZ2FtZWJvYXJkIiwiZ3JpZCIsImdyaWRFbGVtZW50IiwiY2xpY2tlZFBvc2l0aW9uIiwiY3JlYXRlRWxlbWVudCIsInAxQm9hcmQiLCJwMkJvYXJkIiwiYXBwZW5kIiwiYm9keSIsImFjdGl2ZVBsYXllcnMiLCJmcmFnbW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImJvYXJkQ29udGFpbmVyIiwicGxheWVyTmFtZSIsImlubmVyVGV4dCIsImFwcGVuZENoaWxkIiwiZ3JpZFhZIiwic2V0QXR0cmlidXRlIl0sInNvdXJjZVJvb3QiOiIifQ==