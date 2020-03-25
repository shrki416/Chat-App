const express = require("express");
const path = require("path");
const { Client } = require("pg");

const connectionString = "postgresql://AA:chat@localhost:5432/chat_app";

const client = new Client({
  connectionString: connectionString
});

client.connect();

client.query("SELECT * FROM messages", (err, res) => {
  console.log(err, res);
  client.end();
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));

app.listen(port, () => console.log(`Server started on port ${port}!`));
