import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🚀 Initiating Google OAuth flow...');
    
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error('Google OAuth not configured: Missing GOOGLE_CLIENT_ID');
      return NextResponse.json(
        { error: 'Google OAuth is not configured. Please contact support.' },
        { status: 500 }
      );
    }

    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback';
    
    console.log('OAuth Configuration:');
    console.log('- Client ID:', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
    console.log('- Redirect URI:', redirectUri);
    console.log('- Scopes: profile email');
    console.log('- Access Type: offline');
    console.log('- Prompt: consent');
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=code&` +
      `scope=${encodeURIComponent('profile email')}&` +
      `access_type=offline&` +
      `prompt=consent`;

    console.log('✅ Redirecting to Google OAuth:', googleAuthUrl);
    return NextResponse.redirect(googleAuthUrl);
  } catch (error) {
    console.error('❌ Google OAuth error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initiate Google OAuth',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
