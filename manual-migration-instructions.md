# Manual Database Migration for Google OAuth

Since the automated migration might not work due to Supabase permissions, here's how to manually add the required columns:

## Option 1: Using Supabase Dashboard (Recommended)

1. **Go to your Supabase Dashboard**
   - Visit: https://supabase.com/dashboard
   - Select your project

2. **Open the SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New Query"

3. **Run the following SQL commands one by one:**

```sql
-- Add google_id column for Google OAuth
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;

-- Add profile_image column
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;

-- Add name column
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Create index for google_id for better performance
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- Update existing users to have a name if they have first_name and last_name
UPDATE users 
SET name = CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))
WHERE name IS NULL AND (first_name IS NOT NULL OR last_name IS NOT NULL);
```

4. **Verify the migration**
   - Run this query to check if the columns were added:
```sql
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'users' 
  AND column_name IN ('google_id', 'profile_image', 'name');
```

## Option 2: Using psql (if you have direct database access)

If you have direct access to your PostgreSQL database:

```bash
# Connect to your database
psql "postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Run the migration commands
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);
```

## Option 3: Using the Migration Script

If the RPC method works in your Supabase setup:

```bash
# Run the migration script
node run-migration.js
```

## Verification

After running the migration, you can verify it worked by:

1. **Checking the columns exist:**
```sql
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'users' 
  AND column_name IN ('google_id', 'profile_image', 'name');
```

2. **Testing Google OAuth:**
   - Go to your app: http://localhost:3000/debug/oauth
   - Check the configuration status
   - Test the OAuth flow

## Troubleshooting

If you get permission errors:

1. **Check your Supabase service role key** is set correctly in `.env.local`
2. **Ensure you're using the service role key** (not the anon key) for migrations
3. **Try the manual SQL approach** using the Supabase dashboard

## Next Steps

After the migration is complete:

1. Restart your development server: `npm run dev`
2. Test Google OAuth: http://localhost:3000/login
3. Check the debug page: http://localhost:3000/debug/oauth

The Google OAuth flow should now work correctly!
