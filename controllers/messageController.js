const pool = require('../database/db');
const formatMessage = require('../utils/formatMessage');

const privateMessage = async (req, res) => {
  const { userId, chatMateId } = req.params;
  try {
    const sql = `SELECT * FROM messages WHERE
    (user_id = $1 AND receiver_id = $2)
    OR (user_id = $2 AND receiver_id = $1)`;
    const query = {
      text: sql,
      values: [userId, chatMateId],
    };

    const privateMessages = await pool.query(query);
    res.send(privateMessages.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const messages = async (req, res) => {
  const io = req.app.get('socketio');
  try {
    const { userId, message, from, receiverId } = req.body;

    const createMessage = await pool.query(
      `INSERT INTO messages(user_id, message, receiver_id) VALUES($1, $2, $3) RETURNING *`,
      [userId, message, receiverId]
    );

    const result = createMessage.rows[0];
    result.from = from;

    io.in(userId).emit('message', result);
    io.in(receiverId).emit('message', result);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const userMessages = async (req, res) => {
  try {
    const userMessage = await pool.query(
      `SELECT
        users.id,
        users.firstName,
        users.lastName,
        users.email,
        (SELECT json_build_array(array_agg(json_build_object(
          'message', messages.message,
          'receiverId', messages.receiver_id,
          'created_at', messages.created_at
        ))) FROM messages WHERE messages.user_id::text = users.id::text) AS messages
      FROM users;`
    );

    const userMessageFormat = formatMessage(userMessage.rows);

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
