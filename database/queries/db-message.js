const pool = require('../db');
const { getUser } = require('./db-user');

const privateMessagesQuery = async (userId, chatMateId) => {
  const privateMessages = await pool.query(
    `SELECT * FROM messages
    WHERE (user_id = $1 AND receiver_id = $2)
    OR (user_id = $2 AND receiver_id = $1) ORDER BY created_at ASC;`,
    [userId, chatMateId]
  );

  return privateMessages.rows;
};

const createMessageQuery = async (userId, message, receiverId) => {
  const query = `INSERT INTO messages(user_id, message, receiver_id) VALUES($1, $2, $3) RETURNING *`;
  const createMessage = await pool.query(query, [userId, message, receiverId]);

  return createMessage;
};

const userMessagesQuery = async () => {
  const userMessage = await pool.query(
    `SELECT
      users.id,
      users.firstName,
      users.lastName,
      (SELECT json_build_array(array_agg(json_build_object(
        'message', messages.message,
        'receiverId', messages.receiver_id,
        'created_at', messages.created_at
      ))) FROM messages WHERE messages.user_id::text = users.id::text) AS messages
    FROM users;`
  );

  return userMessage.rows;
};

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

const channelMessageQuery = async (channel) => {
  const roomId = await getChannelId(channel);

  const query = `SELECT * FROM room_messages WHERE room_id = $1 ORDER BY created_at ASC`;
  const channelMessages = await pool.query(query, [roomId.id]);

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
  privateMessagesQuery,
  createMessageQuery,
  userMessagesQuery,
  createChannelMsgQuery,
  channelMessageQuery,
  getChannelId,
};
