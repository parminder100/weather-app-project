const pgp = require('pg-promise')();
const connectionString = process.env["POSTGRES_URL"] || process.env["DATABASE_URL"];
const db = pgp(connectionString);

module.exports = {
    db,
    pgp,
};