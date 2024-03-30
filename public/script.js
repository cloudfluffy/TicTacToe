const X = `<svg width="90%" height="90%" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="141.421" width="200" height="40" rx="20" transform="rotate(-45 0 141.421)" fill="#FF5151" /><rect x="28.2843" width="200" height="40" rx="20" transform="rotate(45 28.2843 0)" fill="#FF5151" /></svg>`;
const O = `<svg width="90%" height="90%" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 82.5C150 119.779 119.779 150 82.5 150C45.2208 150 15 119.779 15 82.5C15 45.2208 45.2208 15 82.5 15C119.779 15 150 45.2208 150 82.5Z" stroke="#161E54" stroke-width="30" /></svg>`;
const board = [];
const boardSize = 3;
const boardDiv = `.${gameboard} div`;
let isPlayer1Turn;

start();

console.log(`Gamemode: ${gamemode}\nGameboard: ${gameboard}\nPlayer 1 go First? ${isPlayer1Turn}`);

function start() {
    setFirstTurn();
    setBoard(boardSize);
    assignClassToDiv(boardSize);
    addEventListenerToDiv();
}

function restart() {
    setFirstTurn();
    setBoard(boardSize);
    addEventListenerToDiv();
    resetDiv();
}

/* Remove all html content inside each div in the grid */
function resetDiv() {
    $(boardDiv).each(function () {
        $(this).html("");
    });
}

/* Assign coordinates label to each div in the grid as a class in the format of "x;y" */
function assignClassToDiv(n) {
    let row = 0;
    let column = 0;
    $(boardDiv).each(function () {
        $(this).addClass(`${row};${column}`);
        if (column < n - 1) {
            column++;
        } else {
            column = 0;
            row++;
        }
    });
}

/* Attact event listener to each div in the grid */
function addEventListenerToDiv() {
    $(boardDiv).on("click", function () {
        let parts = $(this).attr("class").split(";");
        let row = parseInt(parts[0]);
        let column = parseInt(parts[1]);

        if (isPlayer1Turn) {
            $(this).html(X);
            $(this).off("click");
            isPlayer1Turn = false;
            board[row][column] = "X";
        } else {
            $(this).html(O);
            $(this).off("click");
            isPlayer1Turn = true;
            board[row][column] = "O";
        }

        printBoard();
        console.log(checkWin(boardSize));

        if (checkWin(boardSize)) {
            $(boardDiv).off("click");
            restart();
        }
    });
}

/* Check horizontal winning condition */
function checkHorizontal(n) {
    for (let row = 0; row < board.length; row++) {
        let counter = 0;
        for (let column = 0; column < board.length - n + 1; column++) {
            if (board[row][column] !== "-") {
                counter++;
                while (column < board.length - 1 && board[row][column + 1] === board[row][column]) {
                    counter++;
                    column++;
                }
                if (counter == n) {
                    return true;
                }
                counter = 0;
            }
        }
    }
    return false;
}

/* Check vertical winning condition */
function checkVertical(n) {
    for (let column = 0; column < board.length; column++) {
        let counter = 0;
        for (let row = 0; row < board.length - n + 1; row++) {
            if (board[row][column] !== "-") {
                counter++;
                while (row < board.length - 1 && board[row + 1][column] === board[row][column]) {
                    counter++;
                    row++;
                }
                if (counter == n) {
                    return true;
                }
                counter = 0;
            }
        }
    }
    return false;
}

/* Check all main diagonal winning condition */
function checkMainDiagonal(n) {
    return false;
}

/* Check all minor diagonal winning condition */
function checkMinorDiagonal(n) {
    return false;
}

/* Check all winning condition */
function checkWin(n) {
    return checkHorizontal(n) || checkVertical(n) || checkMainDiagonal(n) || checkMinorDiagonal(n);
}

/* Check for tie */
function checkTie(n) {

}

/* Set up an 2D array representation of the grid */
function setBoard(n) {
    for (let i = 0; i < n; i++) {
        board[i] = [];
        for (let j = 0; j < n; j++) {
            board[i][j] = "-";
        }
    }
}

/* Prints the 2D array representation of the grid on the console */
function printBoard() {
    for (let i = 0; i < board.length; i++) {
        let row = ""
        for (let j = 0; j < board[i].length; j++) {
            row += board[i][j] + " "
        }
        console.log(row)
    }
}

/* Determine who goes first in a new round */
function setFirstTurn() {
    if (player1turn === "true") {
        isPlayer1Turn = true;
    } else {
        isPlayer1Turn = false;
    }
}