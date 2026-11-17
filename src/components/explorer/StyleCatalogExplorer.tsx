import React, { useState, useMemo } from 'react';
import { 
  ALL_STYLES, 
  ALL_FAMILIES, 
  CANONICAL_STYLES, 
  getFamilyById, 
  getStyleDocumentationModel,
  StyleFamilyId,
  StyleMaturity,
  DesignDNA
} from '@peak_ui/react';
import { 
  Search, 
  Filter, 
  Sparkles, 
  ArrowUpRight, 
  Sliders, 
  Copy, 
  Check, 
  Info, 
  X, 
  CheckCircle2, 
  AlertTriangle,
  Terminal,
  ExternalLink,
  Dna
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface StyleCatalogExplorerProps {
  onSelectStyleForArena: (styleId: string) => void;
  onOpenPromptForgeWithStyle: (styleId: string) => void;
}

export const StyleCatalogExplorer: React.FC<StyleCatalogExplorerProps> = ({
  onSelectStyleForArena,
  onOpenPromptForgeWithStyle,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedMaturity, setSelectedMaturity] = useState<string>('all');
  const [activeModalStyleId, setActiveModalStyleId] = useState<string | null>(null);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  // Filtered styles
  const filteredStyles = useMemo(() => {
    return ALL_STYLES.filter((style) => {
      const matchesFamily = selectedFamily === 'all' || style.family === selectedFamily;
      const matchesMaturity = selectedMaturity === 'all' || style.maturity === selectedMaturity;
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        style.name.toLowerCase().includes(q) ||
        style.id.toLowerCase().includes(q) ||
        style.identity.tagline.toLowerCase().includes(q) ||
        style.philosophy.toLowerCase().includes(q) ||
        style.useCases.bestFor.some((b) => b.toLowerCase().includes(q)) ||
        style.identity.personalityTags.some((t) => t.toLowerCase().includes(q));

      return matchesFamily && matchesMaturity && matchesSearch;
    });
  }, [searchQuery, selectedFamily, selectedMaturity]);

  const activeDocModel = useMemo(() => {
    if (!activeModalStyleId) return null;
    return getStyleDocumentationModel(activeModalStyleId);
  }, [activeModalStyleId]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>CANONICAL CATALOG MATRIX</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
            28 Visual Languages
          </h1>
          <p className="text-sm sm:text-base text-midnight-300 mt-2 max-w-2xl">
            Five fundamental design families unified by one design intelligence engine.
            Explore color seeds, typography ratios, surface materials, and anti-patterns for every design language.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="px-3.5 py-2 rounded-xl bg-midnight-900 border border-white/10">
            <span className="text-lime-electric font-bold">28</span> Canonical + 1 Extension
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-midnight-900 border border-white/10">
            <span className="text-cobalt-glow font-bold">5</span> Families
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-midnight-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, industry, aesthetic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-midnight-900 border border-white/10 text-white placeholder-midnight-500 focus:outline-none focus:border-lime-electric/50 transition-colors shadow-subtle-card"
          />
        </div>

        {/* Family Pill Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          <button
            onClick={() => setSelectedFamily('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
              selectedFamily === 'all'
                ? 'bg-lime-electric text-midnight-950 font-bold'
                : 'bg-midnight-900 text-midnight-400 hover:text-white'
            }`}
          >
            All Families
          </button>
          {ALL_FAMILIES.map((fam) => (
            <button
              key={fam.id}
              onClick={() => setSelectedFamily(fam.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedFamily === fam.id
                  ? 'bg-lime-electric text-midnight-950 font-bold'
                  : 'bg-midnight-900 text-midnight-400 hover:text-white'
              }`}
            >
              {fam.name}
            </button>
          ))}
        </div>

        {/* Maturity Filter */}
        <div className="flex items-center gap-1.5 text-xs font-mono self-end md:self-auto">
          <span className="text-midnight-500">Maturity:</span>
          {['all', 'VALIDATED', 'IMPLEMENTED', 'MODELED'].map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMaturity(m)}
              className={`px-2 py-1 rounded text-[11px] uppercase transition-colors ${
                selectedMaturity === m
                  ? 'bg-midnight-800 text-lime-electric border border-lime-electric/30 font-bold'
                  : 'text-midnight-400 hover:text-white'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 28 Styles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredStyles.map((style) => {
          const family = getFamilyById(style.family);
          const isImplemented = style.maturity === 'VALIDATED' || style.maturity === 'IMPLEMENTED';

          return (
            <div
              key={style.id}
              className="rounded-2xl border border-white/5 bg-midnight-900/50 hover:bg-midnight-900/90 hover:border-white/15 p-5 flex flex-col justify-between transition-all group shadow-subtle-card hover:-translate-y-1"
            >
              <div>
                {/* Header: Family & Catalog # & Status */}
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="text-midnight-500">
                    #{style.identity.catalogNumber.toString().padStart(2, '0')} · {family?.name || style.family}
                  </span>
                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                      style.maturity === 'VALIDATED'
                        ? 'bg-lime-electric/15 text-lime-electric border border-lime-electric/30'
                        : style.maturity === 'IMPLEMENTED'
                        ? 'bg-cobalt-bright/15 text-cobalt-glow border border-cobalt-bright/30'
                        : 'bg-white/5 text-midnight-400 border border-white/10'
                    }`}
                  >
                    {style.maturity}
                  </span>
                </div>

                {/* Style Title & Tagline */}
                <h3 className="text-xl font-display font-extrabold text-white tracking-tight mb-2 group-hover:text-lime-electric transition-colors">
                  {style.name}
                </h3>
                <p className="text-xs text-midnight-300 line-clamp-2 leading-relaxed mb-4">
                  {style.identity.tagline}
                </p>

                {/* Color Palette Swatches */}
                <div className="flex items-center gap-1.5 mb-4">
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: style.color.seed.primary }}
                    title={`Primary: ${style.color.seed.primary}`}
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: style.color.seed.accent }}
                    title={`Accent: ${style.color.seed.accent}`}
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: style.color.seed.background }}
                    title={`Background: ${style.color.seed.background}`}
                  />
                  <div
                    className="w-6 h-6 rounded-md border border-white/20 shadow-sm"
                    style={{ backgroundColor: style.color.palette.surface }}
                    title={`Surface: ${style.color.palette.surface}`}
                  />
                  <span className="text-[10px] font-mono text-midnight-500 ml-1">
                    {style.surfaces.style}
                  </span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <button
                  onClick={() => setActiveModalStyleId(style.id)}
                  className="text-xs text-midnight-300 hover:text-white font-mono flex items-center gap-1 py-1"
                >
                  <Info className="w-3.5 h-3.5 text-lime-electric" />
                  <span>Inspect DNA</span>
                </button>

                <button
                  onClick={() => onSelectStyleForArena(style.id)}
                  className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-lime text-white hover:text-black text-xs font-bold font-sans flex items-center gap-1.5 transition-all group/btn shadow-sm"
                >
                  <span>Transform</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Style Detailed Inspection Drawer / Modal */}
      {activeDocModel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight-950/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-midnight-900 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-lime-electric">
                    #{activeDocModel.catalogNumber.toString().padStart(2, '0')} · {activeDocModel.familyName}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                      activeDocModel.maturity === 'VALIDATED'
                        ? 'bg-lime-electric/15 text-lime-electric border border-lime-electric/30'
                        : activeDocModel.maturity === 'IMPLEMENTED'
                        ? 'bg-cobalt-bright/15 text-cobalt-glow border border-cobalt-bright/30'
                        : 'bg-white/5 text-midnight-400 border border-white/10'
                    }`}
                  >
                    {activeDocModel.maturity}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-black text-white tracking-tight mt-1">
                  {activeDocModel.name}
                </h2>
                <p className="text-sm text-midnight-300 mt-1">{activeDocModel.tagline}</p>
              </div>

              <button
                onClick={() => setActiveModalStyleId(null)}
                className="p-2 rounded-xl bg-midnight-800 hover:bg-midnight-700 text-midnight-300 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Core Philosophy */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono text-lime-electric uppercase tracking-wider font-semibold">
                Design Philosophy
              </h4>
              <p className="text-xs sm:text-sm text-midnight-200 leading-relaxed bg-midnight-950 p-4 rounded-xl border border-white/5">
                {activeDocModel.philosophy}
              </p>
            </div>

            {/* Signature Moves */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-lime-electric uppercase tracking-wider font-semibold">
                Signature Moves
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-midnight-300">
                {activeDocModel.signatureMoves.map((move, i) => (
                  <li key={i} className="flex items-start gap-2 bg-midnight-950 p-2.5 rounded-lg border border-white/5">
                    <Sparkles className="w-3.5 h-3.5 text-lime-electric shrink-0 mt-0.5" />
                    <span>{move}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Swatch & Typography System */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-lime-electric uppercase tracking-wider font-semibold">
                  Color Seed Swatches
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5 flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: activeDocModel.colorSwatch.primary }} />
                    <div>
                      <div className="text-[10px] text-midnight-400">Primary</div>
                      <div className="text-white text-[11px]">{activeDocModel.colorSwatch.primary}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5 flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: activeDocModel.colorSwatch.accent }} />
                    <div>
                      <div className="text-[10px] text-midnight-400">Accent</div>
                      <div className="text-white text-[11px]">{activeDocModel.colorSwatch.accent}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5 flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: activeDocModel.colorSwatch.background }} />
                    <div>
                      <div className="text-[10px] text-midnight-400">Canvas</div>
                      <div className="text-white text-[11px]">{activeDocModel.colorSwatch.background}</div>
                    </div>
                  </div>
                  <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5 flex items-center gap-2">
                    <div className="w-5 h-5 rounded border border-white/20" style={{ backgroundColor: activeDocModel.colorSwatch.surface }} />
                    <div>
                      <div className="text-[10px] text-midnight-400">Surface</div>
                      <div className="text-white text-[11px]">{activeDocModel.colorSwatch.surface}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-lime-electric uppercase tracking-wider font-semibold">
                  Typography Rules
                </h4>
                <div className="p-3 rounded-lg bg-midnight-950 border border-white/5 text-xs font-mono space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-midnight-500">Display:</span>
                    <span className="text-white font-medium">{activeDocModel.typographySummary.displayFont}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-midnight-500">Body:</span>
                    <span className="text-white">{activeDocModel.typographySummary.bodyFont}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-midnight-500">Scale Ratio:</span>
                    <span className="text-lime-electric font-bold">{activeDocModel.typographySummary.scaleRatio}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-midnight-500">Heading Treatment:</span>
                    <span className="text-midnight-300 text-[11px] truncate max-w-[130px]">{activeDocModel.typographySummary.headingTreatment}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Best For vs Avoid For */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 uppercase font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Best For</span>
                </div>
                <ul className="text-xs text-midnight-300 space-y-1 bg-midnight-950 p-3 rounded-xl border border-white/5">
                  {activeDocModel.bestFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-mono text-red-400 uppercase font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Avoid For</span>
                </div>
                <ul className="text-xs text-midnight-300 space-y-1 bg-midnight-950 p-3 rounded-xl border border-white/5">
                  {activeDocModel.avoidFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CLI Commands */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono text-lime-electric uppercase tracking-wider font-semibold">
                CLI Integration Commands
              </h4>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5 flex items-center justify-between text-xs font-mono text-midnight-300">
                  <span>npx @peak_ui/cli {activeDocModel.cliCommands.addButton}</span>
                  <button
                    onClick={() => handleCopy(`npx @peak_ui/cli ${activeDocModel.cliCommands.addButton}`, 'btn')}
                    className="p-1 text-midnight-400 hover:text-white"
                  >
                    {copiedCmd === 'btn' ? <Check className="w-3.5 h-3.5 text-lime-electric" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Bottom CTAs */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  onOpenPromptForgeWithStyle(activeDocModel.id);
                  setActiveModalStyleId(null);
                }}
                className="px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-sans font-semibold transition-colors flex items-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Forge AI Prompt</span>
              </button>

              <button
                onClick={() => {
                  onSelectStyleForArena(activeDocModel.id);
                  setActiveModalStyleId(null);
                }}
                className="px-5 py-2.5 rounded-full bg-lime hover:bg-[#e4ff6b] text-black text-xs font-sans font-bold shadow-[0_0_20px_-3px_rgba(215,255,53,0.4)] transition-all flex items-center gap-1.5"
              >
                <span>Open in Transformation Arena</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
