const pool = require('../db');

const getUser = async (id) => {
  const query = `SELECT id, firstName, lastName, email, id from users WHERE id=$1`;

  const user = await pool.query(query, [id]);

  return user.rows[0];
};

const getActiveUsers = async () => {
  const userQuery = `SELECT id, firstname, lastname FROM users WHERE last_active_at >= now() - interval '12 hr'`;

  const active = await pool.query(userQuery);

  return active.rows;
};

module.exports = {
  getUser,
  getActiveUsers,
};
