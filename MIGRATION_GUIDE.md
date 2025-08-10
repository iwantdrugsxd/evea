# EVEA Database Migration Guide

## Overview
This guide explains how to migrate your existing Supabase database to use the complete EVEA schema.

## Prerequisites
- Supabase CLI installed and linked to your project
- Access to your Supabase project dashboard
- Backup of your existing data (recommended)

## Migration Methods

### Method 1: Using Supabase Dashboard (Recommended)

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project: `ogelaajpdmwjwivusurz`

2. **Navigate to SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Create a new query

3. **Run Migration Scripts**
   - Copy and paste the contents of `database-schema.sql`
   - Execute the script
   - Monitor for any errors

### Method 2: Using Supabase CLI

1. **Generate Migration File**
   ```bash
   cd evea
   supabase migration new complete_schema
   ```

2. **Copy Schema Content**
   - Copy the contents of `database-schema.sql` into the generated migration file
   - Save the file

3. **Apply Migration**
   ```bash
   supabase db push
   ```

### Method 3: Incremental Migration

If you prefer to migrate step by step:

1. **Create ENUMs First**
   ```sql
   -- Run these one by one
   CREATE TYPE message_type AS ENUM ('text', 'image', 'document', 'system');
   CREATE TYPE notification_type AS ENUM ('order_created', 'order_confirmed', ...);
   CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'admin');
   CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected', 'suspended');
   CREATE TYPE order_status AS ENUM ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled', 'refunded');
   CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'partially_paid', 'failed', 'refunded');
   ```

2. **Create Tables**
   - Run table creation scripts one by one
   - Check for any existing table conflicts

3. **Add Missing Columns**
   - Use ALTER TABLE statements to add missing columns
   - Handle data type conflicts carefully

4. **Create Indexes and Views**
   - Add performance indexes
   - Create business logic views

5. **Set Up Functions and Triggers**
   - Create utility functions
   - Set up automatic triggers

## Important Notes

### Data Preservation
- **Backup First**: Always backup your existing data before migration
- **Test Environment**: Test the migration in a staging environment first
- **Rollback Plan**: Have a plan to rollback if issues occur

### Common Issues

1. **Column Type Conflicts**
   - Existing columns might have different data types
   - Use ALTER TABLE to modify types carefully

2. **Existing Data**
   - Some tables might already exist with data
   - Use CREATE TABLE IF NOT EXISTS or handle conflicts

3. **Foreign Key Constraints**
   - Existing relationships might conflict
   - Review and adjust constraints as needed

### Post-Migration Steps

1. **Verify Schema**
   ```sql
   -- Check all tables exist
   SELECT table_name FROM information_schema.tables 
   WHERE table_schema = 'public' ORDER BY table_name;
   
   -- Check all views exist
   SELECT table_name FROM information_schema.views 
   WHERE table_schema = 'public' ORDER BY table_name;
   ```

2. **Test Functions**
   ```sql
   -- Test order number generation
   SELECT generate_order_number();
   
   -- Test rating calculation
   SELECT calculate_vendor_rating('some-vendor-id');
   ```

3. **Verify Triggers**
   ```sql
   -- Check triggers are working
   SELECT trigger_name, event_manipulation, event_object_table 
   FROM information_schema.triggers 
   WHERE trigger_schema = 'public';
   ```

4. **Test RLS Policies**
   - Verify Row Level Security is working
   - Test with different user roles

## Rollback Plan

If you need to rollback:

1. **Drop New Tables**
   ```sql
   DROP TABLE IF EXISTS vendor_portfolio CASCADE;
   DROP TABLE IF EXISTS vendor_business_hours CASCADE;
   -- Add other new tables as needed
   ```

2. **Drop New Views**
   ```sql
   DROP VIEW IF EXISTS marketplace_cards;
   DROP VIEW IF EXISTS vendor_performance;
   ```

3. **Drop New Functions**
   ```sql
   DROP FUNCTION IF EXISTS calculate_vendor_rating(UUID);
   DROP FUNCTION IF EXISTS generate_order_number();
   ```

4. **Remove New Columns**
   ```sql
   ALTER TABLE vendors DROP COLUMN IF EXISTS business_description;
   ALTER TABLE vendors DROP COLUMN IF EXISTS business_logo_url;
   -- Add other new columns as needed
   ```

## Support

If you encounter issues:

1. **Check Supabase Logs**
   - Go to Dashboard > Logs
   - Look for error messages

2. **Community Support**
   - [Supabase Discord](https://discord.supabase.com)
   - [GitHub Issues](https://github.com/supabase/supabase)

3. **Documentation**
   - [Supabase Docs](https://supabase.com/docs)
   - [PostgreSQL Docs](https://www.postgresql.org/docs/)

## Next Steps

After successful migration:

1. **Update Application Code**
   - Use the generated TypeScript types
   - Update API endpoints if needed

2. **Test Functionality**
   - Test all CRUD operations
   - Verify business logic works

3. **Performance Optimization**
   - Monitor query performance
   - Add additional indexes if needed

4. **Security Review**
   - Review RLS policies
   - Test user permissions

---

*This migration guide should be used in conjunction with the `database-schema.sql` file.* 