const router = require("express").Router();
const pool = require("../database/db");
const validate = require("../middleware/validate");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

router.post("/register", validate, async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0)
      return res.status(401).send("User Already Exists");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [first_name, last_name, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].id);

    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
