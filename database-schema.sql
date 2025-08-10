-- =============================================================================
-- EVEA DATABASE SCHEMA
-- Generated from Supabase project: ogelaajpdmwjwivusurz
-- =============================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- ENUMS
-- =============================================================================

-- Message types
CREATE TYPE message_type AS ENUM ('text', 'image', 'document', 'system');

-- Notification types
CREATE TYPE notification_type AS ENUM (
    'order_created',
    'order_confirmed', 
    'payment_received',
    'review_received',
    'message_received',
    'verification_status_changed',
    'account_suspended',
    'new_follower',
    'price_change',
    'availability_update'
);

-- User roles
CREATE TYPE user_role AS ENUM ('customer', 'vendor', 'admin');

-- Verification status
CREATE TYPE verification_status AS ENUM ('pending', 'verified', 'rejected', 'suspended');

-- Order status
CREATE TYPE order_status AS ENUM (
    'pending',
    'confirmed',
    'in_progress',
    'completed',
    'cancelled',
    'refunded'
);

-- Payment status
CREATE TYPE payment_status AS ENUM (
    'pending',
    'paid',
    'partially_paid',
    'failed',
    'refunded'
);

-- =============================================================================
-- TABLES
-- =============================================================================

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255),
    role user_role DEFAULT 'customer',
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    profile_picture_url TEXT,
    date_of_birth DATE,
    gender VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    is_email_verified BOOLEAN DEFAULT FALSE,
    is_phone_verified BOOLEAN DEFAULT FALSE,
    verification_status verification_status DEFAULT 'pending',
    profile_completion_percentage INTEGER DEFAULT 0,
    last_login_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_id UUID REFERENCES categories(id),
    icon_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendors table
CREATE TABLE vendors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    business_name VARCHAR(255) NOT NULL,
    business_description TEXT,
    business_logo_url TEXT,
    business_type VARCHAR(100),
    industry VARCHAR(100),
    founded_year INTEGER,
    employee_count INTEGER,
    annual_revenue DECIMAL(15,2),
    website_url TEXT,
    social_media_links JSONB,
    contact_person_name VARCHAR(255),
    contact_person_designation VARCHAR(100),
    contact_person_phone VARCHAR(20),
    contact_person_email VARCHAR(255),
    business_address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(20),
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    service_area_radius INTEGER,
    service_coverage_areas TEXT[],
    verification_status verification_status DEFAULT 'pending',
    verification_tier INTEGER DEFAULT 1,
    verification_documents JSONB,
    verification_notes TEXT,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    total_revenue DECIMAL(15,2) DEFAULT 0,
    portfolio_quality_score DECIMAL(3,2) DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor services table
CREATE TABLE vendor_services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    service_type VARCHAR(255) NOT NULL,
    service_name VARCHAR(255) NOT NULL,
    service_description TEXT,
    basic_package_details TEXT,
    basic_package_price DECIMAL(10,2),
    standard_package_details TEXT,
    standard_package_price DECIMAL(10,2),
    premium_package_details TEXT,
    premium_package_price DECIMAL(10,2),
    service_specializations TEXT[],
    service_areas TEXT[],
    equipment_available TEXT[],
    team_size INTEGER,
    experience_years INTEGER,
    certifications TEXT[],
    awards TEXT[],
    portfolio_images TEXT[],
    portfolio_videos TEXT[],
    ai_pricing_suggestions JSONB,
    competitive_analysis TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor cards table
CREATE TABLE vendor_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    base_price DECIMAL(10,2) NOT NULL,
    price_range_min DECIMAL(10,2),
    price_range_max DECIMAL(10,2),
    images TEXT[],
    videos TEXT[],
    inclusions TEXT[],
    exclusions TEXT[],
    service_area TEXT[],
    availability_days TEXT[],
    availability_hours JSONB,
    response_time_hours INTEGER,
    cancellation_policy TEXT,
    featured BOOLEAN DEFAULT FALSE,
    average_rating DECIMAL(3,2) DEFAULT 0,
    total_reviews INTEGER DEFAULT 0,
    total_orders INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor availability table
CREATE TABLE vendor_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    is_available BOOLEAN DEFAULT TRUE,
    max_bookings INTEGER,
    current_bookings INTEGER DEFAULT 0,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor portfolio table
CREATE TABLE vendor_portfolio (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID REFERENCES categories(id),
    images TEXT[],
    videos TEXT[],
    project_date DATE,
    client_name VARCHAR(255),
    project_value DECIMAL(10,2),
    is_featured BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    vendor_card_id UUID REFERENCES vendor_cards(id),
    event_date DATE NOT NULL,
    event_start_time TIME,
    event_end_time TIME,
    event_location TEXT NOT NULL,
    event_type VARCHAR(100),
    guest_count INTEGER,
    service_requirements TEXT,
    special_requests TEXT,
    base_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    platform_fee DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    status order_status DEFAULT 'pending',
    payment_status payment_status DEFAULT 'pending',
    cancellation_reason TEXT,
    refund_amount DECIMAL(10,2),
    refund_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    vendor_card_id UUID REFERENCES vendor_cards(id),
    item_name VARCHAR(255) NOT NULL,
    item_description TEXT,
    quantity INTEGER DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(100),
    payment_gateway VARCHAR(100),
    transaction_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'INR',
    status payment_status DEFAULT 'pending',
    gateway_response JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    images TEXT[],
    is_verified BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL,
    sender_id UUID REFERENCES users(id),
    receiver_id UUID REFERENCES users(id),
    message_type message_type DEFAULT 'text',
    content TEXT,
    attachments JSONB,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Conversations table
CREATE TABLE conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES users(id),
    vendor_id UUID REFERENCES vendors(id),
    order_id UUID REFERENCES orders(id),
    last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    notification_type notification_type,
    related_entity_type VARCHAR(100),
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP WITH TIME ZONE,
    action_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor verification documents table
CREATE TABLE vendor_verification_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    document_type VARCHAR(100) NOT NULL,
    document_url TEXT NOT NULL,
    document_number VARCHAR(255),
    expiry_date DATE,
    verification_status verification_status DEFAULT 'pending',
    verification_notes TEXT,
    verified_by UUID REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Vendor business hours table
CREATE TABLE vendor_business_hours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    vendor_id UUID REFERENCES vendors(id) ON DELETE CASCADE,
    day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
    open_time TIME,
    close_time TIME,
    is_working_day BOOLEAN DEFAULT TRUE,
    break_start_time TIME,
    break_end_time TIME,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Users table indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_verification_status ON users(verification_status);
CREATE INDEX idx_users_city ON users(city);
CREATE INDEX idx_users_state ON users(state);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Categories table indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- Vendors table indexes
CREATE INDEX idx_vendors_user_id ON vendors(user_id);
CREATE INDEX idx_vendors_business_name ON vendors(business_name);
CREATE INDEX idx_vendors_verification_status ON vendors(verification_status);
CREATE INDEX idx_vendors_city ON vendors(city);
CREATE INDEX idx_vendors_state ON vendors(state);
CREATE INDEX idx_vendors_average_rating ON vendors(average_rating);
CREATE INDEX idx_vendors_is_featured ON vendors(is_featured);
CREATE INDEX idx_vendors_is_active ON vendors(is_active);

-- Vendor services table indexes
CREATE INDEX idx_vendor_services_vendor_id ON vendor_services(vendor_id);
CREATE INDEX idx_vendor_services_category_id ON vendor_services(category_id);
CREATE INDEX idx_vendor_services_service_type ON vendor_services(service_type);
CREATE INDEX idx_vendor_services_is_active ON vendor_services(is_active);

-- Vendor cards table indexes
CREATE INDEX idx_vendor_cards_vendor_id ON vendor_cards(vendor_id);
CREATE INDEX idx_vendor_cards_category_id ON vendor_cards(category_id);
CREATE INDEX idx_vendor_cards_base_price ON vendor_cards(base_price);
CREATE INDEX idx_vendor_cards_featured ON vendor_cards(featured);
CREATE INDEX idx_vendor_cards_average_rating ON vendor_cards(average_rating);
CREATE INDEX idx_vendor_cards_is_active ON vendor_cards(is_active);

-- Orders table indexes
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_vendor_id ON orders(vendor_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);
CREATE INDEX idx_orders_event_date ON orders(event_date);
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- Reviews table indexes
CREATE INDEX idx_reviews_vendor_id ON reviews(vendor_id);
CREATE INDEX idx_reviews_customer_id ON reviews(customer_id);
CREATE INDEX idx_reviews_order_id ON reviews(order_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);
CREATE INDEX idx_reviews_created_at ON reviews(created_at);

-- Messages table indexes
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_receiver_id ON messages(receiver_id);
CREATE INDEX idx_messages_is_read ON messages(is_read);
CREATE INDEX idx_messages_created_at ON messages(created_at);

-- Notifications table indexes
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at);

-- =============================================================================
-- VIEWS
-- =============================================================================

-- Marketplace cards view
CREATE VIEW marketplace_cards AS
SELECT 
    vc.id,
    vc.title,
    vc.description,
    vc.base_price,
    vc.price_range_min,
    vc.price_range_max,
    vc.images,
    vc.videos,
    vc.inclusions,
    vc.exclusions,
    vc.service_area,
    vc.availability_days,
    vc.availability_hours,
    vc.response_time_hours,
    vc.cancellation_policy,
    vc.featured,
    vc.average_rating,
    vc.total_reviews,
    vc.total_orders,
    vc.is_active,
    vc.created_at,
    vc.updated_at,
    v.id as vendor_id,
    v.business_name,
    v.business_logo_url,
    v.city,
    v.state,
    v.country,
    v.verification_status,
    v.verification_tier,
    v.portfolio_quality_score,
    c.id as category_id,
    c.name as category_name,
    c.slug as category_slug,
    c.parent_id as category_parent_id
FROM vendor_cards vc
JOIN vendors v ON vc.vendor_id = v.id
JOIN categories c ON vc.category_id = c.id
WHERE vc.is_active = true 
  AND v.is_active = true 
  AND v.verification_status = 'verified'
  AND c.is_active = true;

-- Vendor performance view
CREATE VIEW vendor_performance AS
SELECT 
    v.id,
    v.business_name,
    v.business_type,
    v.city,
    v.state,
    v.verification_status,
    v.verification_tier,
    v.average_rating,
    v.total_reviews,
    v.total_orders,
    v.total_revenue,
    v.portfolio_quality_score,
    COUNT(vs.id) as total_services,
    COUNT(vc.id) as total_cards,
    AVG(vc.average_rating) as avg_card_rating,
    COUNT(DISTINCT o.id) as completed_orders,
    SUM(CASE WHEN o.status = 'completed' THEN o.total_amount ELSE 0 END) as completed_revenue
FROM vendors v
LEFT JOIN vendor_services vs ON v.id = vs.vendor_id AND vs.is_active = true
LEFT JOIN vendor_cards vc ON v.id = vc.vendor_id AND vc.is_active = true
LEFT JOIN orders o ON v.id = o.vendor_id AND o.status = 'completed'
WHERE v.is_active = true
GROUP BY v.id, v.business_name, v.business_type, v.city, v.state, 
         v.verification_status, v.verification_tier, v.average_rating, 
         v.total_reviews, v.total_orders, v.total_revenue, v.portfolio_quality_score;

-- =============================================================================
-- FUNCTIONS
-- =============================================================================

-- Generate order number function
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS VARCHAR AS $$
DECLARE
    current_month VARCHAR(6);
    sequence_number INTEGER;
    order_number VARCHAR(50);
BEGIN
    -- Get current month in YYYYMM format
    current_month := TO_CHAR(CURRENT_DATE, 'YYYYMM');
    
    -- Get next sequence number for this month
    SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 12) AS INTEGER)), 0) + 1
    INTO sequence_number
    FROM orders
    WHERE order_number LIKE 'EVEA-' || current_month || '-%';
    
    -- Format: EVEA-YYYYMM-XXXXXX
    order_number := 'EVEA-' || current_month || '-' || LPAD(sequence_number::TEXT, 6, '0');
    
    RETURN order_number;
END;
$$ LANGUAGE plpgsql;

-- Update updated_at timestamp function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Calculate vendor rating function
CREATE OR REPLACE FUNCTION calculate_vendor_rating(vendor_uuid UUID)
RETURNS DECIMAL AS $$
DECLARE
    avg_rating DECIMAL(3,2);
    total_reviews_count INTEGER;
BEGIN
    SELECT 
        COALESCE(AVG(rating), 0),
        COUNT(*)
    INTO avg_rating, total_reviews_count
    FROM reviews
    WHERE vendor_id = vendor_uuid AND is_active = true;
    
    -- Update vendor table
    UPDATE vendors 
    SET 
        average_rating = avg_rating,
        total_reviews = total_reviews_count
    WHERE id = vendor_uuid;
    
    RETURN avg_rating;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Update updated_at timestamp triggers
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendors_updated_at BEFORE UPDATE ON vendors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_services_updated_at BEFORE UPDATE ON vendor_services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_cards_updated_at BEFORE UPDATE ON vendor_cards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_availability_updated_at BEFORE UPDATE ON vendor_availability
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_portfolio_updated_at BEFORE UPDATE ON vendor_portfolio
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON conversations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_verification_documents_updated_at BEFORE UPDATE ON vendor_verification_documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vendor_business_hours_updated_at BEFORE UPDATE ON vendor_business_hours
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auto-generate order number trigger
CREATE TRIGGER generate_order_number_trigger BEFORE INSERT ON orders
    FOR EACH ROW EXECUTE FUNCTION generate_order_number();

-- Update vendor rating trigger
CREATE TRIGGER update_vendor_rating_trigger AFTER INSERT OR UPDATE OR DELETE ON reviews
    FOR EACH ROW EXECUTE FUNCTION calculate_vendor_rating(NEW.vendor_id);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_verification_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_business_hours ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- SAMPLE DATA (Optional)
-- =============================================================================

-- Insert sample categories
INSERT INTO categories (name, slug, description, is_active) VALUES
('Wedding Services', 'wedding-services', 'Complete wedding planning and services', true),
('Photography', 'photography', 'Professional photography services', true),
('Videography', 'videography', 'Video recording and editing services', true),
('Catering', 'catering', 'Food and beverage services', true),
('Decoration', 'decoration', 'Event decoration and styling', true),
('Music & Entertainment', 'music-entertainment', 'Live music and entertainment services', true),
('Transportation', 'transportation', 'Vehicle and transportation services', true),
('Venues', 'venues', 'Event venues and locations', true);

-- Insert subcategories
INSERT INTO categories (name, slug, description, parent_id, is_active) VALUES
('Wedding Photography', 'wedding-photography', 'Specialized wedding photography', 
 (SELECT id FROM categories WHERE slug = 'photography'), true),
('Wedding Videography', 'wedding-videography', 'Wedding video services', 
 (SELECT id FROM categories WHERE slug = 'videography'), true),
('Wedding Catering', 'wedding-catering', 'Wedding food services', 
 (SELECT id FROM categories WHERE slug = 'catering'), true);

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE users IS 'Central user management for all platform participants';
COMMENT ON TABLE categories IS 'Hierarchical service classification system';
COMMENT ON TABLE vendors IS 'Business entity information and verification';
COMMENT ON TABLE vendor_services IS 'Detailed service offerings with pricing tiers';
COMMENT ON TABLE vendor_cards IS 'Marketplace display cards for customer browsing';
COMMENT ON TABLE vendor_availability IS 'Vendor scheduling and availability management';
COMMENT ON TABLE vendor_portfolio IS 'Vendor work samples and project showcase';
COMMENT ON TABLE orders IS 'Customer booking management';
COMMENT ON TABLE order_items IS 'Individual items within orders';
COMMENT ON TABLE payments IS 'Payment transaction records';
COMMENT ON TABLE reviews IS 'Customer feedback and ratings';
COMMENT ON TABLE messages IS 'User communication system';
COMMENT ON TABLE conversations IS 'Message conversation threads';
COMMENT ON TABLE notifications IS 'User notification system';
COMMENT ON TABLE vendor_verification_documents IS 'Vendor identity and business verification';
COMMENT ON TABLE vendor_business_hours IS 'Vendor operating hours and availability';

COMMENT ON FUNCTION generate_order_number() IS 'Generates unique order numbers in format EVEA-YYYYMM-XXXXXX';
COMMENT ON FUNCTION update_updated_at_column() IS 'Automatically updates the updated_at timestamp column';
COMMENT ON FUNCTION calculate_vendor_rating(vendor_uuid UUID) IS 'Calculates and updates vendor rating based on reviews';

-- =============================================================================
-- END OF SCHEMA
-- ============================================================================= 