# Task Manager Backend API

A clean, well-structured Node.js backend API for task management.

## Features

- ✅ Clean code structure
- ✅ Error handling middleware
- ✅ Organized folder structure
- ✅ MongoDB database connection
- ✅ CORS enabled
- ✅ Environment variable configuration

## Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection configuration
├── middleware/
│   └── errorHandler.js   # Error handling middleware
├── routes/
│   └── index.js          # API routes
├── server.js             # Main server file
└── package.json
```

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   NODE_ENV=development
   ```

3. **Run the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

- `GET /api` - Health check endpoint

## Error Handling

The API includes centralized error handling:
- 404 errors for undefined routes
- 500 errors for server issues
- Detailed error messages in development mode

## Technologies

- Express.js
- MongoDB (Mongoose)
- CORS
- dotenv
- bcryptjs (for future authentication)
- jsonwebtoken (for future authentication)
