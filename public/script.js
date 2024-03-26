if (!isStartingPage) {
    if (player1turn === "true") {
        isPlayer1Turn = true;
    } else {
        isPlayer1Turn = false;
    }

    console.log(`Gamemode: ${gamemode}\nGameboard: ${gameboard}\nPlayer 1 go First? ${isPlayer1Turn}`)
}