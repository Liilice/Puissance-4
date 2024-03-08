"use strict";

var _puissance = require("./modules/puissance.js");
var game = new _puissance.Puissance_4(document.getElementById("game"), {
  rows: 6,
  cols: 7,
  player_1_name: "Helena",
  player_2_name: "Alice",
  player_1_color: "green",
  player_2_color: "purple"
});