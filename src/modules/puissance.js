export class Puissance_4 {
  constructor(elt, options = {}) {
    this.rows = options.rows || 6;
    this.cols = options.cols || 7;
    this.player_1_id = options.player_1_name || 1;
    this.player_2_id = options.player_2_name || 2;
    this.score_player_1_id = 0;
    this.score_player_2_id = 0;
    this.player_1_color = options.player_1_color || "red";
    this.player_2_color = options.player_2_color || "yellow";
    this.board = [];
    for (let i = 0; i < this.cols; i++) {
      let column = [];
      for (let j = 0; j < this.rows; j++) {
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
  }

  render() {
    let table = document.createElement("table");
    for (let i = this.rows - 1; i >= 0; i--) {
      let tr = table.appendChild(document.createElement("tr"));
      for (let j = 0; j < this.cols; j++) {
        let elem_td = document.createElement("td");
        elem_td.setAttribute("id", j + "-" + i);
        elem_td.className = "pion";
        // elem_td.innerText = j + "-" + i;
        let td = tr.appendChild(elem_td);

        td.addEventListener("click", (event) => {
          let cell = event.target.getAttribute("id").split("-");
          let x = parseInt(cell[0]);
          //   let y = parseInt(cell[1]);

          for (let i = 0; i < this.rows; i++) {
            if (this.board[x][i] === 0) {
              this.board[x][i] = this.current_player;
              let pion = document.getElementById(x + "-" + i);
              pion.className = "chute";

              this.move_history.push({ x, i });
              //   let coordonner = pion.getAttribute("id");
              if (this.current_player === this.player_1_id) {
                // pion.innerText = coordonner + " " + this.current_player;
                pion.style.backgroundColor = this.player_1_color;
                this.current_player = this.player_2_id;
                document.querySelector("h1").innerText =
                  "Au tour de " + this.current_player;
              } else {
                // pion.innerText = coordonner + " " + this.current_player;
                pion.style.backgroundColor = this.player_2_color;
                this.current_player = this.player_1_id;
                document.querySelector("h1").innerText =
                  "Au tour de " + this.current_player;
              }
              break;
            }
          }
          this.check_coup();
          this.check_winner();
        });
      }
    }
    let p = document.createElement("p");
    if (this.winner) {
      console.log("dans if");
      if (this.winner === this.player_1_id) {
        this.score_player_1_id += 1;
      } else if (this.winner === this.player_2_id) {
        this.score_player_2_id += 1;
      } else {
        return;
      }
    }
    p.innerText =
      "SCORE " +
      this.player_1_id +
      " " +
      this.score_player_1_id +
      " vs " +
      this.player_2_id +
      " " +
      this.score_player_2_id;
    let h1 = document.createElement("h1");
    h1.innerText = "Au tour de " + this.current_player;
    let button = document.createElement("button");
    button.className = "cancel";
    button.innerText = "annuler son dernier coup";

    let div = document.createElement("div");
    div.className = "container_affichage";
    div.append(p, h1, button);

    this.element.innerHTML = "";
    this.element.append(div, table);

    document.querySelector(".cancel").addEventListener("click", () => {
      if (this.move_history.length === 0) {
        return;
      }
      let last_cell = this.move_history.pop();
      console.log(last_cell);
      let arr_last_cell = Object.values(last_cell);
      this.board[arr_last_cell[0]][arr_last_cell[1]] = 0;
      if (this.board[arr_last_cell[0]][arr_last_cell[1]] === 0) {
        let pion = document.getElementById(
          arr_last_cell[0] + "-" + [arr_last_cell[1]]
        );
        pion.removeAttribute("style");
        pion.removeAttribute("class");
        if (this.current_player === this.player_1_id) {
          this.current_player = this.player_2_id;
          document.querySelector("h1").innerText =
            "Au tour de " + this.current_player;
        } else {
          this.current_player = this.player_2_id;
          document.querySelector("h1").innerText =
            "Au tour de " + this.current_player;
        }
      }
    });
  }

  check_coup() {
    for (let i = 0; i < this.cols; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (this.board[i][j] === 0) {
          return false;
        }
      }
    }
    alert("plus d'emplacement possible");
    this.winner = null;
    this.reset();
  }

  check_winner() {
    if (this.game_over) {
      console.log("dgvdxv");
      return this.game_over;
    }
    // Diagonal /
    for (let c = 0; c < this.cols; c++) {
      for (let l = 0; l < this.rows; l++) {
        if (this.board[c][l] !== 0) {
          if (
            c !== this.cols - 1 &&
            this.board[c][l] === this.board[c + 1][l + 1] &&
            this.board[c + 1][l + 1] === this.board[c + 2][l + 2] &&
            this.board[c + 2][l + 2] === this.board[c + 3][l + 3]
          ) {
            // this.game_over = true;
            this.set_winner(c, l);
          } else if (c == this.cols - 1 && l > 3) {
            if (
              this.board[c][l] === this.board[c - 1][l - 1] &&
              this.board[c - 1][l - 1] === this.board[c - 2][l - 2] &&
              this.board[c - 2][l - 2] === this.board[c - 3][l - 3]
            ) {
              // this.game_over = true;
              this.set_winner(c, l);
            }
          }
        }
      }
    }

    // horizontal
    for (let c = 0; c < this.cols; c++) {
      for (let l = 0; l < this.rows; l++) {
        if (this.board[c][l] !== 0) {
          if (
            c == this.cols - 1 &&
            this.board[c][l] === this.board[c - 1][l] &&
            this.board[c - 1][l] === this.board[c - 2][l] &&
            this.board[c - 2][l] === this.board[c - 3][l]
          ) {
            // this.game_over = true;
            this.set_winner(c, l);
          } else if (
            c !== this.cols - 1 &&
            this.board[c][l] === this.board[c + 1][l] &&
            this.board[c + 1][l] === this.board[c + 2][l] &&
            this.board[c + 2][l] === this.board[c + 3][l]
          ) {
            // this.game_over = true;
            this.set_winner(c, l);
          }
        }
      }
    }

    // Diagonal \
    for (let c = 0; c < this.cols; c++) {
      for (let l = 0; l < this.rows; l++) {
        if (this.board[c][l] !== 0) {
          if (
            c == 0 &&
            l > 2 &&
            this.board[c][l] === this.board[c + 1][l - 1] &&
            this.board[c + 1][l - 1] === this.board[c + 2][l - 2] &&
            this.board[c + 2][l - 2] === this.board[c + 3][l - 3]
          ) {
            // this.game_over = true;
            this.set_winner(c, l);
          } else if (
            c == this.cols - 1 &&
            this.board[c][l] === this.board[c - 1][l + 1] &&
            this.board[c - 1][l + 1] === this.board[c - 2][l + 2] &&
            this.board[c - 2][l + 2] === this.board[c - 3][l + 3]
          ) {
            // this.game_over = true;
            this.set_winner(c, l);
          } else if (
            c != 0 &&
            c != this.cols - 1 &&
            this.board[c][l] === this.board[c + 1][l - 1] &&
            this.board[c + 1][l - 1] === this.board[c + 2][l - 2] &&
            this.board[c + 2][l - 2] === this.board[c + 3][l - 3]
          ) {
            // this.game_over = true;
            this.set_winner(c, l);
          }
        }
      }
    }

    // Vertical;
    for (let c = 0; c < this.cols; c++) {
      for (let l = 0; l < this.rows; l++) {
        if (this.board[c][l] !== 0) {
          if (
            this.board[c][l] === this.board[c][l + 1] &&
            this.board[c][l + 1] === this.board[c][l + 2] &&
            this.board[c][l + 2] === this.board[c][l + 3]
          ) {
            this.set_winner(c, l);
            // this.game_over = true;
          }
        }
      }
    }
    return this.game_over;
  }

  set_winner(c, l) {
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

  reset() {
    this.board = [];
    for (let i = 0; i < this.cols; i++) {
      let column = [];
      for (let j = 0; j < this.rows; j++) {
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
}
