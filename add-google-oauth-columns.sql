-- Add Google OAuth support columns to users table
-- Run this migration to add the missing columns for Google OAuth functionality

-- Add google_id column for Google OAuth
ALTER TABLE users ADD COLUMN IF NOT EXISTS google_id VARCHAR(255) UNIQUE;

-- Add profile_image column (if not already exists)
ALTER TABLE users ADD COLUMN IF NOT EXISTS profile_image TEXT;

-- Add name column (if not already exists) - combining first_name and last_name
ALTER TABLE users ADD COLUMN IF NOT EXISTS name VARCHAR(255);

-- Create index for google_id for better performance
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

-- Update existing users to have a name if they have first_name and last_name
UPDATE users 
SET name = CONCAT(COALESCE(first_name, ''), ' ', COALESCE(last_name, ''))
WHERE name IS NULL AND (first_name IS NOT NULL OR last_name IS NOT NULL);

-- Add comment to document the new columns
COMMENT ON COLUMN users.google_id IS 'Google OAuth user ID for authentication';
COMMENT ON COLUMN users.profile_image IS 'User profile image URL';
COMMENT ON COLUMN users.name IS 'Full name of the user (for Google OAuth compatibility)';
