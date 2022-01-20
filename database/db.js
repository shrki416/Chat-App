const { Pool } = require('pg');
require('dotenv').config();

const pool =
  process.env.NODE_ENV === 'DEVELOPMENT'
    ? new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASS,
        port: process.env.DB_PORT,
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
  });
});

module.exports = pool;
