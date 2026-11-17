# Peak UI Design Lab — Design Beyond Components

> **28 visual languages. One design intelligence engine.**  
> An interactive design engineering laboratory built directly on top of the published `@peak_ui/react` ecosystem.

[![npm version](https://img.shields.io/npm/v/@peak_ui/react?color=D4FF32&label=@peak_ui/react)](https://www.npmjs.com/package/@peak_ui/react)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## Overview

**Peak UI Design Lab** is the flagship interactive product demonstrating why Peak UI exists. It is not a generic dashboard or static documentation site; it is a design intelligence workspace where engineers, design system leads, and autonomous AI coding agents can discover, compare, experiment with, and implement 28 canonical visual languages with deterministic physics.

---

## 7 Core Connected Experiences

1. **Editorial Landing Experience**:
   - Primary Hero inspired by Reference A (`UnlimitedDesignHero`): Oversized typography, divided headline segments, character-level reveals, live status indicator (`28 VISUAL LANGUAGES · 5 DESIGN FAMILIES · ONE INTELLIGENCE ENGINE`), and an inline interactive showcase pill dynamically cycling through visual languages.
   - Spatial 3D Deck inspired by Reference B (`WarpCarousel`): Rotating 3D carousel in perspective with glowing edge highlights, touch/pointer drag, keyboard arrows, and a direct "Transform in Arena" bridge.
   - Comprehensive introduction to the 5 visual families and core architecture.

2. **Transformation Arena (The Hero Product Feature)**:
   - Live interactive transformation workspace across 5 real reference applications:
     - **Analytics Telemetry Dashboard** (KPIs, live volume bars, transaction logs)
     - **SaaS Conversion Landing Page** (Value prop, social proof, bento cards)
     - **Project Management Workspace** (Kanban sprint board, task cards, badges)
     - **Developer Documentation** (API endpoint, payload schema table, code blocks)
     - **Luxury Hardware Storefront** (Product mockup, price, variant selectors, checkout CTA)
   - Viewport simulation: Desktop (`100%`), Tablet (`768px`), Mobile (`390px`).
   - Dual-Style Comparison mode: Side-by-side split view comparing Style A and Style B on the exact same underlying interface.
   - Live Token Inspector: Real-time CSS custom property (`--peak-*`) and TypeScript token compiler.

3. **28-Style Design Language Explorer**:
   - Filterable catalog of all 28 canonical styles across 5 families + 1 extension (`dark-premium`).
   - Multi-attribute search across style names, philosophies, tags, and industries.
   - Deep inspection drawer revealing design philosophy, color seed swatches, typography hierarchy, signature moves, best-for/avoid-for contexts, and CLI commands.

4. **Component Playground**:
   - Live interactive exploration of real exported `@peak_ui/react` components: `Button`, `Badge`, `Card` (`CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`).
   - Prop controls (`intent`, `size`, `elevation`, `interactive`, `disabled`).
   - Dynamic style adapter switching.
   - Real-time TypeScript code generation with copy button.
   - WCAG 2.2 AA accessibility and focus-visible audit information.

5. **Design DNA Inspector**:
   - Technical explorer for the canonical 28-dimension design parameter schema.
   - View modes: Visual Deck, Generated CSS Variables (`generateTokens(dna)`), and raw JSON schema.

6. **Prompt Forge for AI Agents**:
   - Context-aware prompt generation workspace compiling deterministic design rules into copy-ready prompts.
   - Tailored presets for **Claude Code**, **Cursor**, **Antigravity**, **Lovable**, and **v0**.
   - Style composition support (blend primary and secondary styles).

7. **Developer Export Studio & Style Recommender**:
   - Algorithmic style discovery using `@peak_ui/react`'s intent clustering engine.
   - Copy-paste installation commands, CLI scripts, and `peak-ui.config.json` scaffolding.

---

## Published NPM Package Integration

This application consumes the published npm package:

\`\`\`bash
npm install @peak_ui/react
\`\`\`

Verified imports directly used in the codebase:
\`\`\`tsx
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
  CANONICAL_STYLES,
  ALL_FAMILIES,
  getStyleById,
  requireStyleById,
  getFamilyById,
  generateTokens,
  recommendStyles,
  generateScenarioPrompt,
  getStyleDocumentationModel
} from '@peak_ui/react';
\`\`\`

---

## Local Development & Build

### Requirements
- Node.js >= 18 (Tested on Node v26.13.1)
- npm >= 9

### Install Dependencies
\`\`\`bash
npm install
\`\`\`

### Start Development Server
\`\`\`bash
npm run dev
\`\`\`
The application will be available at `http://localhost:3000`.

### Production Build
\`\`\`bash
npm run build
\`\`\`
Compiles TypeScript and creates an optimized production bundle in `dist/`.

### Preview Production Build
\`\`\`bash
npm run preview
\`\`\`
