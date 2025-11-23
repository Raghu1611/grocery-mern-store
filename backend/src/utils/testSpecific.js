const { Resend } = require('resend');
require('dotenv').config();

// HARDCODED KEY FOR DEBUGGING
const API_KEY = 're_9qbitQBM_EVXvw9vgaz21acxtRpfDdW4k';
const resend = new Resend(API_KEY);

async function testSpecificEmail() {
    console.log('----------------------------------------');
    console.log('🧪 Testing Resend to: 2200032009cseh@gmail.com');
    console.log('🔑 Using API Key:', process.env.RESEND_API_KEY ? 'Present' : 'Missing');
    console.log('----------------------------------------');

    try {
        const { data, error } = await resend.emails.send({
            from: 'Grocery App <onboarding@resend.dev>',
            to: '2200032009cseh@gmail.com',
            subject: 'Resend Test - Grocery App',
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #10b981;">✅ It Works!</h2>
          <p>This is a test email from your Grocery App backend.</p>
          <p>Sent via Resend using <strong>onboarding@resend.dev</strong></p>
          <p>Timestamp: ${new Date().toISOString()}</p>
        </div>
      `
        });

        if (error) {
            console.error('❌ FAILED to send email.');
            console.error('Error details:', JSON.stringify(error, null, 2));
        } else {
            console.log('✅ Email sent successfully!');
            console.log('📧 ID:', data.id);
            console.log('----------------------------------------');
            console.log('👉 Please check your SPAM folder if not in Inbox.');
        }
    } catch (e) {
        console.error('❌ EXCEPTION:', e);
    }
}

testSpecificEmail();
