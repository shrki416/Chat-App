const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const pool = require("./database/db");
const { response } = require("express");
// const router = require("./router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// login route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  res.status(201).send();
});

app.post("/api/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log({ firstName }, { lastName }, { email }, { password });

  res.status(201).send();
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
