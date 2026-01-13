# MongoDB Setup Guide

## Option 1: MongoDB Atlas (Cloud - Recommended) 🌐

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Sign up with your email (Google/GitHub login available)

### Step 2: Create a Free Cluster
1. After signing in, click **"Build a Database"** or **"Create"**
2. Choose **"M0 FREE"** tier (Free Forever)
3. Select a cloud provider (AWS recommended)
4. Choose a region closest to you
5. Name your cluster (e.g., "Cluster0")
6. Click **"Create Cluster"** (takes 3-5 minutes)

### Step 3: Create Database User
1. Go to **"Database Access"** in the left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Enter:
   - Username: `taskmanager` (or your choice)
   - Password: Create a strong password (save it!)
5. Set user privileges to **"Atlas Admin"** or **"Read and write to any database"**
6. Click **"Add User"**

### Step 4: Configure Network Access
1. Go to **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
   - Or add your specific IP address for better security
4. Click **"Confirm"**

### Step 5: Get Connection String
1. Go back to **"Database"** (Clusters view)
2. Click **"Connect"** button on your cluster
3. Choose **"Connect your application"**
4. Select **"Node.js"** as driver
5. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` with your database username
7. Replace `<password>` with your database password
8. Add database name at the end: `/task-manager?retryWrites=true&w=majority`

**Final connection string format:**
```
mongodb+srv://taskmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/task-manager?retryWrites=true&w=majority
```

### Step 6: Update .env File
Update `backend/.env` with your connection string:
```
MONGO_URI=mongodb+srv://taskmanager:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/task-manager?retryWrites=true&w=majority
```

---

## Option 2: Install MongoDB Locally 💻

### Windows Installation:
1. Download MongoDB Community Server:
   - Visit: https://www.mongodb.com/try/download/community
   - Select: Windows, MSI package
   - Download and run the installer

2. Installation Options:
   - Choose "Complete" installation
   - Install as a Windows Service (recommended)
   - Install MongoDB Compass (GUI tool - optional)

3. Start MongoDB Service:
   - MongoDB should start automatically as a Windows service
   - Or manually start from Services (services.msc)

4. Verify Installation:
   - Open Command Prompt
   - Run: `mongod --version`
   - Should show MongoDB version

5. Update .env:
   ```
   MONGO_URI=mongodb://localhost:27017/task-manager
   ```

### macOS Installation:
```bash
# Using Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

### Linux Installation:
```bash
# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

---

## After Setup ✅

Once you have MongoDB configured:

1. **Update `backend/.env`** with your connection string
2. **Start the server:**
   ```bash
   cd backend
   npm start
   ```
3. **Access the web app:**
   - Open: http://localhost:5000
   - Or: http://localhost:5000/login

---

## Troubleshooting

### Connection Issues:
- **Atlas**: Make sure your IP is whitelisted in Network Access
- **Atlas**: Verify username/password in connection string
- **Local**: Check if MongoDB service is running
- **Local**: Verify MongoDB is listening on port 27017

### Test Connection:
```bash
# Test local MongoDB
mongosh mongodb://localhost:27017/task-manager

# Test Atlas (replace with your connection string)
mongosh "mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/task-manager"
```

---

## Need Help?
If you get your MongoDB Atlas connection string, I can help you update the `.env` file automatically!
