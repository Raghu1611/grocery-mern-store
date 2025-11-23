require('dotenv').config();
const { google } = require('googleapis');

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI || 'http://localhost:3000/oauth2callback';

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    prompt: 'consent'
});

console.log('\n' + '='.repeat(70));
console.log('📧 GMAIL API - AUTHORIZATION URL');
console.log('='.repeat(70));
console.log('\nOpen this URL in your browser:\n');
console.log(authUrl);
console.log('\n' + '='.repeat(70));
console.log('\nAfter authorizing, you will get a code.');
console.log('Copy that code and run:');
console.log('\nnode src/utils/getRefreshToken.js YOUR_CODE_HERE');
console.log('\n' + '='.repeat(70) + '\n');
