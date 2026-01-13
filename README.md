# Task Manager Application

A full-stack task management application with user authentication and CRUD operations for tasks.

## Features

- ✅ User Authentication (Register/Login)
- ✅ Task CRUD Operations
- ✅ Task Status Management (Pending, In Progress, Completed)
- ✅ Task Priority Levels (Low, Medium, High)
- ✅ Due Date Tracking
- ✅ Task Filtering (by status, priority)
- ✅ Task Search (by title or description)
- ✅ Task Sorting (by date, title, due date)
- ✅ Pagination Support
- ✅ Task Statistics Dashboard
- ✅ Input Validation
- ✅ Modern, Responsive UI
- ✅ JWT Authentication
- ✅ Secure Password Hashing
- ✅ RESTful API

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT (JSON Web Tokens)
- bcryptjs
- CORS

### Frontend
- Vanilla JavaScript (ES6 Modules)
- HTML5
- CSS3
- LocalStorage for token management

## Project Structure

```
task-manager/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── taskController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── errorHandler.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── taskRoutes.js
│   │   └── index.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   │   └── style.css
│   │
│   ├── js/
│   │   └── app.js
│   │
│   ├── login.html
│   ├── register.html
│   └── dashboard.html
│
├── README.md
└── .gitignore
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file:**
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   NODE_ENV=development
   ```

   Example MongoDB URI:
   - Local: `mongodb://localhost:27017/task-manager`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/task-manager?retryWrites=true&w=majority`

4. **Run the server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   Server will run on `http://localhost:5000`

### Frontend Setup

1. **Open frontend files:**
   - Simply open `frontend/login.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     cd frontend
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server frontend -p 8000
     ```

2. **Update API URL (if needed):**
   - Open `frontend/js/app.js`
   - Update `API_URL` if your backend runs on a different port/domain

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
  - Body: `{ email, password }`
- `GET /api/auth/me` - Get current user (Protected)
  - Headers: `Authorization: Bearer <token>`

### Tasks
- `GET /api/tasks` - Get all tasks (Protected)
  - Query params: `status`, `priority`, `search`, `sortBy`, `page`, `limit`
  - Example: `/api/tasks?status=pending&priority=high&page=1&limit=10`
- `GET /api/tasks/stats` - Get task statistics (Protected)
- `GET /api/tasks/:id` - Get single task (Protected)
- `POST /api/tasks` - Create task (Protected)
  - Body: `{ title, description?, status?, priority?, dueDate? }`
- `PUT /api/tasks/:id` - Update task (Protected)
  - Body: `{ title?, description?, status?, priority?, dueDate? }`
- `DELETE /api/tasks/:id` - Delete task (Protected)

## Usage

1. **Register/Login:**
   - Open `register.html` to create a new account
   - Or use `login.html` if you already have an account

2. **Manage Tasks:**
   - After logging in, you'll be redirected to the dashboard
   - Click "Add Task" to create a new task
   - Edit or delete tasks using the action buttons
   - Filter tasks by status and priority

## Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes with middleware
- User-specific task access
- Input validation
- Error handling

## Development

### Backend
- Uses Express.js for routing
- MongoDB with Mongoose for database
- JWT for authentication
- Error handling middleware
- CORS enabled

### Frontend
- Vanilla JavaScript (ES6 Modules)
- LocalStorage for token storage
- Responsive design
- Modern UI/UX

## License

ISC

## Author

Task Manager Application
