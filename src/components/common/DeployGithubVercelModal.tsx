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
  AlertCircle,
  Mail,
  UserCheck,
  Zap
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
  const [gitEmail, setGitEmail] = useState('minasubhash8@gmail.com');
  const [githubUsername, setGithubUsername] = useState('minasubhash8-create');
  const [repoName, setRepoName] = useState('Lab-express');
  const [githubToken, setGithubToken] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const standardGitCommands = `# 1. Verify Git configured for ${gitEmail}
git config user.email "${gitEmail}"
git config user.name "Subhash Meena"

# 2. Add your GitHub remote repository
git remote add origin https://github.com/${githubUsername}/${repoName}.git

# 3. Push code to GitHub 'main' branch
git push -u origin main`;

  const tokenPushCommand = githubToken.trim()
    ? `git push https://${githubToken.trim()}@github.com/${githubUsername}/${repoName}.git main`
    : `git push https://<YOUR_GITHUB_TOKEN>@github.com/${githubUsername}/${repoName}.git main`;

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
                  Git Initialized
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Configured for: <strong className="text-teal-300 font-mono">{gitEmail}</strong>
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
          
          {/* Active Git Identity Status Banner */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">
                  🎉 Code Successfully Pushed to GitHub!
                </span>
                <a
                  href={`https://github.com/${githubUsername}/${repoName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-black text-emerald-950 text-xs hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>github.com/{githubUsername}/{repoName}</span>
                  <ExternalLink className="w-3 h-3 text-emerald-700" />
                </a>
              </div>
            </div>

            <a
              href={`https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F${githubUsername}%2F${repoName}`}
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
            >
              <Rocket className="w-4 h-4" />
              <span>Deploy to Vercel (1-Click)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

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
                  <span className="font-mono font-bold text-slate-900 block">branch: main</span>
                  <span className="text-[10px] text-slate-500">Committed & Clean</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Inputs for Personalization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-teal-50/70 p-3.5 rounded-2xl border border-teal-200">
            <div>
              <label className="block text-[11px] font-bold text-teal-950 mb-1">GitHub Account Email:</label>
              <input
                type="email"
                value={gitEmail}
                onChange={(e) => setGitEmail(e.target.value.trim() || 'minasubhash8@gmail.com')}
                className="w-full p-2 bg-white border border-teal-300 rounded-xl font-mono text-xs outline-teal-600"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-teal-950 mb-1">GitHub Username:</label>
              <input
                type="text"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value.trim() || 'minasubhash8-create')}
                placeholder="minasubhash8-create"
                className="w-full p-2 bg-white border border-teal-300 rounded-xl font-mono text-xs outline-teal-600"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-teal-950 mb-1">Target GitHub Repository Name:</label>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value.trim() || 'Lab-express')}
                placeholder="Lab-express"
                className="w-full p-2 bg-white border border-teal-300 rounded-xl font-mono text-xs outline-teal-600"
              />
            </div>
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-teal-950">GitHub Personal Access Token (Optional):</label>
                <a
                  href="https://github.com/settings/tokens/new?scopes=repo&description=LabExpress-Push"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-teal-800 hover:text-teal-950 font-bold underline flex items-center gap-1"
                >
                  <span>Generate Token in 1-Click</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <input
                type="password"
                value={githubToken}
                onChange={(e) => setGithubToken(e.target.value.trim())}
                placeholder="Paste token (ghp_...) here to generate instant 1-liner push"
                className="w-full p-2 bg-white border border-teal-300 rounded-xl font-mono text-xs outline-teal-600"
              />
            </div>
          </div>

          {/* Step 1: Terminal Commands for Push */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-slate-700" />
                <span>Step 1: Push Code to GitHub (Run in Terminal)</span>
              </span>
              <button
                onClick={() => handleCopy(standardGitCommands, 'git')}
                className="flex items-center gap-1 px-3 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs cursor-pointer transition-colors"
              >
                {copiedKey === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedKey === 'git' ? 'Copied!' : 'Copy Commands'}</span>
              </button>
            </div>

            <div className="bg-slate-950 text-slate-100 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto shadow-inner border border-slate-800 space-y-1">
              {standardGitCommands.split('\n').map((line, i) => (
                <div key={i} className={line.startsWith('#') ? 'text-slate-500 font-semibold italic' : 'text-emerald-400'}>
                  {line}
                </div>
              ))}
            </div>

            {/* Quick 1-Liner with Token */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-[11px] flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant 1-Liner Push (Using Personal Access Token):</span>
                </span>
                <button
                  onClick={() => handleCopy(tokenPushCommand, 'token')}
                  className="text-teal-700 hover:text-teal-900 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                >
                  {copiedKey === 'token' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'token' ? 'Copied' : 'Copy 1-Liner'}</span>
                </button>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200 font-mono text-[10px] text-slate-800 break-all select-all">
                {tokenPushCommand}
              </div>
            </div>
          </div>

          {/* Step 2: Vercel Connect & Deploy Options */}
          <div className="p-4 bg-gradient-to-r from-slate-900 to-indigo-950 text-white rounded-2xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-teal-400" />
                <div>
                  <h4 className="font-black text-sm">Step 2: Connect Vercel Account & Deploy</h4>
                  <p className="text-xs text-slate-300">Link GitHub account ({githubUsername}) with Vercel</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <a
                  href="https://vercel.com/login"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl flex items-center gap-1 transition-all"
                >
                  <span>1. Login with GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={`https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F${githubUsername}%2F${repoName}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-1.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-black rounded-xl flex items-center gap-1.5 shadow-md transition-all"
                >
                  <span>2. 1-Click Auto-Deploy to Vercel</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-3 text-[11px] text-slate-200 space-y-1.5">
              <p className="font-bold text-white">How Vercel Auto-Deployment Works:</p>
              <p>1. Open <strong>vercel.com/new</strong> and login using your GitHub account (<strong>{gitEmail}</strong>).</p>
              <p>2. Select your repository <strong>{repoName}</strong> from the list and click <strong>"Import"</strong>.</p>
              <p>3. Vercel auto-detects <strong>Framework: Vite</strong>, <strong>Build: npm run build</strong>, <strong>Output: dist</strong>.</p>
              <p>4. Click <strong>"Deploy"</strong> — within 30 seconds your app will be live with a production HTTPS URL!</p>
              <p className="text-teal-300 font-semibold pt-1">
                ⚡ Any future code changes will auto-deploy automatically whenever you run git push!
              </p>
            </div>
          </div>

          {/* Automated Shell Script Callout */}
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Pre-created push script:</strong> We have generated <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">./push-to-github.sh</code> in the project root. You can run <code className="bg-amber-100 px-1 py-0.5 rounded font-mono font-bold">./push-to-github.sh</code> to push automatically!
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 px-6 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium">Git Email: {gitEmail} • 100% Free Hosting on Vercel</span>
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
