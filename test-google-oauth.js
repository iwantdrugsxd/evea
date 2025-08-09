require('dotenv').config({ path: '.env.local' });
const { google } = require('googleapis');

console.log('🔍 Checking Google OAuth Configuration...\n');

const requiredVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GOOGLE_REDIRECT_URI',
  'GOOGLE_ACCESS_TOKEN',
  'GOOGLE_REFRESH_TOKEN'
];

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
  console.log('\n❌ Missing environment variables. Run: node get-google-tokens.js');
  process.exit(1);
}

// Test Google Drive API
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

drive.about.get({ fields: 'user' })
  .then((response) => {
    console.log('✅ Google Drive authentication successful!');
    console.log('User:', response.data.user?.emailAddress);
  })
  .catch((error) => {
    console.error('❌ Authentication failed:', error.message);
    if (error.message.includes('invalid_grant')) {
      console.log('\n🔧 Solution: Run node get-google-tokens.js to refresh tokens');
    }
  });