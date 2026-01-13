/**
 * Task Manager Server
 * 
 * Main entry point for the Task Manager API
 * Sets up Express server, middleware, routes, and database connection
 */

// Load environment variables from .env file


const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const connectDB = require("./config/db");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const routes = require("./routes/index");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.error("Unhandled Promise Rejection:", err);
});

// API Routes
app.use("/api", routes);

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));

// Serve HTML files
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

app.get("/verify-otp", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/verify-otp.html"));
});

app.get("/forgot-password", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/forgot-password.html"));
});

app.get("/reset-password", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/reset-password.html"));
});

// Error handling
app.use(notFound);
app.use(errorHandler);

// Server setup
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`\n🚀 Task Manager Web Application is running!`);
            console.log(`📍 Server: http://localhost:${PORT}`);
            console.log(`🌐 Web App: http://localhost:${PORT}/login`);
            console.log(`📡 API: http://localhost:${PORT}/api`);
            console.log(`Environment: ${process.env.NODE_ENV || "development"}\n`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();

module.exports = app;
