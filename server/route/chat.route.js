import express from "express";
import { tokenAuthentication } from "../middleware/auth.js";
import {
  createChatRoom,
  getChatRooms,
  getChatRoomMessages
} from "../controller/chat.controller.js";

const router = express.Router();

router.get("/", tokenAuthentication, getChatRooms);
router.post("/create-room", tokenAuthentication, createChatRoom);
router.get("/room/:chatId", tokenAuthentication, getChatRoomMessages);

export default router;
