const router = require('express').Router();
const auth = require('../middleware/auth');
const { catchErrors } = require('../handlers/errorHandlers');
const { users, activeUsers } = require('../controllers/userController');

router.get('/user', auth, catchErrors(users));
router.get('/user/active', auth, catchErrors(activeUsers));

module.exports = router;
