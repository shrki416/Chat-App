const pool = require('../db');

const userQuery = async (email) => {
  const user = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return user.rows[0];
};

const registerNewUserQuery = async (
  firstName,
  lastName,
  email,
  bcryptPassword
) => {
  const newUser = await pool.query(
    'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, email, bcryptPassword]
  );

  return newUser.rows[0].id;
};

const updateActiveUsersOnLoginQuery = async (email) => {
  await pool.query('UPDATE users SET last_active_at = $1 WHERE email = $2', [
    new Date(),
    email,
  ]);
};

const updateActiveUsersOnLogoutQuery = async (email) => {
  await pool.query('UPDATE users SET last_active_at = $1 WHERE email = $2', [
    null,
    email,
  ]);
};

const queryActiveUsers = async () => {
  const activeUsers = await pool.query(
    `SELECT id, firstname, lastname FROM users WHERE last_active_at >= NOW() - interval '1 hr'`
  );

  return activeUsers.rows;
};

module.exports = {
  userQuery,
  registerNewUserQuery,
  updateActiveUsersOnLoginQuery,
  queryActiveUsers,
  updateActiveUsersOnLogoutQuery,
};
