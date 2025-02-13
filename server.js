const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "https://kumkum-jangir.github.io",  // Corrected the domain (you can use "*" for all origins during testing)
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],   // Optional, used for custom headers
    credentials: true
  }
});

// Serve static files like your index.html (Make sure the HTML file is inside the "public" folder)
app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("A user connected");

    // Emit a welcome message when a user connects
    socket.emit("message", "Welcome to the server!");

    // Listen for messages from the client
    socket.on("message", (msg) => {
        console.log("Message from client: ", msg);
        
        // Broadcast the message to all connected clients
        io.emit("message", msg);
    });

    // Listen for user disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
