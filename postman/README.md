# Postman Mock Server Setup Guide

## Setting up the Mock Server

1. **Import Collection & Environment**
   - Open Postman
   - Import `UnsaidTalks-Dashboard-API.postman_collection.json`
   - Import `UnsaidTalks-Dashboard.postman_environment.json`

2. **Create Mock Server**
   - Right-click on the imported collection
   - Select "Mock Collection"
   - Name: "UnsaidTalks Dashboard Mock"
   - Environment: Select the imported environment
   - Click "Create Mock Server"

3. **Get Mock Server URL**
   - After creation, copy the mock server URL (e.g., `https://12345678-1234-1234-1234-123456789abc.mock.pstmn.io`)
   - Update the `base_url` variable in your environment with this URL

4. **Update Project Environment**
   - Update `.env` file with the mock server URL:
   ```
   VITE_API_BASE_URL=https://your-mock-server-id.mock.pstmn.io
   VITE_API_KEY=your-postman-api-key
   ```

## API Endpoints Available

### Dashboard Statistics
- **GET** `/api/dashboard/mentor/stats`
- Returns mentor dashboard statistics

### Sessions
- **GET** `/api/sessions/upcoming` - Get upcoming sessions
- **GET** `/api/sessions/history` - Get session history

### Mentees
- **GET** `/api/mentees/recent` - Get recent mentees list

### Analytics
- **GET** `/api/analytics/weekly` - Get weekly session analytics
- **GET** `/api/analytics/revenue` - Get revenue analytics

### Notifications
- **GET** `/api/notifications` - Get notifications list

### Availability
- **GET** `/api/availability` - Get mentor availability slots

### Templates
- **GET** `/api/templates` - Get session templates

## Testing the Integration

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Check Console**
   - Open browser DevTools
   - Check for successful API calls in Network tab
   - Verify data loading in Console tab

3. **Verify Mock Responses**
   - Navigate to mentor dashboard
   - Check if data loads from mock server
   - Verify loading states work correctly

## Mock Data Structure

The mock server provides realistic data including:
- Dashboard statistics with metrics
- Upcoming sessions with mentee details
- Recent mentees with progress tracking
- Weekly analytics for charts
- Revenue analytics
- Notifications system
- Availability management
- Session templates

## Customizing Mock Data

To modify the mock data:
1. Edit the response examples in the collection
2. Update the mock server with new responses
3. Test the changes in your application

## Environment Variables

Make sure these environment variables are set:
- `VITE_API_BASE_URL` - Mock server URL
- `VITE_API_KEY` - Optional API key for authentication

## Troubleshooting

1. **CORS Issues**: Postman mock servers handle CORS automatically
2. **404 Errors**: Check endpoint URLs match exactly
3. **Network Errors**: Verify mock server is active and URL is correct
4. **No Data**: Check console for API call errors

## Next Steps

1. Set up the mock server in Postman
2. Update environment variables
3. Test API integration
4. Customize mock data as needed
5. Implement additional endpoints if required