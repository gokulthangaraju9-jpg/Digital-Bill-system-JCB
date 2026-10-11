# Firebase Deployment Script - Simple Version
param(
    [switch]$BuildOnly,
    [switch]$DeployOnly
)

Write-Host "Firebase Deployment for JCB Platform" -ForegroundColor Cyan
Write-Host ""

# Check Node.js
$node = Get-Command node -ErrorAction SilentlyContinue
if (-not $node) {
    Write-Host "ERROR: Node.js not found!" -ForegroundColor Red
    Write-Host "Download from: https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

Write-Host "Node version:" (& node --version) -ForegroundColor Green
Write-Host "npm version:" (& npm --version) -ForegroundColor Green
Write-Host ""

# Check Firebase CLI
$firebase = Get-Command firebase -ErrorAction SilentlyCognue
if (-not $firebase) {
    Write-Host "Installing Firebase CLI..." -ForegroundColor Yellow
    & npm install -g firebase-tools
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Failed to install Firebase CLI" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Firebase CLI ready" -ForegroundColor Green
Write-Host ""

# Navigate to project
Set-Location -Path $PSScriptRoot

# Build
if (-not $DeployOnly) {
    Write-Host "Building application..." -ForegroundColor Cyan
    & npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Build failed" -ForegroundColor Red
        exit 1
    }
    
    Write-Host "Build successful!" -ForegroundColor Green
    Write-Host ""
}

# Deploy
if (-not $BuildOnly) {
    Write-Host "Deploying to Firebase..." -ForegroundColor Cyan
    & firebase deploy
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Deployment successful!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Your app is live at:" -ForegroundColor Cyan
        Write-Host "https://jcb-01.web.app" -ForegroundColor White
        Write-Host "https://jcb-01.firebaseapp.com" -ForegroundColor White
    } else {
        Write-Host "ERROR: Deployment failed" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Done!" -ForegroundColor Green
