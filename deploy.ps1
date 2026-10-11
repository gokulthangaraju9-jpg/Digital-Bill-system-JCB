# Deployment Script for Windows PowerShell
Write-Host "🚀 JCB Platform Deployment Helper" -ForegroundColor Green
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - JCB Platform with Payment System"
}

Write-Host "📦 Choose deployment method:" -ForegroundColor Cyan
Write-Host "1. Vercel (Frontend) + Render (Backend) - Recommended"
Write-Host "2. Railway (All-in-One)"
Write-Host "3. Manual Setup Guide"
Write-Host ""

$choice = Read-Host "Enter choice (1-3)"

switch ($choice) {
    "1" {
        Write-Host ""
        Write-Host "🎯 Deploying to Vercel + Render" -ForegroundColor Green
        Write-Host ""
        Write-Host "Step 1: Deploy Backend to Render" -ForegroundColor Yellow
        Write-Host "  1. Go to https://render.com"
        Write-Host "  2. Sign up with GitHub"
        Write-Host "  3. Click 'New +' → 'Web Service'"
        Write-Host "  4. Root Directory: jcb-platform/server"
        Write-Host "  5. Build Command: npm install"
        Write-Host "  6. Start Command: npm start"
        Write-Host ""
        Write-Host "  Add these environment variables:" -ForegroundColor Cyan
        Write-Host "  MONGODB_URI=your_connection_string"
        Write-Host "  RAZORPAY_KEY_ID=your_key"
        Write-Host "  RAZORPAY_KEY_SECRET=your_secret"
        Write-Host "  PORT=5000"
        Write-Host ""
        
        $backendUrl = Read-Host "After deployment, paste your backend URL here"
        
        Write-Host ""
        Write-Host "Step 2: Deploy Frontend to Vercel" -ForegroundColor Yellow
        Write-Host "  Installing Vercel CLI..." -ForegroundColor Gray
        
        # Check if Vercel CLI is installed
        if (Get-Command vercel -ErrorAction SilentlyContinue) {
            Write-Host "  Vercel CLI already installed ✓" -ForegroundColor Green
        } else {
            npm install -g vercel
        }
        
        Write-Host ""
        Write-Host "  Now deploying to Vercel..." -ForegroundColor Yellow
        Write-Host "  You'll need to add these environment variables in Vercel:" -ForegroundColor Cyan
        Write-Host "  VITE_API_URL=$backendUrl/api"
        Write-Host "  VITE_RAZORPAY_KEY_ID=your_razorpay_key"
        Write-Host "  VITE_FIREBASE_* (your Firebase config)"
        Write-Host ""
        
        Set-Location jcb-platform
        vercel
        Set-Location ..
    }
    
    "2" {
        Write-Host ""
        Write-Host "🚂 Deploying to Railway" -ForegroundColor Green
        Write-Host ""
        Write-Host "Step 1: Install Railway CLI" -ForegroundColor Yellow
        npm install -g @railway/cli
        
        Write-Host ""
        Write-Host "Step 2: Login to Railway" -ForegroundColor Yellow
        railway login
        
        Write-Host ""
        Write-Host "Step 3: Create new project" -ForegroundColor Yellow
        railway init
        
        Write-Host ""
        Write-Host "Step 4: Add environment variables" -ForegroundColor Yellow
        Write-Host "  Go to https://railway.app/dashboard"
        Write-Host "  Add your environment variables for backend and frontend"
        Write-Host ""
        
        Write-Host "Step 5: Deploy" -ForegroundColor Yellow
        railway up
    }
    
    "3" {
        Write-Host ""
        Write-Host "📖 Opening deployment guides..." -ForegroundColor Green
        Write-Host ""
        Write-Host "Please read:" -ForegroundColor Yellow
        Write-Host "  1. DEPLOY_NOW.md - Quick deploy guide"
        Write-Host "  2. DEPLOYMENT_GUIDE.md - Detailed instructions"
        Write-Host ""
        Write-Host "Key steps:" -ForegroundColor Cyan
        Write-Host "  ✓ Get MongoDB connection string from Atlas"
        Write-Host "  ✓ Deploy backend to Render/Railway"
        Write-Host "  ✓ Deploy frontend to Vercel"
        Write-Host "  ✓ Add environment variables"
        Write-Host "  ✓ Test the deployment"
        Write-Host ""
        
        # Open deployment guide
        if (Test-Path "DEPLOY_NOW.md") {
            Start-Process "DEPLOY_NOW.md"
        }
    }
    
    default {
        Write-Host "Invalid choice. Please run the script again." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🎉 Deployment helper complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Get MongoDB connection string from Atlas"
Write-Host "  2. Update environment variables"
Write-Host "  3. Test your deployed application"
Write-Host ""
Write-Host "Need help? Check DEPLOY_NOW.md or DEPLOYMENT_GUIDE.md" -ForegroundColor Cyan
