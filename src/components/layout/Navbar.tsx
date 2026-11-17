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
    <header className="sticky top-2 sm:top-3 z-50 w-full px-3 sm:px-6 max-w-7xl mx-auto transition-all">
      <div className="relative bg-black/85 backdrop-blur-2xl border border-white/[0.14] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.85),0_0_1px_1px_rgba(255,255,255,0.06)] rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        
        {/* ================= BRAND LOGO AREA ================= */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Peak UI Design Lab Home"
          >
            {/* Peak UI Geometric Shield Emblem */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/20 flex items-center justify-center p-1.5 shadow-md group-hover:border-lime/60 group-hover:shadow-[0_0_15px_-2px_rgba(215,255,53,0.35)] transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M22 78 L50 22 L78 78 Z" stroke="#D7FF35" strokeWidth="11" strokeLinejoin="round" />
                <circle cx="50" cy="54" r="8" fill="#438BFF" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-sans font-black text-white tracking-tight text-sm sm:text-base group-hover:text-lime transition-colors">
                PEAK UI
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-lime/15 text-lime border border-lime/30 font-bold tracking-wider">
                LAB
              </span>
            </div>
          </button>
        </div>

        {/* ================= DESKTOP NAVIGATION PILL ================= */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 bg-white/[0.04] p-1 rounded-full border border-white/[0.08]">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-sans font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'text-white bg-white/12 border border-white/15 shadow-[0_2px_8px_rgba(0,0,0,0.5)] font-semibold'
                    : 'text-zinc-400 hover:text-white hover:bg-white/[0.06]'
                }`}
              >
                <span className={isActive ? 'text-lime' : 'text-zinc-400'}>{item.icon}</span>
                <span>{item.label}</span>
                {item.isFlagship && (
                  <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse ml-0.5" />
                )}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-lime shadow-[0_0_8px_#D7FF35]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ================= RIGHT UTILITY GROUP ================= */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* NPM Package Developer Utility */}
          <button
            onClick={copyInstallCommand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-lime/50 text-xs font-mono text-zinc-300 hover:text-white transition-all shadow-sm group"
            title="Click to copy npm command"
          >
            <Terminal className="w-3.5 h-3.5 text-lime transition-transform group-hover:scale-110" />
            <span className="text-[11px] font-mono text-zinc-300 hidden md:inline">npm i @peak_ui/react</span>
            <span className="text-[11px] font-mono text-zinc-300 md:hidden">npm i</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-lime font-bold">
                <Check className="w-3 h-3 text-lime" />
                COPIED
              </span>
            ) : (
              <span className="text-[10px] text-zinc-500 font-sans uppercase tracking-wider group-hover:text-zinc-300">copy</span>
            )}
          </button>

          {/* GitHub Repository Link */}
          <a
            href="https://github.com/shriyashthchamp-hash/Peak_UI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 text-zinc-300 hover:text-white transition-all"
            title="Peak UI on GitHub"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/15 text-zinc-300 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>

        {/* ================= MOBILE FLOATING MENU SHEET ================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-black/95 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-3 mb-2 flex items-center justify-between">
              <span>DESIGN LAB DESTINATIONS</span>
              <span className="text-lime">28 STYLES</span>
            </div>
            
            <div className="space-y-1">
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
                        ? 'bg-white/12 text-white font-bold border border-lime/40 shadow-sm'
                        : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-lime' : 'text-zinc-400'}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.isFlagship && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-lime/15 text-lime border border-lime/30 font-bold">
                        FLAGSHIP
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={copyInstallCommand}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-200"
              >
                <Terminal className="w-3.5 h-3.5 text-lime" />
                <span>npm i @peak_ui/react</span>
                {copied ? <Check className="w-3.5 h-3.5 text-lime" /> : <span className="text-zinc-500 text-[10px]">(click to copy)</span>}
              </button>
              <a
                href="https://github.com/shriyashthchamp-hash/Peak_UI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.03] border border-white/5 text-xs text-zinc-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 ml-1 text-zinc-500" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
