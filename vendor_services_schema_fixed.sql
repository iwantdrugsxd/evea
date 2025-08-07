-- Step 1: Create categories table (if not exists)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  parent_id UUID REFERENCES categories(id),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Add unique constraint to name column (if not exists)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'categories_name_key'
  ) THEN
    ALTER TABLE categories ADD CONSTRAINT categories_name_key UNIQUE (name);
  END IF;
END $$;

-- Step 3: Insert categories with slugs (will skip if already exist)
INSERT INTO categories (name, slug, description, sort_order) VALUES
('Photography', 'photography', 'Professional photography services', 1),
('Videography', 'videography', 'Video recording and editing services', 2),
('Catering', 'catering', 'Food and beverage services', 3),
('Decoration', 'decoration', 'Event decoration and styling', 4),
('Music & Entertainment', 'music-entertainment', 'Live music and entertainment', 5),
('Transportation', 'transportation', 'Vehicle and transportation services', 6),
('Venue', 'venue', 'Event venue and space rental', 7),
('Beauty & Makeup', 'beauty-makeup', 'Beauty and makeup services', 8),
('Wedding Planning', 'wedding-planning', 'Complete wedding planning services', 9),
('Corporate Events', 'corporate-events', 'Corporate event management', 10)
ON CONFLICT (slug) DO NOTHING;

-- Step 4: Create vendor_services table
CREATE TABLE IF NOT EXISTS vendor_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id),
  subcategory VARCHAR(100),
  secondary_services TEXT[] DEFAULT '{}',
  service_type VARCHAR(20) NOT NULL CHECK (service_type IN ('per_hour', 'per_day', 'per_event', 'custom_quote')),
  
  -- Pricing fields
  wedding_price_min DECIMAL(10,2),
  wedding_price_max DECIMAL(10,2),
  corporate_price_min DECIMAL(10,2),
  corporate_price_max DECIMAL(10,2),
  birthday_price_min DECIMAL(10,2),
  birthday_price_max DECIMAL(10,2),
  festival_price_min DECIMAL(10,2),
  festival_price_max DECIMAL(10,2),
  
  -- Package pricing
  basic_package_price DECIMAL(10,2),
  basic_package_details TEXT,
  standard_package_price DECIMAL(10,2),
  standard_package_details TEXT,
  premium_package_price DECIMAL(10,2),
  premium_package_details TEXT,
  
  -- Additional fields
  additional_services TEXT[] DEFAULT '{}',
  advance_payment_percentage INTEGER NOT NULL CHECK (advance_payment_percentage >= 0 AND advance_payment_percentage <= 100),
  cancellation_policy TEXT NOT NULL,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 5: Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_vendor_services_vendor_id ON vendor_services(vendor_id);
CREATE INDEX IF NOT EXISTS idx_vendor_services_category_id ON vendor_services(category_id);
CREATE INDEX IF NOT EXISTS idx_vendor_services_service_type ON vendor_services(service_type);

-- Step 6: Add RLS policies for vendor_services
ALTER TABLE vendor_services ENABLE ROW LEVEL SECURITY;

-- Policy for vendors to manage their own services
DROP POLICY IF EXISTS "Vendors can manage their own services" ON vendor_services;
CREATE POLICY "Vendors can manage their own services" ON vendor_services
  FOR ALL USING (
    vendor_id IN (
      SELECT id FROM vendors WHERE user_id = auth.uid()
    )
  );

-- Policy for admins to view all services
DROP POLICY IF EXISTS "Admins can view all services" ON vendor_services;
CREATE POLICY "Admins can view all services" ON vendor_services
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Step 7: Verify the tables were created
SELECT table_name, column_name, data_type 
FROM information_schema.columns 
WHERE table_name IN ('categories', 'vendor_services')
ORDER BY table_name, ordinal_position;
