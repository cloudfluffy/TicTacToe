const X = `<svg width="90%" height="90%" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="141.421" width="200" height="40" rx="20" transform="rotate(-45 0 141.421)" fill="#FF5151" /><rect x="28.2843" width="200" height="40" rx="20" transform="rotate(45 28.2843 0)" fill="#FF5151" /></svg>`;
const O = `<svg width="90%" height="90%" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 82.5C150 119.779 119.779 150 82.5 150C45.2208 150 15 119.779 15 82.5C15 45.2208 45.2208 15 82.5 15C119.779 15 150 45.2208 150 82.5Z" stroke="#161E54" stroke-width="30" /></svg>`;
const Xicon = `<svg width="14px" height="14px" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="141.421" width="200" height="40" rx="20" transform="rotate(-45 0 141.421)" fill="#FF5151" /><rect x="28.2843" width="200" height="40" rx="20" transform="rotate(45 28.2843 0)" fill="#FF5151" /></svg>`;
const Oicon = `<svg width="14px" height="14px" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 82.5C150 119.779 119.779 150 82.5 150C45.2208 150 15 119.779 15 82.5C15 45.2208 45.2208 15 82.5 15C119.779 15 150 45.2208 150 82.5Z" stroke="#161E54" stroke-width="30" /></svg>`;
const board = [];
const boardDiv = `.${gameboard} div`;

let boardSize;
let winCondition;
if (gameboard === "normal_grid") {
    boardSize = 3;
    winCondition = 3;
} else {
    boardSize = 5;
    winCondition = 4;
}

let turn = 0;

start();

console.log(`Gamemode: ${gamemode}\nGameboard: ${gameboard}\nPlayer 1 go First? ${player1turn}`);

function start() {
    if (player1turn === "true") {
        $(".player1 p").addClass("first");
        $(".player1 p").html(`${$(".player1 p").html()} ${Xicon}`);
        $(".player2 p").addClass("second");
        $(".player2 p").html(`${$(".player2 p").html()} ${Oicon}`);
    } else {
        $(".player1 p").addClass("second");
        $(".player1 p").html(`${$(".player1 p").html()} ${Oicon}`);
        $(".player2 p").addClass("first");
        $(".player2 p").html(`${$(".player2 p").html()} ${Xicon}`);
    }
    setBoard(boardSize);
    assignClassToDiv(boardSize);
    addEventListenerToDiv();
}

function restart() {
    turn = 0;
    resetDiv();
    setBoard(boardSize);
    $(boardDiv).off();
    addEventListenerToDiv();
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

        if (turn % 2 === 0) {
            $(this).html(X);
            board[row][column] = "X";
        } else {
            $(this).html(O);
            board[row][column] = "O";
        }

        turn++;
        $(this).off();

        if (checkWin(winCondition)) {
            if (player1turn === "true") {
                if (turn % 2 == 1) {
                    $(".player1 div span").text(parseInt($(".player1 div span").text()) + 1);
                } else {
                    $(".player2 div span").text(parseInt($(".player2 div span").text()) + 1);
                }
            } else {
                if (turn % 2 == 1) {
                    $(".player2 div span").text(parseInt($(".player2 div span").text()) + 1);
                } else {
                    $(".player1 div span").text(parseInt($(".player1 div span").text()) + 1);
                }
            }
            $(boardDiv).off();
            restart();
        }

        if (checkTie()) {
            $(boardDiv).off();
            restart();
        }
    });
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

/* Check for tie */
function checkTie() {
    for (let row = 0; row < board.length; row++) {
        for (let column = 0; column < board.length; column++) {
            if (board[row][column] === "-") {
                return false;
            }
        }
    }
    return true;
}

/* Check all winning condition */
function checkWin(n) {
    return checkHorizontal(n) || checkVertical(n) || checkMainDiagonal(n) || checkMinorDiagonal(n);
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
    for (let row = 0; row < board.length - n + 1; row++) {
        let counter = 0;
        for (let column = 0; column < board.length - n + 1; column++) {
            let y = row;
            let x = column;
            if (board[y][x] !== "-") {
                counter++;
                while (y < board.length - 1 && x < board.length - 1 && board[y + 1][x + 1] == board[y][x]) {
                    counter++;
                    y++;
                    x++;
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

/* Check all minor diagonal winning condition */
function checkMinorDiagonal(n) {
    for (let row = 0; row < board.length - n + 1; row++) {
        let counter = 0;
        for (let column = board.length - 1; column - n + 1 >= 0; column--) {
            let y = row;
            let x = column;
            if (board[y][x] !== "-") {
                counter++;
                while (y < board.length - 1 && x > 0 && board[y + 1][x - 1] === board[y][x]) {
                    counter++;
                    y++;
                    x--;
                }
                if (counter === n) {
                    return true;
                }
                counter = 0;
            }
        }
    }
    return false;
}