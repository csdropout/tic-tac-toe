function GameBoard() {
    const rows = 3;
    const cols = 3;
    let board = [
        ["", "", ""], 
        ["", "", ""], 
        ["", "", ""]
    ]

    const getBoard = () => board;

    const resetBoard = () => {
        board = [
            ["", "", ""], 
            ["", "", ""], 
            ["", "", ""]
        ]
    }

    const printBoard = () => {
        console.log(board);
    }

    const markCell = (row, col, marker) => {
        board[row][col] = marker;
    }

    const isCellMarked = (row, col) => {
        return !!board[row][col];
    }

    const isWinner = (row, col, marker) => {
        // check across (current row)
        if (board[row].filter((x) => x === marker).length === 3) return true;

        // check vertical (current col)
        const verticalCol = [];
        board.forEach((row) => {
            verticalCol.push(row[col]);
        });
        if (verticalCol.filter((x) => x === marker).length === 3) return true;

        // check diagonals (marker place in corners or in the middle)
        // 2 diagonals
        if (board[0][0] === marker && board[1][1] === marker && board[2][0]) return true;
        if (board[2][0] === marker && board[1][1] === marker && board[0][2]) return true;
        
        return false;
    }

    return {getBoard, printBoard, markCell, isCellMarked, isWinner, resetBoard}
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
        console.log(`${activePlayer.name}'s turn`);
        board.printBoard();
    }

    const playRound = (row, col) => {
        if (!board.isCellMarked(row, col)) {
            board.markCell(row, col, activePlayer.marker);
        } else {
            console.log("Invalid move!")
        }
        
        if (board.isWinner(row, col, activePlayer.marker)) {
            console.log(`${activePlayer.name} has won!`);
        } else {
            changeActivePlayer();
            printNewRound();
        }
    }

    const restart = () => {
        console.log("Restarting game...");
        board.resetBoard();
        activePlayer = players[0];
    }

    // Start of new game
    printNewRound();

    return {playRound, getActivePlayer, restart}
}

let game = GameController();