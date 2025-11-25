# 🚨 CURRENT ISSUE: MongoDB Not Running

## The Problem
The error "Failed to send OTP" happens because:
1. **MongoDB is not running** on your computer
2. When you try "Forgot Password", the backend can't find any users in the database
3. The backend returns "User not found" error

## Quick Fix - Option 1: Start MongoDB Locally

### Check if MongoDB is installed:
```powershell
mongod --version
```

### If MongoDB is installed, start it:
```powershell
# Start MongoDB service
net start MongoDB

#OR manually start mongod
mongod --dbpath C:\data\db
```

### If MongoDB is NOT installed:
Download and install from: https://www.mongodb.com/try/download/community

---

## Quick Fix - Option 2: Use MongoDB Atlas (Cloud - FREE)

1. **Go to**: https://www.mongodb.com/cloud/atlas/register
2. **Create a free account**
3. **Create a FREE cluster** (M0 Sandbox)
4. **Get connection string**:
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

5. **Update `.env` file**:
   ```env
   MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/grocery-mern?retryWrites=true&w=majority
   ```

6. **Restart backend server**

---

## Solution 3: Test Email Directly (Bypass User Check)

The curl command works because the Vercel mail service is fine. The issue is just that there's no user in the database.

### To test email sending:
1. First, **register a new user** at http://localhost:5173/register
   - Use email: dhanunjay1611@gmail.com
   - This will create the user in MongoDB

2. Then try "Forgot Password" again

---

## Current Setup Status

✅ **Email Service**: Working (Vercel deployment)
✅ **API Key**: Configured  
✅ **Frontend**: Running on http://localhost:5173
❌ **Backend**: Running BUT can't connect to MongoDB
❌ **MongoDB**: Not running

---

## Next Steps (Choose ONE):

### A. Start Local MongoDB
```powershell
# Check if installed
mongod --version

# Start service
net start MongoDB

# Restart backend
cd c:\Users\DHANUNJAI\grocery-mern\backend
node server.js
```

### B. Use MongoDB Atlas (Recommended - Easiest)
1. Sign up at https://www.mongodb.com/cloud/atlas/register
2. Create free cluster
3. Get connection string
4. Update MONGO_URI in `.env`
5. Restart backend

### C. Just Test It Now
1. Make sure backend is running
2. Go to http://localhost:5173/register  
3. Register with: dhanunjay1611@gmail.com
4. Check your email for OTP
5. Verify email
6. THEN try forgot password

---

## Debugging Commands

### Check if MongoDB is running:
```powershell
Get-Service MongoDB
```

### Check if backend is running:
```powershell
Test-NetConnection -ComputerName localhost -Port 5000
```

### Check backend logs:
Look at the PowerShell window where you started the backend

### Test forgot password API directly:
```powershell
Invoke-WebRequest -Uri "http://localhost:5000/api/auth/forgot-password" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"email":"dhanunjay1611@gmail.com"}'
```

If you see "User not found" → You need to register first OR start MongoDB

---

**Last Updated**: 2025-11-24 19:30
