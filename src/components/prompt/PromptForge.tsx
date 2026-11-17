import React, { useState, useMemo } from 'react';
import { 
  ALL_STYLES, 
  PROMPT_SCENARIO_IDS, 
  PROMPT_SCENARIOS, 
  getStyleById, 
  requireStyleById, 
  generateScenarioPrompt,
  PromptScenarioId
} from '@peak_ui/react';
import { 
  Sliders, 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  Bot, 
  CheckCircle2, 
  Download,
  Share2,
  Code
} from 'lucide-react';

export type AIAssistantTarget = 'claude' | 'cursor' | 'antigravity' | 'lovable' | 'v0';

interface PromptForgeProps {
  initialStyleId?: string;
}

export const PromptForge: React.FC<PromptForgeProps> = ({ initialStyleId = 'neo-brutalism' }) => {
  const [styleId, setStyleId] = useState<string>(initialStyleId);
  const [scenario, setScenario] = useState<PromptScenarioId>('landing-page');
  const [assistant, setAssistant] = useState<AIAssistantTarget>('claude');
  const [productContext, setProductContext] = useState<string>('Autonomous AI agent orchestration platform');
  const [targetAudience, setTargetAudience] = useState<string>('Senior full-stack developers and AI engineers');
  const [includeSecondary, setIncludeSecondary] = useState<boolean>(false);
  const [secondaryStyleId, setSecondaryStyleId] = useState<string>('bento-grid');
  const [copied, setCopied] = useState<boolean>(false);

  const selectedDNA = useMemo(() => {
    return getStyleById(styleId) || requireStyleById('neo-brutalism');
  }, [styleId]);

  // Generate canonical prompt using @peak_ui/react
  const rawPrompt = useMemo(() => {
    try {
      return generateScenarioPrompt({
        scenario,
        styleId,
        productContext: `${productContext} (Target Audience: ${targetAudience})`,
        secondaryStyleId: includeSecondary ? secondaryStyleId : undefined,
      });
    } catch (e: any) {
      // Fallback clean markdown generator if Node fs is bypassed in browser
      return `# Peak UI — AI Design System Generation Prompt
**Scenario:** ${scenario}
**Visual Style:** ${selectedDNA.name} (${selectedDNA.family})
**Product Context:** ${productContext} (Audience: ${targetAudience})

---

## 1. System Directive & Visual Philosophy
${selectedDNA.aiGuidance?.systemDirective || selectedDNA.philosophy}

**Core Philosophy:** ${selectedDNA.philosophy}
**Signature Moves:**
${selectedDNA.identity.signatureMoves.map((m) => `- ${m}`).join('\n')}

---

## 2. Color & Surface System
- **Color Philosophy:** ${selectedDNA.color.philosophy}
- **Primary Seed:** \`${selectedDNA.color.seed.primary}\` | **Accent Seed:** \`${selectedDNA.color.seed.accent}\` | **Canvas Background:** \`${selectedDNA.color.seed.background}\`
- **Surface Material (\`${selectedDNA.surfaces.style}\`):** \`${selectedDNA.color.palette.surface}\` (Elevated: \`${selectedDNA.color.palette.surfaceElevated}\`)
- **Foreground Ink:** \`${selectedDNA.color.palette.foreground}\` | **Border Token:** \`${selectedDNA.color.palette.border}\`

---

## 3. Typography & Hierarchy
- **Display Font:** \`${selectedDNA.typography.fontRoles.display}\`
- **Body Font:** \`${selectedDNA.typography.fontRoles.body}\`
- **Scale Ratio:** \`${selectedDNA.typography.scaleRatio}\` | **Weights:** \`${selectedDNA.typography.weights.join(', ')}\`
- **Heading Treatment:** ${selectedDNA.typography.headingTreatment}

---

## 4. Layout, Spacing & Elevation Physics
- **Layout Philosophy:** ${selectedDNA.layout.philosophy}
- **Grid System:** ${selectedDNA.layout.gridSystem} (Max Width: \`${selectedDNA.layout.maxWidth}\`, Container Padding: \`${selectedDNA.layout.containerPadding}\`)
- **Spacing Rhythm:** Base unit \`${selectedDNA.spacing.baseUnit}px\` (\`${selectedDNA.spacing.density}\` density)
- **Border Treatment:** ${selectedDNA.borders.treatment} (Widths: \`${selectedDNA.borders.widthScale.join(', ')}\`, Radii: \`${selectedDNA.borders.radiusScale.join(', ')}\`)
- **Shadow Elevation:** ${selectedDNA.shadows.philosophy} (Medium: \`${selectedDNA.shadows.presets.md}\`, Interactive: \`${selectedDNA.shadows.presets.interactive}\`)

---

## 5. Implementation Instructions
- Always use headless components from \`@peak_ui/react\` (\`Button\`, \`Badge\`, \`Card\`).
- Apply the generated CSS tokens from \`@peak_ui/react/tokens/${selectedDNA.id}/tokens.css\`.
- Respect WCAG ${selectedDNA.color.contrastTarget} (minimum ${selectedDNA.accessibility.minContrast}:1 text contrast).
- Obey reduced motion strategy: ${selectedDNA.accessibility.reducedMotionStrategy}.`;
    }
  }, [scenario, styleId, productContext, targetAudience, includeSecondary, secondaryStyleId, selectedDNA]);

  // Wrap prompt with assistant-specific optimization wrapper
  const finalPrompt = useMemo(() => {
    if (assistant === 'claude') {
      return `<!-- CLAUDE CODE EXECUTION PROMPT -->\n<!-- Copy directly into Claude Code CLI or claude.ai -->\n\n${rawPrompt}\n\n## Claude Code Tool Guidance:\n- Execute commands cleanly using npm install @peak_ui/react\n- Import components directly: import { Button, Card, Badge } from '@peak_ui/react';\n- Ensure zero console errors and strict TypeScript compliance.`;
    }
    if (assistant === 'cursor') {
      return `<!-- CURSOR .cursorrules / SYSTEM PROMPT -->\n\nYou are an expert frontend engineer building in the ${selectedDNA.name} design language.\n\n${rawPrompt}\n\n## Cursor Rules:\n- When generating components, strictly obey the Do/Don't directives above.\n- Do not substitute generic tailwind grays; use the precise hex seeds specified.`;
    }
    if (assistant === 'antigravity') {
      return `<!-- ANTIGRAVITY AGENT WORKFLOW DIRECTIVE -->\n\n<TASK_OBJECTIVE>\nBuild a complete ${scenario} in the ${selectedDNA.name} visual language for ${productContext}.\n</TASK_OBJECTIVE>\n\n${rawPrompt}\n\n<VERIFICATION_STEPS>\n1. Install @peak_ui/react\n2. Test interactive states on Desktop, Tablet, and Mobile\n3. Validate contrast ratio >= ${selectedDNA.accessibility.minContrast}:1\n</VERIFICATION_STEPS>`;
    }
    if (assistant === 'lovable') {
      return `<!-- LOVABLE / v0 PROMPT -->\n\nBuild a modern, high-converting ${scenario} using React and Tailwind CSS.\n\nDesign Style: ${selectedDNA.name}\n${rawPrompt}`;
    }
    return rawPrompt;
  }, [rawPrompt, assistant, selectedDNA, scenario, productContext]);

  const handleCopy = () => {
    navigator.clipboard.writeText(finalPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-midnight-900 border border-white/10 text-xs font-mono text-lime-electric mb-3">
            <Sliders className="w-3.5 h-3.5" />
            <span>AI AGENT PROMPT COMPILER</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-display font-black text-white tracking-tight">
            Prompt Forge
          </h1>
          <p className="text-sm sm:text-base text-midnight-300 mt-2 max-w-2xl">
            Generate context-aware, deterministic prompts for Claude Code, Cursor, Antigravity, Lovable, and v0.
            Zero hallucinated tokens. Full design physics and anti-patterns compiled from published Peak UI DNA.
          </p>
        </div>

        {/* Assistant Target Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-midnight-900 border border-white/10 overflow-x-auto">
          {(
            [
              { id: 'claude', label: 'Claude Code' },
              { id: 'cursor', label: 'Cursor' },
              { id: 'antigravity', label: 'Antigravity' },
              { id: 'lovable', label: 'Lovable' },
              { id: 'v0', label: 'v0' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setAssistant(item.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all ${
                assistant === item.id
                  ? 'bg-lime-electric text-midnight-950 font-bold shadow-sm'
                  : 'text-midnight-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Forge Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Input Criteria Configuration */}
        <div className="lg:col-span-5 space-y-5">
          {/* Style Selector */}
          <div className="p-5 rounded-2xl bg-midnight-900/60 border border-white/10 space-y-3">
            <label className="text-xs font-mono text-lime-electric uppercase font-bold block">
              1. Visual Design Language
            </label>
            <select
              value={styleId}
              onChange={(e) => setStyleId(e.target.value)}
              className="w-full bg-midnight-950 border border-white/15 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-lime-electric font-medium"
            >
              {ALL_STYLES.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.family} · {s.maturity})
                </option>
              ))}
            </select>
          </div>

          {/* Scenario Selector */}
          <div className="p-5 rounded-2xl bg-midnight-900/60 border border-white/10 space-y-3">
            <label className="text-xs font-mono text-lime-electric uppercase font-bold block">
              2. Application Scenario Blueprint
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {PROMPT_SCENARIO_IDS.map((scId) => {
                const spec = PROMPT_SCENARIOS[scId];
                return (
                  <button
                    key={scId}
                    onClick={() => setScenario(scId)}
                    className={`p-2.5 rounded-xl text-left transition-all border ${
                      scenario === scId
                        ? 'bg-midnight-800 text-lime-electric border-lime-electric/50 font-bold shadow-sm'
                        : 'bg-midnight-950 text-midnight-400 border-white/5 hover:border-white/15 hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-medium truncate">{spec?.title || scId}</div>
                    <div className="text-[10px] font-mono opacity-50 truncate">{scId}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Context & Audience Input */}
          <div className="p-5 rounded-2xl bg-midnight-900/60 border border-white/10 space-y-4">
            <label className="text-xs font-mono text-lime-electric uppercase font-bold block">
              3. Product Domain & Target Audience
            </label>

            <div>
              <span className="text-[11px] font-mono text-midnight-400 block mb-1">Product Description / Domain</span>
              <input
                type="text"
                value={productContext}
                onChange={(e) => setProductContext(e.target.value)}
                placeholder="e.g. Next-gen observability metrics engine"
                className="w-full bg-midnight-950 border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-midnight-500 focus:outline-none focus:border-lime-electric"
              />
            </div>

            <div>
              <span className="text-[11px] font-mono text-midnight-400 block mb-1">Target Audience</span>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g. Full-stack developers, UI engineers"
                className="w-full bg-midnight-950 border border-white/15 rounded-xl p-2.5 text-xs text-white placeholder-midnight-500 focus:outline-none focus:border-lime-electric"
              />
            </div>

            {/* Style Composition Toggle */}
            <div className="pt-2 border-t border-white/5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-midnight-300">Style Composition (Secondary)</span>
                <input
                  type="checkbox"
                  checked={includeSecondary}
                  onChange={(e) => setIncludeSecondary(e.target.checked)}
                  className="rounded accent-lime-electric w-4 h-4"
                />
              </div>

              {includeSecondary && (
                <select
                  value={secondaryStyleId}
                  onChange={(e) => setSecondaryStyleId(e.target.value)}
                  className="w-full bg-midnight-950 border border-white/15 rounded-xl p-2 text-xs text-white"
                >
                  {ALL_STYLES.filter((s) => s.id !== styleId).map((s) => (
                    <option key={s.id} value={s.id}>
                      Blend with: {s.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        </div>

        {/* Right: Compiled Structured Prompt View */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          <div className="p-5 rounded-2xl bg-midnight-900 border border-white/10 flex-1 flex flex-col">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-lime-electric" />
                <span className="text-xs font-mono text-white font-bold uppercase">
                  Target: {assistant.toUpperCase()} Prompt Blueprint
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-electric text-midnight-950 font-display font-bold text-xs shadow-lime-glow hover:bg-lime-glow transition-all active:scale-95"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Complete Prompt'}</span>
              </button>
            </div>

            <div className="flex-1 max-h-[600px] overflow-y-auto rounded-xl bg-midnight-950 p-4 border border-white/5">
              <pre className="font-mono text-xs text-midnight-200 whitespace-pre-wrap leading-relaxed">
                {finalPrompt}
              </pre>
            </div>

            <div className="pt-3 mt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-midnight-400">
              <span>Lines: {finalPrompt.split('\n').length}</span>
              <span>Tokens compiled from @peak_ui/react</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
