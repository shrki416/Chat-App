const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  privateMessage,
  messages,
  userMessages,
  createChannelMessages,
  getChannelMessages,
  getChannel,
} = require('../controllers/messageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/message', auth, catchErrors(messages));
router.post('/channel', auth, catchErrors(createChannelMessages));

router.get('/message/:userId/:chatMateId', auth, catchErrors(privateMessage));
router.get('/userMessages', auth, catchErrors(userMessages));
router.get('/channel/:channel', auth, catchErrors(getChannelMessages));
router.get('/channel/id/:channel', auth, catchErrors(getChannel));

module.exports = router;
