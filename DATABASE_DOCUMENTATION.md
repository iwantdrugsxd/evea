# EVEA Database Documentation

## Overview
This document provides comprehensive documentation for the EVEA database schema, which is hosted on Supabase. The database manages a vendor marketplace platform for event services.

**Project Reference:** `ogelaajpdmwjwivusurz`  
**Generated:** From Supabase CLI using `supabase gen types typescript`

## Database Architecture

### Core Entities
- **Users**: Customers, vendors, and administrators
- **Vendors**: Business entities providing services
- **Categories**: Service classification system
- **Services**: Detailed vendor offerings
- **Orders**: Customer bookings and transactions
- **Reviews**: Customer feedback and ratings

### Key Features
- Multi-role user system (customer, vendor, admin)
- Hierarchical category system
- Comprehensive vendor verification workflow
- Order management with payment tracking
- Real-time messaging system
- Portfolio management for vendors
- Availability scheduling

## Table Structure

### 1. Users Table
**Purpose**: Central user management for all platform participants

**Key Fields**:
- `id`: Unique identifier (UUID)
- `email`: Primary contact method
- `role`: User type (customer/vendor/admin)
- `verification_status`: Account verification state
- `profile_completion_percentage`: Onboarding progress

**Relationships**:
- One-to-one with `vendors` (for vendor users)
- One-to-many with `orders` (as customers)
- One-to-many with `reviews` (as reviewers)

**Usage Examples**:
```sql
-- Get all verified vendors
SELECT u.* FROM users u 
JOIN vendors v ON u.id = v.user_id 
WHERE u.role = 'vendor' AND v.verification_status = 'verified';

-- Get user profile completion
SELECT email, profile_completion_percentage 
FROM users 
WHERE role = 'vendor' 
ORDER BY profile_completion_percentage DESC;
```

### 2. Categories Table
**Purpose**: Hierarchical service classification system

**Key Fields**:
- `id`: Unique identifier
- `name`: Category display name
- `slug`: URL-friendly identifier
- `parent_id`: Self-referencing for hierarchy
- `is_active`: Category availability status

**Relationships**:
- Self-referencing (parent-child categories)
- One-to-many with `vendor_services`
- One-to-many with `vendor_cards`

**Usage Examples**:
```sql
-- Get category hierarchy
WITH RECURSIVE category_tree AS (
  SELECT id, name, parent_id, 0 as level
  FROM categories WHERE parent_id IS NULL
  UNION ALL
  SELECT c.id, c.name, c.parent_id, ct.level + 1
  FROM categories c
  JOIN category_tree ct ON c.parent_id = ct.id
)
SELECT * FROM category_tree ORDER BY level, name;

-- Get all subcategories of a parent
SELECT * FROM categories WHERE parent_id = 'parent-category-id';
```

### 3. Vendors Table
**Purpose**: Business entity information and verification

**Key Fields**:
- `business_name`: Company name
- `verification_status`: Approval state
- `verification_tier`: Trust level (1-5)
- `service_coverage_areas`: Geographic service range
- `portfolio_quality_score`: Content quality rating

**Relationships**:
- Many-to-one with `users`
- One-to-many with `vendor_services`
- One-to-many with `vendor_cards`
- One-to-many with `vendor_availability`

**Usage Examples**:
```sql
-- Get vendors by location and service area
SELECT v.*, c.name as category_name
FROM vendors v
JOIN vendor_services vs ON v.id = vs.vendor_id
JOIN categories c ON vs.category_id = c.id
WHERE v.city = 'Mumbai' 
  AND v.verification_status = 'verified'
  AND v.service_area_radius >= 50;

-- Get vendor performance metrics
SELECT 
  v.business_name,
  v.average_rating,
  v.total_reviews,
  v.portfolio_quality_score,
  COUNT(o.id) as total_orders
FROM vendors v
LEFT JOIN orders o ON v.id = o.vendor_id
WHERE v.verification_status = 'verified'
GROUP BY v.id, v.business_name, v.average_rating, v.total_reviews, v.portfolio_quality_score
ORDER BY v.average_rating DESC;
```

### 4. Vendor Services Table
**Purpose**: Detailed service offerings with pricing tiers

**Key Fields**:
- `basic_package_details`: Entry-level service description
- `standard_package_price`: Mid-tier pricing
- `premium_package_price`: High-end service cost
- `service_specializations`: Unique capabilities
- `ai_pricing_suggestions`: ML-generated pricing recommendations

**Relationships**:
- Many-to-one with `vendors`
- Many-to-one with `categories`

**Usage Examples**:
```sql
-- Get service pricing analysis
SELECT 
  vs.service_type,
  AVG(vs.basic_package_price) as avg_basic_price,
  AVG(vs.standard_package_price) as avg_standard_price,
  AVG(vs.premium_package_price) as avg_premium_price,
  COUNT(*) as service_count
FROM vendor_services vs
GROUP BY vs.service_type
ORDER BY avg_basic_price DESC;

-- Get competitive pricing insights
SELECT 
  v.business_name,
  vs.service_type,
  vs.basic_package_price,
  vs.competitive_analysis
FROM vendor_services vs
JOIN vendors v ON vs.vendor_id = v.id
WHERE vs.competitive_analysis IS NOT NULL;
```

### 5. Vendor Cards Table
**Purpose**: Marketplace display cards for customer browsing

**Key Fields**:
- `title`: Service name
- `base_price`: Starting price
- `images`: Service photos
- `inclusions/exclusions`: What's included/excluded
- `service_area`: Geographic coverage
- `featured`: Promoted status

**Relationships**:
- Many-to-one with `vendors`
- Many-to-one with `categories`
- One-to-many with `order_items`

**Usage Examples**:
```sql
-- Get featured services by category
SELECT 
  vc.*,
  v.business_name,
  c.name as category_name
FROM vendor_cards vc
JOIN vendors v ON vc.vendor_id = v.id
JOIN categories c ON vc.category_id = c.id
WHERE vc.featured = true 
  AND vc.is_active = true
  AND v.verification_status = 'verified'
ORDER BY vc.average_rating DESC;

-- Search services by location and price range
SELECT vc.*, v.city, v.state
FROM vendor_cards vc
JOIN vendors v ON vc.vendor_id = v.id
WHERE vc.base_price BETWEEN 1000 AND 10000
  AND v.city = 'Delhi'
  AND vc.service_area @> ARRAY['Delhi', 'NCR'];
```

### 6. Orders Table
**Purpose**: Customer booking management

**Key Fields**:
- `order_number`: Unique reference (EVEA-YYYYMM-XXXXXX format)
- `event_date`: Service date
- `event_location`: Service location
- `guest_count`: Number of attendees
- `total_amount`: Final price including fees

**Relationships**:
- Many-to-one with `users` (customers)
- Many-to-one with `vendors`
- One-to-many with `order_items`
- One-to-many with `payments`

**Usage Examples**:
```sql
-- Get order analytics by month
SELECT 
  DATE_TRUNC('month', event_date) as month,
  COUNT(*) as total_orders,
  SUM(total_amount) as total_revenue,
  AVG(total_amount) as avg_order_value
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE_TRUNC('month', event_date)
ORDER BY month DESC;

-- Get vendor order performance
SELECT 
  v.business_name,
  COUNT(o.id) as total_orders,
  SUM(o.total_amount) as total_revenue,
  AVG(o.total_amount) as avg_order_value
FROM orders o
JOIN vendors v ON o.vendor_id = v.id
WHERE o.status = 'completed'
GROUP BY v.id, v.business_name
ORDER BY total_revenue DESC;
```

### 7. Reviews Table
**Purpose**: Customer feedback and ratings

**Key Fields**:
- `rating`: 1-5 star rating
- `comment`: Written feedback
- `images`: Photo evidence
- `is_verified`: Authenticity confirmation
- `helpful_count`: Community usefulness rating

**Relationships**:
- Many-to-one with `orders`
- Many-to-one with `users` (customers)
- Many-to-one with `vendors`

**Usage Examples**:
```sql
-- Get vendor rating trends
SELECT 
  v.business_name,
  AVG(r.rating) as avg_rating,
  COUNT(r.id) as review_count,
  COUNT(CASE WHEN r.rating >= 4 THEN 1 END) as positive_reviews
FROM reviews r
JOIN vendors v ON r.vendor_id = v.id
WHERE r.created_at >= NOW() - INTERVAL '6 months'
GROUP BY v.id, v.business_name
HAVING COUNT(r.id) >= 5
ORDER BY avg_rating DESC;

-- Get review sentiment analysis
SELECT 
  rating,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM reviews
GROUP BY rating
ORDER BY rating DESC;
```

## Views

### Marketplace Cards View
**Purpose**: Public-facing service display with vendor and category information

**Key Benefits**:
- Combines data from multiple tables
- Filters for active and verified services only
- Provides comprehensive service information

**Usage**:
```sql
-- Get all active marketplace cards
SELECT * FROM marketplace_cards 
WHERE category_name = 'Wedding Photography'
ORDER BY average_rating DESC, featured DESC;
```

## Functions

### Generate Order Number
**Purpose**: Creates unique order references in format `EVEA-YYYYMM-XXXXXX`

**Implementation**: Automatically increments sequence numbers per month

**Usage**:
```sql
-- Insert new order with auto-generated number
INSERT INTO orders (order_number, customer_id, vendor_id, ...)
VALUES (generate_order_number(), 'customer-id', 'vendor-id', ...);
```

## Indexes and Performance

### Strategic Indexing
- **Primary keys**: All tables use UUID primary keys
- **Foreign keys**: Indexed for join performance
- **Search fields**: Email, phone, business names indexed
- **Date fields**: Created/updated timestamps indexed
- **Status fields**: Verification and order statuses indexed

### Query Optimization
- Composite indexes for common query patterns
- Partial indexes for active records
- Text search indexes for search functionality

## Security Features

### Row Level Security (RLS)
- **Enabled**: On all tables for data isolation
- **Policies**: Custom policies per table and user role
- **Authentication**: Supabase Auth integration

### Data Protection
- **Password hashing**: Secure password storage
- **Verification tokens**: Time-limited access tokens
- **Role-based access**: Different permissions per user type

## Data Types and Constraints

### Enums
- **User roles**: customer, vendor, admin
- **Order status**: pending, confirmed, in_progress, completed, cancelled, refunded
- **Payment status**: pending, paid, partially_paid, failed, refunded
- **Verification status**: pending, verified, rejected, suspended

### Constraints
- **Check constraints**: Rating validation (1-5)
- **Unique constraints**: Email, order numbers, slugs
- **Not null constraints**: Required fields
- **Default values**: Sensible defaults for optional fields

## Migration and Versioning

### Schema Evolution
- **Version tracking**: Via Supabase migrations
- **Backward compatibility**: Maintained during updates
- **Data preservation**: No data loss during schema changes

### Best Practices
- **Incremental changes**: Small, focused migrations
- **Testing**: Validate changes in staging environment
- **Rollback plans**: Prepare for migration failures

## Monitoring and Maintenance

### Performance Monitoring
- **Query performance**: Monitor slow queries
- **Index usage**: Track index effectiveness
- **Storage growth**: Monitor table sizes

### Maintenance Tasks
- **Vacuum**: Regular table cleanup
- **Statistics updates**: Keep query planner informed
- **Backup verification**: Ensure data integrity

## Integration Points

### Frontend Applications
- **Next.js**: Primary frontend framework
- **TypeScript**: Generated types for type safety
- **Real-time**: WebSocket connections for live updates

### External Services
- **Payment gateways**: Stripe, Razorpay, PayPal
- **Email services**: SMTP integration
- **File storage**: Google Drive integration
- **Authentication**: Google OAuth

## Troubleshooting

### Common Issues
1. **Connection errors**: Check Supabase credentials
2. **Permission denied**: Verify RLS policies
3. **Performance issues**: Review query execution plans
4. **Data inconsistencies**: Validate foreign key relationships

### Debug Tools
- **Supabase Dashboard**: Real-time database monitoring
- **Query logs**: Track all database operations
- **Performance insights**: Identify bottlenecks

## Future Enhancements

### Planned Features
- **Advanced search**: Full-text search capabilities
- **Analytics dashboard**: Business intelligence tools
- **Multi-language support**: Internationalization
- **Advanced reporting**: Custom report generation

### Scalability Considerations
- **Partitioning**: Large table optimization
- **Read replicas**: Query performance improvement
- **Caching strategies**: Reduce database load

## Support and Resources

### Documentation
- **Supabase Docs**: [https://supabase.com/docs](https://supabase.com/docs)
- **PostgreSQL Docs**: [https://www.postgresql.org/docs/](https://www.postgresql.org/docs/)

### Community
- **Supabase Discord**: [https://discord.supabase.com](https://discord.supabase.com)
- **GitHub Issues**: [https://github.com/supabase/supabase](https://github.com/supabase/supabase)

---

*This documentation is automatically generated and should be updated when schema changes occur.* 