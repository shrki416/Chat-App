const pool = require('../db');

const privateMessagesQuery = async (userId, chatMateId) => {
  const privateMessages = await pool.query(
    `SELECT * FROM messages
    WHERE (user_id = $1 AND receiver_id = $2)
    OR (user_id = $2 AND receiver_id = $1)`,
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

module.exports = {
  privateMessagesQuery,
  createMessageQuery,
  userMessagesQuery,
};
