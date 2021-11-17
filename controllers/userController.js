const pool = require('../database/db');

const users = async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, firstName, lastName, email, id from users WHERE id=$1',
      [req.user]
    );
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
};

const activeUsers = async (req, res) => {
  const userQuery = `SELECT id, firstname, lastname FROM users WHERE last_active_at >= now() - interval '1 hr'`;
  try {
    const active = await pool.query(userQuery);

    if (active) res.send(active.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json('Server Error');
  }
};

module.exports = {
  users,
  activeUsers,
};
