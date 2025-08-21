-- Fix problematic triggers on vendor_cards table
-- This script removes triggers that reference non-existent columns

-- First, let's see what triggers exist
SELECT 
    trigger_name,
    event_manipulation,
    action_statement
FROM information_schema.triggers 
WHERE event_object_table = 'vendor_cards';

-- Drop any triggers that might be causing issues
-- (We'll recreate them properly later if needed)

-- Drop trigger if it exists (replace 'problematic_trigger_name' with actual name)
-- DROP TRIGGER IF EXISTS problematic_trigger_name ON vendor_cards;

-- Alternative: Disable all triggers temporarily
ALTER TABLE vendor_cards DISABLE TRIGGER ALL;

-- Re-enable only the triggers we need (if any)
-- ALTER TABLE vendor_cards ENABLE TRIGGER trigger_name;

-- Create a proper trigger for search index updates (if needed)
CREATE OR REPLACE FUNCTION update_service_search_index()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert or update search index
    INSERT INTO service_search_index (
        service_id,
        title,
        category_name,
        primary_image_url,
        min_price,
        max_price,
        tags_csv,
        main_area,
        status,
        vendor_name,
        vendor_city,
        vendor_state,
        average_rating,
        total_reviews
    )
    VALUES (
        NEW.id,
        NEW.title,
        (SELECT name FROM categories WHERE id = NEW.category_id),
        COALESCE(NEW.images[1], ''),
        COALESCE(NEW.starting_price, NEW.base_price),
        NEW.base_price,
        COALESCE(array_to_string(NEW.tags, ','), ''),
        COALESCE(NEW.service_area[1], ''),
        CASE WHEN NEW.is_active THEN 'active' ELSE 'inactive' END,
        (SELECT business_name FROM vendors WHERE id = NEW.vendor_id),
        (SELECT city FROM vendors WHERE id = NEW.vendor_id),
        (SELECT state FROM vendors WHERE id = NEW.vendor_id),
        NEW.average_rating,
        NEW.total_reviews
    )
    ON CONFLICT (service_id) DO UPDATE SET
        title = EXCLUDED.title,
        category_name = EXCLUDED.category_name,
        primary_image_url = EXCLUDED.primary_image_url,
        min_price = EXCLUDED.min_price,
        max_price = EXCLUDED.max_price,
        tags_csv = EXCLUDED.tags_csv,
        main_area = EXCLUDED.main_area,
        status = EXCLUDED.status,
        vendor_name = EXCLUDED.vendor_name,
        vendor_city = EXCLUDED.vendor_city,
        vendor_state = EXCLUDED.vendor_state,
        average_rating = EXCLUDED.average_rating,
        total_reviews = EXCLUDED.total_reviews,
        updated_at = NOW();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for vendor_cards
DROP TRIGGER IF EXISTS trigger_update_service_search_index ON vendor_cards;
CREATE TRIGGER trigger_update_service_search_index
    AFTER INSERT OR UPDATE ON vendor_cards
    FOR EACH ROW
    EXECUTE FUNCTION update_service_search_index();

-- Enable the new trigger
ALTER TABLE vendor_cards ENABLE TRIGGER trigger_update_service_search_index;
