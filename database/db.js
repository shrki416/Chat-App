const { Pool } = require('pg');
require('dotenv').config();

const pool =
  process.env.ENV === 'DEVELOPMENT'
    ? new Pool({
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DATABASE,
        password: process.env.PASSWORD,
        port: 5432,
      })
    : new Pool({
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
    client.end();
  });
});

module.exports = pool;
