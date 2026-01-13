const { createAndSendOTP, verifyOTP } = require("../services/otpService");
const User = require("../models/User");

// Send OTP for registration
const sendRegistrationOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create and send OTP
    const result = await createAndSendOTP(email, phone, "registration");

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || "Failed to send OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpId: result.otpId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Send OTP for login
const sendLoginOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Create and send OTP
    const result = await createAndSendOTP(email, phone || user.phone, "login");

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: result.error || "Failed to send OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpId: result.otpId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Verify OTP
const verifyOTPCode = async (req, res) => {
  try {
    const { email, phone, otp, type } = req.body;

    if (!email || !otp || !type) {
      return res.status(400).json({
        success: false,
        message: "Email, OTP, and type are required",
      });
    }

    // Verify OTP
    const result = await verifyOTP(email, phone, otp, type);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.error || "Invalid or expired OTP",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  sendRegistrationOTP,
  sendLoginOTP,
  verifyOTPCode,
};
