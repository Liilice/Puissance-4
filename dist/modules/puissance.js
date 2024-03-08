"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Puissance_4 = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Puissance_4 = exports.Puissance_4 = /*#__PURE__*/function () {
  function Puissance_4(elt) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Puissance_4);
    this.rows = options.rows || 6;
    this.cols = options.cols || 7;
    this.player_1_id = options.player_1_name || 1;
    this.player_2_id = options.player_2_name || 2;
    this.score_player_1_id = 0;
    this.score_player_2_id = 0;
    this.player_1_color = options.player_1_color || "red";
    this.player_2_color = options.player_2_color || "yellow";
    this.board = [];
    for (var i = 0; i < this.cols; i++) {
      var column = [];
      for (var j = 0; j < this.rows; j++) {
        column.push(0);
      }
      this.board.push(column);
    }
    this.current_player = this.player_1_id;
    this.game_over = false;
    this.element = elt;
    this.winner = null;
    this.move_history = [];
    this.render();
    this.CSS();
  }
  _createClass(Puissance_4, [{
    key: "render",
    value: function render() {
      var _this = this;
      var table = document.createElement("table");
      for (var i = this.rows - 1; i >= 0; i--) {
        var tr = table.appendChild(document.createElement("tr"));
        for (var j = 0; j < this.cols; j++) {
          var elem_td = document.createElement("td");
          elem_td.setAttribute("id", j + "-" + i);
          var td = tr.appendChild(elem_td);
          td.addEventListener("click", function (event) {
            var cell = event.target.getAttribute("id").split("-");
            var x = parseInt(cell[0]);
            for (var _i = 0; _i < _this.rows; _i++) {
              if (_this.board[x][_i] === 0) {
                _this.board[x][_i] = _this.current_player;
                var pion = document.getElementById(x + "-" + _i);
                pion.className = "chute";
                _this.move_history.push({
                  x: x,
                  i: _i
                });
                if (_this.current_player === _this.player_1_id) {
                  pion.style.backgroundColor = _this.player_1_color;
                  _this.current_player = _this.player_2_id;
                  document.querySelector("h1").innerText = "Au tour de " + _this.current_player;
                } else {
                  pion.style.backgroundColor = _this.player_2_color;
                  _this.current_player = _this.player_1_id;
                  document.querySelector("h1").innerText = "Au tour de " + _this.current_player;
                }
                break;
              }
            }
            _this.check_coup();
            _this.check_winner();
          });
        }
      }
      var p = document.createElement("p");
      if (this.winner) {
        if (this.winner === this.player_1_id) {
          this.score_player_1_id += 1;
        } else if (this.winner === this.player_2_id) {
          this.score_player_2_id += 1;
        } else {
          return;
        }
      }
      p.innerText = "SCORE " + this.player_1_id + " " + this.score_player_1_id + " vs " + this.player_2_id + " " + this.score_player_2_id;
      var h1 = document.createElement("h1");
      h1.innerText = "Au tour de " + this.current_player;
      var button = document.createElement("button");
      button.innerText = "annuler son dernier coup";
      var div = document.createElement("div");
      div.className = "container_affichage";
      div.append(p, h1, button);
      this.element.innerHTML = "";
      this.element.append(div, table);
      button.addEventListener("click", function () {
        if (_this.move_history.length === 0) {
          return;
        }
        var last_cell = _this.move_history.pop();
        var arr_last_cell = Object.values(last_cell);
        _this.board[arr_last_cell[0]][arr_last_cell[1]] = 0;
        if (_this.board[arr_last_cell[0]][arr_last_cell[1]] === 0) {
          var pion = document.getElementById(arr_last_cell[0] + "-" + [arr_last_cell[1]]);
          pion.removeAttribute("style");
          pion.removeAttribute("class");
          if (_this.current_player === _this.player_1_id) {
            _this.current_player = _this.player_2_id;
            document.querySelector("h1").innerText = "Au tour de " + _this.current_player;
          } else {
            _this.current_player = _this.player_1_id;
            document.querySelector("h1").innerText = "Au tour de " + _this.current_player;
          }
        }
      });
    }
  }, {
    key: "CSS",
    value: function CSS() {
      var style = document.createElement("style");
      document.body.appendChild(style);
      style.innerHTML = " \n    #game table {\n      border: 3px blue outset;\n      background-color: blue;\n    }\n    #game td {\n      width: 2cm;\n      height: 2cm;\n      margin: 0px;\n      padding: 0px;\n      border: 2px blue inset;\n      border-radius: 2cm;\n      background-color: white;\n      cursor: pointer;\n    }\n    #game td.player1 {\n      background-color: red;\n    }\n    #game td.player2 {\n      background-color: yellow;\n    }\n    .chute {\n      animation: chute 1s;\n    }\n    @keyframes chute {\n      0% {\n        transform: translateY(-500px);\n        opacity: 0.1;\n      }\n      100% {\n        transform: translateY(0);\n        opacity: 1;\n      }\n    }\n    .container_affichage {\n      display: flex;\n      flex-direction: column;\n      margin-right: 1rem;\n      width: 20rem;\n    }\n    #game {\n      display: flex;\n    }\n    .div_modal {\n      position: fixed;\n      top: 0px;\n      display: none;\n      width: 50rem;\n      height: 25rem;\n      overflow: auto;\n      background-color: rgba(0, 0, 0, 0.8);\n    }\n    \n    ";
    }
  }, {
    key: "check_coup",
    value: function check_coup() {
      for (var i = 0; i < this.cols; i++) {
        for (var j = 0; j < this.rows; j++) {
          if (this.board[i][j] === 0) {
            return false;
          }
        }
      }
      alert("plus d'emplacement possible");
      this.winner = null;
      this.reset();
    }
  }, {
    key: "check_winner",
    value: function check_winner() {
      if (this.game_over) {
        return this.game_over;
      }
      // Diagonal /
      for (var c = 0; c < this.cols; c++) {
        for (var l = 0; l < this.rows; l++) {
          if (this.board[c][l] !== 0) {
            if (c !== this.cols - 1 && this.board[c][l] === this.board[c + 1][l + 1] && this.board[c + 1][l + 1] === this.board[c + 2][l + 2] && this.board[c + 2][l + 2] === this.board[c + 3][l + 3]) {
              // this.game_over = true;
              this.set_winner(c, l);
            } else if (c == this.cols - 1 && l > 3) {
              if (this.board[c][l] === this.board[c - 1][l - 1] && this.board[c - 1][l - 1] === this.board[c - 2][l - 2] && this.board[c - 2][l - 2] === this.board[c - 3][l - 3]) {
                // this.game_over = true;
                this.set_winner(c, l);
              }
            }
          }
        }
      }

      // horizontal
      for (var _c = 0; _c < this.cols; _c++) {
        for (var _l = 0; _l < this.rows; _l++) {
          if (this.board[_c][_l] !== 0) {
            if (_c == this.cols - 1 && this.board[_c][_l] === this.board[_c - 1][_l] && this.board[_c - 1][_l] === this.board[_c - 2][_l] && this.board[_c - 2][_l] === this.board[_c - 3][_l]) {
              this.set_winner(_c, _l);
            } else if (_c !== this.cols - 1 && this.board[_c][_l] === this.board[_c + 1][_l] && this.board[_c + 1][_l] === this.board[_c + 2][_l] && this.board[_c + 2][_l] === this.board[_c + 3][_l]) {
              this.set_winner(_c, _l);
            }
          }
        }
      }

      // Diagonal \
      for (var _c2 = 0; _c2 < this.cols; _c2++) {
        for (var _l2 = 0; _l2 < this.rows; _l2++) {
          if (this.board[_c2][_l2] !== 0) {
            if (_c2 == 0 && _l2 > 2 && this.board[_c2][_l2] === this.board[_c2 + 1][_l2 - 1] && this.board[_c2 + 1][_l2 - 1] === this.board[_c2 + 2][_l2 - 2] && this.board[_c2 + 2][_l2 - 2] === this.board[_c2 + 3][_l2 - 3]) {
              this.set_winner(_c2, _l2);
            } else if (_c2 == this.cols - 1 && this.board[_c2][_l2] === this.board[_c2 - 1][_l2 + 1] && this.board[_c2 - 1][_l2 + 1] === this.board[_c2 - 2][_l2 + 2] && this.board[_c2 - 2][_l2 + 2] === this.board[_c2 - 3][_l2 + 3]) {
              this.set_winner(_c2, _l2);
            } else if (_c2 != 0 && _c2 != this.cols - 1 && this.board[_c2][_l2] === this.board[_c2 + 1][_l2 - 1] && this.board[_c2 + 1][_l2 - 1] === this.board[_c2 + 2][_l2 - 2] && this.board[_c2 + 2][_l2 - 2] === this.board[_c2 + 3][_l2 - 3]) {
              this.set_winner(_c2, _l2);
            }
          }
        }
      }

      // Vertical;
      for (var _c3 = 0; _c3 < this.cols; _c3++) {
        for (var _l3 = 0; _l3 < this.rows; _l3++) {
          if (this.board[_c3][_l3] !== 0) {
            if (this.board[_c3][_l3] === this.board[_c3][_l3 + 1] && this.board[_c3][_l3 + 1] === this.board[_c3][_l3 + 2] && this.board[_c3][_l3 + 2] === this.board[_c3][_l3 + 3]) {
              this.set_winner(_c3, _l3);
            }
          }
        }
      }
      return this.game_over;
    }
  }, {
    key: "set_winner",
    value: function set_winner(c, l) {
      if (this.board[c][l] === this.player_1_id) {
        alert(this.player_1_id + " win");
        this.winner = this.player_1_id;
        this.reset();
      } else {
        alert(this.player_2_id + " win");
        this.winner = this.player_2_id;
        this.reset();
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      this.board = [];
      for (var i = 0; i < this.cols; i++) {
        var column = [];
        for (var j = 0; j < this.rows; j++) {
          column.push(0);
        }
        this.board.push(column);
      }
      if (this.winner) {
        if (this.winner === this.player_1_id) {
          this.winner = this.player_1_id;
        } else {
          this.winner = this.player_2_id;
        }
      }
      this.render();
    }
  }]);
  return Puissance_4;
}();