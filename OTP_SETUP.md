# OTP Verification System Setup

## ✅ What's Been Implemented

1. **OTP Model** - Stores OTP codes with expiration (10 minutes)
2. **OTP Service** - Generates and sends OTP via email/SMS
3. **OTP Verification Page** - User-friendly verification interface
4. **Registration Flow** - Now requires OTP verification
5. **Login Flow** - Now requires OTP verification on every login

## 🔄 User Flow

### Registration:
1. User fills registration form (name, email, phone optional, password)
2. Clicks "Send Verification Code"
3. OTP is sent to email (and phone if provided)
4. User redirected to OTP verification page
5. User enters 6-digit OTP code
6. After verification, account is created and user is logged in

### Login:
1. User enters email and password
2. Credentials are verified
3. OTP is sent to registered email
4. User redirected to OTP verification page
5. User enters 6-digit OTP code
6. After verification, user is logged in

## 📧 Email Configuration (Nodemailer + Gmail)

### Gmail (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for \"Mail\"\n   - Copy the 16-character password

3. **Update `backend/.env`**:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
EMAIL_FROM=\"Task Manager <your-email@gmail.com>\"
```

4. Restart the backend server:
```bash
cd backend
npm start
```

If `EMAIL_USER` / `EMAIL_PASS` are **not** set, the app will **not** try to send real email and you will only see OTPs in the server console (development mode).

### Custom SMTP (Optional)
Instead of Gmail you can use your own SMTP server by adding:
```env
SMTP_HOST=smtp.yourprovider.com
SMTP_PORT=587
SMTP_SECURE=false        # true for port 465\nSMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
EMAIL_FROM=\"Task Manager <no-reply@yourdomain.com>\"
```

## 📱 SMS Configuration (Twilio)

Real SMS sending is implemented using **Twilio**. To enable it:

1. Sign up at https://www.twilio.com and create a project
2. Get your credentials from the Twilio Console:
   - Account SID\n   - Auth Token\n   - A verified sending phone number\n3. Add these to `backend/.env`:
```env
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_FROM_NUMBER=+1234567890   # your Twilio phone number
```
4. Restart the backend server:
```bash
cd backend
npm start
```

If these Twilio vars are **not** set, SMS OTPs will just be logged to the console for development.\n*** End Patch```}'>{"error":"Invalid patch format"}*** End Patch}"/>

## 🚀 Testing the System

1. **Start the server:**
   ```bash
   cd backend
   npm start
   ```

2. **Register a new user:**
   - Go to http://localhost:5000/register
   - Fill in the form
   - Check server console for OTP (if email not configured)
   - Enter OTP on verification page

3. **Login:**
   - Go to http://localhost:5000/login
   - Enter credentials
   - Check server console for OTP
   - Enter OTP on verification page

## 📝 Environment Variables

Add these to `backend/.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development

# Email Configuration (Optional)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

## 🔒 Security Features

- OTP expires after 10 minutes
- OTP can only be used once
- Old OTPs are automatically deleted
- Rate limiting ready (can be added)
- Secure OTP generation using crypto

## 📄 API Endpoints

### OTP Endpoints:
- `POST /api/otp/send-registration` - Send OTP for registration
- `POST /api/otp/send-login` - Send OTP for login
- `POST /api/otp/verify` - Verify OTP code

### Auth Endpoints (Updated):
- `POST /api/auth/register` - Register with OTP verification
- `POST /api/auth/login` - Login with OTP verification

## 🎨 Frontend Pages

- `/register` - Registration form
- `/login` - Login form
- `/verify-otp` - OTP verification page
- `/dashboard` - Main dashboard (after login)

## 🐛 Troubleshooting

### OTP not received?
- Check server console for OTP (development mode)
- Verify email configuration in `.env`
- Check spam folder
- Ensure MongoDB is connected

### "Invalid or expired OTP"?
- OTP expires after 10 minutes
- Each OTP can only be used once
- Click "Resend OTP" to get a new code

### Email sending fails?
- Verify EMAIL_USER and EMAIL_PASS in `.env`
- Check Gmail app password is correct
- Ensure 2FA is enabled on Gmail account
