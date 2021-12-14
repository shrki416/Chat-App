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

const createChannelMsgQuery = async (userId, message, channel) => {
  const query = `INSERT INTO messages(user_id, message, channel) VALUES($1, $2, $3) RETURNING *`;
  const createMessage = await pool.query(query, [userId, message, channel]);

  return createMessage;
};

const channelMessageQuery = async (channel) => {
  const query = `SELECT * FROM messages WHERE channel = $1 ORDER BY created_at ASC`;
  const channelMessages = await pool.query(query, [channel]);
  const id = channelMessages.rows[0].user_id;
  const user = await getUser(id);

  channelMessages.rows[0].from = `${user.firstname} ${user.lastname}`;

  return channelMessages.rows;
};

module.exports = {
  privateMessagesQuery,
  createMessageQuery,
  userMessagesQuery,
  createChannelMsgQuery,
  channelMessageQuery,
};
