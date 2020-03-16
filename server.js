const express = require("express");
const path = require("path");

const { Client } = require("pg");
const connectionString = "postgres://postgres:postgres@localhost:5432/chat_app";
const client = new Client({
  connectionString: connectionString
});

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));

app.listen(port, () => console.log(`Server started on port ${port}!`));
