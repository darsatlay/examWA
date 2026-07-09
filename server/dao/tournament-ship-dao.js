import db from "../db.js";

export function saveTournamentShips(tournamentId, ships){

    return new Promise((resolve,reject)=>{

        const stmt=db.prepare(

            `
            INSERT INTO tournament_ships(
                tournament_id,
                ship_index,
                size,
                start_row,
                start_col,
                orientation
            )
            VALUES(?,?,?,?,?,?)

            `

        );

        ships.forEach((ship,index)=>{

            stmt.run([
                tournamentId,
                index,
                ship.size,
                ship.start_row,
                ship.start_col,
                ship.orientation
            ]);

        });

        stmt.finalize(err=>{
            if(err)
                reject(err);
            else
                resolve();

        });

    });

}

export function getTournamentShips(tournamentId){

    return new Promise((resolve,reject)=>{
        db.all(
            `
            SELECT *
            FROM tournament_ships
            WHERE tournament_id=?
            ORDER BY ship_index
            `,
            [tournamentId],
            (err,rows)=>{
                if(err)
                    reject(err);
                else
                    resolve(rows);

            }

        );

    });

}