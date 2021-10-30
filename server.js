const express = require("express");
const path = require("path");
const socket = require("socket.io");
const http = require("http");
const https = require("https");
const pool = require("./database/db");
const { devErrors } = require("./handlers/errorHandlers");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.set("socketio", io);

app.use(devErrors);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/auth"));
app.use("/api", require("./router/verify"));
app.use("/api", require("./router/user"));

io.sockets.on("connection", (socket) => {
  socket.on("join", ({ userId }) => {
    // we are using room of socket io
    socket.join(userId);
  });
});

app.get("/api/message/:userId/:chatMateId", async (req, res) => {
  const { userId, chatMateId } = req.params;
  try {
    let sql = `SELECT * FROM messages WHERE 
    (user_id = $1 AND receiver_id = $2)
    OR (user_id = $2 AND receiver_id = $1)`;
    const query = {
      text: sql,
      values: [userId, chatMateId],
    };

    const messages = await pool.query(query);
    res.send(messages.rows);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/message", async (req, res) => {
  try {
    const { userId, message, from, receiverId, room } = req.body;

    const createMessage = await pool.query(
      `INSERT INTO messages(user_id, message, receiver_id) VALUES($1, $2, $3) RETURNING *`,
      [userId, message, receiverId]
    );

    let result = createMessage.rows[0];
    result.from = from;

    io.in(userId).emit("message", result);
    io.in(receiverId).emit("message", result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/api/userMessages", async (req, res) => {
  try {
    const userMessages = await pool.query(
      `SELECT 
        users.id,
        users.firstName,
        users.lastName,
        users.email,
        (SELECT json_build_array(array_agg(json_build_object(
          'message', messages.message,
          'receiverId', messages.receiver_id,
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
