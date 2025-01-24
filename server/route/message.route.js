import express from "express";
import { tokenAuthentication } from "../middleware/auth.js";
import {
  getMessages,
  sendMessage,
  updateMessage,
  removeMessage,
} from "../controller/message.controller.js";

const router = express.Router();

router.get("/", tokenAuthentication, getMessages);
router.post("/send-message/:chatId", tokenAuthentication, sendMessage);
router.put("/update-message/:messageId", tokenAuthentication, updateMessage);
router.delete("/remove-message/:messageId", tokenAuthentication, removeMessage);

export default router;
