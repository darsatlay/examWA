import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./db.sqlite', (err) => {
    if (err)
        throw err;

    console.log('Connected to SQLite database.');
});

export default db;