require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

console.log('🔍 Checking Google OAuth Configuration...\n');

// Check required environment variables
const requiredVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REDIRECT_URI',
  'GOOGLE_ACCESS_TOKEN',
  'GOOGLE_REFRESH_TOKEN'
];

console.log('📋 Environment Variables Check:');
console.log('================================');

let missingVars = [];
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.log(`❌ ${varName}: MISSING`);
    missingVars.push(varName);
  } else {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
  }
});

if (missingVars.length > 0) {
  console.log('\n❌ Missing required environment variables!');
  console.log('\n📝 Add these to your .env.local file:');
  missingVars.forEach(varName => {
    console.log(`${varName}=your_value_here`);
  });
  console.log('\n💡 To get these values:');
  console.log('1. Go to Google Cloud Console');
  console.log('2. Create OAuth 2.0 credentials');
  console.log('3. Set redirect URI to: http://localhost:3000/auth/callback');
  console.log('4. Run the OAuth flow to get access and refresh tokens');
  process.exit(1);
}

console.log('\n✅ All environment variables are set!');

// Test Google Drive API
console.log('\n🔧 Testing Google Drive API...');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_ACCESS_TOKEN,
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Test authentication
drive.about.get({ fields: 'user' })
  .then((response) => {
    console.log('✅ Google Drive authentication successful!');
    console.log('User:', response.data.user);
    console.log('\n🎉 Google OAuth configuration is working correctly!');
  })
  .catch((error) => {
    console.error('❌ Google Drive authentication failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check if your access token is expired');
    console.error('2. Run refresh-google-token.js to get a new access token');
    console.error('3. Verify your OAuth credentials in Google Cloud Console');
    console.error('4. Make sure the redirect URI matches exactly');
  });
