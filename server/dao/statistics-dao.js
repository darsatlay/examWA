import db from "../db.js";

export function getStatistics() {
    return new Promise((resolve, reject) => {
        const sql = `
            SELECT
                users.username,
                matches.difficulty,
                COUNT(*) AS played,
                SUM(CASE WHEN matches.result='won' THEN 1 ELSE 0 END) AS won,
                SUM(CASE WHEN matches.result='lost' THEN 1 ELSE 0 END) AS lost,
                ROUND(
                    100.0 *
                    SUM(CASE WHEN matches.result='won' THEN 1 ELSE 0 END)
                    /
                    COUNT(*),
                    1
                ) AS win_rate
            FROM matches
            JOIN users
                ON users.id = matches.user_id
            WHERE matches.result IS NOT NULL
            GROUP BY
                users.username,
                matches.difficulty
            ORDER BY
                users.username,
                matches.difficulty;
        `;

        db.all(sql, [], (err, rows) => {
            if (err)
                reject(err);
            else
                resolve(rows);

        });

    });

}