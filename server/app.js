import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import { UPLOAD_DIR } from "./config/static.config.js";
// import config from "./config/env.config.js";
import userRoutes from "./route/user.route.js";

const app = express();

dotenv.config();
app.use(express.json());
app.use("/uploads", express.static(UPLOAD_DIR));
app.use(morgan("dev"));

// app.use(
//   cors({
//     origin: config.cors_origin,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

app.use("/api/v1/user", userRoutes);

export default app;
