const { Pool } = require("pg");

const pool = new Pool({
  user: "AA",
  host: "localhost",
  database: "chat_app",
  password: "chat",
  port: 5432,
});

module.exports = pool;
