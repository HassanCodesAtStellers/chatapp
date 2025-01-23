import express from "express";
import {
  getUser,
  addUserToChat,
  removeUserFromChat,
} from "../controller/user.controller.js";
import { tokenAuthentication } from "../middleware/auth.js";

const router = express.Router();

router.get("/", tokenAuthentication, getUser);

router.put("/add-user/:userId", tokenAuthentication, addUserToChat);
router.delete("/remove-user/:userId", tokenAuthentication, removeUserFromChat);

export default router;
