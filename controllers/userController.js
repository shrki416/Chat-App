const { getUser, getActiveUsers } = require('../database/queries/db-user');

const users = async (req, res) => {
  try {
    const id = req.user;
    const user = await getUser(id);
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(`Server Error: ${error.message}`);
  }
};

const activeUsers = async (req, res) => {
  try {
    const active = await getActiveUsers();

    // console.log(active.map((user) => user.id));

    if (active) res.send(active);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(`Server Error: ${error.message}`);
  }
};

module.exports = {
  users,
  activeUsers,
};
