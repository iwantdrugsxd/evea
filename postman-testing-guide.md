# 🧪 Postman Testing Guide - Event Planning System

## 📋 Overview
This guide provides comprehensive testing for the Evea event planning system, including form interactions, API endpoints, and the recommendation engine.

## 🚀 Base URL
```
http://localhost:3003
```

## 📁 Postman Collection Structure

### 1. **Event Planning Flow Testing**
### 2. **Vendor Recommendation Engine**
### 3. **Vendor Profile APIs**
### 4. **Form Validation Testing**
### 5. **Data Flow Testing**

---

## 🔧 Setup Instructions

### 1. **Environment Variables**
Create a new environment in Postman with these variables:
```
BASE_URL: http://localhost:3003
EVENT_ID: (will be generated)
VENDOR_ID: (will be generated)
USER_ID: (will be generated)
```

### 2. **Headers**
Set these default headers for all requests:
```
Content-Type: application/json
Accept: application/json
```

---

## 📝 API Endpoints Testing

### **1. Vendor Recommendations API**

#### **GET /api/vendors**
**Description**: Get vendor recommendations based on event criteria

**Query Parameters**:
- `eventType`: Type of event (wedding, corporate, birthday, etc.)
- `eventDate`: Event date (YYYY-MM-DD)
- `guestCount`: Number of guests
- `budget`: Budget amount
- `location`: Event location
- `services`: Array of service category IDs
- `rating`: Minimum rating filter
- `priceRange`: Price range (min-max)

**Test Cases**:

**1.1 Wedding Event with High Budget**
```
GET {{BASE_URL}}/api/vendors?eventType=Wedding&eventDate=2024-12-25&guestCount=200&budget=500000&location=Mumbai&rating=4.5&priceRange=50000-200000
```

**Expected Response**:
```json
{
  "vendors": [
    {
      "id": "uuid",
      "title": "Wedding Photography by Elite Events",
      "description": "Professional wedding photography services...",
      "base_price": 75000,
      "starting_price": 60000,
      "average_rating": 4.8,
      "total_reviews": 125,
      "vendor": {
        "id": "uuid",
        "business_name": "Elite Events & Catering",
        "verification_status": "verified",
        "average_rating": 4.8
      },
      "category": {
        "name": "Photography & Videography",
        "slug": "photography-videography"
      },
      "recommendation_score": 95.5,
      "recommendation_reasons": [
        "Perfect match for wedding events",
        "High rating and positive reviews",
        "Within your budget range"
      ]
    }
  ],
  "total": 15,
  "filters": {
    "eventType": "Wedding",
    "budget": 500000,
    "location": "Mumbai"
  }
}
```

**1.2 Corporate Event with Specific Services**
```
GET {{BASE_URL}}/api/vendors?eventType=Corporate Event&eventDate=2024-11-15&guestCount=50&budget=200000&services=venue-location,catering-food&rating=4.0&priceRange=20000-100000
```

**1.3 Birthday Party with Low Budget**
```
GET {{BASE_URL}}/api/vendors?eventType=Birthday Party&eventDate=2024-10-20&guestCount=30&budget=50000&location=Delhi&rating=3.5&priceRange=5000-30000
```

**1.4 No Filters (All Vendors)**
```
GET {{BASE_URL}}/api/vendors
```

### **2. Vendor Profile API**

#### **GET /api/vendors/{id}**
**Description**: Get detailed vendor profile information

**Test Cases**:

**2.1 Get Vendor Profile**
```
GET {{BASE_URL}}/api/vendors/{{VENDOR_ID}}
```

**Expected Response**:
```json
{
  "id": "uuid",
  "business_name": "Elite Events & Catering",
  "business_description": "Leading event planning and catering service...",
  "verification_status": "verified",
  "average_rating": 4.8,
  "total_reviews": 125,
  "total_orders": 450,
  "completed_orders": 425,
  "total_revenue": 25000000,
  "completion_rate": 94.4,
  "years_in_business": 8,
  "team_size": 25,
  "certifications": ["ISO 9001:2015", "Food Safety Certification"],
  "business_hours": {
    "monday": "9:00 AM - 6:00 PM",
    "tuesday": "9:00 AM - 6:00 PM"
  },
  "languages_spoken": ["English", "Hindi", "Marathi"],
  "payment_methods": ["Cash", "Card", "UPI"],
  "vendor_cards": [
    {
      "id": "uuid",
      "title": "Wedding Catering Services",
      "description": "Professional wedding catering...",
      "base_price": 75000,
      "starting_price": 60000,
      "category": {
        "name": "Catering & Food",
        "slug": "catering-food"
      }
    }
  ],
  "reviews": [
    {
      "id": "uuid",
      "rating": 5,
      "title": "Excellent Service!",
      "comment": "Amazing quality and professional team...",
      "created_at": "2024-01-15T10:30:00Z",
      "customer": {
        "name": "John Doe",
        "avatar": "https://..."
      }
    }
  ],
  "recent_events": [
    {
      "id": "uuid",
      "eventDate": "2024-01-20",
      "eventLocation": "Mumbai, Maharashtra",
      "guestCount": 150,
      "status": "completed",
      "totalAmount": 85000
    }
  ],
  "portfolio_images": [
    {
      "url": "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
      "alt": "Wedding Catering Setup"
    }
  ]
}
```

**2.2 Get Non-existent Vendor**
```
GET {{BASE_URL}}/api/vendors/non-existent-id
```

**Expected Response**:
```json
{
  "error": "Vendor not found"
}
```

---

## 🎯 Form Testing Scenarios

### **3. Event Planning Form Flow**

#### **3.1 Step 1: Event Type Selection**
**Frontend Form Data**:
```json
{
  "eventType": "Wedding",
  "estimatedGuests": 200,
  "estimatedBudget": 500000
}
```

#### **3.2 Step 2: Event Details Form**
**Frontend Form Data**:
```json
{
  "eventDate": "2024-12-25",
  "eventTime": "18:00",
  "eventLocation": "Mumbai, Maharashtra",
  "guestCount": 200,
  "budget": 500000,
  "specialRequirements": "Vegetarian catering, accessibility needs"
}
```

#### **3.3 Step 3: Service Selection**
**Frontend Form Data**:
```json
{
  "selectedServices": [
    {
      "categoryId": "venue-location",
      "subcategoryId": "wedding-venues",
      "required": true
    },
    {
      "categoryId": "catering-food",
      "subcategoryId": "wedding-catering",
      "required": true
    },
    {
      "categoryId": "photography-videography",
      "subcategoryId": "wedding-photography",
      "required": true
    },
    {
      "categoryId": "decoration-styling",
      "subcategoryId": "wedding-decoration",
      "required": false
    }
  ]
}
```

#### **3.4 Step 4: Vendor Selection**
**API Call for Recommendations**:
```
GET {{BASE_URL}}/api/vendors?eventType=Wedding&eventDate=2024-12-25&guestCount=200&budget=500000&location=Mumbai&services=venue-location,catering-food,photography-videography&rating=4.5&priceRange=50000-200000
```

**Selected Vendors**:
```json
{
  "selectedVendors": [
    {
      "vendorCardId": "uuid-1",
      "vendorId": "uuid-1",
      "service": "Wedding Venue",
      "price": 120000
    },
    {
      "vendorCardId": "uuid-2",
      "vendorId": "uuid-2",
      "service": "Wedding Catering",
      "price": 85000
    },
    {
      "vendorCardId": "uuid-3",
      "vendorId": "uuid-3",
      "service": "Wedding Photography",
      "price": 75000
    }
  ]
}
```

#### **3.5 Step 5: Package Review**
**Package Summary**:
```json
{
  "eventDetails": {
    "eventType": "Wedding",
    "eventDate": "2024-12-25",
    "eventTime": "18:00",
    "eventLocation": "Mumbai, Maharashtra",
    "guestCount": 200,
    "budget": 500000
  },
  "selectedServices": [
    {
      "category": "Venue & Location",
      "subcategory": "Wedding Venues",
      "vendor": "Elite Events & Catering",
      "price": 120000
    }
  ],
  "pricing": {
    "subtotal": 280000,
    "platformFee": 28000,
    "tax": 50400,
    "total": 358400
  }
}
```

#### **3.6 Step 6: Booking Confirmation**
**Booking Data**:
```json
{
  "paymentMethod": "card",
  "cardDetails": {
    "number": "4111111111111111",
    "expiry": "12/25",
    "cvv": "123"
  },
  "billingAddress": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91-9876543210",
    "address": "123 Main Street, Mumbai"
  }
}
```

---

## 🔍 Recommendation Engine Testing

### **4.1 Smart Filtering Tests**

#### **Test 4.1.1: Budget-Based Filtering**
```
GET {{BASE_URL}}/api/vendors?budget=100000&priceRange=10000-80000
```
**Expected**: Only vendors within 80% of budget

#### **Test 4.1.2: Rating-Based Filtering**
```
GET {{BASE_URL}}/api/vendors?rating=4.5
```
**Expected**: Only vendors with 4.5+ rating

#### **Test 4.1.3: Location-Based Filtering**
```
GET {{BASE_URL}}/api/vendors?location=Mumbai
```
**Expected**: Only vendors serving Mumbai

#### **Test 4.1.4: Capacity-Based Filtering**
```
GET {{BASE_URL}}/api/vendors?guestCount=500
```
**Expected**: Only vendors with 500+ capacity

### **4.2 Recommendation Scoring Tests**

#### **Test 4.2.1: High-Score Vendor**
- Event Type: Wedding
- Budget: 500000
- Rating: 4.8+
- Location: Mumbai
- **Expected Score**: 90-100

#### **Test 4.2.2: Medium-Score Vendor**
- Event Type: Corporate
- Budget: 200000
- Rating: 4.0-4.5
- Location: Delhi
- **Expected Score**: 70-89

#### **Test 4.2.3: Low-Score Vendor**
- Event Type: Birthday
- Budget: 50000
- Rating: 3.0-3.5
- Location: Any
- **Expected Score**: 50-69

### **4.3 Edge Cases**

#### **Test 4.3.1: No Matching Vendors**
```
GET {{BASE_URL}}/api/vendors?eventType=Wedding&budget=10000&location=Remote Village
```
**Expected**: Empty array with appropriate message

#### **Test 4.3.2: Invalid Parameters**
```
GET {{BASE_URL}}/api/vendors?budget=invalid&rating=invalid
```
**Expected**: Error handling for invalid parameters

#### **Test 4.3.3: Very High Budget**
```
GET {{BASE_URL}}/api/vendors?budget=10000000
```
**Expected**: Premium vendors only

---

## 📊 Data Validation Testing

### **5.1 Form Validation Tests**

#### **Test 5.1.1: Required Fields**
- Empty event type
- Empty event date
- Zero guest count
- Zero budget
- **Expected**: Form validation errors

#### **Test 5.1.2: Date Validation**
- Past dates
- Invalid date format
- **Expected**: Date validation errors

#### **Test 5.1.3: Number Validation**
- Negative guest count
- Negative budget
- **Expected**: Number validation errors

#### **Test 5.1.4: Service Selection**
- No services selected
- Duplicate services
- **Expected**: Service validation errors

### **5.2 API Response Validation**

#### **Test 5.2.1: Response Structure**
- Check all required fields present
- Validate data types
- **Expected**: Proper JSON structure

#### **Test 5.2.2: Pagination**
- Large result sets
- Page limits
- **Expected**: Proper pagination

#### **Test 5.2.3: Error Handling**
- Invalid vendor IDs
- Database errors
- **Expected**: Proper error responses

---

## 🚀 Performance Testing

### **6.1 Load Testing**

#### **Test 6.1.1: Concurrent Requests**
- 10 concurrent vendor recommendation requests
- 50 concurrent vendor profile requests
- **Expected**: Response time < 2 seconds

#### **Test 6.1.2: Large Data Sets**
- Request with many filters
- Large vendor lists
- **Expected**: Response time < 3 seconds

### **6.2 Memory Testing**

#### **Test 6.2.1: Large Response Handling**
- Vendors with many reviews
- Large portfolio images
- **Expected**: No memory leaks

---

## 📋 Test Checklist

### **✅ API Endpoints**
- [ ] GET /api/vendors (with all filter combinations)
- [ ] GET /api/vendors/{id} (valid and invalid IDs)
- [ ] Error handling for all endpoints
- [ ] Response structure validation

### **✅ Form Interactions**
- [ ] Event type selection
- [ ] Event details form validation
- [ ] Service selection
- [ ] Vendor selection with drag & drop
- [ ] Package review
- [ ] Booking confirmation

### **✅ Recommendation Engine**
- [ ] Budget-based filtering
- [ ] Rating-based filtering
- [ ] Location-based filtering
- [ ] Service-based filtering
- [ ] Recommendation scoring
- [ ] Edge cases

### **✅ Data Validation**
- [ ] Required field validation
- [ ] Date validation
- [ ] Number validation
- [ ] Service selection validation
- [ ] API response validation

### **✅ Performance**
- [ ] Response time testing
- [ ] Concurrent request handling
- [ ] Large data set handling
- [ ] Memory usage testing

---

## 🎯 Sample Test Data

### **Event Types for Testing**
```json
[
  "Wedding",
  "Corporate Event", 
  "Birthday Party",
  "Anniversary",
  "Baby Shower",
  "Engagement",
  "Graduation Party",
  "Product Launch",
  "Conference",
  "Seminar"
]
```

### **Service Categories for Testing**
```json
[
  "venue-location",
  "catering-food", 
  "photography-videography",
  "decoration-styling",
  "entertainment",
  "transportation",
  "beauty-wellness",
  "technology-services"
]
```

### **Test Locations**
```json
[
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Chennai, Tamil Nadu"
]
```

---

## 🔧 Postman Collection Import

Create a new collection in Postman and import these requests:

1. **Vendor Recommendations**
2. **Vendor Profile Details**
3. **Form Validation Tests**
4. **Recommendation Engine Tests**
5. **Performance Tests**

### **Environment Setup**
```json
{
  "BASE_URL": "http://localhost:3003",
  "EVENT_ID": "",
  "VENDOR_ID": "",
  "USER_ID": ""
}
```

### **Pre-request Scripts**
```javascript
// Set dynamic values
pm.environment.set("EVENT_ID", pm.variables.replaceIn("{{$guid}}"));
pm.environment.set("VENDOR_ID", pm.variables.replaceIn("{{$guid}}"));
```

### **Test Scripts**
```javascript
// Validate response structure
pm.test("Response has correct structure", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('vendors');
    pm.expect(response.vendors).to.be.an('array');
});

// Validate response time
pm.test("Response time is less than 2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});
```

---

## 🎉 Success Criteria

### **Functional Requirements**
- ✅ All API endpoints return correct data
- ✅ Form validation works properly
- ✅ Recommendation engine provides relevant results
- ✅ Vendor profiles display complete information
- ✅ Booking flow works end-to-end

### **Performance Requirements**
- ✅ API response time < 2 seconds
- ✅ Concurrent requests handled properly
- ✅ Large data sets processed efficiently
- ✅ No memory leaks detected

### **Quality Requirements**
- ✅ Proper error handling
- ✅ Input validation
- ✅ Response validation
- ✅ Edge case handling

---

## 📞 Support

If you encounter any issues during testing:
1. Check the browser console for errors
2. Verify the development server is running
3. Check the database connection
4. Review the API logs

**Happy Testing! 🧪✨**
