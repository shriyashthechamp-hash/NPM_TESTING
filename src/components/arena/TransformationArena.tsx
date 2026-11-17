import React, { useState, useMemo } from 'react';
import { 
  ALL_STYLES, 
  ALL_FAMILIES, 
  getStyleById, 
  requireStyleById, 
  getFamilyById, 
  generateTokens,
  StyleFamilyId
} from '@peak_ui/react';
import { ReferenceAppId, ViewportMode, ActiveTab } from '../../types';
import { REFERENCE_APPS } from '../../data/referenceApps';
import { computeStylePackage } from '../../lib/styleAdapters';
import { ReferenceAppPreview } from './ReferenceAppPreview';
import { 
  Sparkles, 
  Layers, 
  Maximize2, 
  Monitor, 
  Tablet, 
  Smartphone, 
  SplitSquareVertical, 
  Search, 
  Copy, 
  Check, 
  RotateCcw, 
  Sliders, 
  Dna, 
  ChevronRight,
  ExternalLink,
  Code,
  ShieldAlert,
  Info
} from 'lucide-react';

interface TransformationArenaProps {
  initialStyleId?: string;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenPromptForgeWithStyle?: (styleId: string) => void;
}

export const TransformationArena: React.FC<TransformationArenaProps> = ({
  initialStyleId = 'neo-brutalism',
  setActiveTab,
  onOpenPromptForgeWithStyle
}) => {
  // State
  const [selectedAppId, setSelectedAppId] = useState<ReferenceAppId>('analytics');
  const [primaryStyleId, setPrimaryStyleId] = useState<string>(initialStyleId);
  const [secondaryStyleId, setSecondaryStyleId] = useState<string>('glassmorphism');
  const [comparisonMode, setComparisonMode] = useState<boolean>(false);
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [copiedTokens, setCopiedTokens] = useState<boolean>(false);
  const [tokenViewMode, setTokenViewMode] = useState<'css' | 'ts'>('css');

  // Compute primary and secondary style packages
  const primaryDNA = useMemo(() => {
    return getStyleById(primaryStyleId) || requireStyleById('neo-brutalism');
  }, [primaryStyleId]);

  const secondaryDNA = useMemo(() => {
    return getStyleById(secondaryStyleId) || requireStyleById('glassmorphism');
  }, [secondaryStyleId]);

  const primaryStylePkg = useMemo(() => computeStylePackage(primaryDNA), [primaryDNA]);
  const secondaryStylePkg = useMemo(() => computeStylePackage(secondaryDNA), [secondaryDNA]);

  // Filtered styles for catalog list
  const filteredStyles = useMemo(() => {
    return ALL_STYLES.filter((style) => {
      const matchesFamily = selectedFamily === 'all' || style.family === selectedFamily;
      const matchesSearch = 
        style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        style.identity.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFamily && matchesSearch;
    });
  }, [selectedFamily, searchQuery]);

  const primaryFamily = getFamilyById(primaryDNA.family);

  // Copy token handler
  const handleCopyTokens = () => {
    const { css, ts } = generateTokens(primaryDNA);
    navigator.clipboard.writeText(tokenViewMode === 'css' ? css : ts);
    setCopiedTokens(true);
    setTimeout(() => setCopiedTokens(false), 2000);
  };

  // Viewport container width class
  const viewportWidthClass = {
    desktop: 'w-full max-w-full',
    tablet: 'w-full max-w-[768px]',
    mobile: 'w-full max-w-[390px]',
  }[viewport];

  return (
    <div className="min-h-screen bg-midnight-950 text-midnight-100 flex flex-col">
      {/* Workspace Top Command Bar */}
      <div className="border-b border-white/5 bg-midnight-900/80 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Section identifier */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-lime-electric/15 border border-lime-electric/30 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-lime-electric" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display font-extrabold text-sm sm:text-base text-white tracking-tight">
                Transformation Arena
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-electric/20 text-lime-electric border border-lime-electric/30 font-bold uppercase">
                Active Engine
              </span>
            </div>
            <p className="text-xs text-midnight-400">Transform the same reference interface across 28 distinct design languages</p>
          </div>
        </div>

        {/* Center: Reference App Switcher */}
        <div className="flex items-center gap-1.5 bg-midnight-950 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
          {REFERENCE_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => setSelectedAppId(app.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedAppId === app.id
                  ? 'bg-midnight-800 text-lime-electric font-bold border border-lime-electric/30 shadow-sm'
                  : 'text-midnight-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {app.title.split(' ')[0]} {app.title.split(' ')[1]}
            </button>
          ))}
        </div>

        {/* Right: Viewport & Comparison Controls */}
        <div className="flex items-center gap-2">
          {/* Comparison Mode Toggle */}
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all border ${
              comparisonMode
                ? 'bg-cobalt-bright/20 border-cobalt-glow text-cobalt-glow'
                : 'bg-midnight-900 border-white/10 text-midnight-300 hover:text-white'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Compare Dual Styles</span>
          </button>

          {/* Viewport Selector */}
          <div className="flex items-center gap-1 bg-midnight-950 p-1 rounded-lg border border-white/10">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewport === 'desktop' ? 'bg-midnight-800 text-white' : 'text-midnight-500 hover:text-white'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewport === 'tablet' ? 'bg-midnight-800 text-white' : 'text-midnight-500 hover:text-white'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded text-xs transition-colors ${
                viewport === 'mobile' ? 'bg-midnight-800 text-white' : 'text-midnight-500 hover:text-white'
              }`}
              title="Mobile View (390px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Panel Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden">
        {/* ================= LEFT PANEL: Catalog & Style Selector ================= */}
        <aside className="lg:col-span-3 border-r border-white/5 bg-midnight-950 p-4 flex flex-col space-y-4 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-midnight-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 28 styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-midnight-900 border border-white/10 text-white placeholder-midnight-500 focus:outline-none focus:border-lime-electric/50 transition-colors"
            />
          </div>

          {/* Family Filters */}
          <div className="space-y-1">
            <div className="text-[11px] font-mono text-midnight-500 uppercase tracking-wider px-1">
              Design Family
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setSelectedFamily('all')}
                className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                  selectedFamily === 'all'
                    ? 'bg-lime-electric text-midnight-950 font-bold'
                    : 'bg-midnight-900 text-midnight-400 hover:text-white'
                }`}
              >
                All (28)
              </button>
              {ALL_FAMILIES.filter(f => f.id !== 'extension').map((family) => (
                <button
                  key={family.id}
                  onClick={() => setSelectedFamily(family.id)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                    selectedFamily === family.id
                      ? 'bg-lime-electric text-midnight-950 font-bold'
                      : 'bg-midnight-900 text-midnight-400 hover:text-white'
                  }`}
                >
                  {family.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* If comparison mode, choose secondary style */}
          {comparisonMode && (
            <div className="p-3 rounded-xl bg-cobalt-electric/10 border border-cobalt-bright/30 space-y-2">
              <div className="text-[11px] font-mono text-cobalt-glow uppercase font-bold flex items-center justify-between">
                <span>Secondary Comparison Style</span>
                <span className="text-[10px] text-midnight-400">Right Pane</span>
              </div>
              <select
                value={secondaryStyleId}
                onChange={(e) => setSecondaryStyleId(e.target.value)}
                className="w-full bg-midnight-900 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-cobalt-glow"
              >
                {ALL_STYLES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.maturity})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Style list */}
          <div className="flex-1 space-y-1.5">
            <div className="text-[11px] font-mono text-midnight-500 uppercase tracking-wider px-1 mb-2">
              Select Primary Style ({filteredStyles.length})
            </div>

            {filteredStyles.map((style) => {
              const isSelected = primaryStyleId === style.id;
              const isImplemented = style.maturity === 'IMPLEMENTED' || style.maturity === 'VALIDATED';

              return (
                <button
                  key={style.id}
                  onClick={() => setPrimaryStyleId(style.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-midnight-900 border-lime-electric/60 shadow-lime-glow/20 ring-1 ring-lime-electric/30'
                      : 'bg-midnight-900/40 border-white/5 hover:border-white/15 hover:bg-midnight-900/80'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full border border-white/20"
                        style={{ backgroundColor: style.color.seed.primary }}
                      />
                      <span className={`text-xs font-display font-bold ${isSelected ? 'text-lime-electric' : 'text-white'}`}>
                        {style.name}
                      </span>
                    </div>
                    <div className="text-[10px] text-midnight-400 line-clamp-1">
                      {style.identity.tagline}
                    </div>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                      style.maturity === 'VALIDATED'
                        ? 'bg-lime-electric/15 text-lime-electric border border-lime-electric/30'
                        : style.maturity === 'IMPLEMENTED'
                        ? 'bg-cobalt-bright/15 text-cobalt-glow border border-cobalt-bright/30'
                        : 'bg-white/5 text-midnight-500 border border-white/5'
                    }`}
                  >
                    {style.maturity}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* ================= CENTER PANEL: Live Interface Preview ================= */}
        <main className="lg:col-span-6 bg-midnight-950 p-4 sm:p-6 flex flex-col items-center justify-start overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* Honest Maturity Status Banner */}
          <div className="w-full mb-4">
            {primaryDNA.maturity === 'VALIDATED' || primaryDNA.maturity === 'IMPLEMENTED' ? (
              <div className="p-3 rounded-xl bg-lime-electric/10 border border-lime-electric/30 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-lime-electric animate-pulse" />
                  <span className="font-mono text-lime-electric font-semibold">
                    PRODUCTION READY ADAPTER: {primaryDNA.name}
                  </span>
                </div>
                <span className="text-[10px] text-midnight-400">
                  Real tokens & CSS variables active
                </span>
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-midnight-900 border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-midnight-400" />
                  <span className="font-mono text-midnight-300">
                    MODELED EXPLORATION: {primaryDNA.name}
                  </span>
                </div>
                <span className="text-[10px] text-midnight-500">
                  Exploratory preview from canonical DNA
                </span>
              </div>
            )}
          </div>

          {/* Preview Viewport Frame */}
          <div className={`transition-all duration-300 ${viewportWidthClass}`}>
            {comparisonMode ? (
              /* DUAL SPLIT SCREEN COMPARISON */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Left: Style A */}
                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-midnight-900">
                  <div className="bg-midnight-900/90 px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-lime-electric font-bold">{primaryDNA.name}</span>
                    <span className="text-midnight-400 text-[10px]">{primaryDNA.maturity}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <ReferenceAppPreview appId={selectedAppId} stylePkg={primaryStylePkg} />
                  </div>
                </div>

                {/* Right: Style B */}
                <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-midnight-900">
                  <div className="bg-midnight-900/90 px-4 py-2 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                    <span className="text-cobalt-glow font-bold">{secondaryDNA.name}</span>
                    <span className="text-midnight-400 text-[10px]">{secondaryDNA.maturity}</span>
                  </div>
                  <div className="overflow-x-auto">
                    <ReferenceAppPreview appId={selectedAppId} stylePkg={secondaryStylePkg} />
                  </div>
                </div>
              </div>
            ) : (
              /* SINGLE HERO VIEWPORT */
              <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-midnight-900 transition-all">
                {/* Simulated Browser Frame Bar */}
                <div className="bg-midnight-900/90 px-4 py-2.5 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-midnight-400 text-[11px]">
                      preview.peak-ui.dev/{primaryDNA.id}/{selectedAppId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-midnight-400">
                      {primaryFamily?.name || primaryDNA.family}
                    </span>
                  </div>
                </div>

                {/* Rendered Reference App */}
                <div className="overflow-x-auto">
                  <ReferenceAppPreview appId={selectedAppId} stylePkg={primaryStylePkg} />
                </div>
              </div>
            )}
          </div>
        </main>

        {/* ================= RIGHT PANEL: Token & DNA Inspector ================= */}
        <aside className="lg:col-span-3 border-l border-white/5 bg-midnight-950 p-4 sm:p-5 flex flex-col space-y-6 max-h-[calc(100vh-120px)] overflow-y-auto">
          {/* Active Style DNA Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-midnight-500 uppercase tracking-wider">
                Style DNA Profile
              </span>
              <span className="text-[10px] font-mono text-lime-electric">
                #{primaryDNA.identity.catalogNumber.toString().padStart(2, '0')}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-midnight-900/80 border border-white/10 space-y-2">
              <div className="text-xl font-display font-extrabold text-white">
                {primaryDNA.name}
              </div>
              <p className="text-xs text-midnight-300 leading-relaxed">
                {primaryDNA.philosophy}
              </p>
            </div>
          </div>

          {/* Color Palette Swatches */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-midnight-500 uppercase tracking-wider">
              Color Token Seeds
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-midnight-900 border border-white/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: primaryDNA.color.seed.primary }} />
                <div>
                  <div className="text-[10px] text-midnight-400">Primary</div>
                  <div className="text-white text-[11px]">{primaryDNA.color.seed.primary}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-midnight-900 border border-white/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: primaryDNA.color.seed.accent }} />
                <div>
                  <div className="text-[10px] text-midnight-400">Accent</div>
                  <div className="text-white text-[11px]">{primaryDNA.color.seed.accent}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-midnight-900 border border-white/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: primaryDNA.color.seed.background }} />
                <div>
                  <div className="text-[10px] text-midnight-400">Canvas</div>
                  <div className="text-white text-[11px]">{primaryDNA.color.seed.background}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-midnight-900 border border-white/5 flex items-center gap-2">
                <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: primaryDNA.color.palette.surface }} />
                <div>
                  <div className="text-[10px] text-midnight-400">Surface</div>
                  <div className="text-white text-[11px]">{primaryDNA.color.palette.surface}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Typography System */}
          <div className="space-y-2">
            <div className="text-[11px] font-mono text-midnight-500 uppercase tracking-wider">
              Typography Hierarchy
            </div>
            <div className="p-3 rounded-xl bg-midnight-900 border border-white/5 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-midnight-500">Display:</span>
                <span className="text-lime-electric truncate max-w-[140px] font-medium">{primaryDNA.typography.fontRoles.display}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-midnight-500">Body:</span>
                <span className="text-white truncate max-w-[140px]">{primaryDNA.typography.fontRoles.body}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-midnight-500">Scale Ratio:</span>
                <span className="text-white font-bold">{primaryDNA.typography.scaleRatio}</span>
              </div>
            </div>
          </div>

          {/* Live Token Inspector */}
          <div className="space-y-2 flex-1 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-midnight-500 uppercase tracking-wider">
                Live Token Compiler
              </span>
              <div className="flex items-center gap-1 text-[10px] font-mono">
                <button
                  onClick={() => setTokenViewMode('css')}
                  className={`px-1.5 py-0.5 rounded ${tokenViewMode === 'css' ? 'bg-lime-electric text-midnight-950 font-bold' : 'text-midnight-400'}`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setTokenViewMode('ts')}
                  className={`px-1.5 py-0.5 rounded ${tokenViewMode === 'ts' ? 'bg-lime-electric text-midnight-950 font-bold' : 'text-midnight-400'}`}
                >
                  TS
                </button>
              </div>
            </div>

            <div className="relative rounded-xl bg-midnight-900 border border-white/10 p-3 font-mono text-[11px] text-midnight-300 max-h-48 overflow-y-auto">
              <pre>
                {tokenViewMode === 'css'
                  ? primaryStylePkg.rawCss.slice(0, 500) + '\n/* ... +28 tokens */'
                  : JSON.stringify(primaryStylePkg.cssVariables, null, 2).slice(0, 500) + '\n...'}
              </pre>
            </div>

            <button
              onClick={handleCopyTokens}
              className="w-full py-2.5 px-3 rounded-xl bg-midnight-900 hover:bg-midnight-850 border border-white/10 text-xs font-mono text-midnight-200 hover:text-white flex items-center justify-center gap-2 transition-all active:scale-98"
            >
              {copiedTokens ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedTokens ? 'Tokens Copied!' : `Copy ${tokenViewMode.toUpperCase()} Tokens`}</span>
            </button>
          </div>

          {/* Quick Actions */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <button
              onClick={() => {
                if (onOpenPromptForgeWithStyle) {
                  onOpenPromptForgeWithStyle(primaryDNA.id);
                } else {
                  setActiveTab('prompt');
                }
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-lime-electric hover:bg-lime-glow text-midnight-950 font-display font-bold text-xs flex items-center justify-center gap-2 shadow-lime-glow transition-all active:scale-98"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Forge AI Prompt with this Style</span>
            </button>

            <button
              onClick={() => setActiveTab('dna')}
              className="w-full py-2 px-3 rounded-xl bg-midnight-900 hover:bg-midnight-850 text-midnight-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
            >
              <Dna className="w-3.5 h-3.5" />
              <span>Inspect Full DNA Hierarchy</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
