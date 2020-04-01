const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  user: "AA",
  host: "localhost",
  database: "chat_app",
  password: "chat",
  port: 5432
});

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/messages", (request, response) => {
  pool.query("SELECT * FROM messages", (err, res) => {
    if (err) {
      console.log(`Something went wrong: Error is ${err}`);
    } else {
      console.table(res.rows);
    }
  });
});

app.get("/api/users", (request, response) => {
  pool.query("SELECT * FROM users", (err, res) => {
    if (err) {
      console.log(`Something went wrong: Error is ${err}`);
    } else {
      console.table(res.rows);
    }
  });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
