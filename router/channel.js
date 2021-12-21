const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createChannelMessages,
  getChannelMessages,
  getChannel,
  getAllChannels,
} = require('../controllers/channelController');
const { catchErrors } = require('../handlers/errorHandlers');

router.post('/channel', auth, catchErrors(createChannelMessages));

router.get('/channels', auth, catchErrors(getAllChannels));
router.get('/channel/:channel', auth, catchErrors(getChannelMessages));
router.get('/channel/id/:channel', auth, catchErrors(getChannel));

module.exports = router;
