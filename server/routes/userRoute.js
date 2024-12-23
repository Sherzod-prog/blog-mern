const express = require("express");
const { authMiddleware: userAuth } = require("../middleware/authMiddleware.js");
const {
  OTPVerification,
  resendOTP,
  followWriter,
  updateUser,
  getWriter,
} = require("../controllers/userController");

const router = express.Router();

router.post("/verify/:userId/:otp", OTPVerification);
router.post("/resend-link/:id", resendOTP);

// user router
router.post("/follower/:id", userAuth, followWriter);
router.put("/update-user/:id", userAuth, updateUser);

router.get("/get-user/:id?", getWriter);

module.exports = { router };

// 7:22
