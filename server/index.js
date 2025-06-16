const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // adjust if needed
    methods: ["GET", "POST"]
  }
});

// This map keeps track of socket.id -> username
const users = {};

io.on("connection", (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on("joinRoom", ({ room, username }) => {
    socket.join(room);
    users[socket.id] = username; // Store the username
    console.log(`${username} joined room ${room}`);
  });

  socket.on("roomMessage", ({ room, text, sender }) => {
    io.to(room).emit("messagefromRoom", {
      senderId: sender, // frontend already sends name, or you can use: users[socket.id]
      text
    });
  });

socket.on("leaveRoom", (room) => {
  const username = users[socket.id] || "Unknown";
  console.log(`${username} left room ${room}`);

  // Notify others in the room
  socket.to(room).emit("messagefromRoom", {
    senderId: "System",
    text: `${username} has left the room.`
  });

  socket.leave(room);
});


  socket.on("disconnect", () => {
    console.log(`${users[socket.id] || socket.id} disconnected`);
    delete users[socket.id];
  });
});
