import { LayoutKey, SchemeKey } from '../models/cv.model';

export interface StyleDef {
  key: string;
  label: string;
  layout: LayoutKey;
  scheme: SchemeKey;
}

export const LAYOUTS: { key: LayoutKey; label: string }[] = [
  { key: 'sidebar', label: 'Colonne' },
  { key: 'band', label: 'Bandeau' },
  { key: 'centered', label: 'Centré' },
  { key: 'minimal', label: 'Minimal' },
  { key: 'duo', label: 'Duo' },
];

export const SORTS: { key: string; label: string }[] = [
  { key: 'reco', label: 'Recommandés' },
  { key: 'layout', label: 'Par mise en page' },
  { key: 'color', label: 'Par couleur' },
];

export const STYLES: StyleDef[] = [
  { key: 'col-forest', label: 'Colonne · Forest', layout: 'sidebar', scheme: 'forest' },
  { key: 'col-ink', label: 'Colonne · Encre', layout: 'sidebar', scheme: 'ink' },
  { key: 'col-sky', label: 'Colonne · Ciel', layout: 'sidebar', scheme: 'sky' },
  { key: 'col-cherry', label: 'Colonne · Cherry', layout: 'sidebar', scheme: 'cherry' },
  { key: 'col-terra', label: 'Colonne · Terracotta', layout: 'sidebar', scheme: 'terracotta' },
  { key: 'band-forest', label: 'Bandeau · Forest', layout: 'band', scheme: 'forest' },
  { key: 'band-linen', label: 'Bandeau · Linen', layout: 'band', scheme: 'linen' },
  { key: 'band-terra', label: 'Bandeau · Terracotta', layout: 'band', scheme: 'terracotta' },
  { key: 'band-sage', label: 'Bandeau · Sauge', layout: 'band', scheme: 'sage' },
  { key: 'cen-linen', label: 'Centré · Linen', layout: 'centered', scheme: 'linen' },
  { key: 'cen-white', label: 'Centré · Blanc', layout: 'centered', scheme: 'forest' },
  { key: 'cen-sage', label: 'Centré · Sauge', layout: 'centered', scheme: 'sage' },
  { key: 'cen-cherry', label: 'Centré · Cherry', layout: 'centered', scheme: 'cherry' },
  { key: 'min-white', label: 'Minimal · Blanc', layout: 'minimal', scheme: 'forest' },
  { key: 'min-ink', label: 'Minimal · Encre', layout: 'minimal', scheme: 'ink' },
  { key: 'min-sky', label: 'Minimal · Ciel', layout: 'minimal', scheme: 'sky' },
  { key: 'duo-forest', label: 'Duo · Forest', layout: 'duo', scheme: 'forest' },
  { key: 'duo-linen', label: 'Duo · Linen', layout: 'duo', scheme: 'linen' },
  { key: 'duo-cherry', label: 'Duo · Cherry', layout: 'duo', scheme: 'cherry' },
];

export const STYLE_BY_KEY: Record<string, StyleDef> = Object.fromEntries(
  STYLES.map((s) => [s.key, s]),
);
