# Google OAuth Setup Guide

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

## Step 2: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/google/callback` (for development)
   - `https://yourdomain.com/api/auth/google/callback` (for production)
5. Copy the Client ID and Client Secret

## Step 3: Environment Variables

Create a `.env.local` file in your project root with:

```bash
# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# JWT Secret (for session management)
JWT_SECRET=your_jwt_secret_key_here
```

## Step 4: Database Setup

Ensure your Supabase database has the `users` table:

```sql
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  password_hash VARCHAR,
  google_id VARCHAR,
  profile_image VARCHAR,
  phone VARCHAR,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Step 5: Test the Setup

1. Start your development server: `npm run dev`
2. Go to `http://localhost:3000/register`
3. Click "Continue with Google"
4. You should be redirected to Google's OAuth consent screen

## Troubleshooting

### "Access is blocked" Error
- Check that your Google Cloud project has the Google+ API enabled
- Verify that your OAuth 2.0 credentials are correctly configured
- Ensure the redirect URI matches exactly (including http/https)
- Check that your application is not in testing mode with restricted users

### Common Issues
1. **Wrong redirect URI**: Make sure it matches exactly in Google Cloud Console
2. **API not enabled**: Enable Google+ API in your Google Cloud project
3. **Testing mode**: If in testing, add your email to authorized test users
4. **Environment variables**: Ensure `.env.local` is in the project root and variables are correctly named

## Production Deployment

For production, update the redirect URI to your domain:
```bash
GOOGLE_REDIRECT_URI=https://yourdomain.com/api/auth/google/callback
```

And add the production redirect URI to your Google Cloud Console OAuth 2.0 credentials.
