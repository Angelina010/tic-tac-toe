const gameboard = (function () {
    const board = [];
    for (let i = 0; i < 3; i++) {
        let row = []
        for (let j = 0; j < 3; j++) {
            row.push("")
        }
        board.push(row)
    };

    const placeMarker = (marker, row, col) => {
        if (board[row][col] === "")
            board[row][col] = marker; else throw new Error("This cell is already filled.");
    };

    const hasWon = function (marker) {
        for (let row of board) {
            let rowWin = true;
            for (let i = 0; i < 3; i++) {
                if (row[i] != marker) {
                    rowWin = false;
                    break;
                }
            }
            if (rowWin) {
                return true
            }
        }

        for (let colNum = 0; colNum < 3; colNum++) {
            let colWin = true;
            for (let rowNum = 0; rowNum < 3; rowNum++) {
                if (board[rowNum][colNum] !== marker) {
                    colWin = false;
                    break;
                }
            }
            if (colWin) {
                return true
            }
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

    return { board, placeMarker, hasWon }
})();

