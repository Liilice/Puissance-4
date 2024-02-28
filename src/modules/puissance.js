export class Puissance_4 {
  constructor(elt, options = {}) {
    this.rows = options.rows || 6;
    this.cols = options.cols || 7;
    this.player_1_id = options.player_1_name || 1;
    this.player_2_id = options.player_2_name || 2;
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
        elem_td.innerText = j + "-" + i;
        let td = tr.appendChild(elem_td);

        td.addEventListener("click", (event) => {
          let cell = event.target.getAttribute("id").split("-");
          let x = parseInt(cell[0]);
          let y = parseInt(cell[1]);

          for (let i = 0; i < this.rows; i++) {
            if (this.board[x][i] === 0) {
              this.board[x][i] = this.current_player;
              let pion = document.getElementById(x + "-" + i);
              pion.className = "chute";
              let coordonner = pion.getAttribute("id");
              if (this.current_player === this.player_1_id) {
                pion.innerText = coordonner + " " + this.current_player;
                pion.style.backgroundColor = this.player_1_color;
                this.current_player = this.player_2_id;
                document.querySelector("h1").innerText =
                  "Au tour de " + this.current_player;
              } else {
                pion.innerText = coordonner + " " + this.current_player;
                pion.style.backgroundColor = this.player_2_color;
                this.current_player = this.player_1_id;
                document.querySelector("h1").innerText =
                  "Au tour de " + this.current_player;
              }
              break;
            }
          }
        });
      }
    }
    let h1 = document.createElement("h1");
    h1.innerText = "Au tour de " + this.current_player;
    this.element.innerHTML = "";
    this.element.append(h1, table);
  }
}
