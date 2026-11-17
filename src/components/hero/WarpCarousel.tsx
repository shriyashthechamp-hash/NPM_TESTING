import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  Info,
  Maximize2
} from 'lucide-react';
import { ALL_STYLES, getFamilyById } from '@peak_ui/react';

interface WarpCarouselProps {
  onSelectStyle: (styleId: string) => void;
}

export const WarpCarousel: React.FC<WarpCarouselProps> = ({ onSelectStyle }) => {
  // Select a curated diverse set of styles across all 5 families
  const featuredStyleIds = [
    'neo-brutalism',
    'glassmorphism',
    'swiss-design',
    'skeuomorphism',
    'dark-premium',
    'bento-grid',
    'aurora-gradient',
    'pixel-art',
    'vaporwave',
    'art-deco',
    'minimalism',
    'cyberpunk',
  ];

  const featuredStyles = featuredStyleIds
    .map((id) => ALL_STYLES.find((s) => s.id === id))
    .filter(Boolean);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCards = featuredStyles.length;

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard();
      if (e.key === 'ArrowRight') nextCard();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pointer drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = e.clientX - startX;
    if (diff > 50) prevCard();
    else if (diff < -50) nextCard();
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-midnight-950 border-b border-white/5">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cobalt-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D WARP PERSPECTIVE MATRIX</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
              Spatial Style Deck
            </h2>
            <p className="text-sm sm:text-base text-midnight-400 mt-2 max-w-xl">
              Rotate through Peak UI's canonical visual languages. Inspect physical surface properties, typography scale, and color seeds in real-time 3D perspective.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <span className="text-xs font-mono text-midnight-400 mr-2">
              {activeIndex + 1} / {totalCards}
            </span>
            <button
              onClick={prevCard}
              className="p-3 rounded-xl bg-midnight-900 hover:bg-midnight-850 border border-white/10 hover:border-lime-electric/50 text-midnight-300 hover:text-white transition-all active:scale-95 shadow-subtle-card"
              title="Previous style (Left Arrow)"
              aria-label="Previous style"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextCard}
              className="p-3 rounded-xl bg-midnight-900 hover:bg-midnight-850 border border-white/10 hover:border-lime-electric/50 text-midnight-300 hover:text-white transition-all active:scale-95 shadow-subtle-card"
              title="Next style (Right Arrow)"
              aria-label="Next style"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 3D Warp Carousel Stage */}
        <div
          ref={containerRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative h-[480px] sm:h-[520px] w-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing perspective-[1200px]"
        >
          {featuredStyles.map((style, idx) => {
            if (!style) return null;
            // Calculate distance relative to active index
            let offset = idx - activeIndex;
            if (offset > totalCards / 2) offset -= totalCards;
            if (offset < -totalCards / 2) offset += totalCards;

            const isCurrent = offset === 0;
            const isVisible = Math.abs(offset) <= 3;

            if (!isVisible) return null;

            // Compute 3D transform & depth
            const xTranslate = offset * 260; // px spacing
            const zTranslate = -Math.abs(offset) * 180; // depth
            const rotateY = -offset * 25; // angle curve
            const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.28);
            const scale = Math.max(0.7, 1 - Math.abs(offset) * 0.12);

            const family = getFamilyById(style.family);

            return (
              <div
                key={style.id}
                onClick={() => {
                  if (isCurrent) {
                    onSelectStyle(style.id);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                style={{
                  transform: `translateX(${xTranslate}px) translateZ(${zTranslate}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex: 20 - Math.abs(offset),
                  transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`absolute w-[300px] sm:w-[340px] h-[420px] sm:h-[460px] rounded-2xl p-6 flex flex-col justify-between border transition-shadow cursor-pointer ${
                  isCurrent
                    ? 'border-lime-electric/60 bg-midnight-900/95 shadow-lime-glow/30 ring-1 ring-lime-electric/30'
                    : 'border-white/10 bg-midnight-900/70 hover:border-white/20'
                }`}
              >
                {/* Glowing edge highlight for current active card */}
                {isCurrent && (
                  <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-lime-electric/20 via-cobalt-glow/20 to-lime-electric/20 blur-sm pointer-events-none -z-10" />
                )}

                {/* Top Bar: Family & Maturity Badge */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-midnight-400">
                      {family?.name || style.family}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold border ${
                        style.maturity === 'VALIDATED'
                          ? 'bg-lime-electric/15 text-lime-electric border-lime-electric/30'
                          : style.maturity === 'IMPLEMENTED'
                          ? 'bg-cobalt-bright/15 text-cobalt-glow border-cobalt-bright/30'
                          : 'bg-white/5 text-midnight-300 border-white/10'
                      }`}
                    >
                      {style.maturity}
                    </span>
                  </div>

                  {/* Style Title & Tagline */}
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-2">
                    {style.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-midnight-300 line-clamp-2 leading-relaxed">
                    {style.identity.tagline}
                  </p>
                </div>

                {/* Middle: Signature Palette Swatches & Physics preview */}
                <div className="py-4 my-auto space-y-3">
                  <div className="text-[11px] font-mono text-midnight-400 uppercase tracking-wider">
                    DNA Palette & Surface
                  </div>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/20 shadow-sm"
                      style={{ backgroundColor: style.color.seed.primary }}
                      title={`Primary: ${style.color.seed.primary}`}
                    />
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/20 shadow-sm"
                      style={{ backgroundColor: style.color.seed.accent }}
                      title={`Accent: ${style.color.seed.accent}`}
                    />
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/20 shadow-sm"
                      style={{ backgroundColor: style.color.seed.background }}
                      title={`Background: ${style.color.seed.background}`}
                    />
                    <div 
                      className="w-8 h-8 rounded-lg border border-white/20 shadow-sm"
                      style={{ backgroundColor: style.color.palette.surface }}
                      title={`Surface: ${style.color.palette.surface}`}
                    />
                  </div>

                  <div className="p-3 rounded-xl bg-midnight-950/80 border border-white/5 text-xs font-mono text-midnight-300 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-midnight-500">Surface:</span>
                      <span className="text-white font-medium">{style.surfaces.style}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-midnight-500">Display Font:</span>
                      <span className="text-lime-electric truncate max-w-[140px]">{style.typography.fontRoles.display}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom: Action trigger */}
                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-midnight-400">
                    #{style.identity.catalogNumber.toString().padStart(2, '0')}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectStyle(style.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-midnight-800 hover:bg-lime-electric text-white hover:text-midnight-950 text-xs font-display font-semibold transition-all group"
                  >
                    <span>Transform in Arena</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel indicator track */}
        <div className="flex items-center justify-center gap-1.5 mt-8">
          {featuredStyles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? 'w-8 bg-lime-electric shadow-lime-glow/50'
                  : 'w-2 bg-midnight-800 hover:bg-midnight-700'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
