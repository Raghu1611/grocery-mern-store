# Email Service Testing Guide

## Configuration Status ✅

Your Grocery MERN app is now configured to use the Vercel mail service:

- **Mail Service URL**: `https://mailservice-nine.vercel.app/api/send`
- **API Key**: Configured in `.env` as `VERIFY_API_KEY`
- **Both servers running**: Backend (5000) & Frontend (5173)

## How to Test OTP Email

### Step 1: Register a New User
1. Go to http://localhost:5173/register
2. Fill in the registration form with a **real email address**
3. Click "Register"

### Step 2: Check Backend Logs
After clicking register, check the backend terminal. You should see:
```
==========================================
📧 SENDING EMAIL
To: your-email@example.com
Subject: Verify your account
Message: Your OTP is 123456
Mail URL: https://mailservice-nine.vercel.app/api/send
API Key present: YES (length: 38)
==========================================
Payload: {
  "to": "your-email@example.com",
  "subject": "Verify your account",
  "html": "<p>Your OTP is 123456</p>"
}
✅ Email sent successfully!
Response: {...}
==========================================
```

### Step 3: Check Your Email Inbox
- Check your email inbox (the email you used to register)
- Look for an email with subject "Verify your account"
- The email will contain your OTP code

### Step 4: If Email Not Received

**Check Backend Logs for Errors:**
If you see an error like:
```
❌ Error sending email:
Status: 401
Data: { error: 'Unauthorized' }
```
This means the API key might be wrong.

If you see:
```
❌ Error sending email:
Status: 400
Data: { error: 'Invalid recipient email' }
```
Make sure you're using a valid email address.

**Email in Spam:**
- Check your spam/junk folder
- Add the sender to your contacts

**Wait a few minutes:**
- Email delivery can take 1-5 minutes sometimes

### Step 5: Copy OTP from Logs (Backup Method)
If the email doesn't arrive, you can still see the OTP in the backend console logs under "DEV MODE - EMAIL CONTENT"

## Testing Forgot Password

1. Go to http://localhost:5173/forgot-password
2. Enter your registered email
3. Click "Send OTP"
4. Check backend logs and your email for the OTP
5. Enter the OTP on the reset password page

## Troubleshooting

### API Key Not Loading
- Make sure you restarted the backend server after updating `.env`
- Check that `VERIFY_API_KEY` is in the `.env` file
- No quotes around the value in `.env`

### Email Service Down
- Verify https://mailservice-nine.vercel.app is accessible
- Check if the `/api/send` endpoint exists
- Test with a tool like Postman:
  ```bash
  curl -X POST https://mailservice-nine.vercel.app/api/send \
    -H "Content-Type: application/json" \
    -H "x-api-key: vedjsjssdjkjjnsddjsksdbssdflsfmbjm" \
    -d '{"to":"test@example.com","subject":"Test","html":"<p>Test</p>"}'
  ```

### MongoDB Not Connected
- Make sure MongoDB is running locally
- Check the connection string in `.env`

## Current Environment Variables

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/grocery-mern
JWT_SECRET=your_jwt_secret_key_here
VERIFY_API_KEY=vedjsjssdjkjjnsddjsksdbssdflsfmbjm
```

## Next Steps

1. Test registration with a real email
2. Check if you receive the OTP email
3. If successful, test forgot password flow
4. Monitor backend logs for any errors

---

**Last Updated**: 2025-11-24
**Servers Running**: ✅ Backend (http://localhost:5000) | ✅ Frontend (http://localhost:5173)
