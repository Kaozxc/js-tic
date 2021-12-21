let board = [];
let currentPlayer = "O";

let boardDiv = document.querySelector("#board");

let winnerPos = [
  [
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: 2 },
  ],
  [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
    { x: 2, y: 0 },
  ],
  [
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 2 },
  ],
  [
    { x: 0, y: 2 },
    { x: 1, y: 2 },
    { x: 2, y: 2 },
  ],
];

function initializeBoardInMemory(size) {
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      board.push({ x: x, y: y, choice: null });
    }
  }
}

function generateCell(x, y, choice) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.setAttribute("x", x);
  cell.setAttribute("y", y);
  cell.innerHTML = choice;
  return cell;
}

function drawBoard() {
  boardDiv.innerHTML = "";
  board.forEach((item) => {
    boardDiv.appendChild(generateCell(item.x, item.y, item.choice));
    if (item.x + 1 == Math.sqrt(board.length)) {
      boardDiv.appendChild(document.createElement("br"));
    }
  });
  printPlayer();
  bindClick();
}

printPlayer = () => {
  let currentPlayerDiv = document.querySelector("#player");
  currentPlayerDiv.textContent = `Player: ${currentPlayer}`;
};

bindClick = () => {
  document.querySelectorAll(".cell").forEach((item) => {
    item.addEventListener("click", (event) => {
      let x = event.target.getAttribute("x");
      let y = event.target.getAttribute("y");
      let cell = board.filter(
        (cell) => cell.x == x && cell.y == y && cell.choice == null
      );
      if (cell.length <= 0) {
        return;
      }
      cell[0].choice = currentPlayer;
      currentPlayer = currentPlayer == "X" ? "O" : "X";
      drawBoard();
      checkForWinner();
    });
  });
};

checkForWinner = () => {
  let playerO = board.filter((item) => item.choice == "O");
  //console.log(playerO);
  let playerX = board.filter((item) => item.choice == "X");
  winnerPos
    .sort((curr, next) => (curr.x > next.x ? 1 : 0))
    .forEach((winnerPos) => {
      {
        let tmp = new Array();
        playerO.forEach((playerChoice) =>
          tmp.push({ x: playerChoice.x, y: playerChoice.y })
        );
        console.log(
          `Comparing ${JSON.stringify(tmp)} to ${JSON.stringify(winnerPos)}`
        );

        if (tmp.values() == winnerPos.values()) {
          alert("0");
        }
      }
      {
        let tmp2 = new Array();
        playerX.forEach((playerChoice) =>
          tmp2.push({ x: playerChoice.x, y: playerChoice.y })
        );
        if (arraysEqual(tmp2, winnerPos)) {
          playerWon("X");
        }
      }
    });
};

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

playerWon = (mark) => {
  alert(`Player ${mark} won`);
};

chooseField = (x, y) => {};

initialize = () => {
  initializeBoardInMemory(3);
  drawBoard();
};

initialize();
//console.log(board);
