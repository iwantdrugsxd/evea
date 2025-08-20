import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    
    console.log('🔍 Google OAuth Debug Information:');
    console.log('====================================');
    
    // Check environment variables
    console.log('Environment Variables:');
    console.log('- GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
    console.log('- GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
    console.log('- GOOGLE_REDIRECT_URI:', process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback');
    
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      return NextResponse.json({
        error: 'Google OAuth not configured',
        missing: {
          clientId: !process.env.GOOGLE_CLIENT_ID,
          clientSecret: !process.env.GOOGLE_CLIENT_SECRET
        }
      }, { status: 500 });
    }

    // If code is provided, test token exchange
    if (code) {
      console.log('Testing token exchange with code:', code.substring(0, 20) + '...');
      
      const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          code,
          grant_type: 'authorization_code',
          redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
        }),
      });

      const tokenData = await tokenResponse.json();
      
      console.log('Token Exchange Result:');
      console.log('- Status:', tokenResponse.status);
      console.log('- Success:', tokenResponse.ok);
      console.log('- Access Token:', !!tokenData.access_token);
      console.log('- Refresh Token:', !!tokenData.refresh_token);
      console.log('- Error:', tokenData.error || 'None');
      console.log('- Error Description:', tokenData.error_description || 'None');
      
      if (tokenResponse.ok) {
        // Test user info fetch
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
          },
        });

        const userData = await userResponse.json();
        
        console.log('User Info Result:');
        console.log('- Status:', userResponse.status);
        console.log('- Success:', userResponse.ok);
        console.log('- User Data:', userData);
        
        return NextResponse.json({
          success: true,
          tokenExchange: {
            status: tokenResponse.status,
            success: tokenResponse.ok,
            hasAccessToken: !!tokenData.access_token,
            hasRefreshToken: !!tokenData.refresh_token,
            tokenType: tokenData.token_type,
            expiresIn: tokenData.expires_in
          },
          userInfo: {
            status: userResponse.status,
            success: userResponse.ok,
            user: userData
          }
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Token exchange failed',
          details: tokenData
        }, { status: 400 });
      }
    }

    // Return configuration info
    return NextResponse.json({
      success: true,
      configuration: {
        clientId: process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...',
        redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
        hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET
      },
      instructions: [
        '1. Check that your Google Cloud Console OAuth 2.0 credentials are configured correctly',
        '2. Ensure the redirect URI matches exactly: http://localhost:3000/api/auth/google/callback',
        '3. Make sure your OAuth consent screen is published or you are added as a test user',
        '4. Test the token exchange by adding ?code=YOUR_AUTH_CODE to this URL'
      ]
    });
    
  } catch (error) {
    console.error('Debug endpoint error:', error);
    return NextResponse.json({
      error: 'Debug endpoint failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
