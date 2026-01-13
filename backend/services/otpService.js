const crypto = require("crypto");
const OTP = require("../models/OTP");
const nodemailer = require("nodemailer");

// Generate 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Create email transporter (Gmail by default)
const createTransporter = () => {
  /**
   * Uses Gmail SMTP by default.
   * Make sure you set these in backend/.env:
   *   EMAIL_USER=your-email@gmail.com
   *   EMAIL_PASS=your-gmail-app-password
   *
   * For production you can switch to a custom SMTP host by
   * providing SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS.
   */
  if (process.env.SMTP_HOST) {
    // Custom SMTP configuration (optional)
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // Default: Gmail
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Send OTP via Email
const sendOTPEmail = async (email, otp, type = "registration") => {
  try {
    const transporter = createTransporter();
    
    let subject, html;
    
    if (type === "password-reset") {
      subject = "Password Reset Code - Task Manager";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Password Reset Request</h2>
          <p>You requested to reset your password. Use the code below to reset it:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #6366f1; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #6b7280; font-size: 12px;">If you didn't request this password reset, please ignore this email and your password will remain unchanged.</p>
        </div>
      `;
    } else if (type === "registration") {
      subject = "Verify Your Email - Task Manager";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Task Manager Verification</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #6366f1; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #6b7280; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `;
    } else {
      subject = "Login Verification Code - Task Manager";
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366f1;">Task Manager Verification</h2>
          <p>Your verification code is:</p>
          <div style="background-color: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #6366f1; font-size: 32px; margin: 0; letter-spacing: 5px;">${otp}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p style="color: #6b7280; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `;
    }

    // Development mode: If email credentials are not configured, log to console
    if ((!process.env.EMAIL_USER || process.env.EMAIL_USER === "your-email@gmail.com") && 
        process.env.NODE_ENV === "development") {
      console.log(`\n📧 Password Reset Code (Development Mode):`);
      console.log(`To: ${email}`);
      console.log(`Type: ${type}`);
      console.log(`Code: ${otp}\n`);
      return { success: true };
    }

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: html,
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    // In development, still log the OTP even if email fails
    if (process.env.NODE_ENV === "development") {
      console.log(`\n📧 Password Reset Code (Email failed, showing code anyway):`);
      console.log(`To: ${email}`);
      console.log(`Type: ${type}`);
      console.log(`Code: ${otp}\n`);
      return { success: true };
    }
    return { success: false, error: error.message };
  }
};

// Send OTP via SMS (Twilio or console fallback)
const sendOTPSMS = async (phone, otp, type = "registration") => {
  try {
    if (!phone) {
      return { success: false, error: "Phone number is required for SMS" };
    }

    const {
      TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN,
      TWILIO_FROM_NUMBER,
    } = process.env;

    // If Twilio env vars are not set, log to console (development fallback)
    if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_FROM_NUMBER) {
      console.log(`\n📱 OTP SMS (Development Mode - Twilio not configured):`);
      console.log(`To: ${phone}`);
      console.log(`OTP: ${otp}\n`);
      return { success: true };
    }

    const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const messageBody =
      type === "registration"
        ? `Your Task Manager registration code is ${otp}. It will expire in 10 minutes.`
        : `Your Task Manager login code is ${otp}. It will expire in 10 minutes.`;

    await twilio.messages.create({
      body: messageBody,
      from: TWILIO_FROM_NUMBER,
      to: phone,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, error: error.message };
  }
};

// Create and send OTP
const createAndSendOTP = async (email, phone, type = "registration") => {
  try {
    // Generate OTP
    const otp = generateOTP();
    
    // Delete any existing OTPs for this email/phone and type
    await OTP.deleteMany({
      $or: [{ email }, { phone }],
      type,
      verified: false,
    });

    // Create new OTP record
    const otpRecord = await OTP.create({
      email,
      phone: phone || null,
      otp,
      type,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
    });

    // Send OTP via email
    if (email) {
      const emailResult = await sendOTPEmail(email, otp, type);
      if (!emailResult.success) {
        await OTP.findByIdAndDelete(otpRecord._id);
        return { success: false, error: "Failed to send email" };
      }
    }

    // Send OTP via SMS if phone provided
    if (phone) {
      await sendOTPSMS(phone, otp, type);
    }

    return { success: true, otpId: otpRecord._id };
  } catch (error) {
    console.error("Error creating OTP:", error);
    return { success: false, error: error.message };
  }
};

// Verify OTP
const verifyOTP = async (email, phone, otp, type = "registration") => {
  try {
    const otpRecord = await OTP.findOne({
      $or: [{ email }, { phone }],
      otp,
      type,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return { success: false, error: "Invalid or expired OTP" };
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    return { success: true };
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  generateOTP,
  createAndSendOTP,
  verifyOTP,
  sendOTPEmail,
  sendOTPSMS,
};
