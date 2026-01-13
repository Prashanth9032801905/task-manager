const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const taskRoutes = require("./taskRoutes");
const otpRoutes = require("./otpRoutes");

router.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Task Manager API is running",
        version: "1.0.0",
    });
});

router.use("/auth", authRoutes);
router.use("/tasks", taskRoutes);
router.use("/otp", otpRoutes);

module.exports = router;
