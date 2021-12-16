const router = require('express').Router();
const {
  privateMessage,
  messages,
  userMessages,
  createChannelMessages,
  getChannelMessages,
  getChannel,
} = require('../controllers/messageController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/message', catchErrors(messages));
router.post('/channel', catchErrors(createChannelMessages));

router.get('/message/:userId/:chatMateId', catchErrors(privateMessage));
router.get('/userMessages', catchErrors(userMessages));
router.get('/channel/:channel', catchErrors(getChannelMessages));
router.get('/channel/id/:channel', catchErrors(getChannel));

module.exports = router;
