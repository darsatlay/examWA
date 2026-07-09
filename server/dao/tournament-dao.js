import db from "../db.js";

export function createTournament(tournament) {

    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO tournaments(
                code,
                difficulty,
                grid_size,
                created_by
            )
            VALUES(?,?,?,?)
        `;

        db.run(sql, [
            tournament.code,
            tournament.difficulty,
            tournament.grid_size,
            tournament.created_by
        ], function(err){

            if(err)
                reject(err);
            else
                resolve(this.lastID);
        });

    });

}

export function getTournamentByCode(code){

    return new Promise((resolve,reject)=>{
        const sql=`
            SELECT *
            FROM tournaments
            WHERE code=?
        `;
        db.get(sql,[code],(err,row)=>{
            if(err)
                reject(err);
            else
                resolve(row);
        });

    });

}

export function getTournamentById(id){

    return new Promise((resolve,reject)=>{
        db.get(
            `SELECT * FROM tournaments WHERE tournament_id=?`,
            [id],
            (err,row)=>{
                if(err)
                    reject(err);
                else
                    resolve(row);

            }

        );

    });

}