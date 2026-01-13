# Task Manager Application

A comprehensive web-based task management system with user authentication, OTP verification, and modern UI.

## Features

- User Authentication (Register/Login with JWT)
- OTP Verification System (Email/SMS)
- Password Reset Functionality
- Task CRUD Operations (Create, Read, Update, Delete)
- Task Status Management (Pending, In Progress, Completed)
- Task Priority Levels (Low, Medium, High)
- Due Date Tracking
- Task Filtering (by status, priority, search)
- Task Sorting (by date, title, due date)
- Pagination Support
- Task Statistics Dashboard with Charts
- Kanban Board View (Drag & Drop)
- Modern React-based Dashboard
- Input Validation & Error Handling
- Responsive Design (Mobile-friendly)
- JWT Authentication
- Secure Password Hashing
- RESTful API Design

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs
- CORS
- Nodemailer (Email OTP)
- Twilio (SMS OTP)

### Frontend
- React (via CDN)
- HTML5
- CSS3 with Tailwind CSS
- Chart.js (Statistics)
- React Beautiful DND (Kanban)
- Babel (JSX in browser)
- LocalStorage for token management

## Project Structure

```
task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── taskController.js
│   │   └── otpController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── validateTask.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Task.js
│   │   └── OTP.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── otpRoutes.js
│   │   └── index.js
│   ├── services/
│   │   └── otpService.js
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── app.js
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   ├── forgot-password.html
│   ├── reset-password.html
│   └── verify-otp.html
│
├── INSTALLATION.md
├── README.md
└── .gitignore
```

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your configuration
   npm start
   ```

3. **Access Application:**
   - Web App: http://localhost:5000/login
   - API: http://localhost:5000/api

## Environment Variables

Create a `.env` file in `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/task-manager

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (for OTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Twilio Configuration (for SMS OTP - optional)
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=your-twilio-phone-number
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
- `GET /api/tasks/stats` - Get task statistics (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
- `PUT /api/tasks/:id` - Update task (Protected)
- `DELETE /api/tasks/:id` - Delete task (Protected)

### OTP
- `POST /api/otp/send-registration` - Send registration OTP
- `POST /api/otp/send-login` - Send login OTP
- `POST /api/otp/verify` - Verify OTP

## Usage

1. **Register/Login:**
   - Open `register.html` to create a new account
   - Use `login.html` if you already have an account
   - Optional OTP verification for enhanced security

2. **Manage Tasks:**
   - After logging in, you'll be redirected to the dashboard
   - Create tasks with title, description, priority, and due date
   - Use List View or Kanban Board for task management
   - Filter and sort tasks as needed
   - View statistics and progress charts

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- User-specific task access
- Input validation and sanitization
- OTP verification system
- CORS protection
- Error handling

## License

ISC

## Author

Task Manager Application - Full-Stack Web Application
