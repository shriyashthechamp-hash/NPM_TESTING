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
    { id: 'arena', label: 'Transformation Arena', icon: <Sparkles className="w-3.5 h-3.5" />, isFlagship: true },
    { id: 'explorer', label: '28 Styles', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'playground', label: 'Components', icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'dna', label: 'Design DNA', icon: <Dna className="w-3.5 h-3.5" /> },
    { id: 'prompt', label: 'Prompt Forge', icon: <Sliders className="w-3.5 h-3.5" /> },
    { id: 'recommend', label: 'Recommender', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'export', label: 'Export Studio', icon: <Code className="w-3.5 h-3.5" /> },
  ];

  return (
    <header className="sticky top-2 sm:top-3 z-50 w-full px-3 sm:px-6 max-w-7xl mx-auto transition-all">
      <div className="relative bg-[#080A08]/90 backdrop-blur-2xl border border-white/[0.14] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.9),0_0_1px_1px_rgba(255,255,255,0.06)] rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-3">
        
        {/* ================= BRAND LOGO AREA ================= */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('landing')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
            aria-label="Peak UI Design Lab Home"
          >
            {/* Peak UI Geometric Emblem */}
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-[#12151E] to-[#080A08] border border-white/20 flex items-center justify-center p-1.5 shadow-md group-hover:border-[#D7FF35]/70 group-hover:shadow-[0_0_15px_-2px_rgba(215,255,53,0.4)] transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M22 78 L50 22 L78 78 Z" stroke="#D7FF35" strokeWidth="11" strokeLinejoin="round" />
                <circle cx="50" cy="54" r="8" fill="#438BFF" />
              </svg>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-sans font-black text-white tracking-tight text-sm sm:text-base group-hover:text-[#D7FF35] transition-colors">
                PEAK UI
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-[#D7FF35]/15 text-[#D7FF35] border border-[#D7FF35]/30 font-bold tracking-wider">
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
                className={`relative px-2.5 xl:px-3.5 py-1.5 rounded-full text-xs xl:text-[13px] font-sans transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D7FF35] text-[#080A08] font-bold shadow-[0_0_20px_-3px_rgba(215,255,53,0.45)]'
                    : 'text-zinc-200 hover:text-white hover:bg-white/10 font-medium'
                }`}
              >
                <span className={isActive ? 'text-[#080A08]' : 'text-zinc-400'}>{item.icon}</span>
                <span>{item.label}</span>
                {item.isFlagship && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D7FF35] animate-pulse ml-0.5" />
                )}
              </button>
            );
          })}
        </nav>

        {/* ================= RIGHT UTILITY GROUP ================= */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          {/* NPM Package Utility */}
          <button
            onClick={copyInstallCommand}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-mono transition-all shadow-sm group ${
              copied
                ? 'bg-[#D7FF35]/20 border-[#D7FF35]/60 text-[#D7FF35]'
                : 'bg-[#12151E] hover:bg-[#1A1F2C] border-white/20 hover:border-[#D7FF35]/60 text-zinc-200 hover:text-white'
            }`}
            title="Click to copy npm command"
          >
            <Terminal className="w-3.5 h-3.5 text-[#D7FF35] transition-transform group-hover:scale-110" />
            <span className="text-[11px] font-mono hidden md:inline">npm i @peak_ui/react</span>
            <span className="text-[11px] font-mono md:hidden">npm i</span>
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#D7FF35] font-bold">
                <Check className="w-3 h-3 text-[#D7FF35]" />
                COPIED
              </span>
            ) : (
              <span className="text-[10px] text-zinc-400 font-sans uppercase tracking-wider group-hover:text-zinc-200">copy</span>
            )}
          </button>

          {/* GitHub Action */}
          <a
            href="https://github.com/shriyashthchamp-hash/Peak_UI"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full bg-[#12151E] hover:bg-[#1A1F2C] border border-white/20 text-zinc-200 hover:text-white hover:border-white/40 transition-all"
            title="Peak UI on GitHub"
            aria-label="GitHub Repository"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-xl bg-[#12151E] border border-white/15 text-zinc-200 hover:text-white transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>

        {/* ================= MOBILE FLOATING MENU SHEET ================= */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-3 p-5 rounded-3xl bg-[#080A08]/95 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.9)] space-y-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest px-3 mb-2 flex items-center justify-between">
              <span>DESIGN LAB DESTINATIONS</span>
              <span className="text-[#D7FF35] font-bold">28 STYLES</span>
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
                        ? 'bg-[#D7FF35] text-[#080A08] font-bold shadow-md'
                        : 'text-zinc-200 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={isActive ? 'text-[#080A08]' : 'text-zinc-400'}>{item.icon}</span>
                      <span>{item.label}</span>
                    </div>
                    {item.isFlagship && !isActive && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#D7FF35]/15 text-[#D7FF35] border border-[#D7FF35]/30 font-bold">
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
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#12151E] border border-white/15 text-xs font-mono text-zinc-200"
              >
                <Terminal className="w-3.5 h-3.5 text-[#D7FF35]" />
                <span>npm i @peak_ui/react</span>
                {copied ? <Check className="w-3.5 h-3.5 text-[#D7FF35]" /> : <span className="text-zinc-400 text-[10px]">(click to copy)</span>}
              </button>
              <a
                href="https://github.com/shriyashthchamp-hash/Peak_UI"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-zinc-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repository</span>
                <ExternalLink className="w-3 h-3 ml-1 text-zinc-400" />
              </a>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
