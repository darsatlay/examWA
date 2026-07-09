import express from "express";

import {
    createNewGame,
    fireTorpedo
} from "../services/gameservice.js";

import {
    loadGame
} from "../services/gamestate.js";

import {
    getMatchesByUser
} from "../dao/match-dao.js";

const router = express.Router();

// Create new game
// POST /api/games

router.post("/", async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }

    try {

        const { difficulty } = req.body;

        if (
            difficulty !== "easy" &&
            difficulty !== "intermediate" &&
            difficulty !== "hard"
        ) {

            return res.status(400).json({
                error: "Invalid difficulty"
            });

        }

        const game = await createNewGame(
            req.user.id,
            difficulty
        );

        res.status(201).json(game);

    }
    catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});


// Game history
// GET /api/games

router.get("/", async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }

    try {

        const matches = await getMatchesByUser(
            req.user.id
        );

        res.json(matches);

    }
    catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});



// Get game id
// GET /api/games/:id

router.get("/:id", async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }

    try {

        const game = await loadGame(req.params.id);
        if (!game || !game.match) {
            return res.status(404).json({
                error: "Game not found"
            });
        }
        if (game.match.user_id !== req.user.id) {
            return res.sendStatus(403);
        }
        res.json({
            match: game.match,
            shots: game.shots,
            ships:
                game.match.finished_at
                    ? game.ships
                    : []
        });

    }
    catch (err) {

        console.error(err);
        res.status(500).json({
            error: err.message
        });

    }

});

// FFFIIIIIRREE!
// POST /api/games/:id/fire

router.post("/:id/fire", async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }

    try {
        const { row, col } = req.body;
        const game = await loadGame(req.params.id);
        if (game.match.user_id !== req.user.id) {
            return res.sendStatus(403);
        }

        if (
            row < 0 ||
            col < 0 ||
            row >= game.match.grid_size ||
            col >= game.match.grid_size
        ) {
            return res.status(400).json({
                error: "Invalid coordinates"
            });

        }

        const result = await fireTorpedo(
            req.params.id,
            row,
            col
        );

        res.json(result);

    }
    catch (err) {

        console.error(err);

        if (
            err.message === "Cell already targeted" ||
            err.message === "Match already finished"
        ) {

            return res.status(409).json({
                error: err.message
            });

        }

        res.status(500).json({
            error: err.message
        });

    }

});

export default router;