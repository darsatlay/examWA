import express from "express";

import { loadStatistics } from "../services/statisticsservice.js";

const router = express.Router();

router.get("/", async (req, res) => {

    try {
        const stats = await loadStatistics();
        res.json(stats);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: err.message
        });

    }

});

export default router;