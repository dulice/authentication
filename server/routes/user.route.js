import { localVariables, VerifyToken } from "../config.js";
import {
  Register,
  Login,
  SendOTP,
  resetPassword,
  verifyOTP,
  getUser,
  SendMail,
  updateUser,
} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();
router.get("/", getUser);
router.get("/send-otp", localVariables, SendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/send-mail", SendMail);
router.post("/register", Register);
router.post("/login", Login);
router.put("/reset", resetPassword);
router.put("/update/:id", VerifyToken, updateUser);

export default router;
