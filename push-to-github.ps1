# QuickMart GitHub Push Helper Script
# Run this script after creating your repository on GitHub

Write-Host "🚀 QuickMart GitHub Push Helper" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not initialized!" -ForegroundColor Red
    Write-Host "Run: git init" -ForegroundColor Yellow
    exit 1
}

Write-Host "✅ Git repository found" -ForegroundColor Green
Write-Host ""

# Security check
Write-Host "🔒 Security Check..." -ForegroundColor Yellow
$envIgnored = git check-ignore backend/.env 2>$null
if ($envIgnored -eq "backend/.env") {
    Write-Host "✅ backend/.env is properly ignored" -ForegroundColor Green
} else {
    Write-Host "⚠️  WARNING: backend/.env might not be ignored!" -ForegroundColor Red
    Write-Host "Please verify your .gitignore file" -ForegroundColor Yellow
    $continue = Read-Host "Continue anyway? (yes/no)"
    if ($continue -ne "yes") {
        exit 1
    }
}

if (Test-Path "backend/.env.example") {
    Write-Host "✅ backend/.env.example exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  backend/.env.example not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📝 Please provide your GitHub repository details:" -ForegroundColor Cyan
Write-Host ""

# Get GitHub username
$username = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "❌ Username cannot be empty" -ForegroundColor Red
    exit 1
}

# Get repository name
$repoName = Read-Host "Enter repository name (default: quickmart)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "quickmart"
}

# Construct remote URL
$remoteUrl = "https://github.com/$username/$repoName.git"

Write-Host ""
Write-Host "🔗 Repository URL: $remoteUrl" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "Is this correct? (yes/no)"

if ($confirm -ne "yes") {
    Write-Host "❌ Aborted by user" -ForegroundColor Red
    exit 0
}

# Check if remote already exists
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host ""
    Write-Host "⚠️  Remote 'origin' already exists: $existingRemote" -ForegroundColor Yellow
    $replace = Read-Host "Replace it? (yes/no)"
    if ($replace -eq "yes") {
        git remote remove origin
        Write-Host "✅ Removed old remote" -ForegroundColor Green
    } else {
        Write-Host "❌ Keeping existing remote, not adding new one" -ForegroundColor Yellow
        exit 0
    }
}

# Add remote
Write-Host ""
Write-Host "📡 Adding remote repository..." -ForegroundColor Cyan
git remote add origin $remoteUrl

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Remote added successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Failed to add remote" -ForegroundColor Red
    exit 1
}

# Show remote
Write-Host ""
Write-Host "📋 Current remotes:" -ForegroundColor Cyan
git remote -v

Write-Host ""
Write-Host "🚀 Ready to push!" -ForegroundColor Green
Write-Host ""
Write-Host "Important: Make sure you have created the repository on GitHub first!" -ForegroundColor Yellow
Write-Host "URL: https://github.com/$username/$repoName" -ForegroundColor Yellow
Write-Host ""

$push = Read-Host "Push to GitHub now? (yes/no)"

if ($push -eq "yes") {
    Write-Host ""
    Write-Host "⬆️  Pushing to GitHub..." -ForegroundColor Cyan
    Write-Host ""
    
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "🎉 SUCCESS! Your code is now on GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "View your repository at:" -ForegroundColor Cyan
        Write-Host "https://github.com/$username/$repoName" -ForegroundColor Blue
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Add topics/tags to your repository" -ForegroundColor White
        Write-Host "2. Update README.md with your personal info" -ForegroundColor White
        Write-Host "3. Add screenshots of your application" -ForegroundColor White
        Write-Host "4. Share your repository link!" -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "❌ Push failed!" -ForegroundColor Red
        Write-Host ""
        Write-Host "Common issues:" -ForegroundColor Yellow
        Write-Host "1. Repository doesn't exist on GitHub - Create it first" -ForegroundColor White
        Write-Host "2. Authentication failed - Use Personal Access Token or SSH" -ForegroundColor White
        Write-Host "3. Branch name mismatch - Try 'git push -u origin master' instead" -ForegroundColor White
        Write-Host ""
        Write-Host "See GITHUB_PUSH_GUIDE.md for detailed troubleshooting" -ForegroundColor Cyan
    }
} else {
    Write-Host ""
    Write-Host "✅ Remote configured. You can push later with:" -ForegroundColor Green
    Write-Host "   git push -u origin main" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📚 For detailed instructions, see: GITHUB_PUSH_GUIDE.md" -ForegroundColor Cyan
Write-Host ""
