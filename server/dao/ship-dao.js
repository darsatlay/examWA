import db from "../db.js";

export function saveShips(matchId, ships) {

    return new Promise((resolve, reject) => {

        const sql = `
            INSERT INTO ships (
                match_id,
                ship_index,
                size,
                start_row,
                start_col,
                orientation,
                sunk
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const stmt = db.prepare(sql);
        for (let i = 0; i < ships.length; i++) {
            const ship = ships[i];
            stmt.run([
                matchId,
                i,
                ship.size,
                ship.start_row,
                ship.start_col,
                ship.orientation,
                0
            ]);
        }

        stmt.finalize(err => {
            if (err)
                reject(err);
            else
                resolve();
        });

    });

}

export function getShips(matchId) {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                id,
                match_id,
                ship_index,
                size,
                start_row,
                start_col,
                orientation,
                sunk
            FROM ships
            WHERE match_id = ?
            ORDER BY ship_index
        `;
        db.all(sql, [matchId], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}

export function sinkShip(shipId) {

    return new Promise((resolve, reject) => {
        const sql = `
            UPDATE ships
            SET sunk = 1
            WHERE id = ?
        `;
        db.run(sql, [shipId], function(err) {

            if (err)
                reject(err);
            else
                resolve(this.changes);
        });

    });

}