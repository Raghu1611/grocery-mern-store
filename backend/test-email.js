// Quick test script to verify email sending works
require('dotenv').config();
const axios = require('axios');

const MAIL_URL = 'https://mailservice-nine.vercel.app/api/send';
const API_KEY = process.env.VERIFY_API_KEY;

console.log('Testing Email Service...');
console.log('API Key:', API_KEY ? `SET (${API_KEY.length} chars)` : 'NOT SET');

async function testEmail() {
    try {
        const payload = {
            to: 'dhanunjay1611@gmail.com',
            subject: 'Test from Node.js Backend',
            html: '<h1>Success!</h1><p>This email was sent from your Node.js backend using axios.</p>'
        };

        console.log('Sending email...');
        const response = await axios.post(MAIL_URL, payload, {
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json'
            }
        });

        console.log('✅ SUCCESS!');
        console.log('Response:', response.data);
    } catch (error) {
        console.error('❌ FAILED!');
        console.error('Status:', error.response?.status);
        console.error('Data:', error.response?.data);
        console.error('Message:', error.message);
    }
}

testEmail();
