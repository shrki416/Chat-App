const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const pool = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/messages", async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");
    console.table(messages.rows);
    // res.send(messages.rows);
    res.json(messages.rows);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await pool.query("SELECT * FROM users");
    console.table(users.rows);
    // res.send(messages.rows);
    res.json(users.rows);
  } catch (error) {
    console.log(`Something went wrong: ${error}`);
    res.sendStatus(500);
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
