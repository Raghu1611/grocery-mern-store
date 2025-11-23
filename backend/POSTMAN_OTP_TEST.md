# Testing OTP with Postman

## 1. Send OTP Request

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/send-otp`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "2200032009cseh@gmail.com"
}
```

**Expected Response:**
```json
{
  "message": "OTP sent successfully",
  "otp": "123456",
  "note": "Email delivery may be delayed. Use this OTP for testing."
}
```

---

## 2. Verify OTP Request

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/verify-otp`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "2200032009cseh@gmail.com",
  "otp": "123456"
}
```

**Expected Response:**
```json
{
  "verified": true
}
```

---

## 3. Reset Password Request

**Method:** POST  
**URL:** `http://localhost:5000/api/auth/reset-password`  
**Headers:**
```
Content-Type: application/json
```

**Body (raw JSON):**
```json
{
  "email": "2200032009cseh@gmail.com",
  "otp": "123456",
  "password": "newpassword123"
}
```

**Expected Response:**
```json
{
  "message": "Password reset successful"
}
```

---

## Quick Test Steps:

1. **Send OTP** - Copy the OTP from the response
2. **Verify OTP** - Use the OTP you received
3. **Reset Password** - Complete the password reset

## Notes:
- The OTP is now included in the API response for testing
- OTP expires in 5 minutes (OTP_TTL_MINUTES)
- Each new OTP request invalidates the previous one
