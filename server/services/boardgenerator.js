import { getGameSettings } from "./game-settings.js";

const EMPTY = 0;
const SHIP = 1;

const HORIZONTAL = "H";
const VERTICAL = "V";

export function generateGame(difficulty) {

    const settings = getGameSettings(difficulty);

    while (true) {

        try {

            const board = createEmptyBoard(settings.gridSize);

            const ships = placeShips(
                board,
                settings.shipSizes
            );

            return {

                gridSize: settings.gridSize,

                torpedoes: settings.torpedoes,

                board,

                ships

            };

        }
        catch {

            // Если комбинацию создать не удалось,
            // пробуем полностью заново.

        }

    }

}

function createEmptyBoard(size) {

    return Array.from(

        { length: size },

        () => Array(size).fill(EMPTY)

    );

}

function placeShips(board, shipSizes) {

    const ships = [];

    const sortedShips = [...shipSizes].sort(

        (a, b) => b - a

    );

    for (const size of sortedShips) {

        const positions = [];

        // Горизонтальные варианты

        for (let row = 0; row < board.length; row++) {

            for (

                let col = 0;

                col <= board.length - size;

                col++

            ) {

                positions.push({

                    row,

                    col,

                    orientation: HORIZONTAL

                });

            }

        }

        // Вертикальные варианты

        for (

            let row = 0;

            row <= board.length - size;

            row++

        ) {

            for (

                let col = 0;

                col < board.length;

                col++

            ) {

                positions.push({

                    row,

                    col,

                    orientation: VERTICAL

                });

            }

        }

        shuffleArray(positions);

        let placed = false;

        for (const pos of positions) {

            const horizontal =

                pos.orientation === HORIZONTAL;

            if (

                canPlaceShip(

                    board,

                    pos.row,

                    pos.col,

                    size,

                    horizontal

                )

            ) {

                placeShip(

                    board,

                    pos.row,

                    pos.col,

                    size,

                    horizontal

                );

                ships.push({

                    start_row: pos.row,

                    start_col: pos.col,

                    size,

                    orientation: pos.orientation

                });

                placed = true;

                break;

            }

        }

        if (!placed) {

            throw new Error(

                "Board generation failed"

            );

        }

    }

    return ships;

}

function canPlaceShip(

    board,

    row,

    col,

    length,

    horizontal

) {

    const size = board.length;

    for (let i = 0; i < length; i++) {

        const r = horizontal

            ? row

            : row + i;

        const c = horizontal

            ? col + i

            : col;

        if (

            r < 0 ||

            r >= size ||

            c < 0 ||

            c >= size

        ) {

            return false;

        }

        if (board[r][c] === SHIP) {

            return false;

        }

        for (let dr = -1; dr <= 1; dr++) {

            for (let dc = -1; dc <= 1; dc++) {

                const nr = r + dr;

                const nc = c + dc;

                if (

                    nr >= 0 &&

                    nr < size &&

                    nc >= 0 &&

                    nc < size &&

                    board[nr][nc] === SHIP

                ) {

                    return false;

                }

            }

        }

    }

    return true;

}

function placeShip(

    board,

    row,

    col,

    length,

    horizontal

) {

    for (let i = 0; i < length; i++) {

        const r = horizontal

            ? row

            : row + i;

        const c = horizontal

            ? col + i

            : col;

        board[r][c] = SHIP;

    }

}

function shuffleArray(array) {

    for (

        let i = array.length - 1;

        i > 0;

        i--

    ) {

        const j = Math.floor(

            Math.random() * (i + 1)

        );

        [array[i], array[j]] = [

            array[j],

            array[i]

        ];

    }

}

export function printBoard(board) {

    console.log("");

    for (const row of board) {

        console.log(

            row

                .map(cell =>

                    cell === SHIP

                        ? "■"

                        : "·"

                )

                .join(" ")

        );

    }

    console.log("");

}