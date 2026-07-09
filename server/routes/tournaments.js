import express from "express";

import {
    createNewTournament,
    joinTournament
} from "../services/tournamentservice.js";

const router = express.Router();

// Create tour
// POST /api/tournaments

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

        const tournament = await createNewTournament(
            req.user.id,
            difficulty
        );

        res.status(201).json(tournament);

    } catch (err) {

        console.error(err);

        res.status(500).json({
            error: err.message
        });

    }

});

// Join tour
// POST /api/tournaments/join

router.post("/join", async (req, res) => {

    if (!req.isAuthenticated()) {
        return res.sendStatus(401);
    }

    try {

        const { code } = req.body;

        if (!code) {

            return res.status(400).json({
                error: "Tournament code required"
            });

        }

        const match = await joinTournament(
            req.user.id,
            code.toUpperCase()
        );

        res.json(match);

    }
    catch (err) {

        console.error(err);

        if (err.message === "Tournament not found") {

            return res.status(404).json({
                error: err.message
            });

        }

        res.status(500).json({
            error: err.message
        });

    }

});

export default router;