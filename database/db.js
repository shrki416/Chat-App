// const { Pool } = require('pg');
// require('dotenv').config();

// const pool =
//   process.env.ENV === 'DEVELOPMENT'
//     ? new Pool({
//         user: process.env.USER,
//         host: process.env.HOST,
//         database: process.env.DATABASE,
//         password: process.env.PASSWORD,
//         port: 5432,
//       })
//     : new Pool({
//         connectionString: process.env.DATABASE_URL,
//         port: 5432,
//         ssl: {
//           rejectUnauthorized: false,
//         },
//       });

// pool.connect((err, client, release) => {
//   if (err) return console.error('Error acquiring client', err.stack);
//   client.query('SELECT NOW()', (err, result) => {
//     release();
//     if (err) return console.error('Error executing query', err.stack);
//     console.log(`👌 ${result.rows[0].now}: connected to db 👌`);
//     client.end();
//   });
// });

// module.exports = pool;

const pg = require('pg');
require('dotenv').config();

const conString = process.env.DATABASE_URL; // Can be found in the Details page
const pool = new pg.Client(conString);

pool.connect((err) => {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  pool.query('SELECT NOW() AS "theTime"', (err, result) => {
    if (err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    // >> output: 2018-08-23T14:02:57.117Z
    // pool.end();
  });
});

module.exports = pool;
