// Quick script to generate OAuth URL
const CLIENT_ID = '909713324511-rtdnan3chrkpap2p2ni9g623hih6sdrn.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const SCOPE = 'https://www.googleapis.com/auth/gmail.send';

const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${encodeURIComponent(SCOPE)}&access_type=offline&prompt=consent`;

console.log('OAuth URL:');
console.log(authUrl);
