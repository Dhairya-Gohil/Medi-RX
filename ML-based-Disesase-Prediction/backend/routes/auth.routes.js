import express from "express";

import {

  register,
  login,
  getMe,
  verifyOTP

} from "../controllers/auth.controller.js";

import authMiddleware
from "../middleware/auth.middleware.js";

const router = express.Router();


/* =========================
   REGISTER
========================= */

router.post(
  "/register",
  register
);


/* =========================
   VERIFY OTP
========================= */

router.post(
  "/verify-otp",
  verifyOTP
);


/* =========================
   LOGIN
========================= */

router.post(
  "/login",
  login
);


/* =========================
   GET PROFILE
========================= */

router.get(
  "/me",
  authMiddleware,
  getMe
);

export default router;