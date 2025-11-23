# 📧 Gmail API Email Service

✅ **Migration Complete!** Your email service now uses Gmail API instead of SMTP.

## 🎯 Benefits

- ✅ **No Port Blocking** - Works through HTTPS (port 443)
- ✅ **Works Anywhere** - Any network, any firewall
- ✅ **Higher Limits** - 2,000 emails/day (vs 500 SMTP)
- ✅ **Faster** - Direct API calls
- ✅ **More Secure** - OAuth 2.0 authentication

---

## 🚀 Quick Setup (5 minutes)

### 1. Google Cloud Setup
1. Go to https://console.cloud.google.com/
2. Create project → Enable Gmail API
3. Create OAuth 2.0 credentials (Desktop app)
4. Copy Client ID & Client Secret

### 2. Configure .env
```env
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_USER=your-email@gmail.com
```

### 3. Generate Refresh Token
```bash
node src/utils/gmailSetup.js
```
Follow prompts → Add `GMAIL_REFRESH_TOKEN` to `.env`

### 4. Test
```bash
node src/utils/gmailSetup.js --test
```

---

## 📚 Documentation

- **[QUICK_START_GMAIL_API.md](./QUICK_START_GMAIL_API.md)** - Quick reference
- **[GMAIL_API_SETUP.md](./GMAIL_API_SETUP.md)** - Detailed setup guide
- **[.env.example](./.env.example)** - Configuration template

---

## 🧪 Usage

The email service works automatically. No code changes needed!

**Functions available:**
- `sendOtpEmail(email, otp)` - Send OTP for password reset
- `sendPasswordChangedEmail(email)` - Send password change notification

**Example:**
```javascript
const { sendOtpEmail } = require('./utils/emailService');

await sendOtpEmail('user@example.com', '123456');
// ✅ Email sent via Gmail API!
```

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| "Gmail API not configured" | Run `node src/utils/gmailSetup.js` |
| "invalid_grant" | Generate new refresh token |
| "Quota exceeded" | Wait 24 hours (2000/day limit) |

See [GMAIL_API_SETUP.md](./GMAIL_API_SETUP.md) for detailed troubleshooting.

---

## 📊 What Changed

**Before (SMTP):**
- Used nodemailer with ports 587/465
- Often blocked by firewalls
- 500 emails/day limit

**After (Gmail API):**
- Uses googleapis with HTTPS (port 443)
- Never blocked
- 2,000 emails/day limit

---

## ✅ Ready to Use!

Once you complete the setup, your email service will:
- ✅ Send OTP emails for password reset
- ✅ Send password change notifications
- ✅ Work on any network
- ✅ Never have port issues

**Setup Time:** ~5 minutes  
**Difficulty:** Easy (just follow the guide)

---

**Questions?** See [GMAIL_API_SETUP.md](./GMAIL_API_SETUP.md) for complete documentation.
