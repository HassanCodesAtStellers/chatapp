import winston from "winston";
import app from "./app.js";
import config from "./config/env.config.js";
import connectDB from "./config/db.config.js";
import { initializeSocket } from "./socket/socket.js";
import http from "http";
import events from "events";

events.EventEmitter.defaultMaxListeners = config.ws_max_listenters;

const logger = winston.createLogger({
  level: config.log_level,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const httpServer = http.createServer(app);
initializeSocket(httpServer);

const startServer = () => {
  try {
    httpServer.listen(config.port, () => {
      logger.info(
        `Server running on port ${config.port} in ${config.node_env} mode at Localhost: http://localhost:${config.port}/`
      );
    });
  } catch (error) {
    console.error(error.message);
  }
};

connectDB()
  .then(() => startServer())
  .catch((err) => logger.error(err.message));
