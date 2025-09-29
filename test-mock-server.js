/**
 * Comprehensive Mock Server Test Script
 * Tests all endpoints and provides detailed feedback
 */

const API_BASE_URL = 'https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io';

// Test endpoints with expected response structure
const endpoints = [
  {
    name: 'Dashboard Stats',
    url: '/api/dashboard/mentor/stats',
    expectedKeys: ['totalMentees', 'activeSessions', 'completedSessions', 'averageRating', 'monthlyEarnings'],
    description: 'Basic mentor dashboard statistics'
  },
  {
    name: 'Upcoming Sessions',
    url: '/api/sessions/upcoming',
    expectedKeys: ['sessions'],
    nestedKeys: ['id', 'menteeName', 'topic', 'date', 'time'],
    description: 'List of scheduled sessions'
  },
  {
    name: 'Recent Mentees',
    url: '/api/mentees/recent',
    expectedKeys: ['mentees'],
    nestedKeys: ['id', 'name', 'email', 'progress', 'totalSessions'],
    description: 'Recently active mentees'
  },
  {
    name: 'Revenue Analytics',
    url: '/api/analytics/revenue',
    expectedKeys: ['thisMonth', 'lastMonth', 'thisWeek', 'yearToDate'],
    description: 'Financial analytics data'
  },
  {
    name: 'Weekly Analytics',
    url: '/api/analytics/weekly',
    expectedKeys: ['weeklyStats'],
    nestedKeys: ['day', 'sessions', 'revenue'],
    description: 'Weekly performance metrics'
  },
  {
    name: 'Availability',
    url: '/api/availability',
    expectedKeys: ['availabilitySlots'],
    nestedKeys: ['day', 'slots'],
    description: 'Mentor availability schedule'
  },
  {
    name: 'Session Templates',
    url: '/api/templates',
    expectedKeys: ['templates'],
    nestedKeys: ['id', 'name', 'duration', 'price'],
    description: 'Reusable session templates'
  },
  {
    name: 'Notifications',
    url: '/api/notifications',
    expectedKeys: ['notifications'],
    nestedKeys: ['id', 'type', 'title', 'message'],
    description: 'User notifications'
  }
];

async function testEndpoint(endpoint) {
  console.log(`\n🧪 Testing: ${endpoint.name}`);
  console.log(`📍 URL: ${API_BASE_URL}${endpoint.url}`);
  console.log(`📝 Description: ${endpoint.description}`);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint.url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    console.log(`📊 Status: ${response.status} ${response.statusText}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`✅ SUCCESS: Data received`);
      
      // Validate response structure
      let validationPassed = true;
      const missingKeys = [];
      
      endpoint.expectedKeys.forEach(key => {
        if (!(key in data)) {
          missingKeys.push(key);
          validationPassed = false;
        }
      });

      if (validationPassed) {
        console.log(`✅ STRUCTURE: All expected keys present`);
        console.log(`📋 Keys found: ${Object.keys(data).join(', ')}`);
        
        // Check nested structure if applicable
        if (endpoint.nestedKeys && data[endpoint.expectedKeys[0]]) {
          const firstItem = Array.isArray(data[endpoint.expectedKeys[0]]) 
            ? data[endpoint.expectedKeys[0]][0] 
            : data[endpoint.expectedKeys[0]];
            
          if (firstItem) {
            const nestedMissing = endpoint.nestedKeys.filter(key => !(key in firstItem));
            if (nestedMissing.length === 0) {
              console.log(`✅ NESTED: All nested keys present`);
            } else {
              console.log(`⚠️  NESTED: Missing keys: ${nestedMissing.join(', ')}`);
            }
          }
        }
        
        // Show sample data
        console.log(`📄 Sample data:`, JSON.stringify(data, null, 2).substring(0, 200) + '...');
        
      } else {
        console.log(`❌ STRUCTURE: Missing keys: ${missingKeys.join(', ')}`);
        console.log(`📋 Available keys: ${Object.keys(data).join(', ')}`);
      }
      
      return { success: true, data, status: response.status };
      
    } else {
      console.log(`❌ FAILED: HTTP ${response.status}`);
      const errorText = await response.text();
      console.log(`📄 Error details: ${errorText}`);
      return { success: false, status: response.status, error: errorText };
    }

  } catch (error) {
    console.log(`❌ ERROR: ${error.message}`);
    console.log(`🔍 Possible causes:`);
    console.log(`   • Network connectivity issues`);
    console.log(`   • Mock server not active`);
    console.log(`   • CORS policy restrictions`);
    console.log(`   • Incorrect URL or endpoint`);
    return { success: false, error: error.message };
  }
}

async function runFullTest() {
  console.log('🚀 Starting UnsaidTalks Mock Server Test Suite');
  console.log('=' .repeat(60));
  console.log(`🌐 Base URL: ${API_BASE_URL}`);
  console.log(`📅 Test Date: ${new Date().toISOString()}`);
  console.log('=' .repeat(60));

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint);
    results.push({ endpoint: endpoint.name, ...result });
    
    if (result.success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // Small delay between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Summary
  console.log('\n' + '=' .repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('=' .repeat(60));
  console.log(`✅ Successful: ${successCount}/${endpoints.length}`);
  console.log(`❌ Failed: ${failCount}/${endpoints.length}`);
  console.log(`📈 Success Rate: ${Math.round((successCount / endpoints.length) * 100)}%`);

  // Detailed results
  console.log('\n📋 DETAILED RESULTS:');
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.endpoint}: ${result.success ? 'WORKING' : 'FAILED'}`);
  });

  // Recommendations
  console.log('\n💡 RECOMMENDATIONS:');
  if (successCount === endpoints.length) {
    console.log('🎉 All endpoints are working perfectly!');
    console.log('🚀 Your mock server is ready for development.');
    console.log('🌐 Open http://localhost:8081 to see your dashboard.');
  } else {
    console.log('🔧 Some endpoints need attention:');
    results.filter(r => !r.success).forEach(result => {
      console.log(`   • Fix ${result.endpoint} endpoint in Postman`);
    });
    console.log('📖 Check MOCK_SERVER_SETUP.md for troubleshooting steps.');
  }

  console.log('\n🎯 Next Steps:');
  console.log('1. Fix any failing endpoints in Postman');
  console.log('2. Ensure each request has proper example responses');
  console.log('3. Test your dashboard at http://localhost:8081');
  console.log('4. Check browser console for any remaining issues');

  return results;
}

// Auto-run the test
runFullTest().catch(console.error);