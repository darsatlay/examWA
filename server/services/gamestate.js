import { getMatchById } from "../dao/match-dao.js";
import { getShips } from "../dao/ship-dao.js";
import { getShots } from "../dao/shot-dao.js";

export async function loadGame(matchId) {

    const match = await getMatchById(matchId);

    if (!match) {
        throw new Error("Game not found");
    }

    const ships = await getShips(matchId);
    const shots = await getShots(matchId);

    return {
        match,
        ships,
        shots
    };

}

export function getShipCells(ship) {

    const cells = [];

    for (let i = 0; i < ship.size; i++) {

        if (ship.orientation === "H") {

            cells.push({
                row: ship.start_row,
                col: ship.start_col + i
            });

        } else {

            cells.push({
                row: ship.start_row + i,
                col: ship.start_col
            });

        }

    }

    return cells;

}

export function findShip(ships, row, col) {

    for (const ship of ships) {

        const cells = getShipCells(ship);

        const found = cells.find(cell =>
            cell.row === row &&
            cell.col === col
        );

        if (found) {
            return ship;
        }

    }

    return null;

}

export function countHits(ship, shots) {

    const cells = getShipCells(ship);

    let hits = 0;

    for (const cell of cells) {

        const shot = shots.find(s =>
            s.row === cell.row &&
            s.col === cell.col &&
            (
                s.result === "hit" ||
                s.result === "sunk"
            )
        );

        if (shot) {
            hits++;
        }

    }

    return hits;

}