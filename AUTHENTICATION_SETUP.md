# Authentication System Setup

This document provides instructions for setting up the complete user authentication system with Google OAuth and email verification.

## Features Implemented

### Backend APIs
- `/api/auth/login` - User login with email/password
- `/api/auth/register` - User registration with email verification
- `/api/auth/google` - Google OAuth authentication
- `/api/auth/me` - Get current user profile
- `/api/auth/logout` - User logout
- `/api/auth/verify-email` - Email verification

### Frontend Pages
- `/login` - User login page with Google OAuth
- `/register` - User registration page with Google OAuth
- `/dashboard` - User dashboard (protected)
- `/verify-email` - Email verification page

### Authentication Flow
1. User registers → Email verification sent → User verifies email → User can login
2. User can login with email/password or Google OAuth
3. After login, user is redirected to dashboard
4. Protected routes are automatically handled by middleware

## Environment Variables Required

Create a `.env.local` file with the following variables:

```env
# Database
DATABASE_URL=your_database_url_here
SUPABASE_URL=your_supabase_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# JWT Secret (generate a strong secret)
JWT_SECRET=your_jwt_secret_here

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id_here

# Email Configuration (for email verification)
SMTP_HOST=your_smtp_host_here
SMTP_PORT=587
SMTP_USER=your_smtp_user_here
SMTP_PASS=your_smtp_password_here

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Database Schema Requirements

The authentication system requires the following fields in the `users` table:

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255),
  role VARCHAR(20) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  phone_verified BOOLEAN DEFAULT false,
  verification_token UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/login`
   - `http://localhost:3000/register`
7. Copy the Client ID and add it to `NEXT_PUBLIC_GOOGLE_CLIENT_ID`

## Email Setup (Optional)

For email verification to work, configure SMTP settings:

1. Use a service like Gmail, SendGrid, or AWS SES
2. Add SMTP credentials to environment variables
3. The system will automatically send verification emails

## Usage

### Registration Flow
1. User visits `/register`
2. Fills out registration form
3. System creates user account with `email_verified: false`
4. Verification email is sent (if SMTP configured)
5. User clicks verification link in email
6. Email is verified and user can login

### Login Flow
1. User visits `/login`
2. Can login with email/password or Google OAuth
3. System validates credentials and creates JWT token
4. User is redirected to `/dashboard`

### Protected Routes
- `/dashboard` - User dashboard
- `/profile` - User profile settings
- `/favorites` - User favorites
- `/messages` - User messages
- `/orders` - User orders

The middleware automatically protects these routes and redirects unauthenticated users to `/login`.

## Components Used

- **AuthContext**: Manages authentication state globally
- **Header**: Shows login/register buttons or user menu based on auth state
- **Middleware**: Protects routes and handles authentication
- **Input Component**: Custom input with proper onChange handling
- **Button Component**: Reusable button with variants

## Security Features

- JWT tokens stored in HTTP-only cookies
- Password hashing with bcrypt
- Email verification required for login
- Protected routes with middleware
- CSRF protection with SameSite cookies
- Input validation with Zod schemas

## Testing

1. Start the development server: `npm run dev`
2. Visit `http://localhost:3000/register`
3. Create a new account
4. Check email for verification link (if SMTP configured)
5. Visit `http://localhost:3000/login`
6. Login with credentials or Google OAuth
7. Access protected routes like `/dashboard`

## Troubleshooting

### Common Issues

1. **Google OAuth not working**: Check `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and redirect URIs
2. **Email verification not working**: Check SMTP configuration
3. **Protected routes redirecting**: Check JWT_SECRET and token validation
4. **Database errors**: Verify Supabase connection and table schema

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` and check browser console and server logs for detailed error messages.

