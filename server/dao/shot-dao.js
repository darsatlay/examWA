import db from "../db.js";

export function saveShot(matchId, row, col, result) {

    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO shots (
                match_id,
                row,
                col,
                result
            )
            VALUES (?, ?, ?, ?)
        `;
        db.run(sql,
            [matchId, row, col, result],
            function (err) {
                if (err)
                    reject(err);
                else
                    resolve(this.lastID);

            });

    });

}

export function getShots(matchId) {
    return new Promise((resolve, reject) => {
        const SQL_GET_SHOTS = `
    SELECT
        id,
        match_id,
        row,
        col,
        result,
        created_at
    FROM shots
    WHERE match_id = ?
    ORDER BY id
`;
        db.all(SQL_GET_SHOTS, [matchId], (err, rows) => {

            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function alreadyShot(matchId, row, col) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT id
            FROM shots
            WHERE match_id = ?
              AND row = ?
              AND col = ?
        `;
        db.get(sql,
            [matchId, row, col],
            (err, shot) => {
                if (err)
                    reject(err);
                else
                    resolve(shot !== undefined);

            });

    });

}

export function deleteShots(matchId) {
    return new Promise((resolve, reject) => {
        const sql = `
            DELETE FROM shots
            WHERE match_id = ?
        `;
        db.run(sql,
            [matchId],
            function (err) {
                if (err)
                    reject(err);
                else
                    resolve();
            });

    });

}