const { Resend } = require('resend');

const API_KEY = 're_9qbitQBM_EVXvw9vgaz21acxtRpfDdW4k';
const resend = new Resend(API_KEY);

async function test() {
    console.log('Testing Resend with hardcoded key...');
    try {
        const { data, error } = await resend.emails.send({
            from: 'Grocery App <onboarding@resend.dev>',
            to: 'dhanunjay1611@gmail.com',
            subject: 'Resend Test Hardcoded',
            html: '<strong>It works with hardcoded key!</strong>'
        });

        if (error) console.error('Error:', error);
        else console.log('Success!', data);
    } catch (e) {
        console.error('Exception:', e);
    }
}

test();
