import {
    createMatch,
    getMatchById,
    decreaseTorpedoes,
    finishMatch,
    increaseShipsSunk,
    isFinished
} from "../dao/match-dao.js";

import {
    saveShips,
    sinkShip
} from "../dao/ship-dao.js";

import {
    saveShot,
    alreadyShot
} from "../dao/shot-dao.js";

import { generateGame } from "./boardgenerator.js";

import {
    loadGame,
    findShip,
    countHits
} from "./gamestate.js";

export async function createNewGame(userId, difficulty) {

    const game = generateGame(difficulty);

    const matchId = await createMatch({
        user_id: userId,
        tournament_id: null,
        difficulty,
        game_mode: "casual",
        grid_size: game.gridSize,
        torpedoes_initial: game.torpedoes,
        torpedoes_left: game.torpedoes,
        ships_total: game.ships.length
    });

    await saveShips(matchId, game.ships);

    return {
        id: matchId,
        difficulty,
        gridSize: game.gridSize,
        torpedoes: game.torpedoes,
        ships: game.ships.length
    };
}

export async function fireTorpedo(matchId, row, col) {

    const game = await loadGame(matchId);
    if (await isFinished(matchId)) {

    throw new Error("Match already finished");

}

    if (await alreadyShot(matchId, row, col)) {
        throw new Error("Cell already targeted");
    }

    const ship = findShip(game.ships, row, col);

    // MISS

    if (!ship) {

        await saveShot(matchId, row, col, "water");

        await decreaseTorpedoes(matchId);

        const match = await getMatchById(matchId);

        if (match.torpedoes_left <= 0) {

            await finishMatch(matchId, "lost");

            return {
                result: "water",
                gameOver: true
            };

        }

        return {
            result: "water",
            gameOver: false
        };

    }

    // HIT

    const hits = countHits(ship, game.shots);

    if (hits + 1 === ship.size) {

        await saveShot(matchId, row, col, "sunk");

        await sinkShip(ship.id);

        await increaseShipsSunk(matchId);

        const updatedGame = await loadGame(matchId);

        if (
            updatedGame.match.ships_sunk >=
            updatedGame.match.ships_total
        ) {

            await finishMatch(matchId, "won");

            return {
                result: "hit and sunk",
                gameOver: true
            };

        }

        return {
            result: "hit and sunk",
            gameOver: false
        };

    }

    await saveShot(matchId, row, col, "hit");

    return {
        result: "hit",
        gameOver: false
    };

}