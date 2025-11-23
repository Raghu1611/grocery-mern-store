# ⚡ FAST Gmail API Setup - 3 Minutes

## 🚀 Quick Steps (Do This Now!)

### Step 1: Finish OAuth Consent Screen (1 minute)

The browser is already open at the consent screen. Just do this:

1. **Click "Create"** button on the current page
2. **Click "Back to Dashboard"**

### Step 2: Create OAuth Credentials (1 minute)

1. **Click "Clients"** in the left sidebar
2. **Click "+ CREATE CLIENT"** button
3. **Select "Desktop"** as client type
4. **Name:** `Grocery App Email Client`
5. **Click "Create"**
6. **COPY** the Client ID and Client Secret that appear

### Step 3: Update .env (30 seconds)

Open `backend\.env` and add:

```env
GMAIL_CLIENT_ID=your_client_id_here
GMAIL_CLIENT_SECRET=your_client_secret_here
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_USER=dhanunjay1611@gmail.com
```

### Step 4: Generate Refresh Token (30 seconds)

Run this command:

```bash
cd backend
node src/utils/gmailSetup.js
```

- Open the URL in browser
- Click "Allow"
- Copy the code
- Paste in terminal
- Copy the refresh token to `.env`:

```env
GMAIL_REFRESH_TOKEN=your_refresh_token_here
```

### Step 5: Test (10 seconds)

```bash
node src/utils/gmailSetup.js --test
```

Should show: ✅ Gmail API connection successful!

---

## ✅ Done!

Your email service now uses Gmail API - no more port issues!

**Total Time:** ~3 minutes
