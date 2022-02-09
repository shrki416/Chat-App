const pg = require('pg');
require('dotenv').config();

const conString =
  process.env.ENV === 'DEVELOPMENT'
    ? process.env.DEV_DATABASE_URL
    : process.env.PROD_DATABASE_URL;

const pool = new pg.Client(conString);

pool.connect((err) => {
  if (err) return console.error('could not connect to postgres', err.stack);

  pool.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) return console.error('error running query', err);
    console.log(`👌 ${result.rows[0].theTime}: connected to db 👌`);
  });
});

module.exports = pool;
