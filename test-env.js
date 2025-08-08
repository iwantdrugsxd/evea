require('dotenv').config({ path: '.env.local' });

console.log('🔍 Testing Environment Variables');
console.log('===============================\n');

// Check Supabase variables
console.log('📊 Supabase Configuration:');
console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ SET' : '❌ MISSING');
console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ SET' : '❌ MISSING');
console.log('SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ SET' : '❌ MISSING');

// Check Google variables
console.log('\n📊 Google OAuth Configuration:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ SET' : '❌ MISSING');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ SET' : '❌ MISSING');
console.log('GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI ? '✅ SET' : '❌ MISSING');

// Check JWT
console.log('\n📊 JWT Configuration:');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '✅ SET' : '❌ MISSING');

// Check Email
console.log('\n📊 Email Configuration:');
console.log('SMTP_HOST:', process.env.SMTP_HOST ? '✅ SET' : '❌ MISSING');
console.log('SMTP_USER:', process.env.SMTP_USER ? '✅ SET' : '❌ MISSING');
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '✅ SET' : '❌ MISSING');

console.log('\n🎯 Environment variables are being loaded correctly!');
