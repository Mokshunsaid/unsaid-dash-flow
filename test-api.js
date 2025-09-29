/**
 * Simple test script to verify Postman Mock Server integration
 * Run with: node test-api.js
 */

const API_BASE_URL = 'https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io';

async function testAPI() {
  console.log('🔧 Testing Postman Mock Server Integration...\n');
  
  const endpoints = [
    { name: 'Dashboard Stats', url: '/api/dashboard/mentor/stats' },
    { name: 'Upcoming Sessions', url: '/api/sessions/upcoming' },
    { name: 'Recent Mentees', url: '/api/mentees/recent' },
    { name: 'Revenue Analytics', url: '/api/analytics/revenue' },
    { name: 'Availability', url: '/api/availability' },
    { name: 'Session Templates', url: '/api/templates' }
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`📡 Testing ${endpoint.name}...`);
      
      const response = await fetch(`${API_BASE_URL}${endpoint.url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`✅ ${endpoint.name}: SUCCESS`);
        console.log(`   Status: ${response.status}`);
        console.log(`   Data keys: ${Object.keys(data).join(', ')}`);
      } else {
        console.log(`❌ ${endpoint.name}: FAILED`);
        console.log(`   Status: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.log(`❌ ${endpoint.name}: ERROR`);
      console.log(`   Error: ${error.message}`);
    }
    console.log('');
  }

  console.log('🎯 Test completed! Check the results above.');
  console.log('\n💡 If all tests passed, your integration is working correctly!');
  console.log('🚀 Open http://localhost:8081 to see the dashboard in action.');
}

testAPI();