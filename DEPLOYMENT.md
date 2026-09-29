# 🚀 Automatic Deployment to GitHub & Vercel (minasubhash8@gmail.com)

LabExpress is pre-configured with **Vercel zero-config routing (`vercel.json`)**, **Git repository configured for `minasubhash8@gmail.com`**, and **GitHub Actions automated CI/CD workflow (`.github/workflows/deploy.yml`)**.

---

## 👤 Configured Git Identity
- **Git Author Email**: `minasubhash8@gmail.com`
- **Git Author Name**: `Subhash Meena`
- **Primary Branch**: `main`
- **Initial Commit**: Committed & ready (`feat: complete LabExpress Rajasthan diagnostic network with GST MSME & Vercel deployment`)

---

## ⚡ Step 1: Push code to your GitHub Repository

Run these exact commands in your terminal:
```bash
# 1. Add your remote repository on GitHub (already configured)
git remote add origin https://github.com/minasubhash8-create/Lab-express.git

# 2. Push code to GitHub
git push -u origin main
```

*(Tip: If GitHub asks for password, use your GitHub Personal Access Token: Settings ➔ Developer Settings ➔ Personal Access Tokens).*

Or using your Personal Access Token directly:
```bash
git push https://<YOUR_GITHUB_TOKEN>@github.com/minasubhash8-create/Lab-express.git main
```

---

## 🌐 Step 2: Connect your Vercel Account & Deploy

1. Open **[https://vercel.com/login](https://vercel.com/login)**.
2. Select **"Continue with GitHub"** using your account associated with `minasubhash8@gmail.com` (`minasubhash8-create`).
3. 1-Click Auto-Deploy: **[https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fminasubhash8-create%2FLab-express](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fminasubhash8-create%2FLab-express)**
4. Or go to **[https://vercel.com/new](https://vercel.com/new)** and import **`Lab-express`**.
5. Vercel automatically detects the framework settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Click **Deploy**.
7. ✨ Within 30 seconds, your application will be live at:
   `https://lab-express.vercel.app`!
8. **Automatic Continuous Deployment**: Any future changes pushed to GitHub will automatically trigger Vercel to rebuild and update your live site!

---

## 🛠️ Automated Shell Script Option
You can also run the pre-created push script:
```bash
./push-to-github.sh
```
