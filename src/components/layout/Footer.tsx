import React from 'react';
import { Terminal, Github, ExternalLink, Sparkles, Layers, Sliders, Dna, Code } from 'lucide-react';
import { ActiveTab } from '../../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-white/[0.08] bg-black text-zinc-400 py-16 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand statement */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-white/20 p-1.5 shadow-md flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full" fill="none">
                <path d="M22 78 L50 22 L78 78 Z" stroke="#D7FF35" strokeWidth="11" strokeLinejoin="round" />
                <circle cx="50" cy="54" r="8" fill="#438BFF" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-black text-white tracking-tight text-lg">
                PEAK UI
              </span>
              <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-lime/15 text-lime border border-lime/30 font-bold tracking-wider">
                DESIGN LAB
              </span>
            </div>
          </div>
          
          <p className="text-sm text-zinc-300 max-w-md leading-relaxed font-sans">
            The interactive design intelligence platform for developers and AI coding agents.
            28 visual languages compiled into deterministic tokens, headless components, and context-aware system prompts.
          </p>
          
          <div className="pt-2 text-xs font-mono text-zinc-400 flex flex-wrap items-center gap-2">
            <span className="text-zinc-500 uppercase tracking-wider text-[10px]">PUBLISHED ON NPM:</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-lime font-bold">@peak_ui/react@1.0.0</span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-cobalt-glow font-bold">@peak_ui/cli@1.0.0</span>
          </div>
        </div>

        {/* Laboratory Navigation */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Laboratory
          </div>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <button 
                onClick={() => setActiveTab('arena')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                Transformation Arena
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('explorer')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                28-Style Catalog Explorer
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('playground')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                Component Playground
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('dna')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                Design DNA Inspector
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('prompt')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                Prompt Forge for AI
              </button>
            </li>
          </ul>
        </div>

        {/* Ecosystem & Links */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-bold">
            Ecosystem
          </div>
          <ul className="space-y-2 text-sm font-sans">
            <li>
              <a 
                href="https://www.npmjs.com/package/@peak_ui/react" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <span>npm: @peak_ui/react</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/shriyashthchamp-hash/Peak_UI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-zinc-300 hover:text-white transition-colors"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
              </a>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('recommend')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                Style Recommender Engine
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('export')}
                className="hover:text-lime transition-colors text-zinc-300"
              >
                Developer Export Studio
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-sans">
        <p>© 2026 Peak UI. MIT Licensed. Built for human engineers and autonomous AI agents.</p>
        <p className="mt-2 sm:mt-0 font-mono tracking-wider text-[11px] text-zinc-400">
          EXPLORE → EXPERIMENT → IMPLEMENT
        </p>
      </div>
    </footer>
  );
};
