const User = require("../models/User");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOtpEmail, sendPasswordChangedEmail } = require("../utils/emailService");

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Generate OTP
const makeOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

// --------------------------------------
// 🔐 Register
// --------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    return res.json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --------------------------------------
// 🔐 Login
// --------------------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    return res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --------------------------------------
// 🔐 Send OTP
// --------------------------------------
exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email not found" });

    const otp = makeOtp();
    const OTP_TTL_MINUTES = parseInt(process.env.OTP_TTL_MINUTES || '5', 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    await Otp.findOneAndDelete({ email });
    await Otp.create({ email, code: otp, expiresAt });

    const emailSent = await sendOtpEmail(email, otp);
    if (!emailSent) return res.status(500).json({ message: "Failed to send OTP" });

    return res.json({ message: "OTP sent successfully", otp: otp });

  } catch (err) {
    console.error("sendOtp error:", err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// --------------------------------------
// 🔐 Verify OTP
// --------------------------------------
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    console.log("VERIFY OTP REQUEST =", email, otp);

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    const doc = await Otp.findOne({ email });

    console.log("OTP FOUND IN DB =", doc);

    if (!doc)
      return res.status(400).json({ verified: false, message: "OTP not found" });

    if (new Date() > doc.expiresAt) {
      await Otp.deleteOne({ _id: doc._id });
      return res.status(400).json({ verified: false, message: "OTP expired" });
    }

    if (doc.code !== otp) {
      return res.status(400).json({ verified: false, message: "Invalid OTP" });
    }

    return res.json({ verified: true });

  } catch (err) {
    console.error("verifyOtp error:", err);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
};


// --------------------------------------
// 🔐 Reset Password
// --------------------------------------
exports.resetPassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;

    if (!email || !password || !otp)
      return res.status(400).json({ message: "Missing fields" });

    const doc = await Otp.findOne({ email });
    if (!doc)
      return res.status(400).json({ message: "OTP not found" });

    if (new Date() > doc.expiresAt) {
      await Otp.deleteOne({ _id: doc._id });
      return res.status(400).json({ message: "OTP expired" });
    }

    if (doc.code !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({ email }, { password: hashed });

    await Otp.deleteOne({ _id: doc._id });

    // Send password change email
    const { sendPasswordChangedEmail } = require("../utils/emailService");
    await sendPasswordChangedEmail(email);

    return res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ message: "Failed to reset password" });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "No user with that email" });

    // Generate new OTP
    const code = makeOtp();
    const OTP_TTL_MINUTES = parseInt(process.env.OTP_TTL_MINUTES || '5', 10);
    const expiresAt = new Date(Date.now() + OTP_TTL_MINUTES * 60 * 1000);

    await Otp.findOneAndDelete({ email }); // delete old otp
    await Otp.create({ email, code, expiresAt }); // save new otp

    await sendOtpEmail(email, code); // send mail

    return res.json({ message: "OTP resent successfully" });

  } catch (err) {
    console.error("resendOtp error:", err);
    return res.status(500).json({ message: "Failed to resend OTP" });
  }
};

