export class Puissance_4 {
  constructor(elt, options = {}) {
    this.rows = options.rows || 6;
    this.cols = options.cols || 7;
    this.player_1_id = options.player_name || 1;
    this.player_2_id = options.player_name || 2;
    this.player_1_color = options.player_1_color || "red";
    this.player_2_color = options.player_2_color || "yellow";
    this.board = [];
    for (let i = this.rows; i >= 0; i--) {
      let row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(j);
      }
      this.board.push(row);
    }
    console.log(this.board);
    this.current_player = this.player_1_id;
    this.board;
    this.game_over = false;
    this.element = elt;
    this.render();
    // this.set_pion();
  }
  render() {
    let table = document.createElement("table");
    for (let i = this.rows - 1; i >= 0; i--) {
      // let row = [];
      let tr = table.appendChild(document.createElement("tr"));
      for (let j = 0; j < this.cols; j++) {
        // row.push(j);
        let elem_td = document.createElement("td");
        elem_td.setAttribute("id", j + "-" + i);
        elem_td.className = "pion";
        let td = tr.appendChild(elem_td);
        td.addEventListener("click", (event) => {
          let cell = event.target.getAttribute("id").split("-");
          let x = parseInt(cell[0]);
          let y = parseInt(cell[1]);
          console.log(x);
          console.log(y);
          this.board[x][y] = this.current_player;
          let pion = event.target;
          if (this.current_player === this.player_1_id) {
            console.log(this.player_1_color);
            pion.style.backgroundColor = this.player_1_color;
            this.current_player = this.player_2_id;
          } else {
            pion.style.backgroundColor = this.player_2_color;
            this.current_player = this.player_1_id;
          }
        });
      }
      // this.board.push(row);
    }
    this.element.innerHTML = "";
    this.element.appendChild(table);
  }
  // set_pion() {
  //   console.log(this.board);
  //   let cell = event.target.getAttribute("id").split("-");
  //   let x = parseInt(cell[0]);
  //   let y = parseInt(cell[1]);
  //   this.board[x][y] = this.current_player;
  //   let pion = event.target;
  //   if (this.current_player === this.player_1_id) {
  //     pion.style.backgroundColor = this.player_1_color;
  //     this.current_player = this.player_2_id;
  //   } else {
  //     pion.style.backgroundColor = this.player_2_color;
  //     this.current_player = this.player_1_id;
  //   }
  // }
}
