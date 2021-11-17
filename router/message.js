const router = require("express").Router();
const {
  privateMessage,
  message,
  userMessages,
} = require("../controllers/messageController");
const { catchErrors } = require("../handlers/errorHandlers");

router.get("/message/:userId/:chatMateId", catchErrors(privateMessage));
router.post("/message", catchErrors(message));
router.get("/userMessages", catchErrors(userMessages));

module.exports = router;
