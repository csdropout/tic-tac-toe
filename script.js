function GameBoard() {
    const rows = 3;
    const cols = 3;
    const board = [
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
    ]

    const getBoard = () => board;

    const printBoard = () => {
        console.log(board);
    }

    const markCell = (row, col, marker) => {
        board[row][col] = marker;
    }

    const isCellMarked = (row, col) => {
        return !!board[row][col];
    }

    return {getBoard, printBoard, markCell, isCellMarked}
}

function GameController(playerOneName = "P1", playerOneMarker = "O", playerTwoName = "P2", playerTwoMarker = "X") {
    const board = GameBoard();
    
    const players = [
        {name: playerOneName, marker: playerOneMarker},
        {name: playerTwoName, marker: playerTwoMarker}
    ];

    let activePlayer = players[0];

    const changeActivePlayer = () => {
        activePlayer = activePlayer === players[0]? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(`${getActivePlayer().name}'s turn`);
        board.printBoard();
    }

    const playRound = (row, col) => {
        if (!board.isCellMarked(row, col)) {
            board.markCell(row, col, activePlayer.marker);
        } else {
            console.log("Invalid move!")
        }
        
        changeActivePlayer();
        printNewRound();
    }

    // Start of new game
    printNewRound();

    return {playRound, getActivePlayer}
}

let game = GameController();