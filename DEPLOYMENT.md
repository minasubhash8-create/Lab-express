# 🚀 Automatic Deployment to GitHub & Vercel (स्वचालित डिप्लॉयमेंट गाइड)

LabExpress is pre-configured with **Vercel zero-config routing (`vercel.json`)** and **GitHub Actions automated CI/CD workflow (`.github/workflows/deploy.yml`)**.

---

## ⚡ Option 1: 1-Click Auto-Deploy via GitHub to Vercel (Recommended)

### Step 1: Push your code to your GitHub Repository
In your terminal, run the following commands:
```bash
# 1. Initialize git (if not already done)
git init

# 2. Add all project files
git add .

# 3. Commit the changes
git commit -m "feat: complete LabExpress diagnostic platform with GST MSME and Vercel deployment"

# 4. Set branch to main
git branch -M main

# 5. Add your GitHub remote repository URL
git remote add origin https://github.com/YOUR_GITHUB_USERNAME/labexpress-rajasthan.git

# 6. Push to GitHub
git push -u origin main
```

### Step 2: Connect to Vercel for Automatic Deployments
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Click **"Import"** next to your GitHub repository `labexpress-rajasthan`.
3. Vercel automatically detects **Vite** settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**.
5. ✨ Done! Any future `git push` to your `main` branch will **automatically build and deploy** to your live production URL within 30 seconds!

---

## 🛠️ Option 2: Direct CLI Deployment via Vercel CLI

If you have Vercel CLI installed on your computer:
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## 📋 Pre-Configured Files in this Repository
- **`vercel.json`**: Configures single-page application (SPA) routing rewrites so deep links (`/`, `/admin`, `/lab`) work seamlessly without 404 errors.
- **`.github/workflows/deploy.yml`**: Automatic GitHub Actions workflow that runs type checking and deploys on every push.
- **`package.json`**: Includes `"build": "vite build"` production output.
