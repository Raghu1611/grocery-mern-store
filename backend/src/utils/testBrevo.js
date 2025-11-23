const nodemailer = require('nodemailer');
require('dotenv').config();

async function testBrevo() {
    console.log('Testing Brevo SMTP...');

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Grocery App" <${process.env.BREVO_USER}>`,
            to: 'dhanunjay1611@gmail.com',
            subject: 'Brevo SMTP Test',
            html: '<strong>It works!</strong>'
        });
        console.log('Success! Message ID:', info.messageId);
    } catch (error) {
        console.error('Error:', error);
    }
}

testBrevo();
