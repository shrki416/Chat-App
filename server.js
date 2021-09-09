const express = require("express");
const path = require("path");
const register = require("./router/register");
const login = require("./router/login");
const verify = require("./router/verify");
const user = require("./router/user");
const socket = require("socket.io");
const http = require("http");

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

// const io = socket(server);

// io.on("connection", socket => {
//   console.log('socket connected');
// });

// app.post("/api/messages", async (req, res) => {
//   try {
//     // const userId = req.params;
//     const chatMessage = req.body;

//     const newMessage = await pool.query(
//       "INSERT INTO users(messages) VALUES($1) RETURNING *",
//       [chatMessage]
//     );

//     socket.emit('message-key', "some data goes here");

//     res.json(newMessage.rows[0]);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });

io.on("connection", () => {
  console.log("New Client connected");
});

io.on("disconnect", () => {
  console.log("Client disconnected");
});

// socket.on("chat-message", (message) => {
//   console.log(message);
//   socket.broadcast.emit("recieve-message", message);
// });

app.post("/api/message", (req, res) => {
  res.send("hello");
  // try {
  console.table(req.body);

  io.emit("chat-message", req.body);
  // } catch (error) {
  //   res.status(500).send(error.message);
  // }
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
