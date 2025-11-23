# How to Get Brevo SMTP Credentials

## Step 1: Create Brevo Account
1. Go to https://www.brevo.com/
2. Click "Sign up free"
3. Fill in your details and verify your email

## Step 2: Get SMTP Credentials
1. Login to Brevo dashboard
2. Go to **Settings** (top right corner)
3. Click **SMTP & API**
4. Click **SMTP** tab
5. You'll see:
   - **Login**: Your email address (e.g., yourname@gmail.com)
   - **Master Password**: Click "Generate a new SMTP key" or use existing one
   - **Server**: smtp-relay.brevo.com
   - **Port**: 587 or 2525

## Step 3: Update .env File
Replace these lines in your `.env` file:

```env
BREVO_USER=your_actual_email@gmail.com
BREVO_PASS=your_actual_smtp_key_here
```

## Example:
```env
BREVO_USER=dhanunjay1611@gmail.com
BREVO_PASS=xsmtpsib-a1b2c3d4e5f6g7h8-i9j0k1l2m3n4o5p6
```

## Important Notes:
- ✅ Free tier: 300 emails/day
- ✅ No credit card required
- ✅ SMTP key looks like: `xsmtpsib-xxxxxxxxxxxxxxxx-xxxxxxxxxxxxxxxx`
- ⚠️ Keep your SMTP key secret!

After updating .env, restart your backend server.
