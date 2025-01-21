import express from "express";
import {
  registerUser,
  signInUser,
  signOutUser,
} from "../controller/auth.controller.js";
import { tokenAuthentication } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/signin", signInUser);
router.post("/signout", tokenAuthentication, signOutUser);

export default router;
