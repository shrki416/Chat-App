const router = require('express').Router();
const {
  privateMessage,
  messages,
  userMessages,
  createChannelMessages,
  getChannelMessages,
} = require('../controllers/messageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.get('/message/:userId/:chatMateId', catchErrors(privateMessage));
router.post('/message', catchErrors(messages));
router.get('/userMessages', catchErrors(userMessages));
router.post('/channel', catchErrors(createChannelMessages));
router.get('/channel/:channel', catchErrors(getChannelMessages));

module.exports = router;
