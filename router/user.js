const router = require("express").Router();
const pool = require("../database/db");
const auth = require("../middleware/auth");

router.get("/user", auth, async (req, res) => {
  try {
    const user = await pool.query(
      "SELECT id, firstName, lastName, email, id from users WHERE id=$1",
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

router.get("/user/active", async (req, res) => {
  const userQuery = `SELECT id, firstname, lastname FROM users WHERE last_active_at >= now() - interval '1 hr'`;
  try {
    const active = await pool.query(userQuery);

    if (active) res.send(active.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;

// example query to get user's last message

// const messageQuery = `
//   SELECT id, user_id, message, created_at
//   FROM messages
//   WHERE user_id = $1
//   ORDER BY created_at DESC LIMIT 1
// `

// ideal data structure I want for conversation list (sidebar):

// {
//   name: "John Anderson",
//   created: "1 week ago",
//   message: "Yes I love how Python does that",
// },
