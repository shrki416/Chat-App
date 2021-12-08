const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const {
  userQuery,
  registerNewUserQuery,
  updateActiveUsersOnLoginQuery,
  queryActiveUsers,
  updateActiveUsersOnLogoutQuery,
} = require('../database/queries/db-auth.js');

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await userQuery(email);

  if (user.rows.length !== 0)
    return res.status(401).send('User Already Exists');

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUser = await registerNewUserQuery(
    firstName,
    lastName,
    email,
    bcryptPassword
  );

  const token = jwtGenerator(newUser);
  const message = 'User Created Successfully';

  res.json({ token, message });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const io = req.app.get('socketio');

  const user = await userQuery(email);

  if (!user)
    return res.status(401).send({ message: 'Email or Password is inncorrect' });

  const userPassword = user.password;
  const validPassword = await bcrypt.compare(password, userPassword);

  if (!validPassword)
    return res.status(401).send({ message: 'Email or Password is inncorrect' });

  updateActiveUsersOnLoginQuery(email);

  const activeUsers = await queryActiveUsers();

  io.emit('login', { activeUsers });

  const token = jwtGenerator(user.id);
  const firstName = user.firstname;

  res.json({ token, firstName });
};

const logout = async (req, res) => {
  const { email } = req.body;
  const io = req.app.get('socketio');

  updateActiveUsersOnLogoutQuery(email);

  const activeUsers = await queryActiveUsers();

  io.emit('logout', { activeUsers });

  res.json({ message: `Bye 👋 see you soon!` });
};

module.exports = {
  register,
  login,
  logout,
};
