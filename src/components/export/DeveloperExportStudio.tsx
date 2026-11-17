import React, { useState } from 'react';
import { 
  Terminal, 
  Code, 
  Copy, 
  Check, 
  ExternalLink, 
  Package, 
  FileCode, 
  Layers, 
  Cpu, 
  ArrowUpRight,
  Sparkles,
  Download
} from 'lucide-react';
import { ALL_STYLES } from '@peak_ui/react';

export const DeveloperExportStudio: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string>('neo-brutalism');
  const [packageManager, setPackageManager] = useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const installCommands = {
    npm: 'npm install @peak_ui/react',
    pnpm: 'pnpm add @peak_ui/react',
    yarn: 'yarn add @peak_ui/react',
    bun: 'bun add @peak_ui/react',
  };

  const cliCommands = {
    npm: 'npx @peak_ui/cli',
    pnpm: 'pnpm dlx @peak_ui/cli',
    yarn: 'yarn dlx @peak_ui/cli',
    bun: 'bunx @peak_ui/cli',
  };

  const tailwindSnippet = `// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        peak: {
          primary: 'var(--peak-primitive-primary)',
          accent: 'var(--peak-primitive-accent)',
          background: 'var(--peak-primitive-background)',
          surface: 'var(--peak-primitive-surface)',
          border: 'var(--peak-primitive-border)',
        }
      }
    }
  }
};`;

  const peakConfigSnippet = `{
  "$schema": "https://peak-ui.dev/schema/config.json",
  "style": "${selectedStyleId}",
  "componentsDir": "./src/components/ui",
  "tokens": {
    "format": "css",
    "output": "./src/styles/tokens.css"
  }
}`;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Code className="w-3.5 h-3.5" />
            <span>DEVELOPER EXPORT STUDIO</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
            Implementation Studio
          </h1>
          <p className="text-sm sm:text-base text-midnight-300 mt-2 max-w-2xl">
            Transition seamlessly from laboratory experimentation to production codebase.
            Copy verified npm package imports, CLI automation scripts, and configuration scaffolding.
          </p>
        </div>

        {/* Package Manager Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0D1017] border border-white/10 text-xs font-mono">
          {(['npm', 'pnpm', 'yarn', 'bun'] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setPackageManager(pm)}
              className={`px-3.5 py-1.5 rounded-lg transition-all uppercase ${
                packageManager === pm
                  ? 'bg-[#D7FF35] text-[#080A08] font-black shadow-[0_0_15px_rgba(215,255,53,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {pm}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Step 1: Package Installation & Verified Exports */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-lime-electric uppercase font-bold">
              <Package className="w-4 h-4" />
              <span>1. Verified NPM Package Installation</span>
            </div>
            <p className="text-xs text-midnight-300">
              The official published Peak UI package includes headless primitives, token compiler, catalog definitions, and AI prompt generators.
            </p>

            <div className="p-3.5 rounded-xl bg-midnight-950 border border-white/5 flex items-center justify-between text-xs font-mono text-white">
              <span>{installCommands[packageManager]}</span>
              <button
                onClick={() => handleCopy(installCommands[packageManager], 'install')}
                className="p-1.5 text-midnight-400 hover:text-white"
                title="Copy command"
              >
                {copiedId === 'install' ? <Check className="w-4 h-4 text-lime-electric" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="pt-2 text-xs text-midnight-400 font-mono">
              Status: <span className="text-emerald-400 font-bold">v1.0.0 Published on npm registry</span>
            </div>
          </div>

          {/* Step 2: Component Imports & Token Usage */}
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-lime-electric uppercase font-bold">
                <FileCode className="w-4 h-4" />
                <span>2. React Component Imports</span>
              </div>
              <button
                onClick={() =>
                  handleCopy(
                    `import { Button, Card, Badge, requireStyleById, generateTokens } from '@peak_ui/react';\nimport '@peak_ui/react/tokens/${selectedStyleId}/tokens.css';`,
                    'imports'
                  )
                }
                className="text-xs font-mono text-midnight-400 hover:text-white flex items-center gap-1"
              >
                {copiedId === 'imports' ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-mono text-midnight-400 block">Choose Target Style Token Pack:</label>
              <select
                value={selectedStyleId}
                onChange={(e) => setSelectedStyleId(e.target.value)}
                className="w-full bg-midnight-950 border border-white/15 rounded-lg p-2 text-xs text-white"
              >
                {ALL_STYLES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.family})
                  </option>
                ))}
              </select>
            </div>

            <pre className="p-3.5 rounded-xl bg-midnight-950 border border-white/5 font-mono text-xs text-midnight-200 overflow-x-auto">
{`// Direct imports from published package
import { 
  Button, 
  Card, 
  Badge, 
  requireStyleById, 
  generateTokens 
} from '@peak_ui/react';

// Import compiled CSS custom properties for ${selectedStyleId}
import '@peak_ui/react/tokens/${selectedStyleId}/tokens.css';`}
            </pre>
          </div>
        </div>

        {/* Step 3: CLI Commands & Project Configuration */}
        <div className="space-y-6">
          {/* CLI Scaffolding Tool */}
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-lime-electric uppercase font-bold">
              <Terminal className="w-4 h-4" />
              <span>3. Automation CLI Commands</span>
            </div>
            <p className="text-xs text-midnight-300">
              Scaffold style-adapted components, list catalog entries, and compile AI prompts straight from your terminal.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 flex items-center justify-between text-midnight-300">
                <div>
                  <span className="text-midnight-500"># Inspect style metadata</span>
                  <div className="text-white mt-0.5">{cliCommands[packageManager]} style info {selectedStyleId}</div>
                </div>
                <button
                  onClick={() => handleCopy(`${cliCommands[packageManager]} style info ${selectedStyleId}`, 'cli1')}
                  className="p-1 text-midnight-400 hover:text-white"
                >
                  {copiedId === 'cli1' ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 flex items-center justify-between text-midnight-300">
                <div>
                  <span className="text-midnight-500"># Generate AI Prompt</span>
                  <div className="text-white mt-0.5">{cliCommands[packageManager]} prompt landing-page --style {selectedStyleId}</div>
                </div>
                <button
                  onClick={() => handleCopy(`${cliCommands[packageManager]} prompt landing-page --style ${selectedStyleId}`, 'cli2')}
                  className="p-1 text-midnight-400 hover:text-white"
                >
                  {copiedId === 'cli2' ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 flex items-center justify-between text-midnight-300">
                <div>
                  <span className="text-midnight-500"># Recommend styles via NL query</span>
                  <div className="text-white mt-0.5">{cliCommands[packageManager]} recommend "Developer cloud analytics platform"</div>
                </div>
                <button
                  onClick={() => handleCopy(`${cliCommands[packageManager]} recommend "Developer cloud analytics platform"`, 'cli3')}
                  className="p-1 text-midnight-400 hover:text-white"
                >
                  {copiedId === 'cli3' ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Configuration Scaffold */}
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-lime-electric uppercase font-bold">
                <Code className="w-4 h-4" />
                <span>4. peak-ui.config.json Scaffolding</span>
              </div>
              <button
                onClick={() => handleCopy(peakConfigSnippet, 'config')}
                className="text-xs font-mono text-midnight-400 hover:text-white flex items-center gap-1"
              >
                {copiedId === 'config' ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>

            <pre className="p-3.5 rounded-xl bg-midnight-950 border border-white/5 font-mono text-xs text-midnight-200 overflow-x-auto">
              {peakConfigSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
