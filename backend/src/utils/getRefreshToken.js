require('dotenv').config();
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const code = process.argv[2];

if (!code) {
    console.log('❌ Error: Please provide the authorization code');
    console.log('Usage: node src/utils/getRefreshToken.js YOUR_CODE_HERE');
    process.exit(1);
}

const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI || 'http://localhost:3000/oauth2callback';

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

async function getToken() {
    try {
        const { tokens } = await oAuth2Client.getToken(code);

        console.log('\n' + '='.repeat(70));
        console.log('✅ SUCCESS! Your refresh token:');
        console.log('='.repeat(70));
        console.log(tokens.refresh_token);
        console.log('='.repeat(70) + '\n');

        // Append to .env file
        const envPath = path.join(__dirname, '../../.env');
        const refreshTokenLine = `\nGMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`;
        fs.appendFileSync(envPath, refreshTokenLine);

        console.log('✅ Refresh token added to .env file!\n');
        console.log('🎉 Gmail API setup complete!');
        console.log('\nTest it with: node src/utils/gmailSetup.js --test\n');

    } catch (error) {
        console.error('\n❌ Error getting refresh token:', error.message);
        console.log('\nMake sure you copied the correct authorization code.');
        process.exit(1);
    }
}

getToken();
