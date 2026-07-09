import crypto from 'crypto';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite');

const users = [
    {
        username: 'alice',
        password: 'password'
    },
    {
        username: 'bob',
        password: 'password'
    },
    {
        username: 'charlie',
        password: 'password'
    }
];

for (const user of users) {

    const salt = crypto.randomBytes(16).toString('hex');

    crypto.scrypt(user.password, salt, 32, (err, hash) => {

        if (err)
            throw err;

        const sql = `
            INSERT INTO users(username, hash, salt)
            VALUES (?, ?, ?)
        `;

        db.run(sql,
            [
                user.username,
                hash.toString('hex'),
                salt
            ],
            (err) => {

                if (err)
                    console.error(err.message);
                else
                    console.log(`Created ${user.username}`);

            });

    });

}