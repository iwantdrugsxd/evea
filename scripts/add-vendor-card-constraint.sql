-- Add constraint to ensure one vendor can only create one card
-- First, let's check if there are any vendors with multiple cards
SELECT 
    vendor_id,
    COUNT(*) as card_count,
    array_agg(title) as card_titles
FROM vendor_cards 
GROUP BY vendor_id 
HAVING COUNT(*) > 1;

-- If there are vendors with multiple cards, we need to keep only the most recent one
WITH ranked_cards AS (
    SELECT 
        *,
        ROW_NUMBER() OVER (PARTITION BY vendor_id ORDER BY created_at DESC) as rn
    FROM vendor_cards
)
DELETE FROM vendor_cards 
WHERE id IN (
    SELECT id 
    FROM ranked_cards 
    WHERE rn > 1
);

-- Now add the unique constraint
ALTER TABLE vendor_cards 
ADD CONSTRAINT vendor_cards_vendor_id_unique 
UNIQUE (vendor_id);

-- Verify the constraint
SELECT 
    vendor_id,
    COUNT(*) as card_count
FROM vendor_cards 
GROUP BY vendor_id 
HAVING COUNT(*) > 1;
