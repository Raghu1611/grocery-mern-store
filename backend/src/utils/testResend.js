const { Resend } = require('resend');
require('dotenv').config();

console.log('Current directory:', process.cwd());
console.log('API Key loaded:', process.env.RESEND_API_KEY ? 'Yes' : 'No');

if (process.env.RESEND_API_KEY) {
  console.log('API Key starts with:', process.env.RESEND_API_KEY.substring(0, 5));
}

const resend = new Resend(process.env.RESEND_API_KEY);

async function test() {
  console.log('Testing Resend...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'Grocery App <onboarding@resend.dev>',
      to: 'dhanunjay1611@gmail.com',
      subject: 'Resend Test',
      html: '<strong>It works!</strong>'
    });

    if (error) console.error('Error:', error);
    else console.log('Success!', data);
  } catch (e) {
    console.error('Exception:', e);
  }
}

test();
