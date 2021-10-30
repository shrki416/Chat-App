const router = require("express").Router();
const { logout } = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

router.post("/logout", catchErrors(logout));

module.exports = router;
