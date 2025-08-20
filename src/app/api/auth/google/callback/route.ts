import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { setSessionCookie } from '@/lib/auth/session';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    // Check if Google OAuth is configured
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
      console.error('Google OAuth not configured: Missing credentials');
      return NextResponse.redirect(new URL('/login?error=oauth_not_configured', request.url));
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Google OAuth error:', error);
      return NextResponse.redirect(new URL('/login?error=google_auth_failed', request.url));
    }

    if (!code) {
      console.error('No authorization code received');
      return NextResponse.redirect(new URL('/login?error=no_auth_code', request.url));
    }

    // Exchange code for access token
    console.log('Exchanging authorization code for tokens...');
    console.log('Client ID:', process.env.GOOGLE_CLIENT_ID?.substring(0, 20) + '...');
    console.log('Redirect URI:', process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback');
    
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
    console.log('Token response status:', tokenResponse.status);
    console.log('Token data keys:', Object.keys(tokenData));

    if (!tokenResponse.ok) {
      console.error('Token exchange failed:', tokenData);
      console.error('Response status:', tokenResponse.status);
      console.error('Response headers:', Object.fromEntries(tokenResponse.headers.entries()));
      return NextResponse.redirect(new URL('/login?error=token_exchange_failed', request.url));
    }

    // Log successful token exchange
    console.log('✅ Token exchange successful');
    console.log('Access token received:', !!tokenData.access_token);
    console.log('Refresh token received:', !!tokenData.refresh_token);
    console.log('Token type:', tokenData.token_type);
    console.log('Expires in:', tokenData.expires_in);

    // Get user info from Google
    console.log('Fetching user info from Google...');
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    console.log('User info response status:', userResponse.status);
    console.log('User data keys:', Object.keys(userData));

    if (!userResponse.ok) {
      console.error('User info fetch failed:', userData);
      console.error('Response status:', userResponse.status);
      return NextResponse.redirect(new URL('/login?error=user_info_failed', request.url));
    }

    console.log('✅ User info fetched successfully');
    console.log('User email:', userData.email);
    console.log('User name:', userData.name);
    console.log('User ID:', userData.id);

    // Check if user exists
    console.log('Checking if user exists in database...');
    let { data: user, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', userData.id)
      .single();

    if (userError && (userError as any).code !== 'PGRST116') {
      console.error('Database error:', userError);
      return NextResponse.redirect(new URL('/login?error=database_error', request.url));
    }

    if (user) {
      console.log('✅ Existing user found:', user.email);
    } else {
      console.log('❌ No user found with Google ID, checking by email...');
    }

    if (!user) {
      // Check if user exists with same email
      console.log('Checking for existing user by email...');
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('email', userData.email)
        .single();

      if (existingUser) {
        console.log('✅ Found existing user by email, updating with Google ID...');
        // Update existing user with Google ID
        const { data: updatedUser } = await supabase
          .from('users')
          .update({ 
            google_id: userData.id,
            profile_image: userData.picture,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingUser.id)
          .select()
          .single();

        user = updatedUser;
        console.log('✅ User updated successfully');
      } else {
        console.log('❌ No existing user found, creating new user...');
        // Create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            email: userData.email,
            name: userData.name,
            google_id: userData.id,
            profile_image: userData.picture,
            created_at: new Date().toISOString()
          })
          .select()
          .single();

        if (createError) {
          console.error('User creation error:', createError);
          return NextResponse.redirect(new URL('/login?error=user_creation_failed', request.url));
        }

        user = newUser;
        console.log('✅ New user created successfully');
      }
    }

    // Create response with redirect to marketplace
    console.log('Creating session and redirecting...');
    const response = NextResponse.redirect(new URL('/marketplace', request.url));

    // Set session cookie
    setSessionCookie(user, response);
    console.log('✅ Session cookie set, redirecting to marketplace');

    return response;
  } catch (error) {
    console.error('Google callback error:', error);
    return NextResponse.redirect(new URL('/login?error=callback_error', request.url));
  }
}
