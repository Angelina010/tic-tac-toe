const gameboard = (function () {
    const board = [];

    let currMarker = "X";

    const getMarker = () => {
        return currMarker; 
    }

    const setMarker = (marker) => {
        currMarker = marker;
    }

    const resetBoard = () => {board.length = 0; initalizeBoard();}

    const initalizeBoard = () => {
        for (let i = 0; i < 3; i++) {
            let row = []
            for (let j = 0; j < 3; j++) {
                row.push("")
            }
            board.push(row)
        };
    }

    const placeMarker = (marker, row, col) => {
        if (board[row][col] === "")
            board[row][col] = marker; else throw new Error("This cell is already filled.");
    };

    const hasWon = function (marker) {
        for (let i = 0; i < 3; i++) {
            if (board[i].every(cell => cell === marker)) return true; // Check row
            if (board.every(row => row[i] === marker)) return true; // Check column
        }

        let leftDiaWin = true;
        for (let dia = 0; dia < 3; dia++) {
            if (board[dia][dia] !== marker) {
                leftDiaWin = false;
                break;
            }
        }
        if (leftDiaWin) return true;

        let rowNum = 0
        let colNum = 2
        let rightDiaWin = true;
        for (let j = 0; j < 3; j++) {
            if (board[rowNum + j][colNum - j] !== marker) {
                rightDiaWin = false;
                break;
            }
        }
        if (rightDiaWin) return true;
        return false;
    }

    return {resetBoard, getMarker, setMarker, placeMarker, hasWon }
})();

gameboard.resetBoard();

const cells = document.querySelectorAll(".cell");
for (let i = 0; i < 9; i++){
    cells[i].setAttribute("data-index", i);
}

function playGame(){
    cells.forEach(cell => {
        cell.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            const row = Math.floor(index / 3);
            const col = index % 3;
    
            gameboard.placeMarker(gameboard.getMarker(), row, col);
            if (gameboard.hasWon(gameboard.getMarker())){
                console.log(gameboard.getMarker() + " wins!");
            }
            event.target.textContent = gameboard.getMarker();

            gameboard.setMarker(gameboard.getMarker() === "X" ? "O" : "X");

        });
    });
}

playGame();

const resetButton = document.querySelector(".reset-btn")
resetButton.addEventListener("click", resetGame);

function resetGame(){
    gameboard.resetBoard();
    cells.forEach((cell) => {
        cell.textContent = ""
    })
    gameboard.setMarker("X");
}



