import db from "../db.js";

function getUserByUsername(username) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM users WHERE username = ?";

    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

function getUserById(id) {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT id, username
      FROM users
      WHERE id = ?
    `;
    db.get(sql, [id], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}

export function createUser(username, hash, salt) {

    return new Promise((resolve, reject) => {
        const sql = `
            INSERT INTO users (
                username,
                hash,
                salt
            )
            VALUES (?, ?, ?)
        `;
        db.run(
            sql,
            [username, hash, salt],
            function(err) {
                if (err)
                    reject(err);
                else
                    resolve(this.lastID);

            }

        );

    });

}

export { getUserByUsername, getUserById };