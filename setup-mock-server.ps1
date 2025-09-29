# PowerShell Script to Setup UnsaidTalks Mock Server
# Run this script if you need to quickly verify your setup

Write-Host "🚀 UnsaidTalks Mock Server Setup Assistant" -ForegroundColor Green
Write-Host "=" * 50

# Check if Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if collection file exists
$collectionFile = "postman\UnsaidTalks-Dashboard-API.postman_collection.json"
if (Test-Path $collectionFile) {
    Write-Host "✅ Collection file found: $collectionFile" -ForegroundColor Green
} else {
    Write-Host "❌ Collection file not found: $collectionFile" -ForegroundColor Red
    Write-Host "   Make sure you're in the project root directory" -ForegroundColor Yellow
    exit 1
}

# Check environment file
$envFile = ".env.local"
if (Test-Path $envFile) {
    Write-Host "✅ Environment file found: $envFile" -ForegroundColor Green
    $envContent = Get-Content $envFile
    Write-Host "📄 Current environment:" -ForegroundColor Blue
    $envContent | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "❌ Environment file not found: $envFile" -ForegroundColor Red
}

Write-Host ""
Write-Host "🧪 Testing Mock Server Connectivity..." -ForegroundColor Blue

# Test mock server
try {
    Write-Host "📡 Running mock server test..." -ForegroundColor Yellow
    node test-mock-server.js
} catch {
    Write-Host "❌ Test failed. Check the output above for details." -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Blue
Write-Host "1. Open Postman Desktop App" -ForegroundColor White
Write-Host "2. Import collection: $collectionFile" -ForegroundColor White
Write-Host "3. Create mock server from collection" -ForegroundColor White  
Write-Host "4. Update .env.local with new mock server URL" -ForegroundColor White
Write-Host "5. Run 'node test-mock-server.js' to verify" -ForegroundColor White

Write-Host ""
Write-Host "📚 Documentation:" -ForegroundColor Blue
Write-Host "• Setup Guide: MOCK_SERVER_SETUP.md" -ForegroundColor White
Write-Host "• Troubleshooting: TROUBLESHOOTING.md" -ForegroundColor White
Write-Host "• Integration Guide: INTEGRATION_GUIDE.md" -ForegroundColor White

Write-Host ""
Write-Host "🎯 Current Mock Server URL:" -ForegroundColor Blue
Write-Host "https://caea2572-638c-4052-b6d5-ffe4e7b2cb4d.mock.pstmn.io" -ForegroundColor Cyan

Write-Host ""
Write-Host "✨ Your dashboard will be available at: http://localhost:8081" -ForegroundColor Green