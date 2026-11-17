import React, { useState } from 'react';
import { ActiveTab } from '../../types';
import { 
  Sparkles, 
  Layers, 
  Palette, 
  Terminal, 
  Code, 
  Compass, 
  Dna, 
  Sliders, 
  ExternalLink, 
  Copy, 
  Check, 
  Github,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyInstallCommand = () => {
    navigator.clipboard.writeText('npm install @peak_ui/react');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }> = [
    { id: 'landing', label: 'Overview', icon: <Compass className="w-4 h-4" /> },
    { id: 'arena', label: 'Transformation Arena', icon: <Sparkles className="w-4 h-4 text-lime-electric" />, badge: 'HERO LAB' },
    { id: 'explorer', label: '28 Styles', icon: <Palette className="w-4 h-4" /> },
    { id: 'playground', label: 'Components', icon: <Layers className="w-4 h-4" /> },
    { id: 'dna', label: 'Design DNA', icon: <Dna className="w-4 h-4" /> },
    { id: 'prompt', label: 'Prompt Forge', icon: <Sliders className="w-4 h-4" /> },
    { id: 'recommend', label: 'Recommender', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'export', label: 'Export Studio', icon: <Code className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-midnight-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-xl bg-midnight-900 border border-lime-electric/30 flex items-center justify-center shadow-lime-glow/20 group-hover:border-lime-electric transition-all">
              <span className="font-display font-black text-lime-electric text-lg tracking-tighter">P</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-white tracking-tight text-base group-hover:text-lime-electric transition-colors">
                  PEAK UI
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-lime-electric/15 text-lime-electric border border-lime-electric/30 font-semibold">
                  LAB
                </span>
              </div>
              <span className="text-[10px] text-midnight-400 font-mono tracking-tight block">
                28 VISUAL LANGUAGES
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-midnight-900/60 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-midnight-800 text-white shadow-sm border border-white/10'
                    : 'text-midnight-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-lime-electric/20 text-lime-electric border border-lime-electric/40 font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-2.5">
          {/* Quick Copy npm command */}
          <button
            onClick={copyInstallCommand}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-midnight-900 hover:bg-midnight-850 border border-white/10 text-xs font-mono text-midnight-300 hover:text-white transition-all"
            title="Click to copy npm install command"
          >
            <Terminal className="w-3.5 h-3.5 text-lime-electric" />
            <span>npm i @peak_ui/react</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-lime-electric" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-midnight-500 group-hover:text-midnight-300" />
            )}
          </button>

          {/* GitHub Repo */}
          <a
            href="https://github.com/shriyashthchamp-hash/Peak_UI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-midnight-900 hover:bg-midnight-850 border border-white/10 text-midnight-300 hover:text-white transition-all"
            title="View on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg bg-midnight-900 border border-white/10 text-midnight-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/5 bg-midnight-950 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === item.id
                  ? 'bg-midnight-850 text-lime-electric border border-lime-electric/30'
                  : 'text-midnight-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-lime-electric/20 text-lime-electric border border-lime-electric/40 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
            <button
              onClick={copyInstallCommand}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-midnight-900 border border-white/10 text-xs font-mono text-midnight-200"
            >
              <Terminal className="w-3.5 h-3.5 text-lime-electric" />
              <span>npm i @peak_ui/react</span>
              {copied && <Check className="w-3.5 h-3.5 text-lime-electric" />}
            </button>
            <a
              href="https://github.com/shriyashthchamp-hash/Peak_UI"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-midnight-900 border border-white/10 text-midnight-300"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
