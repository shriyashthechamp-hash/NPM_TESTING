import { DesignDNA, generateTokens } from '@peak_ui/react';

export interface ComputedStylePackage {
  styleId: string;
  styleName: string;
  family: string;
  maturity: string;
  cssVariables: Record<string, string>;
  rawCss: string;
  classes: {
    container: string;
    card: string;
    cardHeader: string;
    badgePrimary: string;
    badgeSecondary: string;
    badgeSuccess: string;
    badgeWarning: string;
    buttonPrimary: string;
    buttonSecondary: string;
    buttonGhost: string;
    heading: string;
    body: string;
    muted: string;
    input: string;
    table: string;
  };
  inlineStyles: {
    container: React.CSSProperties;
    card: React.CSSProperties;
    buttonPrimary: React.CSSProperties;
    buttonSecondary: React.CSSProperties;
    badge: React.CSSProperties;
  };
}

export function computeStylePackage(dna: DesignDNA): ComputedStylePackage {
  const { css } = generateTokens(dna);

  const primary = dna.color.seed.primary;
  const accent = dna.color.seed.accent;
  const background = dna.color.seed.background;
  const surface = dna.color.palette?.surface || background;
  const surfaceElevated = dna.color.palette?.surfaceElevated || surface;
  const foreground = dna.color.palette?.foreground || (dna.id === 'neo-brutalism' ? '#000000' : '#FFFFFF');
  const muted = dna.color.palette?.muted || '#71717A';
  const border = dna.color.palette?.border || '#27272A';

  const borderWidth = dna.borders?.widthScale?.[1] || dna.borders?.widthScale?.[0] || '1px';
  const borderStyle = dna.borders?.style || 'solid';
  const borderRadius = dna.borders?.radiusScale?.[2] || dna.borders?.radiusScale?.[1] || '8px';
  const shadow = dna.shadows?.presets?.md || 'none';
  const shadowInteractive = dna.shadows?.presets?.interactive || shadow;
  const blur = dna.surfaces?.blur ? `${dna.surfaces.blur}px` : '0px';

  const isGlass = dna.id === 'glassmorphism' || dna.surfaces?.style === 'glass';
  const isBrutal = dna.id === 'neo-brutalism';
  const isSwiss = dna.id === 'swiss-design';
  const isSkeuo = dna.id === 'skeuomorphism';
  const isDarkPremium = dna.id === 'dark-premium';

  // Inline styles for ultra-accurate dynamic preview
  const inlineStyles: ComputedStylePackage['inlineStyles'] = {
    container: {
      backgroundColor: background,
      color: foreground,
      fontFamily: dna.typography.fontRoles.body || 'sans-serif',
    },
    card: {
      backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.04)' : surface,
      borderColor: border,
      borderWidth: borderWidth,
      borderStyle: borderStyle,
      borderRadius: borderRadius,
      boxShadow: shadow,
      backdropFilter: isGlass ? `blur(${blur || '16px'})` : undefined,
      WebkitBackdropFilter: isGlass ? `blur(${blur || '16px'})` : undefined,
    },
    buttonPrimary: {
      backgroundColor: primary,
      color: isBrutal ? '#000000' : (dna.color.contrastTarget === 'AAA' && background.startsWith('#F') ? '#000' : '#FFFFFF'),
      borderColor: isBrutal ? '#000000' : border,
      borderWidth: isBrutal ? '2px' : borderWidth,
      borderRadius: isSwiss ? '0px' : borderRadius,
      boxShadow: isBrutal ? '3px 3px 0px #000000' : (isSkeuo ? 'inset 0 1px 0 rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.3)' : shadow),
      fontWeight: isBrutal ? 700 : 600,
    },
    buttonSecondary: {
      backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.08)' : surfaceElevated,
      color: foreground,
      borderColor: border,
      borderWidth: borderWidth,
      borderRadius: isSwiss ? '0px' : borderRadius,
      boxShadow: isBrutal ? '2px 2px 0px #000000' : undefined,
    },
    badge: {
      backgroundColor: isGlass ? 'rgba(255, 255, 255, 0.1)' : `${primary}20`,
      color: primary,
      borderColor: isBrutal ? '#000000' : `${primary}40`,
      borderWidth: isBrutal ? '1.5px' : '1px',
      borderRadius: isSwiss ? '0px' : (isBrutal ? '2px' : '9999px'),
    },
  };

  // Parse CSS variables to key-value object
  const cssVariables: Record<string, string> = {};
  const varMatches = css.matchAll(/--([a-zA-Z0-9-]+):\s*([^;]+);/g);
  for (const m of varMatches) {
    cssVariables[`--${m[1]}`] = m[2].trim();
  }

  return {
    styleId: dna.id,
    styleName: dna.name,
    family: dna.family,
    maturity: dna.maturity,
    cssVariables,
    rawCss: css,
    classes: {
      container: 'transition-all duration-300',
      card: 'transition-all duration-300',
      cardHeader: 'border-b border-white/5 pb-3',
      badgePrimary: 'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider',
      badgeSecondary: 'inline-flex items-center px-2.5 py-0.5 text-xs font-medium',
      badgeSuccess: 'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
      badgeWarning: 'inline-flex items-center px-2.5 py-0.5 text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30',
      buttonPrimary: 'inline-flex items-center justify-center px-4 py-2 text-sm transition-all active:scale-[0.98]',
      buttonSecondary: 'inline-flex items-center justify-center px-4 py-2 text-sm transition-all active:scale-[0.98]',
      buttonGhost: 'inline-flex items-center justify-center px-3 py-1.5 text-sm hover:bg-white/5 text-midnight-200 transition-colors',
      heading: 'font-display tracking-tight font-bold',
      body: 'text-sm leading-relaxed',
      muted: 'text-xs text-midnight-400',
      input: 'px-3 py-2 text-sm w-full outline-none transition-all',
      table: 'w-full text-left text-sm',
    },
    inlineStyles,
  };
}
