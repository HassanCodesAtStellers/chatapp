import { Server } from "socket.io";
import config from "../config/env.config.js";

let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: config.cors_origin,
      methods: ["GET", "POST"],
    },
  });

  io.setMaxListeners(config.ws_max_listenters);

  io.on("connection", (socket) => {
    console.log(`User connected ${socket.id}`);
    socket.removeAllListeners();

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id}, joined Room ${roomId}`);
    });

    socket.on("sendMessage", (message, sender, roomId) => {
      const chatMessage = {
        sender,
        message,
        timestamp: new Date(),
      };
      io.to(roomId).emit("recieveMessage", chatMessage);
    });

    socket.on("disconnect", () => {
      console.log(`User ${socket.id}, disconnected`);
    });
  });
};

export const getIo = () => io;