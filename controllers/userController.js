const pool = require('../database/db');
const { getUser } = require('../database/queries/db-user');

const users = async (req, res) => {
  try {
    const id = req.user;
    // const user = await pool.query(
    //   'SELECT id, firstName, lastName, email, id from users WHERE id=$1',
    //   [id]
    // );
    const user = await getUser(id);
    res.json(user);
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
