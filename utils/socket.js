const express = require("express");
const http = require("http");

const app = express();

const socket = require("socket.io");
const server = http.createServer(app);
const io = socket(server);

function getSocket(server) {
  let io;
  if (io) return io;

  io = socket(server);
  return io;
}

module.exports = {
  getSocket,
};
