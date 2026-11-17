import { ReferenceAppId } from '../types';

export interface ReferenceAppConfig {
  id: ReferenceAppId;
  title: string;
  category: string;
  description: string;
  iconName: string;
}

export const REFERENCE_APPS: ReferenceAppConfig[] = [
  {
    id: 'analytics',
    title: 'Analytics Telemetry Dashboard',
    category: 'Enterprise SaaS',
    description: 'High-density metrics, telemetry charts, status badges, and transaction logs.',
    iconName: 'BarChart3',
  },
  {
    id: 'landing',
    title: 'SaaS Product Landing Page',
    category: 'Marketing & Conversion',
    description: 'Hero value proposition, call-to-action buttons, metric proof, and bento feature cards.',
    iconName: 'Layout',
  },
  {
    id: 'projects',
    title: 'Project Management Kanban',
    category: 'Collaboration & Productivity',
    description: 'Interactive sprint board with swimlanes, task cards, priority indicators, and tags.',
    iconName: 'KanbanSquare',
  },
  {
    id: 'docs',
    title: 'Developer API Documentation',
    category: 'Developer Platform',
    description: 'API endpoint reference, payload parameters, code blocks, and response viewer.',
    iconName: 'Code2',
  },
  {
    id: 'ecommerce',
    title: 'Luxury Hardware Storefront',
    category: 'Commerce & Retail',
    description: 'Product showcase, price tag, variant selections, inventory alert, and checkout CTA.',
    iconName: 'ShoppingBag',
  },
];
