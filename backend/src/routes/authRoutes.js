const express = require("express");
const {
  register,
  login,
  sendOtp,
  verifyOtp,
  resetPassword,
  resendOtp
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// forgot password & otp flow
router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/reset-password", resetPassword);

module.exports = router;
