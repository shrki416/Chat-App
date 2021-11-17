const express = require("express");
const path = require("path");
const socket = require("socket.io");
const http = require("http");
const pool = require("./database/db");
const { devErrors, prodErrors } = require("./handlers/errorHandlers");

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socket(server);
app.set("socketio", io);

app.use(express.static(path.join(__dirname, "client/build")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./router/auth"));
app.use("/api", require("./router/verify"));
app.use("/api", require("./router/user"));
app.use("/api", require("./router/message"));

io.sockets.on("connection", (socket) => {
  socket.on("join", ({ userId }) => {
    socket.join(userId);
  });
});

process.env.ENV === "DEVELOPMENT" ? app.use(devErrors) : app.use(prodErrors);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
