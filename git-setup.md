# Git Setup Commands

Run these commands in your terminal to set up Git and push to GitHub:

## 1. Initialize Git Repository
```bash
git init
```

## 2. Add All Files
```bash
git add .
```

## 3. Make Initial Commit
```bash
git commit -m "Initial commit: NIST 800-53 Audit Tracker"
```

## 4. Set Main Branch
```bash
git branch -M main
```

## 5. Add Remote Repository
Replace 'yourusername' with your actual GitHub username:
```bash
git remote add origin https://github.com/yourusername/nist-800-53-audit-tracker.git
```

## 6. Push to GitHub
```bash
git push -u origin main
```

## Troubleshooting

### If you get authentication errors:
1. Use a Personal Access Token instead of password
2. Generate token: GitHub Settings → Developer settings → Personal access tokens
3. Use token as password when prompted

### If you get permission errors:
```bash
# Check remote URL
git remote -v

# Update remote URL with your username
git remote set-url origin https://github.com/yourusername/nist-800-53-audit-tracker.git
```

### If you need to update files later:
```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
```