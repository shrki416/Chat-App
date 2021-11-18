const pool = require('../db');

const getUser = async (id) => {
  const user = await pool.query(
    'SELECT id, firstName, lastName, email, id from users WHERE id=$1',
    [id]
  );

  return user.rows[0];
};

module.exports = {
  getUser,
};
