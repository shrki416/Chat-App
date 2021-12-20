const express = require('express');
const path = require('path');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { devErrors, prodErrors } = require('./handlers/errorHandlers');

const PORT = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);
app.set('socketio', io);

app.use(express.static(path.join(__dirname, 'Client/build')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./router/auth'));
app.use('/api', require('./router/verify'));
app.use('/api', require('./router/user'));
app.use('/api', require('./router/message'));

// io.sockets.on('connection', (soc) => {
//   soc.on('join', ({ userId }) => {
//     console.log(userId);
//     // soc.join(userId);
//   });

//   soc.on('room-chat', ({ roomId }) => {
//     soc.join(roomId);
//   });
// });

// io.on('connection', (socket) => {
//   console.log(`🙂`, socket.id);
// });

if (process.env.ENV === 'DEVELOPMENT') {
  app.use(devErrors);
} else {
  app.use(prodErrors);
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Client', 'build', 'index.html'));
});

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
