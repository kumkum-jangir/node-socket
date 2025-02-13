

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files (like the frontend HTML file)
app.use(express.static('public'));

// Listen for client connection
io.on('connection', (socket) => {
  console.log('a user connected');

  // Listen for a custom message from the client
  socket.on('message', (data) => {
    console.log('Message received from client:', data);
    // Send a response to the client
    socket.emit('response', 'Hello from server!');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('a user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
