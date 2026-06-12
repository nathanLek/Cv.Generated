import { SchemeKey, Theme } from '../models/cv.model';

const base: Theme = {
  page: '#FFFFFF', ink: '#122023', sub: '#3C4648', muted: '#737373',
  heading: '#004C58', accent: '#FC4309',
  panel: '#004C58', panelInk: '#F6F2EB', panelSub: 'rgba(246,242,235,.82)', panelLabel: '#D2DEEE',
  soft: '#D2DEEE', softInk: '#004C58', chip: 'rgba(210,222,238,.6)', chipInk: '#004C58',
  trackOnPanel: 'rgba(255,255,255,.18)', fillOnPanel: '#D2DEEE',
  trackOnPage: 'rgba(0,76,88,.14)', fillOnPage: '#004C58',
};

const s = (o: Partial<Theme>): Theme => ({ ...base, ...o });

export const SCHEMES: Record<SchemeKey, Theme> = {
  forest: s({}),
  linen: s({ page: '#F6F2EB' }),
  ink: s({ panel: '#122023', panelLabel: '#9FB0B2', fillOnPanel: '#FC4309', trackOnPanel: 'rgba(255,255,255,.16)' }),
  sky: s({ panel: '#D2DEEE', panelInk: '#0A3942', panelSub: 'rgba(0,76,88,.82)', panelLabel: '#004C58', trackOnPanel: 'rgba(0,76,88,.18)', fillOnPanel: '#004C58' }),
  cherry: s({ accent: '#D85C9A', soft: '#FFE3F0', chip: 'rgba(255,183,219,.35)' }),
  terracotta: s({ page: '#F5EFE4', heading: '#8F4530', accent: '#9A4A30', panel: '#C97356', panelLabel: '#F3D9CC', panelSub: 'rgba(245,239,228,.9)', soft: '#EAD9C6', softInk: '#7A3A26', chip: 'rgba(201,115,86,.16)', chipInk: '#7A3A26', fillOnPage: '#C97356', fillOnPanel: '#F5EFE4', trackOnPanel: 'rgba(255,255,255,.22)' }),
  sage: s({ page: '#F5EFE4', heading: '#3E5238', accent: '#C97356', panel: '#6C8467', panelLabel: '#DCE6D6', panelSub: 'rgba(245,239,228,.9)', soft: '#DCE6D6', softInk: '#3E5238', chip: 'rgba(108,132,103,.16)', chipInk: '#3E5238', fillOnPage: '#6C8467', fillOnPanel: '#F5EFE4', trackOnPanel: 'rgba(255,255,255,.22)' }),
};

export const SCHEME_LABELS: Record<SchemeKey, string> = {
  forest: 'Forest', linen: 'Linen', ink: 'Encre', sky: 'Ciel',
  cherry: 'Cherry', terracotta: 'Terracotta', sage: 'Sauge',
};

export const SCHEME_ORDER: SchemeKey[] = ['forest', 'linen', 'ink', 'sky', 'cherry', 'terracotta', 'sage'];
