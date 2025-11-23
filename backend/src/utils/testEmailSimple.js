const nodemailer = require('nodemailer');
require('dotenv').config();

// Simple Gmail SMTP configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS // App Password
    }
});

async function testEmail() {
    try {
        console.log('\n🧪 Testing Gmail SMTP connection...\n');

        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself for testing
            subject: 'Test Email - Grocery App',
            html: '<h1>✅ Email Service Working!</h1><p>Your Gmail SMTP is configured correctly.</p>'
        });

        console.log('✅ Email sent successfully!');
        console.log('📧 Message ID:', info.messageId);
        console.log('\n🎉 Gmail SMTP setup complete!\n');

    } catch (error) {
        console.error('\n❌ Error sending email:', error.message);
        console.log('\nMake sure you have:');
        console.log('1. Created a Gmail App Password');
        console.log('2. Added EMAIL_USER and EMAIL_PASS to .env');
        console.log('3. Enabled 2FA on your Gmail account\n');
    }
}

testEmail();
