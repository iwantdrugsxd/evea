require('dotenv').config({ path: '.env.local' });

const { google } = require('googleapis');
const readline = require('readline');

console.log('🔍 Google OAuth Token Generator\n');

// Check if required environment variables are set
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ Missing required environment variables!');
  console.error('Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in your .env.local file');
  console.error('Get these from: https://console.cloud.google.com/apis/credentials');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Use a simple redirect URI for local development
const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  redirectUri
);

const scopes = [
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive'
];

const authUrl = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: scopes,
  prompt: 'consent', // This ensures you get a refresh token
  redirect_uri: redirectUri
});

console.log('🔗 Authorize this app by visiting this url:');
console.log('============================================');
console.log(authUrl);
console.log('============================================');
console.log('\n📋 Instructions:');
console.log('1. Click the URL above');
console.log('2. Sign in with your Google account');
console.log('3. Grant the requested permissions');
console.log('4. Copy the "code" parameter from the redirect URL');
console.log('5. Paste it below\n');

rl.question('Enter the authorization code: ', async (code) => {
  try {
    console.log('\n🔄 Exchanging code for tokens...');
    const { tokens } = await oauth2Client.getToken(code);
    
    console.log('\n✅ Tokens received successfully!');
    console.log('\n📝 Add these to your .env.local file:');
    console.log('=====================================');
    console.log(`GOOGLE_ACCESS_TOKEN=${tokens.access_token}`);
    if (tokens.refresh_token) {
      console.log(`GOOGLE_REFRESH_TOKEN=${tokens.refresh_token}`);
    }
    console.log('=====================================');
    
    if (tokens.refresh_token) {
      console.log('\n🔄 Refresh token received - this will allow automatic token renewal');
    } else {
      console.log('\n⚠️  No refresh token received. You may need to re-authorize later.');
    }
    
    console.log('\n✅ After adding the tokens to .env.local, restart your server and try the upload again!');
    
  } catch (error) {
    console.error('\n❌ Error getting tokens:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Make sure your Google Cloud Console OAuth 2.0 Client ID is configured correctly');
    console.error('2. Add "http://localhost:3000/auth/callback" to authorized redirect URIs');
    console.error('3. Make sure Google Drive API is enabled');
    console.error('4. Check that your OAuth consent screen is published');
  }
  
  rl.close();
});
