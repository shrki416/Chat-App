const router = require("express").Router();
const validate = require("../middleware/validate");
const { catchErrors } = require("../handlers/errorHandlers");

const { register } = require("../controllers/authController");
const { login } = require("../controllers/authController");
const { logout } = require("../controllers/authController");

router.post("/register", validate, catchErrors(register));
router.post("/login", validate, catchErrors(login));
router.post("/logout", catchErrors(logout));

module.exports = router;
