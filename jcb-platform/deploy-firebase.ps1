#!/usr/bin/env pwsh
# Firebase Deployment Script for JCB Platform
# Handles Node.js/npm detection and Firebase deployment

Write-Host "🚀 JCB Platform - Firebase Deployment Script" -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Function to find Node.js
function Find-NodeJs {
    $possiblePaths = @(
        "$env:ProgramFiles\nodejs\node.exe",
        "${env:ProgramFiles(x86)}\nodejs\node.exe",
        "$env:LOCALAPPDATA\Programs\nodejs\node.exe",
        "$env:APPDATA\npm\node.exe"
    )
    
    foreach ($path in $possiblePaths) {
        if (Test-Path $path) {
            return (Split-Path $path -Parent)
        }
    }
    
    return $null
}

# Check if Node.js is in PATH
$nodeInPath = Get-Command node -ErrorAction SilentlyContinue
$npmInPath = Get-Command npm -ErrorAction SilentlyContinue

if (-not $nodeInPath) {
    Write-Host "⚠️  Node.js not found in PATH" -ForegroundColor Yellow
    Write-Host "Searching for Node.js installation..." -ForegroundColor Gray
    
    $nodePath = Find-NodeJs
    
    if ($nodePath) {
        Write-Host "✅ Found Node.js at: $nodePath" -ForegroundColor Green
        $env:PATH = "$nodePath;$env:PATH"
        Write-Host "Added to current session PATH" -ForegroundColor Gray
    } else {
        Write-Host ""
        Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install Node.js:" -ForegroundColor Yellow
        Write-Host "  1. Download from: https://nodejs.org/" -ForegroundColor White
        Write-Host "  2. Install LTS version (recommended)" -ForegroundColor White
        Write-Host "  3. Restart PowerShell after installation" -ForegroundColor White
        Write-Host "  4. Run this script again" -ForegroundColor White
        Write-Host ""
        
        $openBrowser = Read-Host "Open Node.js download page? (y/n)"
        if ($openBrowser -eq 'y') {
            Start-Process "https://nodejs.org/"
        }
        
        exit 1
    }
}

Write-Host "✅ Node.js detected" -ForegroundColor Green
& node --version

Write-Host "✅ npm detected" -ForegroundColor Green
& npm --version

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Change to project directory
Set-Location -Path $PSScriptRoot
Write-Host "📁 Working directory: $PWD" -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is installed
$firebaseCli = Get-Command firebase -ErrorAction SilentlyContinue

if (-not $firebaseCli) {
    Write-Host "⚠️  Firebase CLI not found" -ForegroundColor Yellow
    Write-Host ""
    $installFirebase = Read-Host "Install Firebase CLI now? (y/n)"
    
    if ($installFirebase -eq 'y') {
        Write-Host ""
        Write-Host "📦 Installing Firebase CLI globally..." -ForegroundColor Cyan
        & npm install -g firebase-tools
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Firebase CLI installed successfully" -ForegroundColor Green
        } else {
            Write-Host "❌ Firebase CLI installation failed" -ForegroundColor Red
            Write-Host "Try running: npm install -g firebase-tools" -ForegroundColor Yellow
            exit 1
        }
    } else {
        Write-Host ""
        Write-Host "❌ Firebase CLI is required for deployment" -ForegroundColor Red
        Write-Host "Install it manually with: npm install -g firebase-tools" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

# Firebase login check
Write-Host "🔐 Checking Firebase authentication..." -ForegroundColor Cyan
& firebase projects:list 2>&1 | Out-Null

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Not logged in to Firebase" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Initiating Firebase login..." -ForegroundColor Cyan
    & firebase login
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Firebase login failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ Firebase authentication verified" -ForegroundColor Green
Write-Host ""

# Show deployment options
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host "📋 Deployment Options:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Build and Deploy (Full deployment)" -ForegroundColor White
Write-Host "2. Deploy Only (use existing build)" -ForegroundColor White
Write-Host "3. Build Only (no deployment)" -ForegroundColor White
Write-Host "4. Deploy Hosting Only" -ForegroundColor White
Write-Host "5. Deploy Firestore Rules Only" -ForegroundColor White
Write-Host "6. Deploy Storage Rules Only" -ForegroundColor White
Write-Host "7. Deploy Everything" -ForegroundColor White
Write-Host ""

$choice = Read-Host "Enter choice (1-7)"

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

switch ($choice) {
    "1" {
        Write-Host "🔨 Building application..." -ForegroundColor Cyan
        & npm run build
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build failed!" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Build successful" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Deploying to Firebase..." -ForegroundColor Cyan
        & firebase deploy
    }
    
    "2" {
        if (-not (Test-Path "dist")) {
            Write-Host "❌ No build found! Run option 1 or 3 first." -ForegroundColor Red
            exit 1
        }
        
        Write-Host "🚀 Deploying to Firebase..." -ForegroundColor Cyan
        & firebase deploy
    }
    
    "3" {
        Write-Host "🔨 Building application..." -ForegroundColor Cyan
        & npm run build
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build failed!" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Build successful" -ForegroundColor Green
        Write-Host "📁 Build output: dist/" -ForegroundColor Gray
    }
    
    "4" {
        Write-Host "🚀 Deploying hosting only..." -ForegroundColor Cyan
        & firebase deploy --only hosting
    }
    
    "5" {
        Write-Host "🚀 Deploying Firestore rules..." -ForegroundColor Cyan
        & firebase deploy --only firestore:rules
    }
    
    "6" {
        Write-Host "🚀 Deploying Storage rules..." -ForegroundColor Cyan
        & firebase deploy --only storage
    }
    
    "7" {
        Write-Host "🔨 Building application..." -ForegroundColor Cyan
        & npm run build
        
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Build failed!" -ForegroundColor Red
            exit 1
        }
        
        Write-Host "✅ Build successful" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Deploying everything to Firebase..." -ForegroundColor Cyan
        & firebase deploy --only hosting,firestore:rules,storage
    }
    
    default {
        Write-Host "❌ Invalid choice" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Gray
Write-Host ""

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Your app is live at:" -ForegroundColor Cyan
    Write-Host "   https://jcb-01.web.app" -ForegroundColor White
    Write-Host "   https://jcb-01.firebaseapp.com" -ForegroundColor White
    Write-Host ""
    Write-Host "📊 View Firebase Console:" -ForegroundColor Cyan
    Write-Host "   https://console.firebase.google.com/project/jcb-01" -ForegroundColor White
    Write-Host ""
    Write-Host "IMPORTANT: Do not forget to enable the required APIs!" -ForegroundColor Yellow
    Write-Host "   See: ENABLE_APIS_CHECKLIST.md" -ForegroundColor Gray
} else {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - Check if you are logged in: firebase login" -ForegroundColor White
    Write-Host "  - Verify project ID in .firebaserc" -ForegroundColor White
    Write-Host "  - Check build errors in console" -ForegroundColor White
    Write-Host "  - Ensure Firebase project exists" -ForegroundColor White
}

Write-Host ""
