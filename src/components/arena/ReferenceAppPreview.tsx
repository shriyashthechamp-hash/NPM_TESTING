import React from 'react';
import { ReferenceAppId } from '../../types';
import { ComputedStylePackage } from '../../lib/styleAdapters';
import { 
  TrendingUp, 
  Users, 
  Database, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Search, 
  Filter, 
  Download, 
  ArrowRight, 
  Star, 
  ShoppingCart, 
  Check, 
  Plus, 
  MoreHorizontal,
  Code2,
  Copy,
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface ReferenceAppPreviewProps {
  appId: ReferenceAppId;
  stylePkg: ComputedStylePackage;
}

export const ReferenceAppPreview: React.FC<ReferenceAppPreviewProps> = ({ appId, stylePkg }) => {
  const { inlineStyles, styleId, styleName } = stylePkg;
  const isBrutal = styleId === 'neo-brutalism';
  const isGlass = styleId === 'glassmorphism';
  const isSwiss = styleId === 'swiss-design';
  const isSkeuo = styleId === 'skeuomorphism';
  const isDarkPremium = styleId === 'dark-premium';

  // 1. ANALYTICS DASHBOARD
  if (appId === 'analytics') {
    return (
      <div className="p-4 sm:p-6 space-y-6" style={inlineStyles.container}>
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Production Telemetry
              </h2>
              <span style={inlineStyles.badge} className="text-[10px] px-2 py-0.5 uppercase tracking-wider font-bold">
                Live Feed
              </span>
            </div>
            <p className="text-xs opacity-75 mt-0.5">Real-time interface telemetry and transaction metrics</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1 p-1 rounded-lg bg-black/10 border border-current/10 text-xs">
              <button className="px-2.5 py-1 rounded font-medium bg-white/20">24h</button>
              <button className="px-2.5 py-1 rounded font-medium opacity-70 hover:opacity-100">7d</button>
              <button className="px-2.5 py-1 rounded font-medium opacity-70 hover:opacity-100">30d</button>
            </div>
            <button style={inlineStyles.buttonPrimary} className="px-3.5 py-1.5 text-xs flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>
          </div>
        </div>

        {/* 4 Metric KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div style={inlineStyles.card} className="p-4">
            <div className="flex items-center justify-between text-xs opacity-75 mb-2">
              <span>Gross Token Inflow</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight">$148,290.00</div>
            <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <span>+18.4%</span>
              <span className="opacity-60 font-normal">vs last cycle</span>
            </div>
          </div>

          <div style={inlineStyles.card} className="p-4">
            <div className="flex items-center justify-between text-xs opacity-75 mb-2">
              <span>Active Workspaces</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight">1,429</div>
            <div className="mt-2 text-xs text-cyan-400 font-semibold flex items-center gap-1">
              <span>+12.1%</span>
              <span className="opacity-60 font-normal">verified teams</span>
            </div>
          </div>

          <div style={inlineStyles.card} className="p-4">
            <div className="flex items-center justify-between text-xs opacity-75 mb-2">
              <span>Inference Operations</span>
              <Database className="w-4 h-4 text-lime-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight">42.8M</div>
            <div className="mt-2 text-xs text-lime-400 font-semibold flex items-center gap-1">
              <span>+34.2%</span>
              <span className="opacity-60 font-normal">AI completions</span>
            </div>
          </div>

          <div style={inlineStyles.card} className="p-4">
            <div className="flex items-center justify-between text-xs opacity-75 mb-2">
              <span>System Error Budget</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold tracking-tight">99.98%</div>
            <div className="mt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1">
              <span>Nominal</span>
              <span className="opacity-60 font-normal">p99 &lt; 14ms</span>
            </div>
          </div>
        </div>

        {/* Telemetry Chart Stage & Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Telemetry */}
          <div style={inlineStyles.card} className="lg:col-span-2 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm">Weekly Inference Volume</h3>
                <p className="text-xs opacity-60">Requests processed through deterministic token pipeline</p>
              </div>
              <span style={inlineStyles.badge} className="text-[10px] px-2 py-0.5">
                Aggregated
              </span>
            </div>

            {/* Visual Simulated Telemetry Bars */}
            <div className="h-44 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-current/10">
              {[45, 62, 78, 54, 89, 94, 100].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full rounded-t transition-all duration-300 group-hover:brightness-125"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isBrutal ? '#000000' : (isSwiss ? '#FF3333' : 'currentColor'),
                      opacity: isBrutal ? 1 : 0.75,
                      border: isBrutal ? '2px solid #000' : undefined,
                    }}
                  />
                  <span className="text-[10px] font-mono opacity-60">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-3 text-xs opacity-75">
              <span>Peak load: 6.8M req/hr (Friday 16:00 UTC)</span>
              <span className="font-semibold text-emerald-400">Zero dropped frames</span>
            </div>
          </div>

          {/* Activity Transactions Table */}
          <div style={inlineStyles.card} className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm">Live Invocations</h3>
              <span className="text-xs opacity-60">4 events</span>
            </div>

            <div className="space-y-3">
              {[
                { endpoint: 'POST /v1/tokens/compile', code: '200 OK', time: '12ms', style: 'neo-brutalism' },
                { endpoint: 'GET /v1/styles/canonical', code: '200 OK', time: '4ms', style: 'swiss-design' },
                { endpoint: 'POST /v1/prompt/forge', code: '201 Created', time: '28ms', style: 'glassmorphism' },
                { endpoint: 'POST /v1/compose/styles', code: '200 OK', time: '16ms', style: 'dark-premium' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-black/10 border border-current/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-mono font-medium truncate max-w-[130px]">{item.endpoint}</div>
                    <div className="text-[10px] opacity-60 mt-0.5">{item.style}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-mono font-semibold">{item.code}</span>
                    <div className="text-[10px] opacity-50">{item.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. SAAS PRODUCT LANDING PAGE
  if (appId === 'landing') {
    return (
      <div className="p-6 sm:p-12 space-y-12" style={inlineStyles.container}>
        {/* Navigation Mock */}
        <div className="flex items-center justify-between pb-6 border-b border-current/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-current flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <span className="font-bold text-base tracking-tight">KINETIC AI</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-xs opacity-80 font-medium">
            <span>Features</span>
            <span>Architecture</span>
            <span>Tokens</span>
            <span>Pricing</span>
          </div>
          <button style={inlineStyles.buttonPrimary} className="px-4 py-1.5 text-xs">
            Deploy Now
          </button>
        </div>

        {/* Hero Value Proposition */}
        <div className="text-center max-w-2xl mx-auto space-y-4 pt-6">
          <div className="inline-flex items-center gap-2">
            <span style={inlineStyles.badge} className="px-3 py-1 text-xs">
              V2.4 Autonomous Interface Engine
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Deterministic Visual Physics For AI Interfaces.
          </h2>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed max-w-xl mx-auto">
            Eliminate design drift. Compile 28 distinct design languages into verified tokens, strict layout grids, and zero-hallucination prompts.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <button style={inlineStyles.buttonPrimary} className="w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2">
              <span>Start Free Evaluation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button style={inlineStyles.buttonSecondary} className="w-full sm:w-auto px-5 py-3 text-sm font-semibold">
              Read Technical Spec
            </button>
          </div>
        </div>

        {/* Social Proof Strip */}
        <div className="py-6 border-y border-current/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">99.98%</div>
            <div className="text-xs opacity-60 uppercase mt-0.5">Uptime SLA</div>
          </div>
          <div>
            <div className="text-2xl font-bold">14,000+</div>
            <div className="text-xs opacity-60 uppercase mt-0.5">Active Engineers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">0ms</div>
            <div className="text-xs opacity-60 uppercase mt-0.5">Layout Drift</div>
          </div>
          <div>
            <div className="text-2xl font-bold">28</div>
            <div className="text-xs opacity-60 uppercase mt-0.5">Visual Languages</div>
          </div>
        </div>

        {/* Bento Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div style={inlineStyles.card} className="p-6">
            <div className="w-10 h-10 rounded-lg bg-current/10 flex items-center justify-center mb-4">
              <Code2 className="w-5 h-5 text-current" />
            </div>
            <h3 className="font-bold text-base mb-1">Deterministic Token Compiler</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              Every color, elevation shadow, border radius, and typography ratio is strictly mathematically computed.
            </p>
          </div>

          <div style={inlineStyles.card} className="p-6">
            <div className="w-10 h-10 rounded-lg bg-current/10 flex items-center justify-center mb-4">
              <Terminal className="w-5 h-5 text-current" />
            </div>
            <h3 className="font-bold text-base mb-1">AI Assistant Integration</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              Export copy-paste prompts formatted specifically for Claude Code, Cursor, Antigravity, and Lovable.
            </p>
          </div>

          <div style={inlineStyles.card} className="p-6">
            <div className="w-10 h-10 rounded-lg bg-current/10 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 text-current" />
            </div>
            <h3 className="font-bold text-base mb-1">Headless React Primitives</h3>
            <p className="text-xs opacity-75 leading-relaxed">
              Built on Radix Slot architecture. Full accessibility, keyboard focus indicators, and reduced-motion modes.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // 3. PROJECT MANAGEMENT WORKSPACE (KANBAN)
  if (appId === 'projects') {
    return (
      <div className="p-4 sm:p-6 space-y-6" style={inlineStyles.container}>
        {/* Workspace Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                Design System Sprint #42
              </h2>
              <span style={inlineStyles.badge} className="text-[10px] px-2 py-0.5">
                Active Cycle
              </span>
            </div>
            <p className="text-xs opacity-75 mt-0.5">Track multi-language tokens, adapters, and accessibility audits</p>
          </div>

          <div className="flex items-center gap-2">
            <button style={inlineStyles.buttonSecondary} className="px-3 py-1.5 text-xs flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <button style={inlineStyles.buttonPrimary} className="px-3 py-1.5 text-xs flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5" />
              <span>New Task</span>
            </button>
          </div>
        </div>

        {/* 3 Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Column 1: In Development */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-75 px-1">
              <span>In Development</span>
              <span className="font-mono bg-current/10 px-2 py-0.5 rounded-full">2</span>
            </div>

            <div style={inlineStyles.card} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span style={inlineStyles.badge} className="text-[9px] px-2 py-0.5">
                  CORE-812
                </span>
                <span className="text-[10px] text-amber-400 font-semibold">High Priority</span>
              </div>
              <h4 className="font-bold text-sm">Refactor Neo-Brutalism shadow physics</h4>
              <p className="text-xs opacity-75">
                Ensure hard 3px offset shadow conforms with zero blur and pure #000 ink on dark canvas.
              </p>
              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] opacity-60">
                <span>Assignee: @shriyas</span>
                <span>Due in 2d</span>
              </div>
            </div>

            <div style={inlineStyles.card} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span style={inlineStyles.badge} className="text-[9px] px-2 py-0.5">
                  TOK-304
                </span>
                <span className="text-[10px] opacity-75">Normal</span>
              </div>
              <h4 className="font-bold text-sm">Compile CSS variable export tree</h4>
              <p className="text-xs opacity-75">
                Verify `--peak-primitive-*` and `--peak-semantic-*` resolution across all 28 styles.
              </p>
              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] opacity-60">
                <span>Assignee: @alex</span>
                <span>Due in 4d</span>
              </div>
            </div>
          </div>

          {/* Column 2: Code Review */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-75 px-1">
              <span>Code Review</span>
              <span className="font-mono bg-current/10 px-2 py-0.5 rounded-full">1</span>
            </div>

            <div style={inlineStyles.card} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span style={inlineStyles.badge} className="text-[9px] px-2 py-0.5">
                  A11Y-119
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Ready for Review</span>
              </div>
              <h4 className="font-bold text-sm">WCAG 2.2 AA Contrast Validation</h4>
              <p className="text-xs opacity-75">
                Automated test suite checking 4.5:1 text contrast on glassmorphic backdrops.
              </p>
              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] opacity-60">
                <span>PR #142 · 3 checks</span>
                <span>Updated 1h ago</span>
              </div>
            </div>
          </div>

          {/* Column 3: Released / Validated */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider opacity-75 px-1">
              <span>Validated</span>
              <span className="font-mono bg-current/10 px-2 py-0.5 rounded-full">1</span>
            </div>

            <div style={inlineStyles.card} className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span style={inlineStyles.badge} className="text-[9px] px-2 py-0.5">
                  PKG-100
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">Merged</span>
              </div>
              <h4 className="font-bold text-sm">@peak_ui/react v1.0.0 Published</h4>
              <p className="text-xs opacity-75">
                Successfully pushed to npm with 28 canonical styles and token generator engine.
              </p>
              <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] opacity-60">
                <span>Release tag: 1.0.0</span>
                <span>Verified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. DEVELOPER API DOCUMENTATION
  if (appId === 'docs') {
    return (
      <div className="p-4 sm:p-8 space-y-6" style={inlineStyles.container}>
        {/* API Breadcrumbs & Endpoint Pill */}
        <div className="space-y-2">
          <div className="text-xs font-mono opacity-60 flex items-center gap-1.5">
            <span>API Reference</span>
            <ChevronRight className="w-3 h-3" />
            <span>Tokens API</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-current font-bold">Compile</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span style={inlineStyles.badge} className="text-xs px-2.5 py-1 font-mono font-bold">
              POST
            </span>
            <span className="font-mono text-sm sm:text-base font-semibold">
              https://api.peak-ui.dev/v1/tokens/compile
            </span>
          </div>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed max-w-2xl">
            Compiles deterministic CSS custom properties and TypeScript definition interfaces for any of the 28 Peak UI visual styles.
          </p>
        </div>

        {/* Request Parameter Table */}
        <div style={inlineStyles.card} className="p-5">
          <h3 className="font-bold text-sm mb-3">Request Body Parameters</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-current/10 font-mono uppercase opacity-60">
                <tr>
                  <th className="pb-2">Field</th>
                  <th className="pb-2">Type</th>
                  <th className="pb-2">Required</th>
                  <th className="pb-2">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-current/5 font-mono">
                <tr>
                  <td className="py-2.5 font-bold text-lime-400">styleId</td>
                  <td className="py-2.5 opacity-75">string</td>
                  <td className="py-2.5 text-emerald-400">Yes</td>
                  <td className="py-2.5 opacity-80 font-sans">Canonical style ID (e.g. <code>neo-brutalism</code>)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-lime-400">format</td>
                  <td className="py-2.5 opacity-75">'css' | 'json' | 'ts'</td>
                  <td className="py-2.5 opacity-50">No</td>
                  <td className="py-2.5 opacity-80 font-sans">Token export format (defaults to <code>css</code>)</td>
                </tr>
                <tr>
                  <td className="py-2.5 font-bold text-lime-400">includePhysics</td>
                  <td className="py-2.5 opacity-75">boolean</td>
                  <td className="py-2.5 opacity-50">No</td>
                  <td className="py-2.5 opacity-80 font-sans">Include motion easing & surface blur curves</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Code Snippet Block */}
        <div style={inlineStyles.card} className="p-5">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-current/10 text-xs font-mono">
            <span className="opacity-75">Client Execution Example (Node.js / React)</span>
            <button className="flex items-center gap-1 opacity-75 hover:opacity-100">
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </button>
          </div>
          <pre className="font-mono text-xs overflow-x-auto p-3 rounded bg-black/30 text-lime-400">
{`import { requireStyleById, generateTokens } from '@peak_ui/react';

// 1. Retrieve canonical style DNA
const dna = requireStyleById('${styleId}');

// 2. Generate deterministic token bundle
const { css, ts } = generateTokens(dna);

console.log('Compiled CSS tokens for:', dna.name);`}
          </pre>
        </div>
      </div>
    );
  }

  // 5. E-COMMERCE HARDWARE STOREFRONT
  return (
    <div className="p-6 sm:p-10 space-y-8" style={inlineStyles.container}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Product Visual Mock */}
        <div 
          style={inlineStyles.card}
          className="aspect-square w-full rounded-2xl flex flex-col items-center justify-center p-8 relative overflow-hidden"
        >
          <div className="absolute top-4 left-4">
            <span style={inlineStyles.badge} className="text-[10px] px-2.5 py-1">
              LIMITED RUN · 14 UNITS
            </span>
          </div>

          <div className="w-36 h-36 rounded-2xl border border-current/20 bg-current/10 flex items-center justify-center shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-500">
            <Terminal className="w-16 h-16 text-current opacity-80" />
          </div>

          <div className="mt-6 text-center">
            <div className="text-xs font-mono opacity-60">MODEL: PK-9000-TI</div>
            <div className="text-sm font-bold mt-1">Anodized CNC Aluminum Chassis</div>
          </div>
        </div>

        {/* Product Specs & Purchasing */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-current opacity-60 ml-2 font-mono">4.98 (342 reviews)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Monolith Cyber Mechanical Keyboard
            </h2>
            <div className="text-2xl font-black mt-2 font-mono">
              $289.00 <span className="text-xs font-normal opacity-60">USD</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
            Engineered with hot-swappable linear optical switches, gasket mounted plate, per-key RGB addressability, and custom Peak UI physical keycaps.
          </p>

          {/* Variant Selector */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider opacity-75">
              Finish Colorway
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 rounded text-xs font-medium border border-current/40 bg-current/10">
                Obsidian Black
              </button>
              <button className="px-3 py-1.5 rounded text-xs font-medium opacity-60 border border-current/10 hover:opacity-100">
                Electric Lime
              </button>
              <button className="px-3 py-1.5 rounded text-xs font-medium opacity-60 border border-current/10 hover:opacity-100">
                Cobalt Mist
              </button>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button style={inlineStyles.buttonPrimary} className="w-full sm:w-auto px-6 py-3 text-sm font-bold flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button style={inlineStyles.buttonSecondary} className="w-full sm:w-auto px-5 py-3 text-sm font-semibold">
              Specification Sheet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
