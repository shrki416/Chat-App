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

module.exports = router;
