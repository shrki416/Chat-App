const pool = require('../db');
const { getUser } = require('./db-user');

const createChannelMsgQuery = async (userId, message, channelId) => {
  const query = `INSERT INTO room_messages(user_id, message, room_id) VALUES($1, $2, $3) RETURNING *`;
  const createMessage = await pool.query(query, [userId, message, channelId]);

  return createMessage;
};

const getChannelId = async (channel) => {
  const query = `SELECT id FROM rooms WHERE room_name = $1`;
  const id = await pool.query(query, [channel]);

  return id.rows[0];
};

const getChannels = async () => {
  const query = `SELECT id, room_name FROM rooms`;
  const id = await pool.query(query);

  return id.rows;
};

const channelMessageQuery = async (roomId) => {
  const query = `SELECT * FROM room_messages WHERE room_id = $1 ORDER BY created_at ASC`;
  const channelMessages = await pool.query(query, [roomId]);

  const data = channelMessages.rows.map(async (message) => {
    const id = message.user_id;
    const user = await getUser(id);
    message.from = `${user.firstname} ${user.lastname}`;
    return message;
  });

  const completeObject = await Promise.all(data);
  return completeObject;
};

module.exports = {
  createChannelMsgQuery,
  channelMessageQuery,
  getChannelId,
  getChannels,
};
