const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const register = require("./router/register");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });

  res.status(201).send();
});

// Register Route
app.use("/", register);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
