const router = require('express').Router();
const {
  privateMessage,
  messages,
  userMessages,
} = require('../controllers/messageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/message/:userId/:chatMateId', catchErrors(privateMessage));
router.post('/message', catchErrors(messages));
router.get('/userMessages/:id', catchErrors(userMessages));

module.exports = router;
