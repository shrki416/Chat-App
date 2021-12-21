const { Pool } = require('pg');
require('dotenv').config();

/* Development Database Connection */

// const pool = new Pool({
//   user: process.env.USER,
//   password: process.env.PASSWORD,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   port: process.env.PORT,
// });

/* Production Database Connection */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.connect((err, client, release) => {
  if (err) return console.error('Error acquiring client', err.stack);
  client.query('SELECT NOW()', (err, result) => {
    release();
    if (err) return console.error('Error executing query', err.stack);
    console.log(`👌 ${result.rows[0].now}: connected to db 👌`);
  });
});

module.exports = pool;
