import React from 'react';
import { CinematicHero } from '../hero/CinematicHero';
import { WarpCarousel } from '../hero/WarpCarousel';
import { ALL_FAMILIES, ALL_STYLES, getFamilyById } from '@peak_ui/react';
import { ActiveTab } from '../../types';
import { 
  Sparkles, 
  Layers, 
  Dna, 
  Terminal, 
  Sliders, 
  ArrowRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Zap, 
  Cpu, 
  Bot, 
  Code,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

interface LandingPageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onSelectStyleForArena: (styleId: string) => void;
  onOpenPromptForgeWithStyle: (styleId: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  setActiveTab,
  onSelectStyleForArena,
  onOpenPromptForgeWithStyle,
}) => {
  return (
    <div className="space-y-0">
      {/* 1. Cinematic Video Hero Section (Single Viewport) */}
      <CinematicHero
        onEnterLab={() => setActiveTab('arena')}
        onExploreStyles={() => setActiveTab('explorer')}
        onSelectStyleForArena={onSelectStyleForArena}
        setActiveTab={setActiveTab}
      />

      {/* 2. Reference B 3D Warp Carousel */}
      <WarpCarousel onSelectStyle={onSelectStyleForArena} />

      {/* 3. The Five Visual Families */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>5 FOUNDATIONAL VISUAL FAMILIES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            28 Coherent Aesthetics
          </h2>
          <p className="text-sm sm:text-base text-midnight-300 mt-3 leading-relaxed">
            Every visual language belongs to a curated family with specific spatial laws, typography scales, surface physics, and elevation rules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_FAMILIES.filter(f => f.id !== 'extension').map((family) => {
            const familyStyles = ALL_STYLES.filter((s) => s.family === family.id);
            return (
              <div
                key={family.id}
                className="p-6 rounded-2xl bg-midnight-900/60 border border-white/10 hover:border-lime-electric/40 transition-all flex flex-col justify-between group shadow-subtle-card hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-lime-electric font-bold uppercase">{family.name}</span>
                    <span className="text-midnight-400">{familyStyles.length} Styles</span>
                  </div>
                  <h3 className="text-xl font-display font-bold text-white tracking-tight mb-2">
                    {family.tagline}
                  </h3>
                  <p className="text-xs text-midnight-300 leading-relaxed mb-4">
                    {family.description}
                  </p>

                  {/* Included Styles Chips */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {familyStyles.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => onSelectStyleForArena(s.id)}
                        className="px-2 py-1 rounded-md bg-midnight-950 border border-white/5 hover:border-lime-electric/50 text-[11px] font-mono text-midnight-300 hover:text-white transition-colors"
                      >
                        {s.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs font-mono text-midnight-500">Physics: {family.id}</span>
                  <button
                    onClick={() => setActiveTab('explorer')}
                    className="text-xs font-display font-semibold text-lime-electric hover:text-lime-glow flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Inspect Family</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Extension Card: Dark Premium */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-midnight-900 via-midnight-850 to-midnight-950 border border-lime-electric/30 flex flex-col justify-between shadow-subtle-card hover:-translate-y-1 transition-all">
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-lime-electric font-bold uppercase">Architectural Extension</span>
                <span className="text-emerald-400 font-bold">IMPLEMENTED</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white tracking-tight mb-2">
                Dark Premium Pro-Tools
              </h3>
              <p className="text-xs text-midnight-300 leading-relaxed mb-4">
                Tailored for developer tools, AI workspaces, and observability platforms (Linear/Raycast aesthetic) with 1px specular hairlines and zero visual fatigue.
              </p>
              <div className="p-3 rounded-xl bg-midnight-950 border border-white/10 text-xs font-mono text-midnight-300 space-y-1 mb-4">
                <div>Primary Canvas: <span className="text-white">#09090B</span></div>
                <div>Edge Treatment: <span className="text-lime-electric">1px specular hairline</span></div>
              </div>
            </div>

            <button
              onClick={() => onSelectStyleForArena('dark-premium')}
              className="w-full py-2.5 rounded-xl bg-lime-electric text-midnight-950 font-display font-bold text-xs flex items-center justify-center gap-2 hover:bg-lime-glow transition-all"
            >
              <span>Launch Dark Premium in Arena</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. Design Intelligence Architecture */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric">
              <Cpu className="w-3.5 h-3.5" />
              <span>CORE INTELLIGENCE ENGINE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight leading-tight">
              Design Systems Are Physics, Not Templates.
            </h2>
            <p className="text-sm sm:text-base text-midnight-300 leading-relaxed">
              Peak UI treats interface aesthetics as mathematical contracts. Each design language provides deterministic parameters
              for layout density, color seed contrast, surface materials, and animation physics.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-lime-electric/15 text-lime-electric flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Deterministic Token Generation</h4>
                  <p className="text-xs text-midnight-400 mt-0.5">Zero hallucinated color variables. Every token maps to verified CSS custom properties.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-lime-electric/15 text-lime-electric flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Headless Slot Architecture</h4>
                  <p className="text-xs text-midnight-400 mt-0.5">Radix-compatible primitives that delegate rendering to your own markup without style lock-in.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-md bg-lime-electric/15 text-lime-electric flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Agent Directives & Anti-Patterns</h4>
                  <p className="text-xs text-midnight-400 mt-0.5">Compiled instructions that instruct Claude Code, Cursor, and Antigravity how to write compliant code.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('arena')}
                className="px-6 py-3 rounded-xl bg-lime-electric text-midnight-950 font-display font-bold text-sm shadow-lime-glow flex items-center gap-2 hover:bg-lime-glow transition-all"
              >
                <span>Enter Transformation Arena</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive Code Preview Box */}
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 font-mono text-xs text-midnight-300 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 text-[11px]">
              <span className="text-lime-electric font-bold">@peak_ui/react runtime pipeline</span>
              <span className="text-midnight-500">Node / Browser</span>
            </div>

            <pre className="p-4 rounded-xl bg-midnight-950 border border-white/5 overflow-x-auto text-midnight-200">
{`// 1. Query canonical style DNA
import { requireStyleById, generateTokens } from '@peak_ui/react';

const dna = requireStyleById('neo-brutalism');
// Returns complete 28-dimension mathematical schema

// 2. Compile CSS custom properties & TS types
const { css, ts } = generateTokens(dna);

// 3. Render headless components with strict physics
import { Button, Card, Badge } from '@peak_ui/react';
import '@peak_ui/react/tokens/neo-brutalism/tokens.css';

<Button intent="primary">Execute</Button>`}
            </pre>

            <div className="grid grid-cols-2 gap-2 text-[11px] pt-2">
              <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5">
                <span className="text-midnight-500">Canonical Count:</span>
                <span className="text-white ml-1 font-bold">28 Styles</span>
              </div>
              <div className="p-2.5 rounded-lg bg-midnight-950 border border-white/5">
                <span className="text-midnight-500">Maturity Status:</span>
                <span className="text-emerald-400 ml-1 font-bold">100% Validated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Transformation Arena Showcase Teaser */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-white/5">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-midnight-900 via-midnight-850 to-midnight-950 border border-lime-electric/30 shadow-lime-glow/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-electric/15 border border-lime-electric/30 text-xs font-mono text-lime-electric font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE FLAGSHIP EXPERIENCE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white tracking-tight">
              Test Real Interfaces in the Transformation Arena
            </h2>
            <p className="text-sm text-midnight-300 leading-relaxed">
              Watch 5 real-world reference applications (Analytics Telemetry, SaaS Landing, Kanban Workspace, API Docs, and Hardware Storefront) transform dynamically across visual languages.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('arena')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#D7FF35] hover:bg-[#e4ff6b] text-[#080A08] font-sans font-black text-sm shadow-[0_0_25px_-3px_rgba(215,255,53,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Launch Transformation Arena</span>
              <ArrowRight className="w-4 h-4 text-[#080A08] stroke-[2.5] transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* 6. AI Agent Workflow Teaser */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric">
            <Bot className="w-3.5 h-3.5" />
            <span>BUILT FOR HUMAN & AI ENGINEERS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight">
            Stop AI Layout Hallucinations.
          </h2>
          <p className="text-sm sm:text-base text-midnight-300 leading-relaxed">
            AI coding agents excel at syntax but struggle with aesthetic coherence without strict system prompts.
            Prompt Forge compiles complete mathematical contracts directly into your agent's context.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-3">
            <div className="text-xs font-mono text-lime-electric uppercase font-bold">Claude Code & CLI</div>
            <p className="text-xs text-midnight-300 leading-relaxed">
              Copy command-ready prompts with tool guidance that instructs Claude Code to install packages and adhere strictly to Do/Don't physics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-3">
            <div className="text-xs font-mono text-lime-electric uppercase font-bold">Cursor .cursorrules</div>
            <p className="text-xs text-midnight-300 leading-relaxed">
              Export system rules that constrain Cursor's tab completion and composer to verified design tokens and precise color seeds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-midnight-900 border border-white/10 space-y-3">
            <div className="text-xs font-mono text-lime-electric uppercase font-bold">Antigravity & Lovable</div>
            <p className="text-xs text-midnight-300 leading-relaxed">
              Structure full multi-turn generation directives with verification gates, accessibility constraints, and responsive breakpoints.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => setActiveTab('prompt')}
            className="px-7 py-3.5 rounded-full bg-[#12151E] hover:bg-[#1A1F2C] border border-white/20 hover:border-white/40 text-white font-sans font-bold text-sm inline-flex items-center gap-2.5 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sliders className="w-4 h-4 text-[#D7FF35]" />
            <span>Open AI Prompt Forge</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
