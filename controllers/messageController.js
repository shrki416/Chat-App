const formatMessage = require('../utils/formatMessage');
const {
  privateMessagesQuery,
  createMessageQuery,
  userMessagesQuery,
} = require('../database/queries/db-message');

const privateMessage = async (req, res) => {
  try {
    const { userId, chatMateId } = req.params;
    const privateMessages = await privateMessagesQuery(userId, chatMateId);
    res.send(privateMessages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const messages = async (req, res) => {
  const io = req.app.get('socketio');
  try {
    const { userId, message, from, receiverId } = req.body;

    const createMessage = await createMessageQuery(userId, message, receiverId);
    const result = { ...createMessage.rows[0], from };

    io.in(userId).emit('message', result);
    io.in(receiverId).emit('message', result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const userMessages = async (req, res) => {
  try {
    const userMessage = await userMessagesQuery();
    const userMessageFormat = formatMessage(userMessage);

    res.send(userMessageFormat);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  privateMessage,
  messages,
  userMessages,
};
