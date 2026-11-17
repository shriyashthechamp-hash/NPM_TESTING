import React from 'react';
import { Terminal, Github, ExternalLink, Sparkles, BookOpen } from 'lucide-react';
import { ActiveTab } from '../../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="border-t border-white/5 bg-midnight-950 text-midnight-400 py-16 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand statement */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-midnight-900 border border-lime-electric/40 flex items-center justify-center">
              <span className="font-display font-black text-lime-electric text-base">P</span>
            </div>
            <span className="font-display font-bold text-white tracking-tight text-lg">
              PEAK UI DESIGN LAB
            </span>
          </div>
          <p className="text-sm text-midnight-300 max-w-md leading-relaxed">
            The interactive design intelligence platform for developers and AI coding agents.
            28 visual languages compiled into deterministic tokens, headless components, and context-aware system prompts.
          </p>
          <div className="pt-2 text-xs font-mono text-midnight-500">
            PUBLISHED PACKAGES: <span className="text-lime-electric">@peak_ui/react@1.0.0</span> · <span className="text-cobalt-glow">@peak_ui/cli@1.0.0</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Laboratory
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <button 
                onClick={() => setActiveTab('arena')}
                className="hover:text-lime-electric transition-colors"
              >
                Transformation Arena
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('explorer')}
                className="hover:text-lime-electric transition-colors"
              >
                28-Style Explorer
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('playground')}
                className="hover:text-lime-electric transition-colors"
              >
                Component Playground
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('dna')}
                className="hover:text-lime-electric transition-colors"
              >
                Design DNA Inspector
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('prompt')}
                className="hover:text-lime-electric transition-colors"
              >
                Prompt Forge for AI
              </button>
            </li>
          </ul>
        </div>

        {/* Resources & Ecosystem */}
        <div className="space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-white font-semibold">
            Ecosystem
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a 
                href="https://www.npmjs.com/package/@peak_ui/react" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>npm: @peak_ui/react</span>
                <ExternalLink className="w-3.5 h-3.5 text-midnight-500" />
              </a>
            </li>
            <li>
              <a 
                href="https://github.com/shriyashthchamp-hash/Peak_UI" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <span>GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5 text-midnight-500" />
              </a>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('recommend')}
                className="hover:text-lime-electric transition-colors"
              >
                Style Recommender Engine
              </button>
            </li>
            <li>
              <button 
                onClick={() => setActiveTab('export')}
                className="hover:text-lime-electric transition-colors"
              >
                Developer Export Studio
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-midnight-500">
        <p>© 2026 Peak UI. MIT Licensed. Built for human engineers and autonomous AI agents.</p>
        <p className="mt-2 sm:mt-0 font-mono">EXPLORE → EXPERIMENT → IMPLEMENT</p>
      </div>
    </footer>
  );
};
