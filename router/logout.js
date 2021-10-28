const router = require("express").Router();
const pool = require("../database/db");

router.post("/logout", async (req, res) => {
  const { email } = req.body;
  const io = req.app.get("socketio");

  try {
    console.log("ran!");
    await pool.query("UPDATE users SET last_active_at = $1 WHERE email = $2", [
      null,
      email,
    ]);

    const active = await pool.query(
      `SELECT id, firstname, lastname FROM users WHERE last_active_at > NOW() - interval '1 hr'`
    );

    io.emit("logout", { activeUsers: active.rows });

    res.json({ message: "Logged Out!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
