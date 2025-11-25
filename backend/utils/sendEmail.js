const axios = require('axios');

const MAIL_URL = 'https://mailservice-nine.vercel.app/api/send';
const API_KEY = process.env.VERIFY_API_KEY;

const sendEmail = async (email, subject, message) => {
    try {
        console.log('==========================================');
        console.log('📧 SENDING EMAIL');
        console.log(`To: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log(`Mail URL: ${MAIL_URL}`);
        console.log(`API Key present: ${API_KEY ? 'YES (length: ' + API_KEY.length + ')' : 'NO - MISSING!'}`);
        console.log('==========================================');

        if (!API_KEY) {
            throw new Error('VERIFY_API_KEY is not set in environment variables');
        }

        const payload = {
            to: email,
            subject: subject,
            html: `<p>${message}</p>`
        };

        console.log('Payload:', JSON.stringify(payload, null, 2));

        const response = await axios.post(MAIL_URL, payload, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ Email sent successfully!');
        console.log('Response:', JSON.stringify(response.data, null, 2));
        console.log('==========================================');
        return response.data;
    } catch (error) {
        console.error('❌ Error sending email:');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
        console.log('==========================================');
        console.log('DEV MODE - EMAIL CONTENT (Service Failed):');
        console.log(`To: ${email}`);
        console.log(`Subject: ${subject}`);
        console.log(`Message: ${message}`);
        console.log('==========================================');
        // Don't throw error, just log it so registration continues
    }
};

module.exports = sendEmail;
