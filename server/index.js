import winston from "winston";
import app from "./app.js";
import config from "./config/env.config.js";
import connectDB from "./config/db.config.js";

const logger = winston.createLogger({
  level: config.log_level,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

const startServer = () => {
  try {
    app.listen(config.port, () => {
      logger.info(
        `Server running on port ${config.port} in ${config.node_env} mode at Localhost: http://localhost:3000/`
      );
    });
  } catch (error) {
    console.error(error.message);
  }
};

connectDB()
  .then(() => startServer())
  .catch((err) => logger.error(err.message));
