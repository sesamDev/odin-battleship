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






// Main game loop
const playerGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
const aiGameboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
let gameOver = false;
const player = new _player__WEBPACK_IMPORTED_MODULE_1__["default"]("Sebastian");
const aiPlayer = new _computer__WEBPACK_IMPORTED_MODULE_2__["default"]("HAL");

// Just while testing
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.carrier.size, 10, 1, "Vertical");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.battleship.size, 1, 2, "Horizontal");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.destroyer.size, 1, 3, "Horizontal");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.submarine.size, 1, 4, "Horizontal");
playerGameboard.placeShip(_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].shipType.patrolBoat.size, 1, 5, "Horizontal");

// aiGameboard.placeShip(Gameboard.shipType.carrier.size, 1, 1, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.battleship.size, 1, 2, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.destroyer.size, 1, 3, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.submarine.size, 1, 4, "Horizontal");
// aiGameboard.placeShip(Gameboard.shipType.patrolBoat.size, 1, 5, "Horizontal");

_gameboard__WEBPACK_IMPORTED_MODULE_0__["default"].placeShipsAtRandomLocation(aiGameboard.placeShip);
// Render UI
_ui__WEBPACK_IMPORTED_MODULE_3__["default"].render();
_ui__WEBPACK_IMPORTED_MODULE_3__["default"].showPlacedShips(playerGameboard.activeShips, "P1");
_ui__WEBPACK_IMPORTED_MODULE_3__["default"].showPlacedShips(aiGameboard.activeShips, "P2");

// Place ships
// P1 starts
player.turn = true;
const boardContainers = document.querySelectorAll(".board-container");
boardContainers.forEach(container => {
  container.addEventListener("click", e => {
    if (!gameOver) {
      const {
        pos
      } = e.target.dataset;
      const posArray = _ui__WEBPACK_IMPORTED_MODULE_3__["default"].screenPositionToGridPosition(pos);
      aiGameboard.receiveAttack(posArray[0], posArray[1]);
      // render hit if it's a hit
      _ui__WEBPACK_IMPORTED_MODULE_3__["default"].renderHits(aiGameboard, "P2"); // render hit if it's a hit
      // else render missed shot
      _ui__WEBPACK_IMPORTED_MODULE_3__["default"].renderMissedShots(aiGameboard, "P2"); // else render missed shot
      // check if gameover
      console.log(aiGameboard.hasAllShipsSunk());
      if (aiGameboard.hasAllShipsSunk()) {
        console.log("Gameover!");
        gameOver = true;
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
// ###Loop starts here###
// P1 attacks
// check for hit

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

class Computer extends _player__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(name) {
    super(name);
    this.turn = false;
  }
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
    console.log(rand);
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
  container.append(p1Board, p2Board);
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n  margin: 0;\n}\n\n:root {\n  --grid-square-size: 3rem;\n}\n.container {\n  height: 100vh;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n.board-container {\n  width: fit-content;\n  display: grid;\n  grid-template-rows: repeat(10, var(--grid-square-size));\n  grid-template-columns: repeat(10, var(--grid-square-size));\n  gap: 2px;\n  align-self: center;\n  justify-self: center;\n}\n\n.board-container > h2 {\n  position: absolute;\n  top: 200px;\n}\n\n.grid-square {\n  border: 1px solid black;\n  border-radius: 2px;\n  background-color: rgb(142, 142, 142);\n  height: var(--grid-square-size);\n  width: var(--grid-square-size);\n}\n\n/* Style grid positions containing ships */\n.ship {\n  background-color: orange;\n}\n\n.missed-shot {\n  background-color: black;\n}\n\n.hit {\n  background-color: green;\n}\n", "",{"version":3,"sources":["webpack://./src/CSS/style.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,wBAAwB;AAC1B;AACA;EACE,aAAa;EACb,aAAa;EACb,qCAAqC;AACvC;AACA;EACE,kBAAkB;EAClB,aAAa;EACb,uDAAuD;EACvD,0DAA0D;EAC1D,QAAQ;EACR,kBAAkB;EAClB,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;EAClB,UAAU;AACZ;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,oCAAoC;EACpC,+BAA+B;EAC/B,8BAA8B;AAChC;;AAEA,0CAA0C;AAC1C;EACE,wBAAwB;AAC1B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,uBAAuB;AACzB","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n}\n\n:root {\n  --grid-square-size: 3rem;\n}\n.container {\n  height: 100vh;\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n}\n.board-container {\n  width: fit-content;\n  display: grid;\n  grid-template-rows: repeat(10, var(--grid-square-size));\n  grid-template-columns: repeat(10, var(--grid-square-size));\n  gap: 2px;\n  align-self: center;\n  justify-self: center;\n}\n\n.board-container > h2 {\n  position: absolute;\n  top: 200px;\n}\n\n.grid-square {\n  border: 1px solid black;\n  border-radius: 2px;\n  background-color: rgb(142, 142, 142);\n  height: var(--grid-square-size);\n  width: var(--grid-square-size);\n}\n\n/* Style grid positions containing ships */\n.ship {\n  background-color: orange;\n}\n\n.missed-shot {\n  background-color: black;\n}\n\n.hit {\n  background-color: green;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvSmF2YXNjcmlwdC9hcHAuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0phdmFzY3JpcHQvY29tcHV0ZXIuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0phdmFzY3JpcHQvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9KYXZhc2NyaXB0L3BsYXllci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9zcmMvSmF2YXNjcmlwdC9zaGlwLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9KYXZhc2NyaXB0L3VpLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL3NyYy9DU1Mvc3R5bGUuY3NzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vc3JjL0NTUy9zdHlsZS5jc3M/YTFjZiIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9vZGluLWJhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vb2Rpbi1iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL29kaW4tYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBHYW1lYm9hcmQgZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL3BsYXllclwiO1xuaW1wb3J0IENvbXB1dGVyIGZyb20gXCIuL2NvbXB1dGVyXCI7XG5pbXBvcnQgVUkgZnJvbSBcIi4vdWlcIjtcbmltcG9ydCBcIi4uL0NTUy9zdHlsZS5jc3NcIjtcblxuLy8gTWFpbiBnYW1lIGxvb3BcbmNvbnN0IHBsYXllckdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbmNvbnN0IGFpR2FtZWJvYXJkID0gbmV3IEdhbWVib2FyZCgpO1xubGV0IGdhbWVPdmVyID0gZmFsc2U7XG5cbmNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoXCJTZWJhc3RpYW5cIik7XG5jb25zdCBhaVBsYXllciA9IG5ldyBDb21wdXRlcihcIkhBTFwiKTtcblxuLy8gSnVzdCB3aGlsZSB0ZXN0aW5nXG5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKEdhbWVib2FyZC5zaGlwVHlwZS5jYXJyaWVyLnNpemUsIDEwLCAxLCBcIlZlcnRpY2FsXCIpO1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUuYmF0dGxlc2hpcC5zaXplLCAxLCAyLCBcIkhvcml6b250YWxcIik7XG5wbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwKEdhbWVib2FyZC5zaGlwVHlwZS5kZXN0cm95ZXIuc2l6ZSwgMSwgMywgXCJIb3Jpem9udGFsXCIpO1xucGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUuc3VibWFyaW5lLnNpemUsIDEsIDQsIFwiSG9yaXpvbnRhbFwiKTtcbnBsYXllckdhbWVib2FyZC5wbGFjZVNoaXAoR2FtZWJvYXJkLnNoaXBUeXBlLnBhdHJvbEJvYXQuc2l6ZSwgMSwgNSwgXCJIb3Jpem9udGFsXCIpO1xuXG4vLyBhaUdhbWVib2FyZC5wbGFjZVNoaXAoR2FtZWJvYXJkLnNoaXBUeXBlLmNhcnJpZXIuc2l6ZSwgMSwgMSwgXCJIb3Jpem9udGFsXCIpO1xuLy8gYWlHYW1lYm9hcmQucGxhY2VTaGlwKEdhbWVib2FyZC5zaGlwVHlwZS5iYXR0bGVzaGlwLnNpemUsIDEsIDIsIFwiSG9yaXpvbnRhbFwiKTtcbi8vIGFpR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUuZGVzdHJveWVyLnNpemUsIDEsIDMsIFwiSG9yaXpvbnRhbFwiKTtcbi8vIGFpR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUuc3VibWFyaW5lLnNpemUsIDEsIDQsIFwiSG9yaXpvbnRhbFwiKTtcbi8vIGFpR2FtZWJvYXJkLnBsYWNlU2hpcChHYW1lYm9hcmQuc2hpcFR5cGUucGF0cm9sQm9hdC5zaXplLCAxLCA1LCBcIkhvcml6b250YWxcIik7XG5cbkdhbWVib2FyZC5wbGFjZVNoaXBzQXRSYW5kb21Mb2NhdGlvbihhaUdhbWVib2FyZC5wbGFjZVNoaXApO1xuLy8gUmVuZGVyIFVJXG5VSS5yZW5kZXIoKTtcblVJLnNob3dQbGFjZWRTaGlwcyhwbGF5ZXJHYW1lYm9hcmQuYWN0aXZlU2hpcHMsIFwiUDFcIik7XG5VSS5zaG93UGxhY2VkU2hpcHMoYWlHYW1lYm9hcmQuYWN0aXZlU2hpcHMsIFwiUDJcIik7XG5cbi8vIFBsYWNlIHNoaXBzXG4vLyBQMSBzdGFydHNcbnBsYXllci50dXJuID0gdHJ1ZTtcbmNvbnN0IGJvYXJkQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYm9hcmQtY29udGFpbmVyXCIpO1xuYm9hcmRDb250YWluZXJzLmZvckVhY2goKGNvbnRhaW5lcikgPT4ge1xuICBjb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gICAgaWYgKCFnYW1lT3Zlcikge1xuICAgICAgY29uc3QgeyBwb3MgfSA9IGUudGFyZ2V0LmRhdGFzZXQ7XG4gICAgICBjb25zdCBwb3NBcnJheSA9IFVJLnNjcmVlblBvc2l0aW9uVG9HcmlkUG9zaXRpb24ocG9zKTtcbiAgICAgIGFpR2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socG9zQXJyYXlbMF0sIHBvc0FycmF5WzFdKTtcbiAgICAgIC8vIHJlbmRlciBoaXQgaWYgaXQncyBhIGhpdFxuICAgICAgVUkucmVuZGVySGl0cyhhaUdhbWVib2FyZCwgXCJQMlwiKTsgLy8gcmVuZGVyIGhpdCBpZiBpdCdzIGEgaGl0XG4gICAgICAvLyBlbHNlIHJlbmRlciBtaXNzZWQgc2hvdFxuICAgICAgVUkucmVuZGVyTWlzc2VkU2hvdHMoYWlHYW1lYm9hcmQsIFwiUDJcIik7IC8vIGVsc2UgcmVuZGVyIG1pc3NlZCBzaG90XG4gICAgICAvLyBjaGVjayBpZiBnYW1lb3ZlclxuICAgICAgY29uc29sZS5sb2coYWlHYW1lYm9hcmQuaGFzQWxsU2hpcHNTdW5rKCkpO1xuICAgICAgaWYgKGFpR2FtZWJvYXJkLmhhc0FsbFNoaXBzU3VuaygpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZW92ZXIhXCIpO1xuICAgICAgICBnYW1lT3ZlciA9IHRydWU7XG4gICAgICB9XG4gICAgICAvLyBzd2l0Y2ggdHVyblxuICAgICAgaWYgKHBsYXllci50dXJuKSB7XG4gICAgICAgIHBsYXllci50dXJuID0gZmFsc2U7XG4gICAgICAgIGFpUGxheWVyLnR1cm4gPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGxheWVyLnR1cm4gPSB0cnVlO1xuICAgICAgICBhaVBsYXllci50dXJuID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pO1xuLy8gIyMjTG9vcCBzdGFydHMgaGVyZSMjI1xuLy8gUDEgYXR0YWNrc1xuLy8gY2hlY2sgZm9yIGhpdFxuIiwiaW1wb3J0IFBsYXllciBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29tcHV0ZXIgZXh0ZW5kcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgc3VwZXIobmFtZSk7XG4gICAgdGhpcy50dXJuID0gZmFsc2U7XG4gIH1cbn1cbiIsIi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZSwgaW1wb3J0L3ByZWZlci1kZWZhdWx0LWV4cG9ydFxuaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuLy8gRnVuY3Rpb24gdG8gZ2VuZXJhdGUgcG9zaXRpb25zIG9uIGdyaWRcbi8vIGJhc2VkIG9uIHNpemUgb2Ygc2hpcCArIHN0YXJ0aW5nIGdyaWQgcG9zaXRpb24uXG5mdW5jdGlvbiBnZW5lcmF0ZUdyaWRQb3NpdGlvbihzaXplLCB4LCB5LCBkaXJlY3Rpb24pIHtcbiAgY29uc3QgYXJyID0gW107XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwOyBpbmRleCA8IHNpemU7IGluZGV4ICs9IDEpIHtcbiAgICAvLyBVc2VkIHRvIHBsYWNlIHNoaXAgaG9yaXpvbnRhbCBvY2ggdmVydGljYWxseVxuICAgIGlmIChkaXJlY3Rpb24gPT09IFwiVmVydGljYWxcIikge1xuICAgICAgYXJyLnB1c2goW3gsIHkgKyBpbmRleF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChbeCArIGluZGV4LCB5XSk7IC8vIERlZmF1bHQgdG8gaG9yaXpvbnRhbCBwbGFjZW1lbnRcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycjtcbn1cblxuLy8gR2FtZWJvYXJkIGZhY3RvcnlcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWVib2FyZCB7XG4gIHN0YXRpYyBzaGlwVHlwZSA9IHtcbiAgICBjYXJyaWVyOiB7IHNpemU6IDUgfSxcbiAgICBiYXR0bGVzaGlwOiB7IHNpemU6IDQgfSxcbiAgICBkZXN0cm95ZXI6IHsgc2l6ZTogMyB9LFxuICAgIHN1Ym1hcmluZTogeyBzaXplOiAzIH0sXG4gICAgcGF0cm9sQm9hdDogeyBzaXplOiAyIH0sXG4gIH07XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IFtdO1xuICAgIHRoaXMub2NjdXBpZWRQb3NpdGlvbnMgPSBbXTtcbiAgICB0aGlzLm1pc3NlZFNob3RzID0gW107XG4gICAgdGhpcy5oaXRzID0gW107XG4gIH1cblxuICBwbGFjZVNoaXAgPSAoc2l6ZSwgeCwgeSwgZGlyZWN0aW9uKSA9PiB7XG4gICAgY29uc3Qgc2hpcE9iaiA9IG5ldyBTaGlwKHNpemUpO1xuICAgIGxldCBwb3NpdGlvbiA9IFtdO1xuICAgIGlmICh0aGlzLiNjaGVja1Bvc2l0aW9uVmFsaWQoc2l6ZSwgeCwgeSwgZGlyZWN0aW9uKSkge1xuICAgICAgcG9zaXRpb24gPSBnZW5lcmF0ZUdyaWRQb3NpdGlvbihzaXplLCB4LCB5LCBkaXJlY3Rpb24pO1xuICAgICAgdGhpcy5hY3RpdmVTaGlwcy5wdXNoKHsgc2hpcE9iaiwgcG9zaXRpb24gfSk7XG4gICAgICBwb3NpdGlvbi5mb3JFYWNoKChwb3MpID0+IHtcbiAgICAgICAgdGhpcy5vY2N1cGllZFBvc2l0aW9ucy5wdXNoKHBvcyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBcIlBsYWNlZCBzaGlwXCI7XG4gICAgfVxuICAgIHJldHVybiBcIkludmFsaWQgcGxhY2VtZW50XCI7XG4gIH07XG5cbiAgcmVjZWl2ZUF0dGFjayh4LCB5KSB7XG4gICAgY29uc3QgYXR0YWNrUG9zID0gYCR7eH0sJHt5fWA7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFjdGl2ZVNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzaGlwID0gdGhpcy5hY3RpdmVTaGlwc1tpXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcC5wb3NpdGlvbi5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBjb25zdCBwb3NpdGlvbiA9IHNoaXAucG9zaXRpb25bal0udG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uID09PSBhdHRhY2tQb3MpIHtcbiAgICAgICAgICB0aGlzLmhpdHMucHVzaChbeCwgeV0pO1xuXG4gICAgICAgICAgcmV0dXJuIHNoaXAuc2hpcE9iai5oaXQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLm1pc3NlZFNob3RzLnB1c2goW3gsIHldKTtcbiAgICByZXR1cm4gYE5vdGhpbmcgaGl0IGF0ICR7YXR0YWNrUG9zfWA7XG4gIH1cblxuICBoYXNBbGxTaGlwc1N1bmsoKSB7XG4gICAgY29uc3Qgc2hpcFN0YXR1cyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hY3RpdmVTaGlwcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2hpcCA9IHRoaXMuYWN0aXZlU2hpcHNbaV07XG4gICAgICBzaGlwU3RhdHVzLnB1c2goc2hpcC5zaGlwT2JqLmlzU3VuaygpKTtcbiAgICB9XG5cbiAgICBpZiAoc2hpcFN0YXR1cy5pbmNsdWRlcyhmYWxzZSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAjY2hlY2tQb3NpdGlvblZhbGlkKHNpemUsIHgsIHksIGRpcmVjdGlvbikge1xuICAgIGNvbnN0IG1heEdyaWRYWSA9IFsxMCwgMTBdO1xuICAgIGNvbnN0IG1pbkdyaWRYWSA9IFsxLCAxXTtcbiAgICBjb25zdCBwb3MgPSBnZW5lcmF0ZUdyaWRQb3NpdGlvbihzaXplLCB4LCB5LCBkaXJlY3Rpb24pO1xuICAgIGlmICh0aGlzLiNncmlkUG9zaXRpb25PY2N1cGllZChwb3MpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAobGV0IGluZGV4ID0gMDsgaW5kZXggPCBzaXplOyBpbmRleCArPSAxKSB7XG4gICAgICBpZiAocG9zW2luZGV4XVswXSA+IG1heEdyaWRYWVswXSB8fCBwb3NbaW5kZXhdWzBdIDwgbWluR3JpZFhZWzBdKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmIChwb3NbaW5kZXhdWzFdID4gbWF4R3JpZFhZWzFdIHx8IHBvc1tpbmRleF1bMV0gPCBtaW5HcmlkWFlbMV0pIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgI2dyaWRQb3NpdGlvbk9jY3VwaWVkKHBvcykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5vY2N1cGllZFBvc2l0aW9ucy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBwb3MubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKHRoaXMub2NjdXBpZWRQb3NpdGlvbnNbaV0udG9TdHJpbmcoKSA9PT0gcG9zW2pdLnRvU3RyaW5nKCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdGF0aWMgcGxhY2VtZW50cyA9IFtcbiAgICBbXG4gICAgICBbNCwgMSwgXCJWZXJ0aWNhbFwiXSxcbiAgICAgIFsxLCA5LCBcIkhvcml6b250YWxcIl0sXG4gICAgICBbNiwgMywgXCJIb3Jpem9udGFsXCJdLFxuICAgICAgWzgsIDcsIFwiSG9yaXpvbnRhbFwiXSxcbiAgICAgIFsxLCAyLCBcIkhvcml6b250YWxcIl0sXG4gICAgXSxcbiAgICBbXG4gICAgICBbNCwgMTAsIFwiSG9yaXpvbnRhbFwiXSxcbiAgICAgIFs0LCA1LCBcIlZlcnRpY2FsXCJdLFxuICAgICAgWzYsIDIsIFwiSG9yaXpvbnRhbFwiXSxcbiAgICAgIFs3LCA1LCBcIkhvcml6b250YWxcIl0sXG4gICAgICBbMiwgMiwgXCJWZXJ0aWNhbFwiXSxcbiAgICBdLFxuICBdO1xuXG4gIHN0YXRpYyBwbGFjZVNoaXBzQXRSYW5kb21Mb2NhdGlvbihmdW5jKSB7XG4gICAgY29uc3QgYXJyID0gT2JqZWN0LnZhbHVlcyh0aGlzLnNoaXBUeXBlKTtcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMik7IC8vIFJldHVybnMgYSByYW5kb20gaW50ZWdlciBmcm9tIDEgdG8gMjpcbiAgICBjb25zb2xlLmxvZyhyYW5kKTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBzaGlwID0gYXJyW2ldO1xuXG4gICAgICBmdW5jKHNoaXAuc2l6ZSwgdGhpcy5wbGFjZW1lbnRzW3JhbmRdW2ldWzBdLCB0aGlzLnBsYWNlbWVudHNbcmFuZF1baV1bMV0sIHRoaXMucGxhY2VtZW50c1tyYW5kXVtpXVsyXSk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBQbGF5ZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICB0aGlzLnR1cm4gPSBmYWxzZTtcbiAgfVxufVxuIiwiLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVzZS1iZWZvcmUtZGVmaW5lLCBpbXBvcnQvcHJlZmVyLWRlZmF1bHQtZXhwb3J0XG5leHBvcnQgeyBTaGlwIH07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgpIHtcbiAgICB0aGlzLmxlbmd0aCA9IGxlbmd0aDtcbiAgICB0aGlzLmhpdHNUYWtlbiA9IDA7XG4gIH1cblxuICBoaXQgPSAoKSA9PiB7XG4gICAgdGhpcy5oaXRzVGFrZW4gKz0gMTtcbiAgICByZXR1cm4gXCJTaGlwIGhpdFwiO1xuICB9O1xuXG4gIGlzU3VuayA9ICgpID0+IHRoaXMuaGl0c1Rha2VuID09PSB0aGlzLmxlbmd0aDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgc3RhdGljIGdyaWRYWSA9IFsxMCwgMTBdO1xuXG4gIHN0YXRpYyBhY3RpdmVQbGF5ZXJzID0gMDtcblxuICBzdGF0aWMgcmVuZGVyKCkge1xuICAgIHRoaXMuI2FwcGVuZFRvQm9keSgpO1xuICAgIC8vIHRoaXMuI2luaXRFdmVudGxpc3RuZXJzKCk7XG4gIH1cblxuICBzdGF0aWMgI2FwcGVuZFRvQm9keSgpIHtcbiAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IHAxQm9hcmQgPSB0aGlzLiNjcmVhdGVHYW1lYm9hcmQoXCJTZWJhc3RpYW5cIik7XG4gICAgY29uc3QgcDJCb2FyZCA9IHRoaXMuI2NyZWF0ZUdhbWVib2FyZChcIkhBTFwiKTtcblxuICAgIGNvbnRhaW5lci5hcHBlbmQocDFCb2FyZCwgcDJCb2FyZCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmQoY29udGFpbmVyKTtcbiAgfVxuXG4gIHN0YXRpYyAjaW5jcmVhc2VBY3RpdmVQbGF5ZXJzKCkge1xuICAgIHRoaXMuYWN0aXZlUGxheWVycyArPSAxO1xuICB9XG5cbiAgc3RhdGljICNjcmVhdGVHYW1lYm9hcmQobmFtZSkge1xuICAgIHRoaXMuI2luY3JlYXNlQWN0aXZlUGxheWVycygpO1xuICAgIGNvbnN0IGZyYWdtbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgY29uc3QgYm9hcmRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnN0IHBsYXllck5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XG4gICAgcGxheWVyTmFtZS5pbm5lclRleHQgPSBuYW1lO1xuICAgIGJvYXJkQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJib2FyZC1jb250YWluZXJcIik7XG5cbiAgICBib2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwbGF5ZXJOYW1lKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuZ3JpZFhZWzBdOyBpICs9IDEpIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ncmlkWFlbMV07IGogKz0gMSkge1xuICAgICAgICBjb25zdCBncmlkU3F1YXJlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZ3JpZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwiZ3JpZC1zcXVhcmVcIik7XG4gICAgICAgIGdyaWRTcXVhcmUuc2V0QXR0cmlidXRlKFwiaWRcIiwgYFAke3RoaXMuYWN0aXZlUGxheWVyc31gKTtcbiAgICAgICAgZ3JpZFNxdWFyZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXBvc1wiLCBgJHtqICsgMX0sJHtpICsgMX1gKTsgLy8gKzEgc28gdGhhdCBncmlkIHN0YXJ0cyBhdCAxLDFcbiAgICAgICAgYm9hcmRDb250YWluZXIuYXBwZW5kQ2hpbGQoZ3JpZFNxdWFyZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZyYWdtbnQuYXBwZW5kQ2hpbGQoYm9hcmRDb250YWluZXIpO1xuICAgIHJldHVybiBmcmFnbW50O1xuICB9XG5cbiAgc3RhdGljIHNob3dQbGFjZWRTaGlwcyhzaGlwT2JqZWN0cywgcGxheWVyKSB7XG4gICAgbGV0IGdyaWRTcXVhcmVzO1xuICAgIGlmIChwbGF5ZXIgPT09IFwiUDFcIikge1xuICAgICAgZ3JpZFNxdWFyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiI1AxXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkU3F1YXJlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIjUDJcIik7XG4gICAgfVxuXG4gICAgZ3JpZFNxdWFyZXMuZm9yRWFjaCgoZ3JpZFNxdWFyZSkgPT4ge1xuICAgICAgc2hpcE9iamVjdHMuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgICAgICBzaGlwLnBvc2l0aW9uLmZvckVhY2goKHBvcykgPT4ge1xuICAgICAgICAgIGlmIChgJHtwb3NbMF19JHtwb3NbMV19YCA9PT0gZ3JpZFNxdWFyZS5kYXRhc2V0LnBvcy5zcGxpdChcIixcIikuam9pbihcIlwiKSkge1xuICAgICAgICAgICAgZ3JpZFNxdWFyZS5jbGFzc0xpc3QuYWRkKFwic2hpcFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcmVuZGVyTWlzc2VkU2hvdHMoZ2FtZWJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCB7IG1pc3NlZFNob3RzIH0gPSBnYW1lYm9hcmQ7XG4gICAgbWlzc2VkU2hvdHMuZm9yRWFjaCgoZ3JpZCkgPT4ge1xuICAgICAgY29uc3QgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXJ9W2RhdGEtcG9zPVwiJHtncmlkLmpvaW4oXCIsXCIpfVwiXWApO1xuICAgICAgZ3JpZEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm1pc3NlZC1zaG90XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHJlbmRlckhpdHMoZ2FtZWJvYXJkLCBwbGF5ZXIpIHtcbiAgICBjb25zdCB7IGhpdHMgfSA9IGdhbWVib2FyZDtcbiAgICBoaXRzLmZvckVhY2goKGhpdCkgPT4ge1xuICAgICAgY29uc3QgZ3JpZEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtwbGF5ZXJ9W2RhdGEtcG9zPVwiJHtoaXQuam9pbihcIixcIil9XCJdYCk7XG4gICAgICBncmlkRWxlbWVudC5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHNjcmVlblBvc2l0aW9uVG9HcmlkUG9zaXRpb24oY2xpY2tlZFBvc2l0aW9uKSB7XG4gICAgY29uc3QgYXJyID0gY2xpY2tlZFBvc2l0aW9uLnNwbGl0KFwiLFwiKTtcbiAgICByZXR1cm4gYXJyO1xuICB9XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG59XFxuXFxuOnJvb3Qge1xcbiAgLS1ncmlkLXNxdWFyZS1zaXplOiAzcmVtO1xcbn1cXG4uY29udGFpbmVyIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMiwgMWZyKTtcXG59XFxuLmJvYXJkLWNvbnRhaW5lciB7XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIHZhcigtLWdyaWQtc3F1YXJlLXNpemUpKTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKSk7XFxuICBnYXA6IDJweDtcXG4gIGFsaWduLXNlbGY6IGNlbnRlcjtcXG4gIGp1c3RpZnktc2VsZjogY2VudGVyO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyID4gaDIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAyMDBweDtcXG59XFxuXFxuLmdyaWQtc3F1YXJlIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MiwgMTQyLCAxNDIpO1xcbiAgaGVpZ2h0OiB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKTtcXG4gIHdpZHRoOiB2YXIoLS1ncmlkLXNxdWFyZS1zaXplKTtcXG59XFxuXFxuLyogU3R5bGUgZ3JpZCBwb3NpdGlvbnMgY29udGFpbmluZyBzaGlwcyAqL1xcbi5zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IG9yYW5nZTtcXG59XFxuXFxuLm1pc3NlZC1zaG90IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4uaGl0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyZWVuO1xcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvQ1NTL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHNCQUFzQjtFQUN0QixTQUFTO0FBQ1g7O0FBRUE7RUFDRSx3QkFBd0I7QUFDMUI7QUFDQTtFQUNFLGFBQWE7RUFDYixhQUFhO0VBQ2IscUNBQXFDO0FBQ3ZDO0FBQ0E7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHVEQUF1RDtFQUN2RCwwREFBMEQ7RUFDMUQsUUFBUTtFQUNSLGtCQUFrQjtFQUNsQixvQkFBb0I7QUFDdEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsVUFBVTtBQUNaOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLGtCQUFrQjtFQUNsQixvQ0FBb0M7RUFDcEMsK0JBQStCO0VBQy9CLDhCQUE4QjtBQUNoQzs7QUFFQSwwQ0FBMEM7QUFDMUM7RUFDRSx3QkFBd0I7QUFDMUI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSx1QkFBdUI7QUFDekJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgbWFyZ2luOiAwO1xcbn1cXG5cXG46cm9vdCB7XFxuICAtLWdyaWQtc3F1YXJlLXNpemU6IDNyZW07XFxufVxcbi5jb250YWluZXIge1xcbiAgaGVpZ2h0OiAxMDB2aDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCAxZnIpO1xcbn1cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgdmFyKC0tZ3JpZC1zcXVhcmUtc2l6ZSkpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIHZhcigtLWdyaWQtc3F1YXJlLXNpemUpKTtcXG4gIGdhcDogMnB4O1xcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcbiAganVzdGlmeS1zZWxmOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZC1jb250YWluZXIgPiBoMiB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDIwMHB4O1xcbn1cXG5cXG4uZ3JpZC1zcXVhcmUge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTQyLCAxNDIsIDE0Mik7XFxuICBoZWlnaHQ6IHZhcigtLWdyaWQtc3F1YXJlLXNpemUpO1xcbiAgd2lkdGg6IHZhcigtLWdyaWQtc3F1YXJlLXNpemUpO1xcbn1cXG5cXG4vKiBTdHlsZSBncmlkIHBvc2l0aW9ucyBjb250YWluaW5nIHNoaXBzICovXFxuLnNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogb3JhbmdlO1xcbn1cXG5cXG4ubWlzc2VkLXNob3Qge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbi5oaXQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkdhbWVib2FyZCIsIlBsYXllciIsIkNvbXB1dGVyIiwiVUkiLCJwbGF5ZXJHYW1lYm9hcmQiLCJhaUdhbWVib2FyZCIsImdhbWVPdmVyIiwicGxheWVyIiwiYWlQbGF5ZXIiLCJwbGFjZVNoaXAiLCJzaGlwVHlwZSIsImNhcnJpZXIiLCJzaXplIiwiYmF0dGxlc2hpcCIsImRlc3Ryb3llciIsInN1Ym1hcmluZSIsInBhdHJvbEJvYXQiLCJwbGFjZVNoaXBzQXRSYW5kb21Mb2NhdGlvbiIsInJlbmRlciIsInNob3dQbGFjZWRTaGlwcyIsImFjdGl2ZVNoaXBzIiwidHVybiIsImJvYXJkQ29udGFpbmVycyIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJjb250YWluZXIiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInBvcyIsInRhcmdldCIsImRhdGFzZXQiLCJwb3NBcnJheSIsInNjcmVlblBvc2l0aW9uVG9HcmlkUG9zaXRpb24iLCJyZWNlaXZlQXR0YWNrIiwicmVuZGVySGl0cyIsInJlbmRlck1pc3NlZFNob3RzIiwiY29uc29sZSIsImxvZyIsImhhc0FsbFNoaXBzU3VuayIsImNvbnN0cnVjdG9yIiwibmFtZSIsIlNoaXAiLCJnZW5lcmF0ZUdyaWRQb3NpdGlvbiIsIngiLCJ5IiwiZGlyZWN0aW9uIiwiYXJyIiwiaW5kZXgiLCJwdXNoIiwic2hpcE9iaiIsInBvc2l0aW9uIiwib2NjdXBpZWRQb3NpdGlvbnMiLCJtaXNzZWRTaG90cyIsImhpdHMiLCJhdHRhY2tQb3MiLCJpIiwibGVuZ3RoIiwic2hpcCIsImoiLCJ0b1N0cmluZyIsImhpdCIsInNoaXBTdGF0dXMiLCJpc1N1bmsiLCJpbmNsdWRlcyIsImZ1bmMiLCJPYmplY3QiLCJ2YWx1ZXMiLCJyYW5kIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwicGxhY2VtZW50cyIsIm1heEdyaWRYWSIsIm1pbkdyaWRYWSIsImhpdHNUYWtlbiIsInNoaXBPYmplY3RzIiwiZ3JpZFNxdWFyZXMiLCJncmlkU3F1YXJlIiwic3BsaXQiLCJqb2luIiwiY2xhc3NMaXN0IiwiYWRkIiwiZ2FtZWJvYXJkIiwiZ3JpZCIsImdyaWRFbGVtZW50IiwicXVlcnlTZWxlY3RvciIsImNsaWNrZWRQb3NpdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJwMUJvYXJkIiwicDJCb2FyZCIsImFwcGVuZCIsImJvZHkiLCJhY3RpdmVQbGF5ZXJzIiwiZnJhZ21udCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJib2FyZENvbnRhaW5lciIsInBsYXllck5hbWUiLCJpbm5lclRleHQiLCJhcHBlbmRDaGlsZCIsImdyaWRYWSIsInNldEF0dHJpYnV0ZSJdLCJzb3VyY2VSb290IjoiIn0=