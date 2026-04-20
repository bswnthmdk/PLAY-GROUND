import express from "express";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  console.log(`An userID: ${userId} connected with socket ID: ${socket.id}`);

  // For public messages
  //   socket.on("public message", (msg) => {
  //     io.emit("public message", msg);
  //     console.log("message: " + msg + ` from ID:${socket.id}`);
  //   });

  // For private messages
  // socket.on("private message", ({ to, message }) => {
  //   io.to(to).emit("private message", message);
  //   console.log(`From ${socket.id} to ${to}: ${message}`);
  // });

  // Join a private room
  socket.on("join room", ({ roomId, members }) => {
    if (!Array.isArray(members)) {
      console.log("Invalid members list");
      return;
    }

    if (members.includes(userId)) {
      socket.join(roomId);
      console.log(`${userId} joined room ${roomId}`);
    }
  });

  // Send message to room (1-to-1)
  socket.on("room message", ({ roomId, message }) => {
    io.to(roomId).emit("room message", {
      from: socket.id,
      message,
    });
    console.log(`Room:${roomId} | From ${socket.id}: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log(`Dis-connected socket ID:${socket.id}`);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
