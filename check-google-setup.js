require('dotenv').config({ path: '.env.local' });

console.log('🔍 Checking Google OAuth Configuration...\n');

// Check environment variables
const requiredVars = [
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET', 
  'GOOGLE_REDIRECT_URI'
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
  console.log('\n🔗 Get these values from: https://console.cloud.google.com/apis/credentials');
  process.exit(1);
}

console.log('\n✅ All environment variables are set!');

// Check if we have existing tokens
console.log('\n🔑 Existing Tokens Check:');
console.log('==========================');
if (process.env.GOOGLE_ACCESS_TOKEN) {
  console.log('✅ GOOGLE_ACCESS_TOKEN: Set');
} else {
  console.log('❌ GOOGLE_ACCESS_TOKEN: Missing');
}

if (process.env.GOOGLE_REFRESH_TOKEN) {
  console.log('✅ GOOGLE_REFRESH_TOKEN: Set');
} else {
  console.log('❌ GOOGLE_REFRESH_TOKEN: Missing');
}

console.log('\n📋 Next Steps:');
console.log('===============');
console.log('1. If tokens are missing, run: node get-google-tokens.js');
console.log('2. If you get "invalid_request" error, check your Google Cloud Console setup:');
console.log('   - Go to: https://console.cloud.google.com/apis/credentials');
console.log('   - Make sure your OAuth 2.0 Client ID is configured correctly');
console.log('   - Add "http://localhost:3000" to authorized redirect URIs');
console.log('   - Make sure your OAuth consent screen is published');

console.log('\n🔗 Google Cloud Console Links:');
console.log('=============================');
console.log('Credentials: https://console.cloud.google.com/apis/credentials');
console.log('OAuth Consent Screen: https://console.cloud.google.com/apis/credentials/consent');
console.log('Google Drive API: https://console.cloud.google.com/apis/library/drive.googleapis.com');
