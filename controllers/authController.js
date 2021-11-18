const bcrypt = require('bcrypt');
const pool = require('../database/db');
const jwtGenerator = require('../utils/jwtGenerator');

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (user.rows.length !== 0)
    return res.status(401).send('User Already Exists');

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const bcryptPassword = await bcrypt.hash(password, salt);

  const newUser = await pool.query(
    'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
    [firstName, lastName, email, bcryptPassword]
  );

  const token = jwtGenerator(newUser.rows[0].id);
  const message = 'User Created Successfully';
  console.log(message);

  res.json({ token, message });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  if (user.rows.length === 0)
    return res.status(401).send({ message: 'Email or Password is inncorrect' });

  const userPassword = user.rows[0].password;
  const validPassword = await bcrypt.compare(password, userPassword);

  if (!validPassword)
    return res.status(401).send({ message: 'Email or Password is inncorrect' });

  await pool.query('UPDATE users SET last_active_at = $1 WHERE email = $2', [
    new Date(),
    email,
  ]);

  const activeUsers = await pool.query(
    `SELECT id, firstname, lastname FROM users WHERE last_active_at >= NOW() - interval '1 hr'`
  );

  const io = req.app.get('socketio');
  io.on('connect', (socket) => {
    socket.emit('login', { activeUsers: activeUsers.rows });
  });

  const token = jwtGenerator(user.rows[0].id);
  const firstName = user.rows[0].firstname;

  res.json({ token, email, firstName });
};

const logout = async (req, res) => {
  const { email } = req.body;
  const io = req.app.get('socketio');

  await pool.query('UPDATE users SET last_active_at = $1 WHERE email = $2', [
    null,
    email,
  ]);

  const active = await pool.query(
    `SELECT id, firstname, lastname FROM users WHERE last_active_at > NOW() - interval '1 hr'`
  );

  io.emit('logout', { activeUsers: active.rows });

  const userFirstname = await pool.query(
    `SELECT firstName FROM users WHERE email = $1`,
    [email]
  );

  const name = userFirstname.rows[0].firstname;

  io.emit('logout', { name });
  res.json({ message: `${name} is logged out!` });
};

module.exports = {
  register,
  login,
  logout,
};
