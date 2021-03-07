const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const pool = require("./db");
const router = require("./router");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: true }));

// login route
app.post("/login", (req, res) => {});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server started on port ${port}!`));
