const pool = require('../db');

const getUser = async (id) => {
  const user = await pool.query(
    'SELECT id, firstName, lastName, email, id from users WHERE id=$1',
    [id]
  );

  return user.rows[0];
};

const getActiveUsers = async () => {
  const userQuery = `SELECT id, firstname, lastname FROM users WHERE last_active_at >= now() - interval '1 hr'`;

  const active = await pool.query(userQuery);

  return active.rows;
};

module.exports = {
  getUser,
  getActiveUsers,
};
