import React, { useState, useMemo } from 'react';
import { 
  recommendStyles, 
  ALL_STYLES, 
  RecommendationCriteria, 
  StyleRecommendation 
} from '@peak_ui/react';
import { 
  Sparkles, 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowUpRight, 
  Sliders, 
  Layers,
  ChevronRight,
  ShieldCheck,
  Zap,
  Tag
} from 'lucide-react';

interface StyleRecommenderProps {
  onSelectStyleForArena: (styleId: string) => void;
  onOpenPromptForgeWithStyle: (styleId: string) => void;
}

export const StyleRecommender: React.FC<StyleRecommenderProps> = ({
  onSelectStyleForArena,
  onOpenPromptForgeWithStyle,
}) => {
  const [query, setQuery] = useState('Developer-first cloud observability and AI telemetry platform');
  const [brandPositioning, setBrandPositioning] = useState<'technical' | 'luxury' | 'playful' | 'editorial' | 'futuristic' | 'minimal'>('technical');
  const [darkModePreferred, setDarkModePreferred] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [tactileDepth, setTactileDepth] = useState(false);
  const [strictGrid, setStrictGrid] = useState(true);

  // Quick preset chips
  const presets = [
    { label: 'AI Cloud Platform', query: 'Autonomous AI agent platform with high data density and telemetry', positioning: 'technical' },
    { label: 'High-End Couture', query: 'Luxury bespoke jewelry and horology house requiring editorial poise', positioning: 'luxury' },
    { label: 'DevSecOps CLI', query: 'Command-line tool, developer platform, zero-fatigue dark interface', positioning: 'technical' },
    { label: 'Retro Indie Game', query: 'Nostalgic 16-bit arcade social network with vibrant digital energy', positioning: 'playful' },
  ];

  // Execute real recommendation logic from @peak_ui/react
  const report = useMemo(() => {
    const criteria: RecommendationCriteria = {
      query,
      brandPositioning: brandPositioning as any,
      visualPreferences: {
        darkModePreferred,
        highContrast,
        tactileDepth,
        strictGrid,
      },
      limit: 6,
    };
    return recommendStyles(criteria);
  }, [query, brandPositioning, darkModePreferred, highContrast, tactileDepth, strictGrid]);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ALGORITHMIC INTENT CLUSTERING</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
            Style Recommendation Engine
          </h1>
          <p className="text-sm sm:text-base text-midnight-300 mt-2 max-w-2xl">
            Describe your product, brand personality, and technical constraints. Peak UI's recommendation engine
            evaluates 28 canonical languages against 12 intent clusters with verified compatibility scores.
          </p>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-midnight-500 uppercase mr-1">Quick Presets:</span>
        {presets.map((preset, i) => (
          <button
            key={i}
            onClick={() => {
              setQuery(preset.query);
              setBrandPositioning(preset.positioning as any);
            }}
            className="px-3 py-1 rounded-full bg-midnight-900 hover:bg-midnight-850 border border-white/10 hover:border-white/20 text-xs text-midnight-300 hover:text-white transition-all font-mono"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Input Matrix */}
      <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-6 shadow-subtle-card">
        {/* Natural Language Query */}
        <div>
          <label className="text-xs font-mono text-lime-electric uppercase font-bold block mb-2">
            Natural-Language Product & Aesthetic Description
          </label>
          <div className="relative">
            <Search className="w-4 h-4 text-midnight-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. High-density financial trading terminal with strict contrast and dark mode"
              className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-midnight-950 border border-white/15 text-white placeholder-midnight-500 focus:outline-none focus:border-lime-electric transition-colors"
            />
          </div>
        </div>

        {/* Brand Positioning & Visual Preferences */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-white/5">
          {/* Brand Positioning */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-midnight-400 uppercase font-semibold block">
              Brand Positioning Vector
            </span>
            <div className="flex flex-wrap gap-1.5">
              {(['technical', 'luxury', 'playful', 'editorial', 'futuristic', 'minimal'] as const).map((pos) => (
                <button
                  key={pos}
                  onClick={() => setBrandPositioning(pos)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all border ${
                    brandPositioning === pos
                      ? 'bg-lime-electric text-midnight-950 font-bold border-lime-electric'
                      : 'bg-midnight-950 text-midnight-300 border-white/10 hover:text-white'
                  }`}
                >
                  {pos}
                </button>
              ))}
            </div>
          </div>

          {/* Visual Toggles */}
          <div className="space-y-2">
            <span className="text-xs font-mono text-midnight-400 uppercase font-semibold block">
              Visual Physics Preferences
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <label className="flex items-center gap-2 p-2 rounded-lg bg-midnight-950 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={darkModePreferred}
                  onChange={(e) => setDarkModePreferred(e.target.checked)}
                  className="accent-lime-electric rounded"
                />
                <span className="text-midnight-300">Dark Mode Canvas</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-midnight-950 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={strictGrid}
                  onChange={(e) => setStrictGrid(e.target.checked)}
                  className="accent-lime-electric rounded"
                />
                <span className="text-midnight-300">Strict Grid Discipline</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-midnight-950 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tactileDepth}
                  onChange={(e) => setTactileDepth(e.target.checked)}
                  className="accent-lime-electric rounded"
                />
                <span className="text-midnight-300">Physical Tactile Depth</span>
              </label>

              <label className="flex items-center gap-2 p-2 rounded-lg bg-midnight-950 border border-white/5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="accent-lime-electric rounded"
                />
                <span className="text-midnight-300">High Contrast (AAA)</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-midnight-400">
          <span>Detected Intent Clusters: <strong className="text-lime-electric">{report.detectedIntents.join(', ')}</strong></span>
          <span>{report.recommendations.length} Recommended Languages</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {report.recommendations.map((rec, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={rec.styleId}
                className={`rounded-2xl border p-6 flex flex-col justify-between transition-all relative overflow-hidden ${
                  isTop
                    ? 'border-lime-electric/60 bg-midnight-900 shadow-lime-glow/20 ring-1 ring-lime-electric/30'
                    : 'border-white/10 bg-midnight-900/60 hover:bg-midnight-900 hover:border-white/20'
                }`}
              >
                {/* Top Badge */}
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs font-mono">
                    <span className="text-midnight-400">
                      #{idx + 1} Match · {rec.familyName}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-lime-electric/15 text-lime-electric border border-lime-electric/30 font-bold">
                        {rec.score}% Fit
                      </span>
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-display font-extrabold text-white tracking-tight mb-1">
                    {rec.name}
                  </h3>
                  <p className="text-xs text-midnight-300 mb-4">{rec.tagline}</p>

                  {/* Why this style is recommended */}
                  <div className="space-y-2 mb-4">
                    <div className="text-[11px] font-mono uppercase text-lime-electric font-semibold">
                      Why Recommended:
                    </div>
                    <ul className="space-y-1.5 text-xs text-midnight-200">
                      {rec.reasons.slice(0, 2).map((reason, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2 bg-midnight-950 p-2 rounded-lg border border-white/5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-lime-electric shrink-0 mt-0.5" />
                          <span>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Differentiation note */}
                  <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 text-xs text-midnight-300 mb-4">
                    <div className="text-[10px] font-mono text-midnight-500 uppercase mb-0.5">Differentiation:</div>
                    <p className="leading-relaxed">{rec.differentiationNote}</p>
                  </div>

                  {/* Warnings if any */}
                  {rec.warnings && rec.warnings.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-start gap-2 mb-4">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{rec.warnings[0]}</span>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onOpenPromptForgeWithStyle(rec.styleId)}
                    className="text-xs text-midnight-300 hover:text-white font-mono flex items-center gap-1"
                  >
                    <Sliders className="w-3.5 h-3.5 text-lime-electric" />
                    <span>Forge Prompt</span>
                  </button>

                  <button
                    onClick={() => onSelectStyleForArena(rec.styleId)}
                    className="px-3.5 py-1.5 rounded-lg bg-lime-electric hover:bg-lime-glow text-midnight-950 text-xs font-display font-bold shadow-lime-glow flex items-center gap-1 transition-all"
                  >
                    <span>Launch in Arena</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
