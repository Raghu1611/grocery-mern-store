const nodemailer = require('nodemailer');

// HARDCODED CREDENTIALS
const USER = 'dhanunjay1611@gmail.com';
const PASS = 'xsmtpsib-5113a4cc1380fbe033824e3c1e3e22cbe2a307212ffd523fbbe5be1ee42a5c44-IVWg5sPtw4fHzUhs-smt';

async function testBrevo() {
    console.log('Testing Brevo SMTP with HARDCODED credentials...');

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        secure: false,
        auth: {
            user: USER,
            pass: PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Grocery App" <${USER}>`,
            to: '2200032009cseh@gmail.com',
            subject: 'Brevo SMTP Test - Hardcoded',
            html: '<strong>It works with hardcoded credentials!</strong>'
        });
        console.log('✅ Success! Message ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testBrevo();
