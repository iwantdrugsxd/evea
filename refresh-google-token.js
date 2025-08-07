require('dotenv').config({ path: '.env.local' });

const { google } = require('googleapis');

console.log('🔄 Refreshing Google Access Token...\n');

// Check if we have the required tokens
if (!process.env.GOOGLE_REFRESH_TOKEN) {
  console.error('❌ GOOGLE_REFRESH_TOKEN is missing from .env.local');
  console.error('You need to run the OAuth flow first: node get-google-tokens.js');
  process.exit(1);
}

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing');
  process.exit(1);
}

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/auth/callback'
);

// Set the refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

console.log('🔄 Getting new access token...');

oauth2Client.getAccessToken()
  .then(({ token }) => {
    console.log('\n✅ New access token received!');
    console.log('\n📝 Update your .env.local file with this new access token:');
    console.log('=====================================');
    console.log(`GOOGLE_ACCESS_TOKEN=${token}`);
    console.log('=====================================');
    console.log('\n✅ After updating .env.local, restart your server and try the upload again!');
  })
  .catch((error) => {
    console.error('\n❌ Failed to refresh access token:', error.message);
    console.error('\n🔧 This usually means:');
    console.error('1. Your refresh token has expired');
    console.error('2. The refresh token is invalid');
    console.error('3. You need to re-authorize the application');
    console.error('\n💡 Solution: Run "node get-google-tokens.js" to get fresh tokens');
  });
