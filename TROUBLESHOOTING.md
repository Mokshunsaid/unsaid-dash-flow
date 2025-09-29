# 🔧 Mock Server Troubleshooting Guide

## 🚨 Problem Identified

Your mock server is returning **404 "No matching requests"** errors. This means:
- Mock server exists but has no configured endpoints
- The collection wasn't properly linked to the mock server
- Example responses are missing from requests

## 🛠️ Step-by-Step Fix

### Step 1: Verify Postman Collection Import

1. **Open Postman Desktop App**
2. **Check Collections Panel (left side)**
3. **Verify you see:** `UnsaidTalks Dashboard API`
4. **If missing:** Re-import `postman/UnsaidTalks-Dashboard-API.postman_collection.json`

### Step 2: Check Collection Structure

1. **Expand "UnsaidTalks Dashboard API" collection**
2. **You should see folders:**
   - Dashboard
   - Sessions  
   - Mentees
   - Analytics
   - Notifications
   - Availability
   - Templates

3. **Click on "Get Dashboard Stats" request**
4. **Check the "Examples" tab**
5. **Verify there's a "Success Response" example**

### Step 3: Create/Update Mock Server

**Option A: Create New Mock Server**
1. **Right-click on "UnsaidTalks Dashboard API" collection**
2. **Select "Mock Collection"**
3. **Configure:**
   ```
   Name: UnsaidTalks Dashboard Mock
   Environment: UnsaidTalks Dashboard Environment
   Make mock server private: ✅
   Save response automatically: ✅
   ```
4. **Click "Create Mock Server"**
5. **Copy the new URL and update .env.local**

**Option B: Fix Existing Mock Server**
1. **Go to Postman → Mock Servers tab**
2. **Find your mock server: `caea2572-638c-4052-b6d5-ffe4e7b2cb4d`**
3. **Click on it**
4. **Check "Linked Collection"**
5. **If not linked, click "Link Collection"**
6. **Select "UnsaidTalks Dashboard API"**

### Step 4: Verify Example Responses

For each request in your collection:

1. **Click on the request**
2. **Go to "Examples" tab**
3. **If no examples exist, click "Add Example"**
4. **Set:**
   - Status Code: `200`
   - Headers: `Content-Type: application/json`
   - Body: Copy from the JSON below

### Step 5: Required Example Responses

**Dashboard Stats (`/api/dashboard/mentor/stats`):**
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

**Upcoming Sessions (`/api/sessions/upcoming`):**
```json
{
  "sessions": [
    {
      "id": "sess_001",
      "menteeId": "user_123",
      "menteeName": "Alex Johnson",
      "menteeAvatar": "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150",
      "topic": "Career Transition to Product Management",
      "date": "2025-09-25",
      "time": "2:00 PM",
      "duration": "60 min",
      "status": "confirmed",
      "notes": "Looking to transition from engineering to PM role.",
      "resumeUploaded": true,
      "meetingLink": "https://meet.google.com/abc-def-ghi",
      "sessionType": "career_guidance",
      "priority": "high",
      "menteeLevel": "intermediate",
      "preparationNeeded": ["Review resume", "Prepare PM transition roadmap"],
      "price": 150
    }
  ]
}
```

**Recent Mentees (`/api/mentees/recent`):**
```json
{
  "mentees": [
    {
      "id": "user_123",
      "name": "Sarah Wilson",
      "avatar": "https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=150",
      "email": "sarah.wilson@email.com",
      "phone": "+1 (555) 123-4567",
      "lastSession": "3 days ago",
      "progress": "excellent",
      "totalSessions": 8,
      "totalSpent": 1200,
      "goals": ["Product Management Career", "Leadership Skills"],
      "nextSession": "2025-09-25",
      "completionRate": 95,
      "rating": 5.0,
      "notes": "Making excellent progress on PM transition."
    }
  ]
}
```

### Step 6: Test in Postman First

1. **Select your environment** (top right dropdown)
2. **Click on "Get Dashboard Stats" request**
3. **Click "Send"**
4. **You should get 200 OK with JSON data**
5. **Repeat for all requests**

### Step 7: Re-test Your Mock Server

After fixing the collection, run:
```bash
node test-mock-server.js
```

## 🎯 Quick Fix Checklist

- [ ] Collection imported in Postman
- [ ] All requests have example responses  
- [ ] Mock server is linked to correct collection
- [ ] Environment variables are set correctly
- [ ] Requests return 200 OK in Postman
- [ ] Mock server test passes

## 🆘 Still Having Issues?

If you're still getting 404s:

1. **Delete existing mock server** in Postman
2. **Re-import collection** from file
3. **Create brand new mock server**
4. **Update .env.local** with new URL
5. **Test each endpoint individually** in Postman

Your mock server should work perfectly after these fixes! 🎉