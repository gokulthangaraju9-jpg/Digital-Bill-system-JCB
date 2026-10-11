#!/usr/bin/env pwsh
# Firebase API Key Update Script
# This script updates the Firebase API key in all configuration files

param(
    [Parameter(Mandatory=$true)]
    [string]$NewApiKey
)

Write-Host "=== Firebase API Key Update Script ===" -ForegroundColor Cyan
Write-Host ""

# Validate API key format
if ($NewApiKey -notmatch '^AIza[0-9A-Za-z_-]{35}$') {
    Write-Host "⚠️  Warning: The API key format looks unusual." -ForegroundColor Yellow
    Write-Host "Firebase API keys typically start with 'AIza' and are 39 characters long." -ForegroundColor Yellow
    $confirm = Read-Host "Continue anyway? (y/n)"
    if ($confirm -ne 'y') {
        Write-Host "Operation cancelled." -ForegroundColor Red
        exit 1
    }
}

$files = @(
    ".env.local",
    ".env.production"
)

$oldKey = "AIzaSyB8mS4i9IUjutRUjE50PPEkfmQzCyOvXEw"

Write-Host "Old API Key: $oldKey" -ForegroundColor Red
Write-Host "New API Key: $NewApiKey" -ForegroundColor Green
Write-Host ""

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $filePath) {
        Write-Host "Updating $file..." -ForegroundColor Yellow
        
        # Read file content
        $content = Get-Content $filePath -Raw
        
        # Replace the API key
        $newContent = $content -replace [regex]::Escape($oldKey), $NewApiKey
        
        # Write back to file
        Set-Content -Path $filePath -Value $newContent -NoNewline
        
        Write-Host "✅ Updated $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  File not found: $file" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "=== IMPORTANT: Next Steps ===" -ForegroundColor Cyan
Write-Host "1. Rebuild the application:" -ForegroundColor White
Write-Host "   npm run build" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Redeploy to Firebase:" -ForegroundColor White
Write-Host "   firebase deploy" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Clear browser cache and reload" -ForegroundColor White
Write-Host ""
Write-Host "✅ API key update complete!" -ForegroundColor Green
