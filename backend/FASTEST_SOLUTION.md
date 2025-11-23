# ⚡ FASTEST SOLUTION - Use Gmail App Password Instead

## 🎯 Problem:
Google Cloud Console OAuth test user setup is having UI issues and not saving properly.

## ✅ FASTER SOLUTION (1 minute):

### Use Gmail App Password (Much Simpler!)

1. **Go to:** https://myaccount.google.com/apppasswords

2. **App name:** Enter "Grocery App"

3. **Click "Create"**

4. **Copy the 16-character password**

5. **Update your `.env` file:**
   ```env
   EMAIL_USER=dhanunjay1611@gmail.com
   EMAIL_PASS=your_16_char_app_password_here
   ```

6. **Remove Gmail API variables** (or comment them out):
   ```env
   # GMAIL_CLIENT_ID=...
   # GMAIL_CLIENT_SECRET=...
   # GMAIL_REDIRECT_URI=...
   # GMAIL_REFRESH_TOKEN=...
   ```

7. **Update `emailService.js`** to use the simple SMTP method:
   ```javascript
   // Use this simple config instead
   const transporter = nodemailer.createTransport({
     service: 'gmail',
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASS
     }
   });
   ```

8. **Test it:**
   ```bash
   node src/utils/testEmail.js
   ```

---

## ⚡ This is MUCH faster than OAuth!

**Time:** ~1 minute vs 30+ minutes for OAuth

**Reliability:** Works immediately, no test user issues

**Maintenance:** Simpler, no token refresh needed

---

## 🔄 OR Continue with OAuth (if you prefer):

If you still want OAuth, you need to:
1. Manually add test user in Google Cloud Console
2. Wait 5-10 minutes for it to propagate
3. Then try the authorization flow again

But App Password is the recommended solution for development!
