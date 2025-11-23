const nodemailer = require('nodemailer');

/**
 * Brevo (Sendinblue) Email Service
 * 
 * ✅ Free Tier (300 emails/day)
 * ✅ Reliable delivery
 * ✅ Standard SMTP
 */

const createTransporter = () => {
  if (!process.env.BREVO_USER || !process.env.BREVO_PASS) {
    console.log("⚠️ Brevo credentials missing in .env");
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.BREVO_SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.BREVO_USER,
      pass: process.env.BREVO_PASS
    }
  });
};

exports.sendOtpEmail = async (email, otp) => {
  const transporter = createTransporter();

  if (!transporter) {
    console.log(`[Fallback] OTP for ${email}: ${otp}`);
    return true;
  }

  try {
    const info = await transporter.sendMail({
      from: `"FreshCart Grocery" <${process.env.BREVO_USER}>`,
      to: email,
      subject: 'Your OTP Code - FreshCart',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #10b981;">FreshCart Grocery</h2>
          <p>Your OTP code is:</p>
          <h1 style="color: #10b981; letter-spacing: 5px;">${otp}</h1>
          <p>Valid for ${process.env.OTP_TTL_MINUTES || 5} minutes.</p>
        </div>
      `
    });
    console.log(`✅ OTP sent to ${email}. MsgID: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('❌ Brevo Error:', error.message);
    console.log(`[Fallback] OTP for ${email}: ${otp}`);
    return false;
  }
};

exports.sendPasswordChangedEmail = async (email) => {
  const transporter = createTransporter();
  if (!transporter) return true;

  try {
    await transporter.sendMail({
      from: `"FreshCart Grocery" <${process.env.BREVO_USER}>`,
      to: email,
      subject: 'Password Changed - FreshCart',
      html: '<p>Your password has been successfully changed.</p>'
    });
    console.log(`✅ Notification sent to ${email}`);
    return true;
  } catch (error) {
    console.error('❌ Brevo Error:', error.message);
    return false;
  }
};
