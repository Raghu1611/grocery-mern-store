# 📧 Gmail API Setup Guide

This guide will walk you through setting up Gmail API for your application. This replaces SMTP and eliminates all port blocking issues!

## 🎯 Why Gmail API?

✅ **No Port Issues** - Works through HTTPS (port 443) which is never blocked  
✅ **Works Anywhere** - Corporate networks, firewalls, restrictive environments  
✅ **More Reliable** - Official Google API  
✅ **Higher Limits** - 2000 emails/day (vs 500 for SMTP)  
✅ **Faster** - Direct API calls instead of SMTP protocol

---

## 📋 Step-by-Step Setup

### Step 1: Create Google Cloud Project

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Gmail account

2. **Create a New Project**
   - Click the project dropdown at the top
   - Click "New Project"
   - Name it: "Grocery App Email Service" (or any name you prefer)
   - Click "Create"
   - Wait for the project to be created (takes ~10 seconds)

### Step 2: Enable Gmail API

1. **Navigate to APIs & Services**
   - In the left sidebar, click "APIs & Services" > "Library"

2. **Search for Gmail API**
   - In the search box, type "Gmail API"
   - Click on "Gmail API" from the results

3. **Enable the API**
   - Click the blue "Enable" button
   - Wait for it to be enabled (~5 seconds)

### Step 3: Create OAuth 2.0 Credentials

1. **Go to Credentials Page**
   - Click "APIs & Services" > "Credentials" in the left sidebar

2. **Configure OAuth Consent Screen** (First time only)
   - Click "Configure Consent Screen"
   - Choose "External" (unless you have a Google Workspace)
   - Click "Create"
   - Fill in:
     - App name: "Grocery App"
     - User support email: Your email
     - Developer contact: Your email
   - Click "Save and Continue"
   - Skip "Scopes" (click "Save and Continue")
   - Skip "Test users" (click "Save and Continue")
   - Click "Back to Dashboard"

3. **Create OAuth Client ID**
   - Click "Create Credentials" > "OAuth client ID"
   - Application type: **Desktop app**
   - Name: "Grocery App Email Client"
   - Click "Create"

4. **Save Your Credentials**
   - A popup will show your Client ID and Client Secret
   - **Copy both values** - you'll need them in the next step
   - Click "OK"

### Step 4: Configure Environment Variables

1. **Open your `.env` file** in the backend folder

2. **Add these variables** (replace with your actual values):

```env
# Gmail API Configuration
GMAIL_CLIENT_ID=your_client_id_from_step_3
GMAIL_CLIENT_SECRET=your_client_secret_from_step_3
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_USER=your-email@gmail.com
```

**Note:** Don't add `GMAIL_REFRESH_TOKEN` yet - we'll generate it in the next step!

### Step 5: Generate Refresh Token

1. **Open a terminal** in the backend folder

2. **Run the setup script:**
   ```bash
   node src/utils/gmailSetup.js
   ```

3. **Follow the prompts:**
   - The script will display a long URL
   - Copy the entire URL and paste it in your browser
   - Sign in with your Gmail account
   - Click "Allow" to grant permissions
   - You'll see a code or be redirected to a page with a code
   - Copy the authorization code
   - Paste it back into the terminal

4. **Save the Refresh Token:**
   - The script will display your refresh token
   - Copy it and add to your `.env` file:
   ```env
   GMAIL_REFRESH_TOKEN=your_refresh_token_here
   ```

### Step 6: Test Your Setup

1. **Run the test command:**
   ```bash
   node src/utils/gmailSetup.js --test
   ```

2. **Expected output:**
   ```
   ✅ Gmail API connection successful!
   📧 Email: your-email@gmail.com
   📊 Total messages: [number]
   🎉 Setup complete!
   ```

---

## ✅ You're Done!

Your application now uses Gmail API for sending emails. No more SMTP port issues!

### Final `.env` Configuration

Your `.env` file should look like this:

```env
# Gmail API Configuration
GMAIL_CLIENT_ID=123456789-abcdefg.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=GOCSPX-abcd1234efgh5678
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_REFRESH_TOKEN=1//0abcd1234efgh5678...
GMAIL_USER=your-email@gmail.com

# Other configurations...
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

---

## 🧪 Testing Email Sending

### Test OTP Email

1. Start your backend server:
   ```bash
   npm start
   ```

2. Use the "Forgot Password" feature in your app

3. Check your email inbox for the OTP

### Expected Behavior

✅ Email arrives in inbox (not spam)  
✅ OTP code is clearly visible  
✅ HTML formatting looks good  
✅ No port or firewall errors in console

---

## 🔧 Troubleshooting

### Error: "invalid_grant"

**Problem:** Refresh token expired or invalid

**Solution:**
```bash
node src/utils/gmailSetup.js
```
Generate a new refresh token and update `.env`

### Error: "Quota exceeded"

**Problem:** Daily sending limit reached (2000 emails)

**Solution:** Wait 24 hours or request quota increase from Google Cloud Console

### Error: "Gmail API not configured"

**Problem:** Missing environment variables

**Solution:** Complete Steps 4-5 above

### Emails going to spam

**Problem:** Gmail's spam filters

**Solution:**
1. Mark the email as "Not Spam" in your inbox
2. Add your sending email to contacts
3. For production, set up SPF/DKIM records

---

## 🔒 Security Best Practices

⚠️ **Never commit `.env` to Git**  
⚠️ **Keep Client Secret and Refresh Token private**  
⚠️ **Add `.env` to `.gitignore`**  
⚠️ **Rotate credentials if exposed**  
⚠️ **Use environment variables in production**

---

## 📊 Sending Limits

| Service | Daily Limit |
|---------|-------------|
| Gmail API | 2,000 emails |
| Gmail SMTP | 500 emails |

---

## 🎉 Benefits You'll Notice

1. **No more port blocking errors** - Works on any network
2. **Faster email delivery** - Direct API calls
3. **Better reliability** - Official Google infrastructure
4. **Higher sending limits** - 4x more emails per day
5. **Easier debugging** - Clear API error messages

---

## 📚 Additional Resources

- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Sending Email Guide](https://developers.google.com/gmail/api/guides/sending)

---

**Need Help?** Check the troubleshooting section above or refer to the `.env.example` file for configuration details.
