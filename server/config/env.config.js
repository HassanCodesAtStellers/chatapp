import env from "env";

env.config();

const config = {
  port: process.env.PORT || 3000,
  mongoDb_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/chatapp",
  log_level: process.env.LOG_LEVEL || "info",
  node_env: process.env.NODE_ENV || "development",
  cors_origin: process.env.CORS_ORIGIN || "http://localhost:5173",
};

export default config;
