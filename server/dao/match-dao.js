import db from "../db.js";

export function createMatch(match) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO matches (
                user_id,
                tournament_id,
                difficulty,
                game_mode,
                grid_size,
                torpedoes_initial,
                torpedoes_left,
                ships_total
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        db.run(
            sql,
            [
                match.user_id,
                match.tournament_id,
                match.difficulty,
                match.game_mode,
                match.grid_size,
                match.torpedoes_initial,
                match.torpedoes_left,
                match.ships_total
            ],
            function (err) {

                if (err)
                    reject(err);
                else
                    resolve(this.lastID);

            }
        );

    });

}
export function getMatchById(matchId) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                match_id AS id,
                user_id,
                tournament_id,
                difficulty,
                game_mode,
                grid_size,
                torpedoes_initial,
                torpedoes_left,
                ships_total,
                result,
                started_at,
                finished_at
            FROM matches
            WHERE match_id = ?
        `;
        db.get(sql, [matchId], (err, row) => {

            if (err)
                reject(err);
            else
                resolve(row);

        });

    });

}

export function getMatchesByUser(userId) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT
                match_id AS id,
                difficulty,
                game_mode,
                grid_size,
                torpedoes_initial,
                torpedoes_left,
                ships_total,
                result,
                started_at,
                finished_at
            FROM matches
            WHERE user_id = ?
            ORDER BY started_at DESC
        `;

        db.all(sql, [userId], (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function decreaseTorpedoes(matchId) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE matches
            SET torpedoes_left =
                CASE
                    WHEN torpedoes_left > 0
                    THEN torpedoes_left - 1
                    ELSE 0
                END
            WHERE match_id = ?
        `;

        db.run(sql, [matchId], function (err) {

            if (err)
                reject(err);
            else
                resolve(this.changes);

        });

    });

}

export function finishMatch(matchId, result) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE matches
            SET
                result = ?,
                finished_at = CURRENT_TIMESTAMP
            WHERE match_id = ?
              AND finished_at IS NULL
        `;

        db.run(sql, [result, matchId], function (err) {

            if (err)
                reject(err);
            else
                resolve(this.changes);

        });

    });

}
export function increaseShipsSunk(matchId) {

    return new Promise((resolve, reject) => {

        const sql = `
            UPDATE matches
            SET ships_sunk = ships_sunk + 1
            WHERE match_id = ?
        `;

        db.run(sql, [matchId], function (err) {

            if (err)
                reject(err);
            else
                resolve(this.changes);

        });

    });

}

export function isFinished(matchId) {

    return new Promise((resolve, reject) => {

        const sql = `
            SELECT result
            FROM matches
            WHERE match_id = ?
        `;

        db.get(sql, [matchId], (err, row) => {

            if (err)
                reject(err);
            else
                resolve(row.result !== null);

        });

    });

}