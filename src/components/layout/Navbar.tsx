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
  Check, 
  Github,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const copyInstallCommand = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText('npm i @peak_ui/react');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const navItems: Array<{ id: ActiveTab; label: string; icon: React.ReactNode; isFlagship?: boolean }> = [
    { id: 'landing', label: 'Overview', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'arena', label: 'Transformation Arena', icon: <Sparkles className="w-3.5 h-3.5 text-lime" />, isFlagship: true },
    { id: 'explorer', label: '28 Styles', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'playground', label: 'Components', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'dna', label: 'Design DNA', icon: <Dna className="w-3.5 h-3.5" /> },
    { id: 'prompt', label: 'Prompt Forge', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'recommend', label: 'Recommender', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'export', label: 'Export Studio', icon: <Code className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-xl border-b border-white/[0.08] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 sm:h-14 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Peak UI Home"
          >
            {/* Peak UI Geometric Emblem */}
            <div className="w-8 h-8 rounded-lg bg-black/70 border border-white/15 flex items-center justify-center group-hover:border-lime/60 group-hover:shadow-[0_0_15px_-3px_rgba(215,255,53,0.3)] transition-all">
              <svg viewBox="0 0 100 100" className="w-5 h-5" fill="none">
                <path d="M22 78 L50 22 L78 78 Z" stroke="#D7FF35" strokeWidth="11" strokeLinejoin="round" />
                <circle cx="50" cy="54" r="8" fill="#438BFF" />
              </svg>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-sans font-extrabold text-white tracking-tight text-sm sm:text-base group-hover:text-lime transition-colors">
                PEAK UI
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/5 text-zinc-400 border border-white/10 font-semibold tracking-wider">
                LAB
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Single-Row Navigation */}
        <nav className="hidden xl:flex items-center gap-1 bg-white/[0.03] p-1 rounded-full border border-white/[0.08]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-3 py-1.5 rounded-full text-xs font-sans transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-white bg-white/10 font-semibold shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5 font-normal'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.isFlagship && (
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse ml-0.5" />
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px] rounded-full bg-lime" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Utility Group */}
        <div className="hidden sm:flex items-center gap-2">
          {/* NPM Package Pill */}
          <button
            onClick={copyInstallCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-all group"
            title="Click to copy npm install command"
          >
            <Terminal className="w-3.5 h-3.5 text-lime transition-transform group-hover:scale-110" />
            <span className="text-[11px] font-mono text-zinc-300">npm i @peak_ui/react</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-lime animate-in fade-in" />
            ) : (
              <span className="text-[10px] text-zinc-500 font-sans uppercase tracking-wider group-hover:text-zinc-300">copy</span>
            )}
          </button>

          {/* GitHub Link */}
          <a
            href="https://github.com/shriyashthchamp-hash/Peak_UI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-400 hover:text-white transition-all"
            title="Peak UI on GitHub"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </div>

      {/* Mobile Floating Glass Sheet */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[52px] sm:top-[56px] bottom-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 p-6 flex flex-col justify-between z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-1.5">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-3 mb-2">
              NAVIGATION DESTINATIONS
            </div>
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-sans transition-all ${
                    isActive
                      ? 'bg-white/10 text-white font-semibold border border-lime/30'
                      : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-lime' : 'text-zinc-400'}>{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {item.isFlagship && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime/15 text-lime border border-lime/30 font-bold">
                      HERO LAB
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button
              onClick={copyInstallCommand}
              className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-200 hover:bg-white/10 transition-colors"
            >
              <Terminal className="w-4 h-4 text-lime" />
              <span>npm i @peak_ui/react</span>
              {copied ? <Check className="w-4 h-4 text-lime" /> : <span className="text-zinc-500 text-[11px]">(copy)</span>}
            </button>
            <a
              href="https://github.com/shriyashthchamp-hash/Peak_UI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>View Repository on GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1 text-zinc-500" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
