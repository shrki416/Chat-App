const router = require("express").Router();
const pool = require("../database/db");
const validate = require("../middleware/validate");
const jwtGenerator = require("../utils/jwtGenerator");
const bcrypt = require("bcrypt");

router.post("/login", validate, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0)
      return res
        .status(401)
        .send({ message: "Email or Password is inncorrect" });

    const userPassword = user.rows[0].password;
    const validPassword = await bcrypt.compare(password, userPassword);

    if (!validPassword)
      return res
        .status(401)
        .send({ message: "Email or Password is inncorrect" });

    await pool.query("UPDATE users SET last_active_at = $1 WHERE email = $2", [
      new Date(),
      email,
    ]);

    const activeUsers = await pool.query(
      `SELECT id, firstname, lastname FROM users WHERE last_active_at >= NOW() - interval '1 hr'`
    );

    const io = req.app.get("io");
    console.log(activeUsers.rows);
    io.emit("login", { activeUsers: activeUsers.rows });

    const token = jwtGenerator(user.rows[0].id);

    res.json({ token, email });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
