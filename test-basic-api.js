/**
 * Basic API connectivity test for Postman Mock Server
 */

const API_BASE_URL = 'https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io';

async function testBasicConnectivity() {
  console.log('🔍 Testing basic connectivity to Postman Mock Server...\n');
  
  try {
    // Test the root endpoint
    console.log('📡 Testing root endpoint...');
    const response = await fetch(API_BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log(`Status: ${response.status} ${response.statusText}`);
    console.log(`Headers:`, Object.fromEntries(response.headers));
    
    if (response.ok) {
      const text = await response.text();
      console.log('Response body:', text);
    }
    
  } catch (error) {
    console.log(`❌ Connection test failed: ${error.message}`);
  }

  console.log('\n🧪 Testing with a simpler endpoint...');
  
  // Test a simpler endpoint structure
  const testEndpoints = [
    '/api/dashboard/mentor/stats',
    '/dashboard/stats',
    '/stats',
    '/api/stats'
  ];

  for (const endpoint of testEndpoints) {
    try {
      console.log(`Testing: ${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      console.log(`  Status: ${response.status}`);
      
      if (response.ok) {
        const data = await response.text();
        console.log(`  ✅ SUCCESS! Data: ${data.substring(0, 100)}...`);
        break;
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
}

testBasicConnectivity();