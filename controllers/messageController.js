const formatMessage = require('../utils/formatMessage');
const {
  privateMessagesQuery,
  createMessageQuery,
  userMessagesQuery,
  createChannelMsgQuery,
  channelMessageQuery,
  getChannelId,
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

const createChannelMessages = async (req, res) => {
  const io = req.app.get('socketio');
  try {
    const { userId, message, from, channel, channelId } = req.body;

    const createMessage = await createChannelMsgQuery(userId, message, channel);
    const result = { ...createMessage.rows[0], from };

    io.in(channelId).emit('channel', result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getChannelMessages = async (req, res) => {
  try {
    const { channel } = req.params;
    const channelMessages = await channelMessageQuery(channel);

    res.send(channelMessages);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getChannel = async (req, res) => {
  try {
    const { channel } = req.params;
    const { id } = await getChannelId(channel);

    res.send(id);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  privateMessage,
  messages,
  userMessages,
  createChannelMessages,
  getChannelMessages,
  getChannel,
};
