require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Google OAuth Configuration...');
console.log('');

console.log('📋 Environment Variables:');
console.log('NEXT_PUBLIC_GOOGLE_CLIENT_ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXT_PUBLIC_APP_URL:', process.env.NEXT_PUBLIC_APP_URL);
console.log('');

console.log('🌐 Current Configuration:');
console.log('App URL:', process.env.NEXT_PUBLIC_APP_URL);
console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
console.log('');

console.log('📝 Google OAuth Setup Instructions:');
console.log('1. Go to https://console.cloud.google.com/');
console.log('2. Select your project or create a new one');
console.log('3. Go to "APIs & Services" > "Credentials"');
console.log('4. Find your OAuth 2.0 Client ID or create a new one');
console.log('5. Add these Authorized JavaScript origins:');
console.log('   - http://localhost:3000');
console.log('   - http://localhost:3001');
console.log('   - http://localhost:3002');
console.log('   - http://localhost:3003');
console.log('   - http://localhost:3004');
console.log('6. Add these Authorized redirect URIs:');
console.log('   - http://localhost:3000/auth/callback');
console.log('   - http://localhost:3001/auth/callback');
console.log('   - http://localhost:3002/auth/callback');
console.log('   - http://localhost:3003/auth/callback');
console.log('   - http://localhost:3004/auth/callback');
console.log('');

console.log('🔧 Troubleshooting:');
console.log('- Make sure your Google OAuth client is configured for the correct domain');
console.log('- Check that the client ID matches between frontend and backend');
console.log('- Verify that localhost is in the authorized origins');
console.log('- Clear browser cache and cookies if needed');
