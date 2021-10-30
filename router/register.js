const router = require("express").Router();
const validate = require("../middleware/validate");
const { catchErrors } = require("../handlers/errorHandlers");
const { register } = require("../controllers/authController");

router.post("/register", validate, catchErrors(register));

module.exports = router;
