/**
 * Simple connectivity test for Postman Mock Server
 */

const API_BASE_URL = 'https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io';

async function pingMockServer() {
    console.log('🏓 Pinging Postman Mock Server...');
    console.log(`🌐 URL: ${API_BASE_URL}`);
    
    try {
        console.log('\n📡 Testing basic connectivity...');
        const response = await fetch(API_BASE_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        console.log(`📊 Status: ${response.status} ${response.statusText}`);
        console.log(`📋 Headers:`, Object.fromEntries(response.headers.entries()));
        
        const text = await response.text();
        console.log(`📄 Response Body:`, text);
        
        if (response.status === 404) {
            console.log('\n💡 Analysis:');
            console.log('✅ Mock server is reachable (not a network issue)');
            console.log('❌ No endpoints are configured (collection issue)');
            console.log('\n🔧 Action Required:');
            console.log('1. Import collection in Postman: postman/UnsaidTalks-Dashboard-API.postman_collection.json');
            console.log('2. Create mock server from the imported collection');
            console.log('3. Ensure all requests have example responses');
        }
        
    } catch (error) {
        console.log(`❌ Connection failed: ${error.message}`);
        console.log('\n💡 Possible causes:');
        console.log('• Mock server URL is incorrect');
        console.log('• Mock server has been deleted');
        console.log('• Network connectivity issues');
        console.log('• Postman service is down');
        
        console.log('\n🔧 Action Required:');
        console.log('1. Verify mock server exists in Postman');
        console.log('2. Create new mock server if needed');
        console.log('3. Update .env.local with correct URL');
    }
}

pingMockServer();