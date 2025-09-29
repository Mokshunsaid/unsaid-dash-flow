# 🎭 UnsaidTalks Mock Server Setup Guide

## 📋 Step-by-Step Setup Process

### Step 1: Import the Collection in Postman

1. **Open Postman Desktop App**
2. **Import Collection:**
   - Click "Import" button (top left)
   - Select "Upload Files"
   - Choose: `postman/UnsaidTalks-Dashboard-API.postman_collection.json`
   - Click "Import"

3. **Import Environment:**
   - Click "Import" again
   - Choose: `postman/UnsaidTalks-Dashboard.postman_environment.json`
   - Click "Import"

### Step 2: Create Mock Server

1. **Right-click on "UnsaidTalks Dashboard API" collection**
2. **Select "Mock Collection"**
3. **Configure Mock Server:**
   ```
   Mock Server Name: UnsaidTalks Dashboard Mock
   Environment: UnsaidTalks Dashboard Environment
   Make mock server private: ✅ (checked)
   Save responses automatically: ✅ (checked)
   ```
4. **Click "Create Mock Server"**
5. **Copy the Mock Server URL** (should be your existing URL)

### Step 3: Verify Mock Server URL

Your mock server URL should be:
```
https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io
```

If it's different, update your `.env.local` file with the new URL.

### Step 4: Test Individual Endpoints

Test each endpoint in Postman to ensure they return data:

#### 1. Dashboard Stats
```
GET https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io/api/dashboard/mentor/stats
```

**Expected Response:**
```json
{
  "totalMentees": 23,
  "activeSessions": 5,
  "completedSessions": 147,
  "upcomingMeetings": 8,
  "averageRating": 4.9,
  "responseRate": "98%",
  "monthlyEarnings": 4250,
  "weeklyEarnings": 980,
  "totalHours": 284
}
```

#### 2. Upcoming Sessions
```
GET https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io/api/sessions/upcoming
```

#### 3. Recent Mentees
```
GET https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io/api/mentees/recent
```

#### 4. Revenue Analytics
```
GET https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io/api/analytics/revenue
```

### Step 5: Common Issues & Solutions

#### Issue 1: 404 Not Found
**Cause:** Endpoint path mismatch
**Solution:**
1. Check the exact path in your collection
2. Ensure the request URL matches the mock server setup
3. Verify the endpoint has example responses

#### Issue 2: Empty Responses
**Cause:** No example responses configured
**Solution:**
1. Click on each request in the collection
2. Go to "Examples" tab
3. Ensure each has a proper JSON response

#### Issue 3: CORS Errors
**Cause:** Browser security restrictions
**Solution:**
- Postman mock servers automatically handle CORS
- If issues persist, try testing directly in Postman first

## 🛠️ Manual Testing Process

### Test in Postman:
1. Select "UnsaidTalks Dashboard Environment" (top right)
2. Click on each request in the collection
3. Click "Send" button
4. Verify you get proper JSON responses

### Test in Browser:
1. Open the test file: `api-test.html`
2. Click "Test All Endpoints"
3. Check which endpoints are working
4. Fix any that show errors

## 🎯 Expected Behavior

When everything is working correctly:

### In Postman:
- ✅ All requests return 200 OK
- ✅ JSON responses with realistic data
- ✅ No authentication errors

### In Your App:
- ✅ Dashboard loads with real data
- ✅ Loading spinners work properly
- ✅ No console errors
- ✅ All sections populate with data

## 🔧 Debugging Steps

If endpoints aren't working:

1. **Check Mock Server Status:**
   - Go to Postman → Mock Servers
   - Ensure your mock server is "Active"
   - Check request logs

2. **Verify Collection Structure:**
   - Each request should have example responses
   - URLs should use `{{base_url}}` variable
   - Response format should match TypeScript interfaces

3. **Test Response Format:**
   - Ensure JSON is valid
   - Check property names match exactly
   - Verify data types (numbers vs strings)

## 🚀 Next Steps

After setting up the mock server:

1. **Test in Postman** - Verify all endpoints work
2. **Test in Browser** - Use the HTML test tool
3. **Check Your App** - Navigate to http://localhost:8081
4. **Monitor Console** - Look for successful API calls

Your mock server should now provide realistic data for your UnsaidTalks dashboard! 🎉