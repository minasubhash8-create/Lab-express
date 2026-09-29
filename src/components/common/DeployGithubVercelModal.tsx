import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Copy,
  Check,
  GitBranch,
  Rocket,
  CheckCircle2,
  Terminal,
  FileCode,
  ShieldCheck,
  Globe,
  Download,
  AlertCircle
} from 'lucide-react';

interface DeployGithubVercelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGithubVercelModal: React.FC<DeployGithubVercelModalProps> = ({
  isOpen,
  onClose
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [repoName, setRepoName] = useState('labexpress-rajasthan');
  const [githubUsername, setGithubUsername] = useState('YOUR_GITHUB_USERNAME');

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const gitCommands = `# 1. Initialize Git repository
git init

# 2. Stage all project files including vercel.json & GitHub Actions workflow
git add .

# 3. Commit the changes
git commit -m "feat: complete LabExpress Rajasthan diagnostic network with GST MSME & Vercel deployment"

# 4. Set main branch
git branch -M main

# 5. Connect your GitHub remote repository
git remote add origin https://github.com/${githubUsername}/${repoName}.git

# 6. Push code to GitHub (Auto-triggers Vercel & CI/CD deployment)
git push -u origin main`;

  const vercelDeployUrl = `https://vercel.com/new/clone?repository-url=https://github.com/${githubUsername}/${repoName}&project-name=${repoName}&framework=vite`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white p-5 sm:p-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-400">
              <Rocket className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  GitHub & Vercel Auto-Deployment Hub
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-wider">
                  Ready to Deploy
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Automated continuous deployment workflow: Push to GitHub & live on Vercel
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5 text-xs">
          
          {/* Pre-configured Status Checklist */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <span className="font-extrabold text-slate-700 uppercase tracking-wider text-[11px] block">
              ✅ Pre-Configured Deployment Assets in This Applet:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <FileCode className="w-4 h-4 text-teal-600 shrink-0" />
                <div>
                  <span className="font-mono font-bold text-slate-900 block">vercel.json</span>
                  <span className="text-[10px] text-slate-500">SPA Rewrites & Caching</span>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <span className="font-mono font-bold text-slate-900 block">deploy.yml</span>
                  <span className="text-[10px] text-slate-500">GitHub Actions CI/CD</span>
                </div>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="font-mono font-bold text-slate-900 block">npm run build</span>
                  <span className="text-[10px] text-slate-500">Zero Error Verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inputs for Personalization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-teal-50/70 p-3.5 rounded-2xl border border-teal-200">
            <div>
              <label className="block text-[11px] font-bold text-teal-950 mb-1">Your GitHub Username:</label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value.trim() || 'YOUR_GITHUB_USERNAME')}
                placeholder="e.g. subhash-meena"
                className="w-full p-2 bg-white border border-teal-300 rounded-xl font-mono text-xs outline-teal-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-teal-950 mb-1">Target Repository Name:</label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value.trim() || 'labexpress-rajasthan')}
                placeholder="labexpress-rajasthan"
                className="w-full p-2 bg-white border border-teal-300 rounded-xl font-mono text-xs outline-teal-600"
              />
            </div>
          </div>

          {/* Terminal Commands Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-700" />
                <span>Step 1: Push Code to Your GitHub Repository</span>
              </span>
              <button
                onClick={() => handleCopy(gitCommands, 'git')}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors"
              >
                {copiedKey === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'git' ? 'Copied Commands!' : 'Copy All Commands'}</span>
              </button>
            </div>

            <div className="bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800 space-y-1">
              {gitCommands.split('\n').map((line, i) => (
                <div key={i} className={line.startsWith('#') ? 'text-slate-500 font-semibold italic' : 'text-emerald-400'}>
                  {line}
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Vercel Connect & Deploy */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                <div>
                  <h4 className="font-black text-sm">Step 2: Connect to Vercel (Automatic Sync)</h4>
                  <p className="text-xs text-slate-300">Vercel auto-detects Vite and deploys on every commit</p>
                </div>
              </div>

              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white text-slate-900 hover:bg-slate-100 font-black rounded-xl flex items-center gap-1.5 shadow-md cursor-pointer transition-all"
              >
                <span>Open Vercel New Project</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-700" />
              </a>
            </div>

            <div className="bg-white/10 rounded-xl p-3 text-[11px] text-slate-200 space-y-1">
              <p>1. In Vercel, select **"Import Git Repository"** and select <strong>{repoName}</strong>.</p>
              <p>2. Vercel automatically selects <strong>Framework: Vite</strong>, <strong>Build: npm run build</strong>, <strong>Output: dist</strong>.</p>
              <p>3. Click <strong>Deploy</strong> — Your custom live URL (`labexpress.vercel.app`) is live in 45 seconds!</p>
            </div>
          </div>

          {/* Helpful documentation reference */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Need offline archive or offline manual transfer?</strong> All configurations are also documented in <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">DEPLOYMENT.md</code> in the project root.
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">100% Free Hosting with Vercel Global Edge Network</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
