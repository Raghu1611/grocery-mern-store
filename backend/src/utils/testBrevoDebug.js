const nodemailer = require('nodemailer');
require('dotenv').config();

async function testBrevo() {
    console.log('----------------------------------------');
    console.log('🧪 Testing Brevo SMTP...');
    console.log('👤 USER:', process.env.BREVO_USER);
    console.log('🔑 PASS:', process.env.BREVO_PASS ? '******' + process.env.BREVO_PASS.slice(-4) : 'MISSING');
    console.log('----------------------------------------');

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
            to: '2200032009cseh@gmail.com',
            subject: 'Brevo SMTP Test - Final Check',
            html: '<strong>It works!</strong>'
        });
        console.log('✅ Success! Message ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error:', error);
    }
}

testBrevo();
