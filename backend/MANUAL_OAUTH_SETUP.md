# 🎯 Manual OAuth Setup Guide - Complete These Steps

Gmail API is already **ENABLED** ✅

Now you need to create OAuth credentials. The browser automation had issues with Google's form, so please follow these simple manual steps:

---

## 📋 Step-by-Step Instructions

### Step 1: Configure OAuth Consent Screen

1. **You're already in Google Cloud Console** - Good!

2. **Click "Get Started"** button (you should see it on the current page)

3. **Fill in the OAuth Consent Screen:**

   **App Information (Step 1 of 4):**
   - App name: `Grocery App`
   - User support email: Select `dhanunjay1611@gmail.com` from dropdown
   - Scroll down to "Developer contact information"
   - Developer contact: `dhanunjay1611@gmail.com`
   - Click **"SAVE AND CONTINUE"**

   **Scopes (Step 2 of 4):**
   - Click **"SAVE AND CONTINUE"** (no need to add scopes)

   **Test users (Step 3 of 4):**
   - Click **"ADD USERS"**
   - Enter: `dhanunjay1611@gmail.com`
   - Click **"ADD"**
   - Click **"SAVE AND CONTINUE"**

   **Summary (Step 4 of 4):**
   - Review and click **"BACK TO DASHBOARD"**

### Step 2: Create OAuth Client ID

1. **Click "Clients" in the left sidebar** (or go to Credentials)

2. **Click "+ CREATE CREDENTIALS"** button at the top

3. **Select "OAuth client ID"**

4. **Configure the OAuth client:**
   - Application type: **Desktop app**
   - Name: `Grocery App Email Client`
   - Click **"CREATE"**

5. **Copy Your Credentials:**
   - A popup will show your **Client ID** and **Client Secret**
   - **IMPORTANT:** Copy both values - you'll need them next!
   - Click **"OK"**

---

## Step 3: Update Your .env File

Open `c:\Users\DHANUNJAI\grocery-mern\backend\.env` and add:

```env
# Gmail API Configuration
GMAIL_CLIENT_ID=paste_your_client_id_here
GMAIL_CLIENT_SECRET=paste_your_client_secret_here
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_USER=dhanunjay1611@gmail.com
```

**Replace** `paste_your_client_id_here` and `paste_your_client_secret_here` with the actual values from Step 2!

---

## Step 4: Generate Refresh Token

Open a terminal in the backend folder and run:

```bash
cd c:\Users\DHANUNJAI\grocery-mern\backend
node src/utils/gmailSetup.js
```

**Follow the prompts:**
1. The script will display a long URL
2. **Copy the entire URL** and paste it in your browser
3. **Sign in** with your Gmail account (dhanunjay1611@gmail.com)
4. **Click "Allow"** to grant permissions
5. You'll see a code or be redirected to a page with a code
6. **Copy the authorization code**
7. **Paste it back into the terminal**
8. The script will display your **refresh token**

---

## Step 5: Add Refresh Token to .env

Copy the refresh token and add it to your `.env` file:

```env
GMAIL_REFRESH_TOKEN=paste_your_refresh_token_here
```

---

## Step 6: Test Your Setup

Run this command to verify everything works:

```bash
node src/utils/gmailSetup.js --test
```

**Expected output:**
```
✅ Gmail API connection successful!
📧 Email: dhanunjay1611@gmail.com
🎉 Setup complete!
```

---

## ✅ Final .env File Should Look Like:

```env
# Gmail API Configuration
GMAIL_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=GOCSPX-abcd1234efgh5678
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_REFRESH_TOKEN=1//0abcd1234efgh5678...
GMAIL_USER=dhanunjay1611@gmail.com

# Other configurations
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🎉 That's It!

Once you complete these steps, your email service will use Gmail API and you'll never have port blocking issues again!

**Estimated Time:** 5-7 minutes

---

## ❓ Need Help?

If you get stuck on any step, let me know which step and I'll help you through it!
