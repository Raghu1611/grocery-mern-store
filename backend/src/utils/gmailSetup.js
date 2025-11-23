const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

/**
 * Gmail API Setup Utility
 * 
 * This script helps you set up Gmail API authentication.
 * Run this once to generate your refresh token.
 * 
 * Prerequisites:
 * 1. Go to https://console.cloud.google.com/
 * 2. Create a new project or select existing
 * 3. Enable Gmail API
 * 4. Create OAuth 2.0 credentials (Desktop app)
 * 5. Download credentials and note Client ID and Client Secret
 */

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];

// Read from environment or prompt
const CLIENT_ID = process.env.GMAIL_CLIENT_ID;
const CLIENT_SECRET = process.env.GMAIL_CLIENT_SECRET;
const REDIRECT_URI = process.env.GMAIL_REDIRECT_URI || 'http://localhost:3000/oauth2callback';

async function getRefreshToken() {
    console.log('\n' + '='.repeat(70));
    console.log('📧 GMAIL API SETUP - REFRESH TOKEN GENERATOR');
    console.log('='.repeat(70) + '\n');

    if (!CLIENT_ID || !CLIENT_SECRET) {
        console.log('❌ Missing credentials!\n');
        console.log('Please set these environment variables in your .env file:');
        console.log('  GMAIL_CLIENT_ID=your_client_id');
        console.log('  GMAIL_CLIENT_SECRET=your_client_secret');
        console.log('  GMAIL_REDIRECT_URI=http://localhost:3000/oauth2callback\n');
        console.log('To get these credentials:');
        console.log('1. Go to https://console.cloud.google.com/');
        console.log('2. Create/select a project');
        console.log('3. Enable Gmail API');
        console.log('4. Create OAuth 2.0 credentials (Desktop app type)');
        console.log('5. Copy Client ID and Client Secret to .env\n');
        process.exit(1);
    }

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent' // Force to get refresh token
    });

    console.log('✅ Credentials found!\n');
    console.log('📋 STEP 1: Authorize this app');
    console.log('Open this URL in your browser:\n');
    console.log(authUrl);
    console.log('\n');

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question('📋 STEP 2: Paste the authorization code from the browser here: ', async (code) => {
        rl.close();

        try {
            const { tokens } = await oAuth2Client.getToken(code);

            console.log('\n✅ SUCCESS! Your refresh token:\n');
            console.log('='.repeat(70));
            console.log(tokens.refresh_token);
            console.log('='.repeat(70) + '\n');

            console.log('📝 Add this to your .env file:\n');
            console.log(`GMAIL_REFRESH_TOKEN=${tokens.refresh_token}\n`);

            // Optionally save to a file
            const envExample = `
# Gmail API Configuration
GMAIL_CLIENT_ID=${CLIENT_ID}
GMAIL_CLIENT_SECRET=${CLIENT_SECRET}
GMAIL_REDIRECT_URI=${REDIRECT_URI}
GMAIL_REFRESH_TOKEN=${tokens.refresh_token}
GMAIL_USER=your-email@gmail.com
`;

            const outputPath = path.join(__dirname, '../../gmail-credentials.txt');
            fs.writeFileSync(outputPath, envExample.trim());
            console.log(`💾 Credentials saved to: ${outputPath}`);
            console.log('⚠️  Keep this file secure and add it to .gitignore!\n');

            // Test the token
            await testGmailAPI(oAuth2Client);

        } catch (error) {
            console.error('\n❌ Error getting refresh token:', error.message);
            process.exit(1);
        }
    });
}

async function testGmailAPI(auth) {
    console.log('🧪 Testing Gmail API connection...\n');

    try {
        const gmail = google.gmail({ version: 'v1', auth });
        const profile = await gmail.users.getProfile({ userId: 'me' });

        console.log('✅ Gmail API connection successful!');
        console.log(`📧 Email: ${profile.data.emailAddress}`);
        console.log(`📊 Total messages: ${profile.data.messagesTotal}\n`);

        console.log('🎉 Setup complete! You can now use Gmail API for sending emails.\n');
    } catch (error) {
        console.error('❌ Gmail API test failed:', error.message);
    }
}

// Run if called directly
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.includes('--test')) {
        // Test existing credentials
        if (!process.env.GMAIL_REFRESH_TOKEN) {
            console.log('❌ GMAIL_REFRESH_TOKEN not found in environment');
            process.exit(1);
        }

        const oAuth2Client = new google.auth.OAuth2(
            CLIENT_ID,
            CLIENT_SECRET,
            REDIRECT_URI
        );

        oAuth2Client.setCredentials({
            refresh_token: process.env.GMAIL_REFRESH_TOKEN
        });

        testGmailAPI(oAuth2Client);
    } else {
        // Generate new refresh token
        getRefreshToken();
    }
}

module.exports = { testGmailAPI };
