# ⚡ FINAL STEP - Add Test User & Get Refresh Token

## ✅ What's Already Done:
- Gmail API enabled ✅
- OAuth Client created ✅
- Credentials added to .env ✅

## 🎯 Last Step (2 minutes):

### Step 1: Add Test User (30 seconds)

1. **Go to this URL:** https://console.cloud.google.com/auth/audience?project=central-node-450007-s8

2. **Scroll down** to "Test users" section

3. **Click "+ ADD USERS"**

4. **Enter:** `dhanunjay1611@gmail.com`

5. **Click "ADD"** then **"SAVE"**

### Step 2: Get Authorization Code (1 minute)

1. **Open this URL in your browser:**
   ```
   https://accounts.google.com/o/oauth2/v2/auth?client_id=909713324511-rtdnan3chrkpap2p2ni9g623hih6sdrn.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Foauth2callback&response_type=code&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fgmail.send&access_type=offline&prompt=consent
   ```

2. **Click your Gmail account** (dhanunjay1611@gmail.com)

3. **Click "Allow"** to grant permissions

4. **You'll be redirected to localhost** (page won't load - that's normal!)

5. **Copy the ENTIRE URL** from the address bar
   - It will look like: `http://localhost:3000/oauth2callback?code=4/0A...LONG_CODE...&scope=...`

### Step 3: Get Refresh Token (30 seconds)

1. **Open terminal** in backend folder

2. **Run this command** (replace YOUR_CODE with the code from the URL):
   ```bash
   cd c:\Users\DHANUNJAI\grocery-mern\backend
   node src/utils/getRefreshToken.js YOUR_CODE_HERE
   ```

3. **The script will:**
   - Exchange the code for a refresh token
   - Automatically add it to your .env file
   - Show "✅ Gmail API setup complete!"

### Step 4: Test (10 seconds)

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

## 🎉 That's It!

Your email service will now use Gmail API with no port issues!

**Total Time:** ~2 minutes

---

## 📝 Example:

If your redirect URL is:
```
http://localhost:3000/oauth2callback?code=4/0AanRRrvKxyz123...&scope=https://www.googleapis.com/auth/gmail.send
```

Run:
```bash
node src/utils/getRefreshToken.js 4/0AanRRrvKxyz123...
```

(Just copy everything after `code=` and before `&scope`)
