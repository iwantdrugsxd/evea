import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import bcrypt from 'bcryptjs';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Local Strategy
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      // Find user by email
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (error || !user) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      // Check password
      const isValidPassword = await bcrypt.compare(password, user.password_hash);
      if (!isValidPassword) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

// Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: '/api/auth/google/callback',
    scope: ['profile', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('google_id', profile.id)
        .single();

      if (existingUser) {
        return done(null, existingUser);
      }

      // Check if user exists with same email
      const { data: userWithEmail } = await supabase
        .from('users')
        .select('*')
        .eq('email', profile.emails?.[0]?.value)
        .single();

      if (userWithEmail) {
        // Update existing user with Google ID
        const { data: updatedUser } = await supabase
          .from('users')
          .update({ google_id: profile.id })
          .eq('id', userWithEmail.id)
          .select()
          .single();

        return done(null, updatedUser);
      }

      // Create new user
      const { data: newUser, error } = await supabase
        .from('users')
        .insert({
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          google_id: profile.id,
          profile_image: profile.photos?.[0]?.value,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        return done(error);
      }

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user for session
passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id: string, done) => {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default passport;
