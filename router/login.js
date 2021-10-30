const router = require("express").Router();
const validate = require("../middleware/validate");
const { login } = require("../controllers/authController");
const { catchErrors } = require("../handlers/errorHandlers");

router.post("/login", validate, catchErrors(login));

module.exports = router;
