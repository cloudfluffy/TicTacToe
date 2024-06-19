const X = `<svg width="90%" height="90%" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="141.421" width="200" height="40" rx="20" transform="rotate(-45 0 141.421)" fill="#FF5151" /><rect x="28.2843" width="200" height="40" rx="20" transform="rotate(45 28.2843 0)" fill="#FF5151" /></svg>`;
const O = `<svg width="90%" height="90%" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 82.5C150 119.779 119.779 150 82.5 150C45.2208 150 15 119.779 15 82.5C15 45.2208 45.2208 15 82.5 15C119.779 15 150 45.2208 150 82.5Z" stroke="#161E54" stroke-width="30" /></svg>`;
const Xicon = `<svg width="14px" height="14px" viewBox="0 0 170 170" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="141.421" width="200" height="40" rx="20" transform="rotate(-45 0 141.421)" fill="#FF5151" /><rect x="28.2843" width="200" height="40" rx="20" transform="rotate(45 28.2843 0)" fill="#FF5151" /></svg>`;
const Oicon = `<svg width="14px" height="14px" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M150 82.5C150 119.779 119.779 150 82.5 150C45.2208 150 15 119.779 15 82.5C15 45.2208 45.2208 15 82.5 15C119.779 15 150 45.2208 150 82.5Z" stroke="#161E54" stroke-width="30" /></svg>`;
const board = [];
const boardDiv = `.normal_grid div`;
const boardSize = 3;
const winCondition = 3;

let availableMoves = [];
let turn = 0;

start();

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

    initializeBoard(boardSize);
    initializeAvailableMoves(boardSize);
    assignClassToDiv(boardSize);

    if (gamemode == "robot" && player1turn !== "true") {
        setTimeout(function () {
            addEventListenerToDiv();
            robotMove();
        }, 500);
    } else {
        addEventListenerToDiv();
    }
}

function restart() {
    turn = 0;
    resetDiv();
    initializeBoard(boardSize);
    initializeAvailableMoves(boardSize);
    $(boardDiv).off();
    if (gamemode == "robot" && player1turn !== "true") {
        setTimeout(function () {
            addEventListenerToDiv();
            robotMove();
        }, 500);
    } else {
        addEventListenerToDiv();
    }
}

/* Attact event listener to each div in the grid */
function addEventListenerToDiv() {
    for (let i = 0; i < availableMoves.length; i++) {
        let parts = availableMoves[i].split(";");
        let row = parseInt(parts[0]);
        let column = parseInt(parts[1]);
        $(`.${row}\\;${column}`).on("click", function () {
            availableMoves.splice(availableMoves.indexOf(`${row};${column}`), 1);

            if (turn % 2 === 0) {
                $(this).html(X);
                board[row][column] = "X";
            } else {
                $(this).html(O);
                board[row][column] = "O";
            }

            turn++;

            if (gamemode === "robot") {
                $(boardDiv).off();
            } else {
                $(this).off();
            }

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
                setTimeout(restart, 1000);
            } else if (checkTie()) {
                $(boardDiv).off();
                setTimeout(restart, 1000);
            } else if (gamemode === "robot") {
                setTimeout(function () {
                    robotMove();
                    addEventListenerToDiv();
                }, 500);
            }
        });
    }
}

function robotMove() {
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    let parts = availableMoves.splice(randomIndex, 1)[0].split(";");
    let row = parseInt(parts[0]);
    let column = parseInt(parts[1]);
    let div = `.${row}\\;${column}`;

    if (turn % 2 === 0) {
        $(div).html(X);
        board[row][column] = "X";
    } else {
        $(div).html(O);
        board[row][column] = "O";
    }

    turn++;

    $(div).off();

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
        setTimeout(restart, 1000);
    } else if (checkTie()) {
        $(boardDiv).off();
        setTimeout(restart, 1000);
    }
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

/* Initialize available moves for the robot */
function initializeAvailableMoves(n) {
    availableMoves = [];
    let row = 0;
    let column = 0;
    for (let i = 0; i < n * n; i++) {
        availableMoves.push(`${row};${column}`);
        if (column < n - 1) {
            column++;
        } else {
            column = 0;
            row++;
        }
    };
}

/* Initialize an n by n array representation of the game board */
function initializeBoard(n) {
    for (let i = 0; i < n; i++) {
        board[i] = [];
        for (let j = 0; j < n; j++) {
            board[i][j] = "-";
        }
    }
}

/* Reset client side gameboard */
function resetDiv() {
    $(boardDiv).each(function () {
        $(this).html("");
    });
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

/* Check all winning condition for n in a row */
function checkWin(n) {
    return checkHorizontal(n) || checkVertical(n) || checkMainDiagonal(n) || checkMinorDiagonal(n);
}

/* Check all horizontal for n in a row */
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

/* Check all vertical for n in a row */
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

/* Check all diagonals in the major direction for n in a row */
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

/* Check all diagonals in the minor direction for n in a row */
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