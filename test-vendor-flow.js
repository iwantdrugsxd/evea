require('dotenv').config({ path: '.env.local' });

const axios = require('axios');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:3000/api';

// Helper function to create a mock base64 file
function createMockBase64File(fileName, mimeType) {
  // Create a simple text file content for testing
  const content = `This is a mock ${fileName} file for testing purposes.`;
  return Buffer.from(content).toString('base64');
}

async function testVendorFlow() {
  console.log('🚀 Testing Complete Vendor Onboarding Flow\n');

  // Generate unique email for this test run
  const timestamp = Date.now();
  const testEmail = `john.doe.${timestamp}@example.com`;

  try {
    // Step 1: Vendor Registration
    console.log('📝 Step 1: Vendor Registration');
    const registrationData = {
      fullName: "John Doe",
      email: testEmail,
      phone: "9876543210",
      password: "password123",
      businessName: "John's Event Services"
    };

    const registrationResponse = await axios.post(`${BASE_URL}/vendor/register`, registrationData);
    console.log('✅ Registration successful:', registrationResponse.data);
    const { vendorId, userId } = registrationResponse.data;

    // Step 2: Business Details
    console.log('\n📋 Step 2: Business Details');
    const businessData = {
      vendorId: vendorId,
      address: "123 Main Street, Downtown",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400001",
      latitude: 19.076,
      longitude: 72.8777,
      categoryId: "efe443a9-bca0-4fba-8d52-3c9ec7f3fdab", // Catering
      serviceType: "per_event",
      description: "Professional catering services for all types of events",
      weddingPriceMin: 10000,
      weddingPriceMax: 50000,
      corporatePriceMin: 5000,
      corporatePriceMax: 25000,
      birthdayPriceMin: 3000,
      birthdayPriceMax: 15000,
      festivalPriceMin: 8000,
      festivalPriceMax: 35000,
      basicPackagePrice: 5000,
      basicPackageDetails: "Essential catering for small events",
      standardPackagePrice: 15000,
      standardPackageDetails: "Complete catering with premium menu",
      premiumPackagePrice: 30000,
      premiumPackageDetails: "Premium catering with custom menu and staff",
      additionalServices: ["Setup", "Cleanup", "Staff", "Custom Menu"],
      advancePaymentPercentage: 50,
      cancellationPolicy: "Cancellation allowed up to 48 hours before event with full refund"
    };

    const businessResponse = await axios.post(`${BASE_URL}/vendor/services-location`, businessData);
    console.log('✅ Business details saved:', businessResponse.data);

    // Step 3: Document Upload
    console.log('\n📄 Step 3: Document Upload');
    const documentData = {
      vendorId: vendorId,
      documents: [
        {
          type: "business_license",
          fileName: "business_license.pdf",
          fileData: createMockBase64File("business_license.pdf", "application/pdf"),
          mimeType: "application/pdf"
        },
        {
          type: "tax_certificate",
          fileName: "tax_certificate.pdf",
          fileData: createMockBase64File("tax_certificate.pdf", "application/pdf"),
          mimeType: "application/pdf"
        },
        {
          type: "aadhar_card",
          fileName: "aadhar_card.jpg",
          fileData: createMockBase64File("aadhar_card.jpg", "image/jpeg"),
          mimeType: "image/jpeg"
        }
      ]
    };

    const documentResponse = await axios.post(`${BASE_URL}/upload/documents`, documentData);
    console.log('✅ Documents uploaded:', documentResponse.data);

    // Step 4: Check Vendor Status
    console.log('\n📊 Step 4: Check Vendor Status');
    const statusResponse = await axios.get(`${BASE_URL}/vendor/${vendorId}/status`);
    console.log('✅ Vendor status:', statusResponse.data);

    // Step 5: Admin Approval (Simulated)
    console.log('\n👨‍💼 Step 5: Admin Approval');
    const approvalData = {
      vendorId: vendorId,
      adminId: "00000000-0000-0000-0000-000000000000"
    };

    const approvalResponse = await axios.post(`${BASE_URL}/admin/vendors/approve`, approvalData);
    console.log('✅ Vendor approved:', approvalResponse.data);

    // Step 6: Vendor Login
    console.log('\n🔐 Step 6: Vendor Login');
    const loginData = {
      email: testEmail,
      password: approvalResponse.data.tempPassword
    };

    const loginResponse = await axios.post(`${BASE_URL}/auth/vendor-login`, loginData);
    console.log('✅ Vendor login successful:', loginResponse.data);

    console.log('\n🎉 Complete Vendor Onboarding Flow Test Successful!');
    console.log('\n📋 Summary:');
    console.log('- Registration: ✅');
    console.log('- Business Details: ✅');
    console.log('- Document Upload: ✅');
    console.log('- Admin Approval: ✅');
    console.log('- Vendor Login: ✅');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
    console.error('Step that failed:', error.config?.url);
  }
}

// Run the test
testVendorFlow();
