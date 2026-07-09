import crypto from "crypto";

import { generateGame } from "./boardgenerator.js";
import { getGameSettings } from "./game-settings.js";

import {
    createTournament,
    getTournamentByCode
} from "../dao/tournament-dao.js";

import {
    saveTournamentShips,
    getTournamentShips
} from "../dao/tournament-ship-dao.js";

import {
    createMatch
} from "../dao/match-dao.js";

import {
    saveShips
} from "../dao/ship-dao.js";

function generateTournamentCode() {

    return crypto
        .randomBytes(3)
        .toString("hex")
        .toUpperCase();

}

export async function createNewTournament(userId, difficulty) {

    const game = generateGame(difficulty);

    const code = generateTournamentCode();

    const tournamentId = await createTournament({

        code,

        difficulty,

        grid_size: game.gridSize,

        created_by: userId

    });

    await saveTournamentShips(
        tournamentId,
        game.ships
    );

    const matchId = await createMatch({

        user_id: userId,

        tournament_id: tournamentId,

        difficulty,

        game_mode: "tournament",

        grid_size: game.gridSize,

        torpedoes_initial: game.torpedoes,

        torpedoes_left: game.torpedoes,

        ships_total: game.ships.length

    });

    await saveShips(
        matchId,
        game.ships
    );

    return {

        code,

        tournamentId,

        matchId

    };

}

export async function joinTournament(userId, code) {

    const tournament = await getTournamentByCode(code);

    if (!tournament) {
        throw new Error("Tournament not found");
    }

    const settings = getGameSettings(
        tournament.difficulty
    );

    const ships = await getTournamentShips(
        tournament.tournament_id
    );

    const matchId = await createMatch({

        user_id: userId,

        tournament_id: tournament.tournament_id,

        difficulty: tournament.difficulty,

        game_mode: "tournament",

        grid_size: settings.gridSize,

        torpedoes_initial: settings.torpedoes,

        torpedoes_left: settings.torpedoes,

        ships_total: ships.length

    });

    await saveShips(
        matchId,
        ships
    );

    return {

        tournamentId: tournament.tournament_id,

        matchId

    };

}