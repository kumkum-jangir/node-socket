// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize the express app
const app = express();

// Create an HTTP server using Express app
const server = http.createServer(app);

// Initialize Socket.io on the server
const io = socketIo(server);

// Serve static files (like the frontend HTML file)
app.use(express.static('public'));

// Listen for client connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for a custom message from the client
  socket.on('message', (data) => {
    console.log('Message received from client:', data);
    
    // Send a response back to the client
    socket.emit('response', 'Hello from the server!');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
