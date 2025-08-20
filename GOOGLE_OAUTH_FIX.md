# Fix Google OAuth redirect_uri_mismatch Error

## The Problem
You're getting "Error 400: redirect_uri_mismatch" when clicking "Continue with Google". This means the redirect URI in your Google Cloud Console doesn't match what your app is sending.

## Step-by-Step Fix

### 1. Check Your Current Environment Variables
First, verify your `.env.local` file has the correct redirect URI:

```bash
# .env.local
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```

### 2. Update Google Cloud Console

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Select your project**
3. **Navigate to**: APIs & Services > Credentials
4. **Find your OAuth 2.0 Client ID** and click on it
5. **In the "Authorized redirect URIs" section**, add these URLs:

```
http://localhost:3000/api/auth/google/callback
https://yourdomain.com/api/auth/google/callback  (for production)
```

6. **Click "Save"**

### 3. Verify the Redirect URI Format

The redirect URI must be **exactly**:
- `http://localhost:3000/api/auth/google/callback` (for development)
- `https://yourdomain.com/api/auth/google/callback` (for production)

**Common mistakes to avoid:**
- ❌ `http://localhost:3000/auth/google/callback` (missing `/api`)
- ❌ `http://localhost:3000/api/auth/google/callback/` (extra trailing slash)
- ❌ `https://localhost:3000/api/auth/google/callback` (wrong protocol)

### 4. Test the Configuration

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Clear your browser cache** and cookies for localhost

3. **Try the Google sign-in again**

### 5. Debug Steps

If it still doesn't work, add this debug endpoint:

```typescript
// src/app/api/debug/oauth/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    clientId: process.env.GOOGLE_CLIENT_ID ? 'Set' : 'Missing',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Missing',
    redirectUri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback',
    currentUrl: request.url
  });
}
```

Then visit: `http://localhost:3000/api/debug/oauth`

### 6. Common Issues and Solutions

#### Issue: "This app's request is invalid"
**Solution**: Check that your Google Cloud project has the Google+ API enabled:
1. Go to APIs & Services > Library
2. Search for "Google+ API"
3. Enable it if not already enabled

#### Issue: "Access blocked"
**Solution**: Check your OAuth consent screen:
1. Go to APIs & Services > OAuth consent screen
2. Make sure your app is not in "Testing" mode, or if it is, add your email to test users

#### Issue: Still getting redirect_uri_mismatch
**Solution**: Double-check the exact URI format:
1. Copy the exact URI from your `.env.local` file
2. Paste it exactly in Google Cloud Console
3. Make sure there are no extra spaces or characters

### 7. Production Setup

For production, update your environment variables:

```bash
# Production .env
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
```

And add the production redirect URI to Google Cloud Console.

### 8. Final Checklist

- [ ] Google Cloud Console has the correct redirect URI
- [ ] Environment variables are set correctly
- [ ] Google+ API is enabled
- [ ] OAuth consent screen is configured
- [ ] Development server is restarted
- [ ] Browser cache is cleared

### 9. Test the Fix

After making these changes:
1. Restart your development server
2. Go to `http://localhost:3000/login`
3. Click "Continue with Google"
4. You should be redirected to Google's consent screen instead of the error

If you still get errors, check the browser console and server logs for more details.
