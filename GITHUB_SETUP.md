# How to Upload Your Project to GitHub

Since Git is not available in the WebContainer environment, you'll need to download your project files and use Git locally or through GitHub's web interface.

## Method 1: Download Files + Local Git (Recommended)

### Step 1: Download Your Project
1. In Bolt, look for a **Download** or **Export** button
2. This should download a ZIP file of your entire project
3. Extract the ZIP file to a folder on your computer

### Step 2: Set Up Local Git
1. Open Terminal (Mac/Linux) or Command Prompt (Windows)
2. Navigate to your project folder:
   ```bash
   cd path/to/your/extracted/project
   ```

3. Initialize Git and push to GitHub:
   ```bash
   # Initialize Git repository
   git init
   
   # Add all files
   git add .
   
   # Make initial commit
   git commit -m "Initial commit: NIST 800-53 Audit Tracker"
   
   # Set main branch
   git branch -M main
   
   # Add remote repository (replace 'yourusername' with your GitHub username)
   git remote add origin https://github.com/yourusername/nist-800-53-audit-tracker.git
   
   # Push to GitHub
   git push -u origin main
   ```

## Method 2: GitHub Web Interface

### Step 1: Create Repository on GitHub
1. Go to [GitHub.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Name it `nist-800-53-audit-tracker`
4. Make it public or private
5. **Don't** initialize with README (since you have files)
6. Click **Create repository**

### Step 2: Upload Files
1. On the new repository page, click **uploading an existing file**
2. Drag and drop your project files or click **choose your files**
3. Upload all files from your project
4. Add commit message: "Initial commit: NIST 800-53 Audit Tracker"
5. Click **Commit changes**

## Method 3: GitHub Desktop (User-Friendly)

### Step 1: Download GitHub Desktop
1. Go to [desktop.github.com](https://desktop.github.com)
2. Download and install GitHub Desktop
3. Sign in with your GitHub account

### Step 2: Create Repository
1. Click **File** → **New repository**
2. Name: `nist-800-53-audit-tracker`
3. Choose the folder where you extracted your project
4. Click **Create repository**

### Step 3: Publish to GitHub
1. Click **Publish repository**
2. Choose public or private
3. Click **Publish repository**

## Method 4: VS Code with Git Extension

If you use VS Code:

### Step 1: Open Project in VS Code
1. Open VS Code
2. File → Open Folder → Select your project folder

### Step 2: Initialize Git
1. Open Terminal in VS Code (Ctrl+`)
2. Run the git commands from Method 1

### Step 3: Use Source Control
1. Click the Source Control icon (Git branch icon)
2. Click **Initialize Repository**
3. Stage all changes (+)
4. Add commit message
5. Click **Commit**
6. Click **Publish to GitHub**

## Troubleshooting

### Authentication Issues
- Use a **Personal Access Token** instead of password
- Generate at: GitHub Settings → Developer settings → Personal access tokens
- Use token as password when prompted

### Permission Errors
```bash
# Check if remote is set correctly
git remote -v

# Update remote URL if needed
git remote set-url origin https://github.com/yourusername/nist-800-53-audit-tracker.git
```

### Large File Issues
If you have large files:
```bash
# Remove large files from git tracking
git rm --cached path/to/large/file

# Add to .gitignore
echo "path/to/large/file" >> .gitignore
```

## Next Steps After Upload

1. **Add a description** to your GitHub repository
2. **Add topics/tags** like: `nist`, `security`, `compliance`, `react`, `typescript`
3. **Enable GitHub Pages** if you want to host it live
4. **Set up branch protection** for the main branch
5. **Add collaborators** if working with a team

## Making Future Updates

After initial setup, to update your repository:

```bash
# Make changes to your files
# Then:
git add .
git commit -m "Description of your changes"
git push
```

## Repository Settings Recommendations

### Branch Protection
- Go to Settings → Branches
- Add rule for `main` branch
- Require pull request reviews
- Require status checks

### Security
- Enable Dependabot alerts
- Enable security advisories
- Set up code scanning if needed

### Pages (Optional)
- Go to Settings → Pages
- Source: Deploy from a branch
- Branch: main / (root)
- Your app will be available at: `https://yourusername.github.io/nist-800-53-audit-tracker`

## Repository Structure

Your repository should include:
- ✅ Source code files
- ✅ README.md (comprehensive documentation)
- ✅ LICENSE (MIT License included)
- ✅ CONTRIBUTING.md (contribution guidelines)
- ✅ CHANGELOG.md (version history)
- ✅ GitHub issue templates
- ✅ Pull request template

All of these files are already included in your project!