const express = require("express");
const router = express.Router();
const {
  sendRegistrationOTP,
  sendLoginOTP,
  verifyOTPCode,
} = require("../controllers/otpController");

router.post("/send-registration", sendRegistrationOTP);
router.post("/send-login", sendLoginOTP);
router.post("/verify", verifyOTPCode);

module.exports = router;
