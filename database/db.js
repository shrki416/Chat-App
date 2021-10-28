const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

pool
  .connect()
  .then(() => console.log("👌 connected to database 👌"))
  .catch((err) => console.log(err));

module.exports = pool;
