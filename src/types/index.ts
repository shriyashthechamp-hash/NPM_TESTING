import { DesignDNA, StyleFamilyId, StyleMaturity } from '@peak_ui/react';

export type ActiveTab = 
  | 'landing'
  | 'arena'
  | 'explorer'
  | 'playground'
  | 'dna'
  | 'prompt'
  | 'recommend'
  | 'export';

export type ReferenceAppId = 
  | 'analytics'
  | 'landing'
  | 'projects'
  | 'docs'
  | 'ecommerce';

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export interface StyleMetaCard {
  id: string;
  name: string;
  family: StyleFamilyId;
  familyName: string;
  maturity: StyleMaturity;
  tagline: string;
  philosophy: string;
  primaryColor: string;
  accentColor: string;
  bgColor: string;
  surfaceColor: string;
  fgColor: string;
  borderColor: string;
  displayFont: string;
  bodyFont: string;
  isExtension?: boolean;
}
