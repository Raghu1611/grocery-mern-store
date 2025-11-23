# 🚀 Quick Start - Gmail API Setup

**Time Required:** ~5 minutes

## 1️⃣ Google Cloud Console (2 minutes)

1. Go to https://console.cloud.google.com/
2. Create project → Enable Gmail API
3. Create OAuth 2.0 credentials (Desktop app)
4. Copy Client ID & Client Secret

## 2️⃣ Configure .env (1 minute)

```env
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_USER=your-email@gmail.com
```

## 3️⃣ Generate Refresh Token (2 minutes)

```bash
cd backend
node src/utils/gmailSetup.js
```

- Open the URL in browser
- Authorize the app
- Copy & paste the code
- Add `GMAIL_REFRESH_TOKEN` to `.env`

## 4️⃣ Test (30 seconds)

```bash
node src/utils/gmailSetup.js --test
```

✅ Should show: "Gmail API connection successful!"

---

## 📋 Final .env File

```env
# Gmail API
GMAIL_CLIENT_ID=123456789-abc.apps.googleusercontent.com
GMAIL_CLIENT_SECRET=GOCSPX-abc123
GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback
GMAIL_REFRESH_TOKEN=1//0abc123...
GMAIL_USER=your-email@gmail.com

# Other configs
MONGODB_URI=mongodb://...
JWT_SECRET=your_secret
PORT=5000
```

---

## ✅ Benefits

- ✅ No port blocking (uses HTTPS)
- ✅ Works on any network
- ✅ 2000 emails/day (vs 500 SMTP)
- ✅ Faster & more reliable

---

**Need detailed instructions?** See [GMAIL_API_SETUP.md](./GMAIL_API_SETUP.md)
