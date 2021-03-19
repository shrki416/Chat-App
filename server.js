const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const pool = require("./database/db");
const validate = require("./middleware/validate");

// const router = require("./router");

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
app.post("/register", validate, async (req, res) => {
  // 1. destructure req.body (name, email, password)
  // 2. check if user exist (if user exist then throw error)
  // 3. bcrypt the user password
  // 4. enter the new user inside our database
  // 5. generating out jwt token

  try {
    const { firstName, lastName, email, password } = req.body;
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
