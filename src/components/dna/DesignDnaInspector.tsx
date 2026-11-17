import React, { useState, useMemo } from 'react';
import { 
  ALL_STYLES, 
  getStyleById, 
  requireStyleById, 
  generateTokens,
  DesignDNA
} from '@peak_ui/react';
import { 
  Dna, 
  Sparkles, 
  Copy, 
  Check, 
  Code, 
  Palette, 
  Type, 
  Layers, 
  Box, 
  Activity, 
  ShieldCheck, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';

export const DesignDnaInspector: React.FC = () => {
  const [selectedStyleId, setSelectedStyleId] = useState<string>('neo-brutalism');
  const [viewFormat, setViewFormat] = useState<'visual' | 'json' | 'css'>('visual');
  const [copied, setCopied] = useState<boolean>(false);

  const dna = useMemo(() => {
    return getStyleById(selectedStyleId) || requireStyleById('neo-brutalism');
  }, [selectedStyleId]);

  const tokenBundle = useMemo(() => generateTokens(dna), [dna]);

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Dna className="w-3.5 h-3.5" />
            <span>SCHEMA ARCHITECTURE & TOKENS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
            Design DNA Inspector
          </h1>
          <p className="text-sm sm:text-base text-midnight-300 mt-2 max-w-2xl">
            Inspect the canonical 28-dimension design parameter schema: exact seed colors, typography scale ratios,
            surface blur physics, elevation presets, and AI agent instructions.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center p-1 rounded-2xl bg-[#0D1017] border border-white/15 text-xs font-mono">
            <button
              onClick={() => setViewFormat('visual')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                viewFormat === 'visual' ? 'bg-[#D7FF35] text-[#080A08] font-bold shadow-sm' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Visual Deck
            </button>
            <button
              onClick={() => setViewFormat('css')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                viewFormat === 'css' ? 'bg-[#D7FF35] text-[#080A08] font-bold shadow-sm' : 'text-zinc-300 hover:text-white'
              }`}
            >
              CSS Variables
            </button>
            <button
              onClick={() => setViewFormat('json')}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                viewFormat === 'json' ? 'bg-[#D7FF35] text-[#080A08] font-bold shadow-sm' : 'text-zinc-300 hover:text-white'
              }`}
            >
              Full DNA JSON
            </button>
          </div>
        </div>
      </div>

      {/* Style Switcher Bar */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider shrink-0">
          Target Language:
        </span>
        <div className="flex items-center gap-2">
          {ALL_STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedStyleId(s.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                selectedStyleId === s.id
                  ? 'bg-[#D7FF35] text-[#080A08] border-[#D7FF35] font-bold shadow-sm'
                  : 'bg-[#12151E] border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Dynamic Content View */}
      {viewFormat === 'visual' && (
        <div className="space-y-8">
          {/* Identity & Core Philosophy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-lime-electric uppercase font-bold">
                Catalog Identity
              </div>
              <div className="text-2xl font-display font-extrabold text-white">
                {dna.name}
              </div>
              <div className="text-xs font-mono text-midnight-400">
                Family: <span className="text-white">{dna.family}</span> · #{dna.identity.catalogNumber.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-midnight-300 pt-2 leading-relaxed">
                {dna.identity.tagline}
              </div>
            </div>

            <div className="md:col-span-2 p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-2">
              <div className="text-xs font-mono text-lime-electric uppercase font-bold">
                Design Philosophy
              </div>
              <p className="text-xs sm:text-sm text-midnight-200 leading-relaxed font-sans">
                {dna.philosophy}
              </p>
              <div className="pt-2 text-xs font-mono text-midnight-400">
                Personality Traits: <span className="text-lime-electric">{dna.identity.personalityTags.join(', ')}</span>
              </div>
            </div>
          </div>

          {/* Color & Surface Physics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Color Seeds & Semantic Palette */}
            <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
              <div className="text-xs font-mono text-lime-electric uppercase font-bold flex items-center justify-between">
                <span>Color Seeds & Palette</span>
                <span className="text-[10px] text-midnight-400">Contrast: {dna.color.contrastTarget} ({dna.accessibility.minContrast}:1)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                  <div className="w-full h-8 rounded-lg border border-white/20" style={{ backgroundColor: dna.color.seed.primary }} />
                  <div>
                    <div className="text-[10px] text-midnight-500">Primary</div>
                    <div className="text-white text-[11px] font-bold">{dna.color.seed.primary}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                  <div className="w-full h-8 rounded-lg border border-white/20" style={{ backgroundColor: dna.color.seed.accent }} />
                  <div>
                    <div className="text-[10px] text-midnight-500">Accent</div>
                    <div className="text-white text-[11px] font-bold">{dna.color.seed.accent}</div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                  <div className="w-full h-8 rounded-lg border border-white/20" style={{ backgroundColor: dna.color.seed.background }} />
                  <div>
                    <div className="text-[10px] text-midnight-500">Canvas</div>
                    <div className="text-white text-[11px] font-bold">{dna.color.seed.background}</div>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 text-xs text-midnight-300">
                <p className="font-sans leading-relaxed">{dna.color.philosophy}</p>
              </div>
            </div>

            {/* Surface & Shadow Physics */}
            <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
              <div className="text-xs font-mono text-lime-electric uppercase font-bold flex items-center justify-between">
                <span>Surface & Elevation Physics</span>
                <span className="text-[10px] text-midnight-400">{dna.surfaces.style}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 space-y-1">
                  <div className="text-[10px] text-midnight-500">Surface Blur</div>
                  <div className="text-white text-sm font-bold">{dna.surfaces.blur !== undefined ? `${dna.surfaces.blur}px` : '0px'}</div>
                  <div className="text-[10px] text-midnight-400">Opacity: {dna.surfaces.opacity}</div>
                </div>

                <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 space-y-1">
                  <div className="text-[10px] text-midnight-500">Elevation Levels</div>
                  <div className="text-white text-sm font-bold">{dna.shadows.elevationLevels}</div>
                  <div className="text-[10px] text-midnight-400 truncate">{dna.shadows.philosophy}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-midnight-950 border border-white/5 text-xs text-midnight-300 space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-midnight-500">Medium Shadow:</span>
                  <span className="text-lime-electric truncate max-w-[200px]">{dna.shadows.presets.md || 'none'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Interactive Shadow:</span>
                  <span className="text-lime-electric truncate max-w-[200px]">{dna.shadows.presets.interactive || 'none'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Typography & Spacing Scale */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Typography */}
            <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-3 font-mono text-xs">
              <div className="text-xs text-lime-electric uppercase font-bold">
                Typography Scale & Treatment
              </div>
              <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-midnight-500">Display Role:</span>
                  <span className="text-white font-medium">{dna.typography.fontRoles.display}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Body Role:</span>
                  <span className="text-white">{dna.typography.fontRoles.body}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Mono Role:</span>
                  <span className="text-white">{dna.typography.fontRoles.mono || 'monospace'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Scale Ratio:</span>
                  <span className="text-lime-electric font-bold">{dna.typography.scaleRatio}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Weights:</span>
                  <span className="text-white">{dna.typography.weights.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Borders & Spacing */}
            <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-3 font-mono text-xs">
              <div className="text-xs text-lime-electric uppercase font-bold">
                Borders & Spatial Rhythm
              </div>
              <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                <div className="flex justify-between">
                  <span className="text-midnight-500">Base Spacing Unit:</span>
                  <span className="text-white font-bold">{dna.spacing.baseUnit}px ({dna.spacing.density})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Radius Scale:</span>
                  <span className="text-white">{dna.borders.radiusScale.join(' · ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Border Width Scale:</span>
                  <span className="text-white">{dna.borders.widthScale.join(' · ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-midnight-500">Max Layout Width:</span>
                  <span className="text-lime-electric font-medium">{dna.layout.maxWidth}</span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Guidance: Directives & Anti-patterns */}
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-4">
            <div className="text-xs font-mono text-lime-electric uppercase font-bold flex items-center justify-between">
              <span>AI Coding Agent System Guidance</span>
              <span className="text-[10px] text-midnight-400">For Claude Code, Cursor & Antigravity</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                <div className="font-mono text-emerald-400 font-bold uppercase">
                  Mandatory Execution Directives
                </div>
                <ul className="space-y-1.5 text-midnight-300">
                  {dna.aiGuidance.positiveInstructions.map((inst, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                      <span>{inst}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-midnight-950 border border-white/5 space-y-2">
                <div className="font-mono text-red-400 font-bold uppercase">
                  Strictly Forbidden Anti-Patterns
                </div>
                <ul className="space-y-1.5 text-midnight-300">
                  {dna.antiPatterns.map((anti, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                      <span>{anti}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Raw CSS Mode */}
      {viewFormat === 'css' && (
        <div className="rounded-2xl bg-midnight-900 border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs font-mono">
            <span className="text-lime-electric font-bold">
              tokens/{dna.id}/tokens.css (Generated by @peak_ui/react)
            </span>
            <button
              onClick={() => handleCopy(tokenBundle.css)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12151E] hover:bg-[#1A1F2C] border border-white/20 text-white font-medium text-xs transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy CSS'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs text-midnight-300 overflow-x-auto p-4 rounded-xl bg-midnight-950 max-h-[500px]">
            {tokenBundle.css}
          </pre>
        </div>
      )}

      {/* Raw JSON Mode */}
      {viewFormat === 'json' && (
        <div className="rounded-2xl bg-midnight-900 border border-white/10 p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 text-xs font-mono">
            <span className="text-lime-electric font-bold">
              DesignDNA Schema Object ({dna.id})
            </span>
            <button
              onClick={() => handleCopy(JSON.stringify(dna, null, 2))}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#12151E] hover:bg-[#1A1F2C] border border-white/20 text-white font-medium text-xs transition-colors shadow-sm"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
          </div>
          <pre className="font-mono text-xs text-midnight-300 overflow-x-auto p-4 rounded-xl bg-midnight-950 max-h-[500px]">
            {JSON.stringify(dna, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
