const router = require("express").Router();
const auth = require("../middleware/auth");
const { catchErrors } = require("../handlers/errorHandlers");
const { user, activeUsers } = require("../controllers/userController");

router.get("/user", auth, catchErrors(user));
router.get("/user/active", catchErrors(activeUsers));

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
