const socket = require("socket.io");

function getSocket(server) {
  let io;
  if (io) return io;

  io = socket(server);
  return io;
}

module.exports = {
  getSocket,
};
