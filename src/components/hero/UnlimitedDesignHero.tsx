import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Palette, 
  Layers, 
  Cpu, 
  ChevronRight,
  ShieldCheck,
  Zap,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface UnlimitedDesignHeroProps {
  onEnterLab: () => void;
  onExploreStyles: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

interface InlineShowcaseStyle {
  id: string;
  name: string;
  family: string;
  accent: string;
  bg: string;
  tagline: string;
  badge: string;
}

const INLINE_STYLES: InlineShowcaseStyle[] = [
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    family: 'Bold & Expressive',
    accent: '#FFE600',
    bg: '#FFFDF0',
    tagline: 'Raw geometry, 3px ink borders, hard offset shadows',
    badge: 'VALIDATED',
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    family: 'Soft & Tactile',
    accent: '#00F0FF',
    bg: '#0F172A',
    tagline: 'Optical refraction, 16px frosted blur, specular highlights',
    badge: 'IMPLEMENTED',
  },
  {
    id: 'swiss-design',
    name: 'Swiss Design',
    family: 'Clean & Structured',
    accent: '#FF3333',
    bg: '#F5F5F7',
    tagline: 'Akzidenz grid discipline, asymmetric clarity, zero noise',
    badge: 'IMPLEMENTED',
  },
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    family: 'Soft & Tactile',
    accent: '#3B82F6',
    bg: '#1E293B',
    tagline: 'Beveled metallic insets, tactile debossing, real physics',
    badge: 'IMPLEMENTED',
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    family: 'Architectural Extension',
    accent: '#D4FF32',
    bg: '#09090B',
    tagline: 'Obsidian zinc depths, 1px hairline edges, pro-density',
    badge: 'IMPLEMENTED',
  },
];

export const UnlimitedDesignHero: React.FC<UnlimitedDesignHeroProps> = ({
  onEnterLab,
  onExploreStyles,
  setActiveTab
}) => {
  const [currentStyleIdx, setCurrentStyleIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-cycle through visual language showcase pill
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentStyleIdx((prev) => (prev + 1) % INLINE_STYLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isHovered]);

  const currentStyle = INLINE_STYLES[currentStyleIdx];

  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 border-b border-white/5">
      {/* Background Ambient Mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cobalt-electric/15 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] bg-lime-electric/10 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      </div>

      <div className="max-w-6xl mx-auto text-center">
        {/* Status indicator badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-midnight-900/80 border border-white/10 backdrop-blur-md mb-8 animate-fade-in shadow-subtle-card">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-electric opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-electric"></span>
          </span>
          <span className="text-[11px] font-mono tracking-widest uppercase text-midnight-300 font-semibold">
            28 VISUAL LANGUAGES · 5 DESIGN FAMILIES · ONE INTELLIGENCE ENGINE
          </span>
        </div>

        {/* Reference A Oversized Editorial Headline with Embedded Showcase Pill */}
        <h1 className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight text-white leading-[1.05] sm:leading-[1.05] mb-8">
          <span>Design</span>{' '}
          {/* Interactive Showcase Pill */}
          <span
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setCurrentStyleIdx((prev) => (prev + 1) % INLINE_STYLES.length)}
            className="inline-flex items-center align-middle mx-2 sm:mx-3 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-lime-electric/40 bg-midnight-900/90 shadow-lime-glow/20 cursor-pointer hover:border-lime-electric transition-all select-none group transform hover:scale-[1.02]"
            title="Click to cycle next design language preview"
          >
            <span className="flex items-center gap-2 sm:gap-3 text-left">
              <span 
                className="w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full border border-white/20 transition-all duration-500 shadow-sm"
                style={{ backgroundColor: currentStyle.accent }}
              />
              <span className="text-base sm:text-2xl md:text-3xl font-display font-bold text-lime-electric tracking-tight transition-all duration-300">
                {currentStyle.name}
              </span>
              <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-white/10 text-midnight-200">
                {currentStyle.badge}
              </span>
            </span>
          </span>
          <br className="hidden sm:block" />
          <span>Beyond</span>{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-electric via-white to-cobalt-glow">
            Components.
          </span>
        </h1>

        {/* Dynamic style subtitle tracker */}
        <div className="h-6 mb-6 flex items-center justify-center">
          <p className="text-xs sm:text-sm font-mono text-midnight-400 transition-all duration-300">
            Current Language DNA: <span className="text-white font-semibold">{currentStyle.tagline}</span>
          </p>
        </div>

        {/* Supporting Copy */}
        <p className="text-base sm:text-xl text-midnight-300 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
          Explore 28 visual languages. Understand their DNA. Transform interfaces with design intelligence.
          Deterministic tokens, headless components, and AI system directives built on published npm architecture.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onEnterLab}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-lime-electric text-midnight-950 font-display font-bold text-base hover:bg-lime-glow transition-all shadow-lime-glow flex items-center justify-center gap-2.5 group active:scale-[0.98]"
          >
            <Sparkles className="w-5 h-5 text-midnight-950 fill-midnight-950" />
            <span>Enter Transformation Arena</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreStyles}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-midnight-900 hover:bg-midnight-850 text-white font-display font-semibold text-base border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Palette className="w-4 h-4 text-midnight-400" />
            <span>Explore 28 Visual Languages</span>
          </button>
        </div>

        {/* Reference A Bottom Showcase Deck */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/5 text-left backdrop-blur-sm hover:border-white/10 transition-all">
            <div className="text-2xl font-display font-bold text-lime-electric">28</div>
            <div className="text-xs font-mono text-midnight-400 mt-1 uppercase">Canonical Styles</div>
            <div className="text-[11px] text-midnight-500 mt-0.5">5 distinct visual families</div>
          </div>

          <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/5 text-left backdrop-blur-sm hover:border-white/10 transition-all">
            <div className="text-2xl font-display font-bold text-cobalt-glow">100%</div>
            <div className="text-xs font-mono text-midnight-400 mt-1 uppercase">Deterministic</div>
            <div className="text-[11px] text-midnight-500 mt-0.5">Zero hallucinated tokens</div>
          </div>

          <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/5 text-left backdrop-blur-sm hover:border-white/10 transition-all">
            <div className="text-2xl font-display font-bold text-white">5 Agents</div>
            <div className="text-xs font-mono text-midnight-400 mt-1 uppercase">Native Support</div>
            <div className="text-[11px] text-midnight-500 mt-0.5">Claude, Cursor, Antigravity, Lovable, v0</div>
          </div>

          <div className="p-4 rounded-xl bg-midnight-900/60 border border-white/5 text-left backdrop-blur-sm hover:border-white/10 transition-all">
            <div className="text-2xl font-display font-bold text-emerald-400">1.0.0</div>
            <div className="text-xs font-mono text-midnight-400 mt-1 uppercase">Published NPM</div>
            <div className="text-[11px] text-midnight-500 mt-0.5">@peak_ui/react ready</div>
          </div>
        </div>
      </div>
    </section>
  );
};
