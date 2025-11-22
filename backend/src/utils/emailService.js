const nodemailer = require('nodemailer');

const createTransporter = () => {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log("⚠️  Gmail SMTP not configured");
    return null;
  }

  // Create transporter using Gmail SMTP
  // Port 587 with STARTTLS is more reliable than port 465 SSL
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // use STARTTLS
    requireTLS: true,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD
    },
    connectionTimeout: 5000, // Quick timeout to detect blocked connections
    greetingTimeout: 5000,
    socketTimeout: 5000,
    logger: false,
    debug: false
  });

  return transporter;
};

exports.sendOtpEmail = async (email, otp) => {
  console.log("==================================================");
  console.log(`[OTP] Attempting to send OTP to ${email}: ${otp}`);
  console.log("==================================================");

  const transporter = createTransporter();

  if (!transporter) {
    console.log("📧 Email would be sent to:", email);
    console.log("🔢 OTP Code:", otp);
    console.log("⚠️  Email service not configured - using console fallback");
    return true;
  }

  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your OTP Code - Grocery App',
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">🛒 Grocery App</h2>
          <p>Your OTP for password reset is:</p>
          <h1 style="letter-spacing: 10px; color: #10b981; font-size: 36px; text-align: center; background: #f0fdf4; padding: 20px; border-radius: 8px;">${otp}</h1>
          <p>This OTP is valid for <strong>10 minutes</strong>.</p>
          <p style="color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">If you didn't request this, please ignore this email.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ OTP email sent successfully to ${email}`);
    console.log('📧 Message ID:', info.messageId);
    return true;
  } catch (error) {
    const fs = require('fs');
    const path = require('path');
    const logPath = path.join(__dirname, '../../smtp_error.log');

    // Enhanced error messages
    let userMessage = error.message;
    if (error.message.includes('timeout') || error.code === 'ETIMEDOUT' || error.code === 'ECONNECTION') {
      userMessage = 'SMTP connection blocked by firewall/network - using console fallback';
      console.error('❌ Gmail SMTP Error:', userMessage);
      console.log('\n' + '='.repeat(60));
      console.log('📧 EMAIL FALLBACK MODE - SMTP BLOCKED BY NETWORK');
      console.log('='.repeat(60));
      console.log('📬 Email:', email);
      console.log('🔢 OTP Code:', otp);
      console.log('⏰ Valid for: 10 minutes');
      console.log('='.repeat(60) + '\n');

      // Still return true so the OTP flow works in development
      return true;
    } else if (error.message.includes('authentication') || error.message.includes('Invalid login')) {
      userMessage = 'Authentication failed - check Gmail app password';
      console.error('❌ Gmail SMTP Error:', userMessage);
      console.log('\n' + '='.repeat(60));
      console.log('📧 EMAIL FALLBACK MODE - AUTHENTICATION ISSUE');
      console.log('='.repeat(60));
      console.log('📬 Email:', email);
      console.log('🔢 OTP Code:', otp);
      console.log('⏰ Valid for: 10 minutes');
      console.log('='.repeat(60) + '\n');
      return true; // Allow development to continue
    }

    const errorLog = `[${new Date().toISOString()}] SMTP Error: ${userMessage}\nOriginal: ${error.message}\nStack: ${error.stack}\n\n`;
    fs.appendFileSync(logPath, errorLog);

    console.error('❌ Gmail SMTP Error:', userMessage);
    console.error('❌ Original error:', error.message);
    if (error.code) console.error('❌ Error code:', error.code);

    // For any SMTP error in development, show OTP in console and continue
    console.log('\n📧 OTP FOR DEVELOPMENT:', otp, '\n');
    return true; // Allow development to continue
  }
};

exports.sendPasswordChangedEmail = async (email) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log("📧 Password change notification would be sent to:", email);
    return true;
  }

  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Password Changed Successfully - Grocery App',
      text: 'Your password was changed successfully.',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">🔒 Password Update Notice</h2>
          <p>Your password was changed successfully.</p>
          <p style="color: #059669; background: #d1fae5; padding: 15px; border-radius: 8px;">✅ Your account is now secured with the new password.</p>
          <p style="color: #dc2626; background: #fee2e2; padding: 15px; border-radius: 8px;">⚠️ If you did not perform this action, please reset your password immediately.</p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Password change notification sent to:", email);
    console.log('📧 Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Password change email failed:", error.message);
    return false;
  }
};
