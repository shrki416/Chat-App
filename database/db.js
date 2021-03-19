const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: "localhost",
  user: "aa",
  database: "chat-app",
  password: "F2aTr6*rmYL*",
  port: 5432,
});

module.exports = pool;
