# Task Manager - Installation Guide

A complete web-based task management system with user authentication, OTP verification, and modern UI.

## Features

- **User Authentication**: Registration, login, password reset with OTP verification
- **Task Management**: Create, read, update, delete tasks with status and priority
- **Modern Dashboard**: React-based dashboard with charts and kanban view
- **Security**: JWT-based authentication, input validation, password hashing
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd task-manager
```

### 2. Backend Setup

#### Install Dependencies
```bash
cd backend
npm install
```

#### Environment Configuration
```bash
# Copy the example environment file
cp .env.example .env

# Edit .env with your configuration
```

#### Environment Variables
Update `.env` file with your configuration:

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

### 3. Database Setup

#### Option A: Local MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # macOS
net start MongoDB  # Windows
```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

### 4. Start the Application

#### Development Mode
```bash
# From backend directory
npm run dev

# The application will be available at:
# - Web App: http://localhost:5000/login
# - API: http://localhost:5000/api
```

#### Production Mode
```bash
npm start
```

## Application Structure

```
task-manager/
├── backend/
│   ├── config/
│   │   └── db.js              # Database connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── taskController.js  # Task CRUD operations
│   │   └── otpController.js   # OTP handling
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT authentication
│   │   ├── errorMiddleware.js # Error handling
│   │   └── validateTask.js   # Task validation
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Task.js           # Task schema
│   │   └── OTP.js            # OTP schema
│   ├── routes/
│   │   ├── authRoutes.js     # Auth endpoints
│   │   ├── taskRoutes.js     # Task endpoints
│   │   └── otpRoutes.js      # OTP endpoints
│   ├── services/
│   │   └── otpService.js     # OTP email/SMS service
│   ├── .env.example          # Environment template
│   └── server.js             # Main server file
├── frontend/
│   ├── css/
│   │   └── style.css         # Styling
│   ├── js/
│   │   └── app.js           # Frontend JavaScript
│   ├── dashboard.html        # Main dashboard
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── forgot-password.html # Forgot password
│   ├── reset-password.html  # Reset password
│   └── verify-otp.html      # OTP verification
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Tasks
- `GET /api/tasks` - Get user tasks (with filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/stats` - Get task statistics

### OTP
- `POST /api/otp/send-registration` - Send registration OTP
- `POST /api/otp/send-login` - Send login OTP
- `POST /api/otp/verify` - Verify OTP

## Usage

1. **Register**: Create a new account with email and password
2. **Login**: Authenticate with your credentials
3. **Dashboard**: View and manage your tasks
4. **Create Tasks**: Add new tasks with title, description, priority, and due date
5. **Manage Tasks**: Edit status, update details, or delete tasks
6. **Filter & Sort**: Use filters to find specific tasks

## Features in Detail

### Task Management
- Create tasks with title, description, priority (low/medium/high), and due date
- Update task status (pending/in-progress/completed)
- Edit or delete existing tasks
- Filter tasks by status, priority, or search terms
- Sort tasks by various criteria

### Dashboard Views
- **List View**: Traditional table view of all tasks
- **Kanban Board**: Drag-and-drop interface for task status management
- **Statistics**: Visual charts showing task distribution and progress

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- OTP verification for enhanced security
- CORS protection

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Email OTP Not Working**
   - Verify email configuration in `.env`
   - Check Gmail app password settings
   - Ensure SMTP settings are correct

3. **Frontend Not Loading**
   - Check if backend server is running
   - Verify static file serving in server.js
   - Check browser console for errors

4. **Authentication Issues**
   - Verify JWT_SECRET is set in `.env`
   - Check token expiration settings
   - Ensure frontend is sending correct headers

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for JavaScript errors
- Use MongoDB Compass for database management
- Test API endpoints with Postman or curl

## Production Deployment

### Environment Setup
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-random-secret
```

### Security Considerations
- Use strong JWT secret
- Enable HTTPS in production
- Configure firewall rules
- Regularly update dependencies
- Use environment-specific configurations

## Support

For issues and questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check the browser console for errors
4. Verify all environment variables are set correctly

---

**Happy Task Managing!** 📝✅
