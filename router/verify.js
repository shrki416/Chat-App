const router = require("express").Router();
const auth = require("../middleware/auth");

router.get("/verify", auth, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
