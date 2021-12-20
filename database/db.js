const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  //   connectionString: process.env.DATABASE_URL,
  //   port: 5432,
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
});

pool
  .connect()
  .then(() => console.log('👌 connected to database 👌'))
  .catch((err) => console.log(err));

module.exports = pool;
