const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const register = require("./router/register");
const login = require("./router/login");
const verify = require("./router/verify");
const user = require("./router/user");
const socketIO = require("socket.io");
const http = require("http");
const { isObject } = require("util");
const { info } = require("console");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Authentication Routes
app.use("/api", login);
app.use("/api", register);
app.use("/api", verify);
app.use("/api", user);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

var server = http.createServer(app);
const io = socketIO(server);

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
// app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

io.on("connection", function (socket) {
  console.log("New client socket is connected");

  socket.on("login", function (data) {
    console.log("Login Message", JSON.stringify(data));
    // we can join room using this email
    var room = data.email;
    socket.join(room);

    io.in(room).emit("room", "Room Message");
    // io.in(room).broadcast("room", "Room Message");
  });
  socket.on("message", function (data) {
    var to = data.to;
    console.log("Client Message", JSON.stringify(data));
    io.in(to).emit("server", data);
  });

  socket.emit("message", "Server Message");
});
