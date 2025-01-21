import express from "express";
import { getUser } from "../controller/user.controller.js";
import { tokenAuthentication } from "../middleware/auth.js";

const router = express.Router();

router.get("/", tokenAuthentication, getUser);

export default router;
