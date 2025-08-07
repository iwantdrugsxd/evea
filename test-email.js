require('dotenv').config({ path: '.env.local' });

const nodemailer = require('nodemailer');

console.log('📧 Testing Email Configuration...\n');

// Check environment variables
const requiredVars = [
  'SMTP_HOST',
  'SMTP_PORT', 
  'SMTP_USER',
  'SMTP_PASS'
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
  console.log('\n💡 For Gmail:');
  console.log('SMTP_HOST=smtp.gmail.com');
  console.log('SMTP_PORT=587');
  console.log('SMTP_USER=your-email@gmail.com');
  console.log('SMTP_PASS=your-app-password');
  process.exit(1);
}

console.log('\n✅ All environment variables are set!');

// Test email sending
console.log('\n📧 Testing email sending...');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const testEmail = {
  from: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER,
  to: process.env.SMTP_USER, // Send to yourself for testing
  subject: 'Test Email from EVEA Platform',
  html: `
    <h2>Test Email</h2>
    <p>This is a test email from your EVEA platform.</p>
    <p>If you receive this, your email configuration is working!</p>
    <p>Time: ${new Date().toLocaleString()}</p>
  `
};

transporter.sendMail(testEmail)
  .then((info) => {
    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\n📧 Check your inbox for the test email.');
  })
  .catch((error) => {
    console.error('❌ Email sending failed:', error.message);
    console.error('\n🔧 Troubleshooting:');
    console.error('1. Check your Gmail app password');
    console.error('2. Make sure 2-Step Verification is enabled');
    console.error('3. Verify SMTP settings are correct');
    console.error('4. Check if Gmail allows less secure apps');
  });
