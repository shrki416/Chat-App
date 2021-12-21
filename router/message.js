const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  privateMessage,
  messages,
  userMessages,
} = require('../controllers/messageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/message', auth, catchErrors(messages));

router.get('/message/:userId/:chatMateId', auth, catchErrors(privateMessage));
router.get('/userMessages', auth, catchErrors(userMessages));

module.exports = router;
