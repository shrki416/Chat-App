const pool = require("../database/db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0)
      return res.status(401).send("User Already Exists");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, bcryptPassword]
    );

    const token = jwtGenerator(newUser.rows[0].id);
    const message = "User Created Successfully";
    console.log(message);

    res.json({ token, message });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length === 0)
      return res
        .status(401)
        .send({ message: "Email or Password is inncorrect" });

    const userPassword = user.rows[0].password;
    const validPassword = await bcrypt.compare(password, userPassword);

    if (!validPassword)
      return res
        .status(401)
        .send({ message: "Email or Password is inncorrect" });

    await pool.query("UPDATE users SET last_active_at = $1 WHERE email = $2", [
      new Date(),
      email,
    ]);

    const activeUsers = await pool.query(
      `SELECT id, firstname, lastname FROM users WHERE last_active_at >= NOW() - interval '1 hr'`
    );

    const io = req.app.get("socketio");
    io.on("connect", (socket) => {
      socket.emit("login", { activeUsers: activeUsers.rows });
    });

    const token = jwtGenerator(user.rows[0].id);

    res.json({ token, email });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

const logout = async (req, res) => {
  const { email } = req.body;
  const io = req.app.get("socketio");

  try {
    console.log("ran!");
    await pool.query("UPDATE users SET last_active_at = $1 WHERE email = $2", [
      null,
      email,
    ]);

    const active = await pool.query(
      `SELECT id, firstname, lastname FROM users WHERE last_active_at > NOW() - interval '1 hr'`
    );

    io.emit("logout", { activeUsers: active.rows });

    res.json({ message: "Logged Out!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  register,
  login,
  logout,
};
