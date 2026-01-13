const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        otp: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["registration", "login", "password-reset"],
            required: true,
        },
        expiresAt: {
            type: Date,
            required: true,
            default: Date.now,
            index: { expireAfterSeconds: 600 }, // Auto-delete after 10 minutes
        },
        verified: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster lookups
otpSchema.index({ email: 1, type: 1 });
otpSchema.index({ phone: 1, type: 1 });

module.exports = mongoose.model("OTP", otpSchema);
