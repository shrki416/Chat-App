const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const register = require("./router/register");
const login = require("./router/login");
const verify = require("./router/verify");
const user = require("./router/user");

const app = express();

const http = require("http");
const server = http.createServer(app);
// const socketIO = require("socket.io");
// const io = socketIO(server);

const { Server } = require("socket.io");
const io = new Server();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Routes
app.use("/api", login);
app.use("/api", register);
app.use("/api", verify);
app.use("/api", user);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
// app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

io.on("connection", (socket) => {
  console.log("New client socket is connected");

  socket.on("login", (data) => {
    console.log("Login Message", JSON.stringify(data));
    let room = data.email;
    socket.join(room);

    io.in(room).emit("room", "Room Message");
  });

  socket.on("message", (data) => {
    let to = data.to;
    console.log("Client Message", JSON.stringify(data));
    io.in(to).emit("server", data);
  });

  socket.emit("message", "Server Message");
});
