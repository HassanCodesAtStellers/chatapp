import express from "express";
import { tokenAuthentication } from "../middleware/auth.js";
import {
  createChatRoom,
  getChatRooms,
} from "../controller/chat.controller.js";

const router = express.Router();

router.get("/", tokenAuthentication, getChatRooms);
router.post("/create-room", tokenAuthentication, createChatRoom);

export default router;
