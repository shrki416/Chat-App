const express = require("express");
const path = require("path");
const register = require("./router/register");
const login = require("./router/login");
const verify = require("./router/verify");
const user = require("./router/user");
const socket = require("socket.io");
const http = require("http");
const pool = require("./database/db");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication Routes
app.use("/api", login);
app.use("/api", register);
app.use("/api", verify);
app.use("/api", user);

io.on("disconnect", () => {
  console.log("Client disconnected");
});

app.get("/api/message", async (req, res) => {
  try {
    const messages = await pool.query("SELECT * FROM messages");
    res.send(messages.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { userId, message, room } = req.body;

    const createMessage = await pool.query(
      `INSERT INTO messages(user_id, message) VALUES($1, $2) RETURNING *`,
      [userId, message]
    );

    io.emit("message", createMessage.rows[0]);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/userMessages", async (req, res) => {
  try {
    // const userMessages = await pool.query(
    //   `SELECT users.id::text, firstname, lastname, message, created_at
    //   FROM users
    //   INNER JOIN messages
    //   ON users.id::text = messages.user_id::text;`
    // );
    // const userMessages = await pool.query(
    //   `SELECT
    //     users.id,
    //     users.firstName,
    //     users.lastName,
    //     (SELECT array_to_json(array_agg(messages.message)) FROM messages WHERE messages.user_id::text = users.id::text) AS messages
    //   FROM users;`
    // );
    const userMessages = await pool.query(
      `SELECT 
        users.id,
        users.firstName,
        users.lastName,
        (SELECT json_build_array(array_agg(json_build_object(
          'message', messages.message,
          'created_at', messages.created_at
        ))) FROM messages WHERE messages.user_id::text = users.id::text) AS messages
      FROM users;`
    );
    res.send(userMessages.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
