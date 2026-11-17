import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Layers,
  Terminal,
  ExternalLink
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface CinematicHeroProps {
  onEnterLab: () => void;
  onExploreStyles: () => void;
  onSelectStyleForArena: (styleId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

interface ShowcaseStyleItem {
  id: string;
  name: string;
  family: string;
  accent: string;
  dnaCharacteristics: string;
  maturity: 'VALIDATED' | 'IMPLEMENTED' | 'MODELED';
}

const SHOWCASE_STYLES: ShowcaseStyleItem[] = [
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    family: 'Soft & Tactile',
    accent: '#38BDF8',
    dnaCharacteristics: 'Optical refraction · Frosted surfaces · Specular highlights',
    maturity: 'IMPLEMENTED',
  },
  {
    id: 'neo-brutalism',
    name: 'Neo-Brutalism',
    family: 'Bold & Expressive',
    accent: '#D7FF35',
    dnaCharacteristics: '3px raw ink borders · Hard offset shadows · Acid yellow',
    maturity: 'VALIDATED',
  },
  {
    id: 'swiss-design',
    name: 'Swiss Design',
    family: 'Clean & Structured',
    accent: '#FF3333',
    dnaCharacteristics: 'Akzidenz grid discipline · Asymmetric clarity · Zero noise',
    maturity: 'IMPLEMENTED',
  },
  {
    id: 'skeuomorphism',
    name: 'Skeuomorphism',
    family: 'Soft & Tactile',
    accent: '#3B82F6',
    dnaCharacteristics: 'Beveled metallic insets · Tactile debossing · Real physics',
    maturity: 'IMPLEMENTED',
  },
  {
    id: 'dark-premium',
    name: 'Dark Premium',
    family: 'Architectural',
    accent: '#D7FF35',
    dnaCharacteristics: 'Obsidian zinc depths · 1px hairline edges · Sub-pixel telemetry density',
    maturity: 'IMPLEMENTED',
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    family: 'Retro & Digital',
    accent: '#00F0FF',
    dnaCharacteristics: '45° chamfered geometry · CRT scanlines · Optic neon glitch dynamics',
    maturity: 'MODELED',
  },
];

export const CinematicHero: React.FC<CinematicHeroProps> = ({
  onEnterLab,
  onExploreStyles,
  onSelectStyleForArena,
}) => {
  const [activeStyleIdx, setActiveStyleIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Respect prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, []);

  // Auto-advance showcase every 3.8s unless hovered/paused
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStyleIdx((prev) => (prev + 1) % SHOWCASE_STYLES.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeStyle = SHOWCASE_STYLES[activeStyleIdx];

  const handlePrevStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStyleIdx((prev) => (prev - 1 + SHOWCASE_STYLES.length) % SHOWCASE_STYLES.length);
  };

  const handleNextStyle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveStyleIdx((prev) => (prev + 1) % SHOWCASE_STYLES.length);
  };

  return (
    <section className="relative w-full min-h-[calc(100dvh-4.75rem)] lg:h-[calc(100dvh-4.75rem)] lg:max-h-[calc(100dvh-4.75rem)] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-2 sm:pt-3 pb-3 sm:pb-4 bg-black select-none">
      
      {/* ========================================================================= */}
      {/* 1. CINEMATIC VIDEO BACKGROUND */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden bg-black z-0">
        {!prefersReducedMotion && !videoError ? (
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4"
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${
              videoLoaded ? 'opacity-70' : 'opacity-0'
            }`}
          />
        ) : null}

        {/* Ambient fallback glow underneath video */}
        <div 
          className={`absolute inset-0 transition-opacity duration-700 pointer-events-none ${
            videoLoaded ? 'opacity-25' : 'opacity-85'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 45%, rgba(67, 139, 255, 0.22) 0%, rgba(215, 255, 53, 0.08) 35%, rgba(0, 0, 0, 0.95) 75%)',
          }}
        />

        {/* Tuned Contrast Overlays: Linear vignette + Radial focus */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/35 to-black/92 pointer-events-none" />
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 32%, rgba(0, 0, 0, 0.72) 100%)',
          }}
        />
      </div>

      {/* ========================================================================= */}
      {/* 2. TOP STATUS / TRUST INDICATOR */}
      {/* ========================================================================= */}
      <div className="relative z-10 pt-1 sm:pt-2">
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-md border border-white/10 text-[10px] sm:text-xs font-mono text-zinc-300 tracking-wider uppercase shadow-[0_0_20px_-5px_rgba(215,255,53,0.15)] animate-in fade-in slide-in-from-top-2 duration-700">
          <span className="w-1.5 h-1.5 rounded-full bg-lime animate-pulse shadow-[0_0_8px_#D7FF35]" />
          <span>28 VISUAL LANGUAGES</span>
          <span className="text-zinc-600">·</span>
          <span>5 DESIGN FAMILIES</span>
          <span className="text-zinc-600">·</span>
          <span className="font-dot text-lime tracking-widest font-bold">ONE INTELLIGENCE ENGINE</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CENTER HERO COMPOSITION */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center my-auto px-2">
        
        {/* Main Editorial Headline with Inline Visual Language Showcase */}
        <div className="space-y-0.5 sm:space-y-1">
          {/* Line 1: Design */}
          <h1 className="font-sans font-black tracking-[-0.04em] text-white leading-[0.88] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7rem] drop-shadow-md">
            Design
          </h1>

          {/* Line 2: Beyond + Interactive Inline Showcase Pill */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className="font-sans font-black tracking-[-0.04em] text-white leading-[0.88] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7rem] drop-shadow-md">
              Beyond
            </span>

            {/* Inline Interactive Showcase Pill */}
            <div 
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onClick={() => onSelectStyleForArena(activeStyle.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-xl border border-white/20 hover:border-lime/60 shadow-[0_10px_30px_rgba(0,0,0,0.6)] cursor-pointer transition-all duration-300 group scale-95 sm:scale-100"
              title="Click to load in Transformation Arena"
            >
              {/* Style accent color swatch */}
              <div 
                className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-transform group-hover:scale-125 shadow-sm"
                style={{ backgroundColor: activeStyle.accent }}
              />

              {/* Style name with animated slide */}
              <div className="text-left overflow-hidden">
                <span className="font-sans font-bold text-xs sm:text-sm md:text-base text-white tracking-tight block">
                  {activeStyle.name}
                </span>
              </div>

              {/* Maturity Badge */}
              <span 
                className={`text-[9px] sm:text-[10px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                  activeStyle.maturity === 'VALIDATED'
                    ? 'bg-lime/20 text-lime border border-lime/40'
                    : 'bg-cobalt/20 text-cobalt-glow border border-cobalt/40'
                }`}
              >
                {activeStyle.maturity}
              </span>

              {/* Mini Arrow & Stepper Controls */}
              <div className="flex items-center gap-0.5 text-zinc-400 pl-1 border-l border-white/10">
                <button
                  onClick={handlePrevStyle}
                  className="p-0.5 hover:text-white transition-colors"
                  aria-label="Previous style"
                >
                  <ChevronLeft className="w-3 h-3" />
                </button>
                <button
                  onClick={handleNextStyle}
                  className="p-0.5 hover:text-white transition-colors"
                  aria-label="Next style"
                >
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Line 3: Components. with subtle electric lime & cobalt accent */}
          <div className="font-sans font-black tracking-[-0.04em] leading-[0.88] text-5xl sm:text-7xl md:text-8xl lg:text-[6.2rem] xl:text-[7rem]">
            <span className="bg-gradient-to-r from-lime via-white to-cobalt-glow bg-clip-text text-transparent drop-shadow-md">
              Components.
            </span>
          </div>
        </div>

        {/* 4. DESIGN DNA MICRO-LINE */}
        <div className="mt-3 sm:mt-4 h-6 flex items-center justify-center">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm transition-all duration-300">
            <span className="font-dot text-[10px] sm:text-xs text-lime font-bold tracking-widest uppercase">
              CURRENT LANGUAGE DNA:
            </span>
            <span className="font-mono text-zinc-200 tracking-tight font-medium text-[11px] sm:text-xs">
              {activeStyle.dnaCharacteristics}
            </span>
          </div>
        </div>

        {/* 5. SUPPORTING VALUE COPY */}
        <p className="mt-3 sm:mt-4 max-w-[540px] text-xs sm:text-sm text-zinc-300/85 font-sans leading-relaxed text-center mx-auto">
          Explore 28 visual languages. Understand their DNA. Transform interfaces with design intelligence.
          Deterministic tokens, headless components, and AI system directives.
        </p>

        {/* 6. CALL TO ACTION BUTTONS */}
        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Primary CTA — 100% Solid Electric-Lime, High Contrast */}
          <button
            onClick={onEnterLab}
            className="w-full sm:w-auto h-12 sm:h-13 px-7 sm:px-9 rounded-full bg-[#D7FF35] hover:bg-[#e6ff66] text-[#000000] font-sans font-black text-xs sm:text-sm tracking-tight shadow-[0_0_35px_-4px_rgba(215,255,53,0.55),0_2px_4px_rgba(0,0,0,0.4)] hover:shadow-[0_0_45px_-2px_rgba(215,255,53,0.75)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 group"
          >
            <span>ENTER TRANSFORMATION ARENA</span>
            <ArrowRight className="w-4 h-4 text-black transition-transform group-hover:translate-x-1 stroke-[2.5]" />
          </button>

          {/* Secondary CTA — Opaque Dark Surface with Crisp Contrast */}
          <button
            onClick={onExploreStyles}
            className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 rounded-full bg-[#0D1017] hover:bg-[#181D2A] border border-white/20 hover:border-white/40 text-white font-sans font-bold text-xs sm:text-sm tracking-tight shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            <Layers className="w-4 h-4 text-zinc-400" />
            <span>EXPLORE 28 VISUAL LANGUAGES</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 7. BOTTOM METRICS (HERO FOOTER - 4 COLUMNS) */}
      {/* ========================================================================= */}
      <div className="relative z-10 w-full max-w-5xl mx-auto pt-2 pb-1">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
          
          {/* Metric 1 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/[0.08] text-center hover:border-white/20 transition-colors">
            <div className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight">
              28
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
              CANONICAL VISUAL LANGUAGES
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/[0.08] text-center hover:border-white/20 transition-colors">
            <div className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight">
              5
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
              DISTINCT DESIGN FAMILIES
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/[0.08] text-center hover:border-white/20 transition-colors">
            <div className="font-mono font-bold text-sm sm:text-base text-lime tracking-tight pt-1">
              @peak_ui/react
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
              PUBLISHED NPM PACKAGE
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-2.5 sm:p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/[0.08] text-center hover:border-white/20 transition-colors">
            <div className="font-sans font-black text-xl sm:text-2xl text-white tracking-tight">
              1.0.0
            </div>
            <div className="text-[9px] sm:text-[10px] font-mono text-zinc-400 uppercase tracking-widest mt-0.5">
              CURRENT PACKAGE VERSION
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
