const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const register = require("./router/register");
const login = require("./router/login");
const verify = require("./router/verify");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login Route
app.use("/", login);

// Register Route
app.use("/", register);

// Verify user Route
app.use("/", verify);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
