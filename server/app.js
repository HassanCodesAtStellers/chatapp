import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";

import { UPLOAD_DIR } from "./config/static.config.js";
import config from "./config/env.config.js";
import authRoutes from "./route/auth.route.js";
import userRoutes from "./route/user.route.js";
import chatRoutes from "./route/chat.route.js";
import messageRoutes from "./route/message.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

app.use(
  cors({
    origin: config.cors_origin,
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/message", messageRoutes);

export default app;
