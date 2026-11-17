import React, { useState, useMemo } from 'react';
import { 
  Button, 
  Badge, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  ALL_STYLES,
  getStyleById,
  requireStyleById,
  generateTokens
} from '@peak_ui/react';
import { computeStylePackage } from '../../lib/styleAdapters';
import { 
  Layers, 
  Sparkles, 
  Copy, 
  Check, 
  Code, 
  ShieldCheck, 
  Eye, 
  RotateCcw,
  Sliders,
  ChevronRight
} from 'lucide-react';

export const ComponentPlayground: React.FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<'button' | 'badge' | 'card'>('button');
  const [activeStyleId, setActiveStyleId] = useState<string>('neo-brutalism');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Button Props
  const [buttonIntent, setButtonIntent] = useState<'primary' | 'secondary' | 'danger' | 'ghost'>('primary');
  const [buttonSize, setButtonSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('Confirm Action');

  // Badge Props
  const [badgeIntent, setBadgeIntent] = useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline'>('primary');
  const [badgeSize, setBadgeSize] = useState<'sm' | 'md'>('md');
  const [badgeText, setBadgeText] = useState<string>('Production Ready');

  // Card Props
  const [cardElevation, setCardElevation] = useState<'flat' | 'sm' | 'md' | 'lg'>('md');
  const [cardInteractive, setCardInteractive] = useState<boolean>(true);
  const [cardTitle, setCardTitle] = useState<string>('Peak UI Telemetry Card');
  const [cardDesc, setCardDesc] = useState<string>('Deterministic visual physics mapped to headless slots.');

  const activeDNA = useMemo(() => {
    return getStyleById(activeStyleId) || requireStyleById('neo-brutalism');
  }, [activeStyleId]);

  const stylePkg = useMemo(() => computeStylePackage(activeDNA), [activeDNA]);

  // Generate verified code snippet
  const generatedCode = useMemo(() => {
    if (selectedComponent === 'button') {
      return `import { Button } from '@peak_ui/react';

export function ActionButton() {
  return (
    <Button
      intent="${buttonIntent}"
      size="${buttonSize}"${buttonDisabled ? '\n      disabled' : ''}
    >
      ${buttonText}
    </Button>
  );
}`;
    }

    if (selectedComponent === 'badge') {
      return `import { Badge } from '@peak_ui/react';

export function StatusIndicator() {
  return (
    <Badge
      intent="${badgeIntent}"
      size="${badgeSize}"
    >
      ${badgeText}
    </Badge>
  );
}`;
    }

    return `import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  Button 
} from '@peak_ui/react';

export function FeatureCard() {
  return (
    <Card 
      elevation="${cardElevation}"${cardInteractive ? '\n      interactive' : ''}
    >
      <CardHeader>
        <CardTitle>${cardTitle}</CardTitle>
        <CardDescription>${cardDesc}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Real verified headless primitive wrapper exported by @peak_ui/react.</p>
      </CardContent>
      <CardFooter>
        <Button intent="primary" size="sm">Explore Details</Button>
      </CardFooter>
    </Card>
  );
}`;
  }, [selectedComponent, buttonIntent, buttonSize, buttonDisabled, buttonText, badgeIntent, badgeSize, badgeText, cardElevation, cardInteractive, cardTitle, cardDesc]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>EXPORTED HEADLESS REACT PRIMITIVES</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
            Component Playground
          </h1>
          <p className="text-sm sm:text-base text-midnight-300 mt-2 max-w-2xl">
            Test actual exported components from <code>@peak_ui/react@1.0.0</code> with live property manipulation,
            style adapter bindings, and accessibility notes.
          </p>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#0D1017] border border-white/15">
          {(['button', 'badge', 'card'] as const).map((comp) => (
            <button
              key={comp}
              onClick={() => setSelectedComponent(comp)}
              className={`px-4 py-2 rounded-xl text-xs font-mono uppercase font-bold transition-all ${
                selectedComponent === comp
                  ? 'bg-[#D7FF35] text-[#080A08] shadow-[0_0_15px_-3px_rgba(215,255,53,0.4)]'
                  : 'text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {comp}
            </button>
          ))}
        </div>
      </div>

      {/* Main Playground Workspace: Controls + Live Canvas + Code */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Component Variant & Style Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Style Adapter Selector */}
          <div className="p-5 rounded-2xl bg-midnight-900/60 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-lime-electric uppercase font-bold">
                Active Style Physics
              </span>
              <span className="text-[10px] font-mono text-midnight-400">{activeDNA.maturity}</span>
            </div>
            <select
              value={activeStyleId}
              onChange={(e) => setActiveStyleId(e.target.value)}
              className="w-full bg-midnight-950 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-lime-electric font-medium"
            >
              {ALL_STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.family})
                </option>
              ))}
            </select>
            <p className="text-[11px] text-midnight-400 leading-relaxed">
              Components inherit this language's border widths, typography scales, surfaces, and shadows.
            </p>
          </div>

          {/* Component-Specific Prop Controls */}
          <div className="p-5 rounded-2xl bg-midnight-900/60 border border-white/10 space-y-4">
            <div className="text-xs font-mono text-white uppercase font-bold border-b border-white/5 pb-2">
              {selectedComponent.toUpperCase()} API Props
            </div>

            {/* BUTTON PROPS */}
            {selectedComponent === 'button' && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-midnight-400 block mb-1">Intent</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {(['primary', 'secondary', 'danger', 'ghost'] as const).map((intent) => (
                      <button
                        key={intent}
                        onClick={() => setButtonIntent(intent)}
                        className={`p-2 rounded-lg text-left transition-colors border ${
                          buttonIntent === intent
                            ? 'bg-midnight-800 text-lime-electric border-lime-electric/40 font-bold'
                            : 'bg-midnight-950 text-midnight-300 border-white/5 hover:border-white/15'
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-midnight-400 block mb-1">Size</label>
                  <div className="flex gap-1.5">
                    {(['sm', 'md', 'lg'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setButtonSize(size)}
                        className={`flex-1 p-2 rounded-lg text-center transition-colors border ${
                          buttonSize === size
                            ? 'bg-midnight-800 text-lime-electric border-lime-electric/40 font-bold'
                            : 'bg-midnight-950 text-midnight-300 border-white/5'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-midnight-400 block mb-1">Button Label</label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full bg-midnight-950 border border-white/15 rounded-lg p-2 text-white text-xs"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-midnight-400">Disabled State</span>
                  <input
                    type="checkbox"
                    checked={buttonDisabled}
                    onChange={(e) => setButtonDisabled(e.target.checked)}
                    className="rounded accent-lime-electric w-4 h-4"
                  />
                </div>
              </div>
            )}

            {/* BADGE PROPS */}
            {selectedComponent === 'badge' && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-midnight-400 block mb-1">Intent</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {(['primary', 'secondary', 'success', 'warning', 'danger', 'outline'] as const).map((intent) => (
                      <button
                        key={intent}
                        onClick={() => setBadgeIntent(intent)}
                        className={`p-2 rounded-lg text-center transition-colors border ${
                          badgeIntent === intent
                            ? 'bg-midnight-800 text-lime-electric border-lime-electric/40 font-bold'
                            : 'bg-midnight-950 text-midnight-300 border-white/5'
                        }`}
                      >
                        {intent}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-midnight-400 block mb-1">Size</label>
                  <div className="flex gap-1.5">
                    {(['sm', 'md'] as const).map((size) => (
                      <button
                        key={size}
                        onClick={() => setBadgeSize(size)}
                        className={`flex-1 p-2 rounded-lg text-center transition-colors border ${
                          badgeSize === size
                            ? 'bg-midnight-800 text-lime-electric border-lime-electric/40 font-bold'
                            : 'bg-midnight-950 text-midnight-300 border-white/5'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-midnight-400 block mb-1">Badge Text</label>
                  <input
                    type="text"
                    value={badgeText}
                    onChange={(e) => setBadgeText(e.target.value)}
                    className="w-full bg-midnight-950 border border-white/15 rounded-lg p-2 text-white text-xs"
                  />
                </div>
              </div>
            )}

            {/* CARD PROPS */}
            {selectedComponent === 'card' && (
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-midnight-400 block mb-1">Elevation</label>
                  <div className="grid grid-cols-4 gap-1.5">
                    {(['flat', 'sm', 'md', 'lg'] as const).map((elevation) => (
                      <button
                        key={elevation}
                        onClick={() => setCardElevation(elevation)}
                        className={`p-2 rounded-lg text-center transition-colors border ${
                          cardElevation === elevation
                            ? 'bg-midnight-800 text-lime-electric border-lime-electric/40 font-bold'
                            : 'bg-midnight-950 text-midnight-300 border-white/5'
                        }`}
                      >
                        {elevation}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-midnight-400">Interactive (Hover Elevation)</span>
                  <input
                    type="checkbox"
                    checked={cardInteractive}
                    onChange={(e) => setCardInteractive(e.target.checked)}
                    className="rounded accent-lime-electric w-4 h-4"
                  />
                </div>

                <div>
                  <label className="text-midnight-400 block mb-1">Card Title</label>
                  <input
                    type="text"
                    value={cardTitle}
                    onChange={(e) => setCardTitle(e.target.value)}
                    className="w-full bg-midnight-950 border border-white/15 rounded-lg p-2 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-midnight-400 block mb-1">Description</label>
                  <input
                    type="text"
                    value={cardDesc}
                    onChange={(e) => setCardDesc(e.target.value)}
                    className="w-full bg-midnight-950 border border-white/15 rounded-lg p-2 text-white text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Live Interactive Canvas & Code */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Preview Canvas Stage */}
          <div 
            className="rounded-2xl border border-white/10 p-8 sm:p-12 min-h-[380px] flex items-center justify-center transition-all shadow-2xl relative overflow-hidden"
            style={stylePkg.inlineStyles.container}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

            {/* BUTTON PREVIEW */}
            {selectedComponent === 'button' && (
              <div className="text-center space-y-4 z-10">
                <Button
                  intent={buttonIntent}
                  size={buttonSize}
                  disabled={buttonDisabled}
                  style={
                    buttonIntent === 'primary' 
                      ? stylePkg.inlineStyles.buttonPrimary 
                      : (buttonIntent === 'secondary' ? stylePkg.inlineStyles.buttonSecondary : undefined)
                  }
                  className={`cursor-pointer ${buttonDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${
                    buttonSize === 'sm' ? 'px-3 py-1.5 text-xs' : buttonSize === 'lg' ? 'px-6 py-3.5 text-base' : 'px-4 py-2 text-sm'
                  }`}
                >
                  {buttonText}
                </Button>
                <div className="text-xs font-mono opacity-60">
                  Rendered with intent: <code>{buttonIntent}</code> · size: <code>{buttonSize}</code>
                </div>
              </div>
            )}

            {/* BADGE PREVIEW */}
            {selectedComponent === 'badge' && (
              <div className="text-center space-y-4 z-10">
                <Badge
                  intent={badgeIntent}
                  size={badgeSize}
                  style={stylePkg.inlineStyles.badge}
                  className={`inline-flex items-center font-mono font-bold uppercase tracking-wider ${
                    badgeSize === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-xs'
                  }`}
                >
                  {badgeText}
                </Badge>
                <div className="text-xs font-mono opacity-60">
                  Rendered with intent: <code>{badgeIntent}</code> · size: <code>{badgeSize}</code>
                </div>
              </div>
            )}

            {/* CARD PREVIEW */}
            {selectedComponent === 'card' && (
              <div className="w-full max-w-md z-10">
                <Card
                  elevation={cardElevation}
                  interactive={cardInteractive}
                  style={stylePkg.inlineStyles.card}
                  className="p-6 transition-all duration-300 hover:scale-[1.01]"
                >
                  <CardHeader className="pb-3 border-b border-current/10">
                    <CardTitle className="text-lg font-bold font-display">{cardTitle}</CardTitle>
                    <CardDescription className="text-xs opacity-75 mt-1">{cardDesc}</CardDescription>
                  </CardHeader>
                  <CardContent className="py-4 text-xs opacity-90 leading-relaxed">
                    This card is dynamically inheriting elevation (<code>{cardElevation}</code>) and surface physics
                    from <strong>{activeDNA.name}</strong>.
                  </CardContent>
                  <CardFooter className="pt-3 border-t border-current/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono opacity-60">Status: Validated</span>
                    <Button 
                      intent="primary" 
                      size="sm"
                      style={stylePkg.inlineStyles.buttonPrimary}
                      className="px-3 py-1 text-xs"
                    >
                      Action
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>

          {/* Code Inspection & Accessibility Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Verified Code Box */}
            <div className="p-5 rounded-2xl bg-midnight-900 border border-white/10 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <span className="text-xs font-mono text-lime-electric uppercase font-bold flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5" />
                  <span>TypeScript Usage</span>
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 rounded-full bg-[#D7FF35] hover:bg-[#e4ff6b] text-[#080A08] flex items-center gap-1.5 text-xs font-mono font-bold shadow-sm transition-all"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-[#080A08]" /> : <Copy className="w-3.5 h-3.5 text-[#080A08]" />}
                  <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <pre className="font-mono text-xs text-midnight-300 overflow-x-auto p-3 rounded-xl bg-midnight-950 border border-white/5 max-h-44">
                {generatedCode}
              </pre>
            </div>

            {/* Accessibility Validation */}
            <div className="p-5 rounded-2xl bg-midnight-900 border border-white/10 space-y-3">
              <div className="flex items-center gap-1.5 pb-2 border-b border-white/5 text-xs font-mono text-emerald-400 uppercase font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Accessibility & Ergonomics</span>
              </div>

              <div className="space-y-2 text-xs text-midnight-300">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Semantic HTML5 tags with Radix Slot delegation (<code>asChild</code> support).</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Contrast ratio verified: minimum <code>{activeDNA.accessibility.minContrast}:1</code> against canvas.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Focus-visible outline: <code>{activeDNA.accessibility.focusIndicatorRule}</code>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>Reduced motion compliance: <code>{activeDNA.accessibility.reducedMotionStrategy}</code>.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
