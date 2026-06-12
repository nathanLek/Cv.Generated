import { Injectable, computed, effect, signal } from '@angular/core';
import {
  Cv, CvData, Education, Experience, Language, LayoutKey, LinkItem, Skill, Theme,
} from '../models/cv.model';
import { SCHEMES, SCHEME_ORDER } from '../data/schemes';
import { LAYOUTS, STYLES, STYLE_BY_KEY, StyleDef } from '../data/styles';
import { PROFILES, PROFILE_DATA } from '../data/profiles';

const STORAGE_KEY = 'kam_cv_v1';
type View = 'library' | 'editor';
type SectionKey = 'experiences' | 'education' | 'skills' | 'languages' | 'links';

export type ToastType = 'success' | 'info' | 'error';
export interface Toast { id: string; message: string; type: ToastType; }

export type ExportFormat = 'pdf' | 'png' | 'json';
export interface FormatDef { key: ExportFormat; label: string; desc: string; icon: string; }

export const EXPORT_FORMATS: FormatDef[] = [
  { key: 'pdf', label: 'PDF — impression A4', desc: 'Format standard pour postuler et imprimer.', icon: 'file' },
  { key: 'png', label: 'Image PNG', desc: 'Une image haute résolution de ton CV.', icon: 'image' },
  { key: 'json', label: 'Données JSON', desc: 'Sauvegarde ré-importable et modifiable plus tard.', icon: 'download' },
];

@Injectable({ providedIn: 'root' })
export class CvStore {
  /** Library of CVs (persisted to localStorage). */
  readonly cvs = signal<Cv[]>(this.load());
  readonly currentId = signal<string | null>(null);
  readonly current = computed<Cv | null>(
    () => this.cvs().find((c) => c.id === this.currentId()) ?? null,
  );

  /** UI state. */
  readonly view = signal<View>('library');
  readonly picking = signal(false);
  readonly pickerCat = signal<string>('dev');
  readonly pickerLayout = signal<string>('all');
  readonly pickerSort = signal<string>('reco');

  /** Download dialog + notifications. */
  readonly exporting = signal(false);
  readonly exportFormat = signal<ExportFormat>('pdf');
  readonly toasts = signal<Toast[]>([]);
  readonly formats = EXPORT_FORMATS;

  constructor() {
    // Auto-persist whenever the library changes.
    effect(() => this.persist(this.cvs()));
  }

  // ---------- persistence ----------
  private load(): Cv[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list: Cv[] = raw ? JSON.parse(raw).cvs ?? [] : [];
      return list.map((c) => this.normalize(c));
    } catch {
      return [];
    }
  }
  private persist(cvs: Cv[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ cvs }));
    } catch {
      /* ignore quota / private mode errors */
    }
  }
  private normalize(c: Cv): Cv {
    if (!c.layout) c.layout = 'sidebar';
    if (!c.theme) c.theme = { ...SCHEMES.forest };
    return c;
  }

  private uid(): string {
    return Math.random().toString(36).slice(2, 9);
  }

  // ---------- factory ----------
  buildData(profileKey: string): CvData {
    const src = PROFILE_DATA[profileKey] ?? PROFILE_DATA['dev'];
    const clone = JSON.parse(JSON.stringify(src)) as CvData;
    clone.experiences.forEach((e) => (e.id = this.uid()));
    clone.education.forEach((e) => (e.id = this.uid()));
    clone.skills.forEach((e) => (e.id = this.uid()));
    clone.languages.forEach((e) => (e.id = this.uid()));
    clone.links.forEach((e) => (e.id = this.uid()));
    return clone;
  }

  makeCv(name: string, profileKey: string, layout: LayoutKey, scheme: keyof typeof SCHEMES): Cv {
    return {
      id: this.uid(),
      name,
      profile: profileKey,
      layout,
      theme: { ...SCHEMES[scheme] },
      showPhoto: false,
      data: this.buildData(profileKey),
    };
  }

  // ---------- library actions ----------
  newCv(catKey: string, styleKey: string): void {
    const st = STYLE_BY_KEY[styleKey] ?? STYLES[0];
    const cv = this.makeCv('Nouveau CV', catKey, st.layout, st.scheme);
    this.cvs.update((list) => [cv, ...list]);
    this.currentId.set(cv.id);
    this.view.set('editor');
    this.picking.set(false);
    this.notify('Nouveau CV créé — à toi de le personnaliser\u202f!', 'success');
  }
  openCv(id: string): void {
    this.currentId.set(id);
    this.view.set('editor');
  }
  backToLibrary(): void {
    this.view.set('library');
    this.currentId.set(null);
  }
  deleteCv(id: string): void {
    this.cvs.update((list) => list.filter((c) => c.id !== id));
    this.notify('CV supprimé.', 'info');
  }
  duplicateCv(id: string): void {
    const src = this.cvs().find((c) => c.id === id);
    if (!src) return;
    const copy: Cv = JSON.parse(JSON.stringify(src));
    copy.id = this.uid();
    copy.name = src.name + ' (copie)';
    this.cvs.update((list) => [copy, ...list]);
    this.notify('CV dupliqué.', 'success');
  }

  openPicker(): void {
    this.picking.set(true);
  }
  closePicker(): void {
    this.picking.set(false);
  }
  chooseModel(catKey: string, styleKey: string): void {
    this.newCv(catKey, styleKey);
  }

  // ---------- mutations (immutable updates on the current CV) ----------
  private patch(fn: (c: Cv) => Cv): void {
    const id = this.currentId();
    this.cvs.update((list) => list.map((c) => (c.id === id ? fn(c) : c)));
  }
  setMeta(patch: Partial<Cv>): void {
    this.patch((c) => ({ ...c, ...patch }));
  }
  setField<K extends keyof CvData>(key: K, value: CvData[K]): void {
    this.patch((c) => ({ ...c, data: { ...c.data, [key]: value } }));
  }
  setTheme(patch: Partial<Theme>): void {
    this.patch((c) => ({ ...c, theme: { ...c.theme, ...patch } }));
  }
  setScheme(key: keyof typeof SCHEMES): void {
    this.patch((c) => ({ ...c, theme: { ...SCHEMES[key] } }));
  }

  private isLight(hex: string): boolean {
    try {
      const v = hex.replace('#', '');
      const r = parseInt(v.slice(0, 2), 16);
      const g = parseInt(v.slice(2, 4), 16);
      const b = parseInt(v.slice(4, 6), 16);
      return 0.299 * r + 0.587 * g + 0.114 * b > 150;
    } catch {
      return false;
    }
  }
  setPanelColor(v: string): void {
    const light = this.isLight(v);
    this.setTheme({
      panel: v,
      panelInk: light ? '#122023' : '#F6F2EB',
      panelLabel: light ? '#004C58' : '#D2DEEE',
      panelSub: light ? 'rgba(18,32,35,.72)' : 'rgba(246,242,235,.82)',
      trackOnPanel: light ? 'rgba(0,76,88,.18)' : 'rgba(255,255,255,.18)',
      fillOnPanel: light ? '#004C58' : '#F6F2EB',
    });
  }

  // ---------- list-section helpers ----------
  addExperience(): void {
    this.patch((c) => ({ ...c, data: { ...c.data, experiences: [...c.data.experiences, { id: this.uid(), role: 'Nouveau poste', company: '', location: '', period: '', desc: '' }] } }));
  }
  addEducation(): void {
    this.patch((c) => ({ ...c, data: { ...c.data, education: [...c.data.education, { id: this.uid(), degree: 'Nouveau diplôme', school: '', period: '', details: '' }] } }));
  }
  addSkill(): void {
    this.patch((c) => ({ ...c, data: { ...c.data, skills: [...c.data.skills, { id: this.uid(), name: 'Nouvelle compétence', level: 3 }] } }));
  }
  addLanguage(): void {
    this.patch((c) => ({ ...c, data: { ...c.data, languages: [...c.data.languages, { id: this.uid(), name: 'Nouvelle langue', level: 'Courant' }] } }));
  }
  addLink(): void {
    this.patch((c) => ({ ...c, data: { ...c.data, links: [...c.data.links, { id: this.uid(), label: 'Nouveau lien', url: '' }] } }));
  }

  updateExperience(id: string, p: Partial<Experience>): void { this.updItem('experiences', id, p); }
  updateEducation(id: string, p: Partial<Education>): void { this.updItem('education', id, p); }
  updateSkill(id: string, p: Partial<Skill>): void { this.updItem('skills', id, p); }
  updateLanguage(id: string, p: Partial<Language>): void { this.updItem('languages', id, p); }
  updateLink(id: string, p: Partial<LinkItem>): void { this.updItem('links', id, p); }

  private updItem(sec: SectionKey, id: string, p: object): void {
    this.patch((c) => ({
      ...c,
      data: { ...c.data, [sec]: (c.data[sec] as { id: string }[]).map((it) => (it.id === id ? { ...it, ...p } : it)) },
    }));
  }
  removeItem(sec: SectionKey, id: string): void {
    this.patch((c) => ({
      ...c,
      data: { ...c.data, [sec]: (c.data[sec] as { id: string }[]).filter((it) => it.id !== id) },
    }));
  }
  moveItem(sec: SectionKey, id: string, dir: number): void {
    this.patch((c) => {
      const arr = [...(c.data[sec] as { id: string }[])];
      const i = arr.findIndex((x) => x.id === id);
      const j = i + dir;
      if (i < 0 || j < 0 || j >= arr.length) return c;
      [arr[i], arr[j]] = [arr[j], arr[i]];
      return { ...c, data: { ...c.data, [sec]: arr } };
    });
  }

  // ---------- photo ----------
  setPhoto(dataUrl: string | null): void {
    this.setField('photo', dataUrl);
    this.setMeta({ showPhoto: !!dataUrl });
    if (dataUrl) this.notify('Photo ajoutée au CV.', 'success');
  }

  // ---------- notifications (toasts) ----------
  notify(message: string, type: ToastType = 'success'): void {
    const id = this.uid();
    this.toasts.update((list) => [...list, { id, message, type }]);
    setTimeout(() => this.dismissToast(id), 3600);
  }
  dismissToast(id: string): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  // ---------- download flow ----------
  openExport(): void {
    this.exportFormat.set('pdf');
    this.exporting.set(true);
  }
  closeExport(): void {
    this.exporting.set(false);
  }
  setExportFormat(f: ExportFormat): void {
    this.exportFormat.set(f);
  }
  confirmExport(cv: Cv): void {
    const f = this.exportFormat();
    this.closeExport();
    if (f === 'pdf') {
      this.notify('Fenêtre d’impression ouverte — choisis «\u202fEnregistrer en PDF\u202f».', 'info');
      setTimeout(() => this.exportPdf(), 300);
    } else if (f === 'png') {
      this.notify('Génération de l’image PNG…', 'info');
      setTimeout(() => this.exportPng(cv), 60);
    } else {
      this.exportJson(cv);
      this.notify('Fichier JSON téléchargé.', 'success');
    }
  }

  // ---------- gallery filtering / sorting ----------
  filteredStyles(): StyleDef[] {
    const prof = PROFILES.find((p) => p.key === this.pickerCat()) ?? PROFILES[0];
    const keys = prof.styles.length ? prof.styles : STYLES.map((s) => s.key);
    let arr = keys.map((k) => STYLE_BY_KEY[k]).filter((s): s is StyleDef => !!s);
    if (this.pickerLayout() !== 'all') arr = arr.filter((s) => s.layout === this.pickerLayout());
    const sort = this.pickerSort();
    if (sort === 'layout') {
      const order = LAYOUTS.map((l) => l.key);
      arr = [...arr].sort((a, b) => order.indexOf(a.layout) - order.indexOf(b.layout));
    } else if (sort === 'color') {
      arr = [...arr].sort((a, b) => SCHEME_ORDER.indexOf(a.scheme) - SCHEME_ORDER.indexOf(b.scheme));
    }
    return arr;
  }
  availableLayouts(catKey: string): Set<string> {
    const prof = PROFILES.find((p) => p.key === catKey) ?? PROFILES[0];
    const ls = prof.styles.map((k) => STYLE_BY_KEY[k]?.layout).filter((l): l is LayoutKey => !!l);
    return new Set<string>(ls);
  }

  // ---------- exports ----------
  exportJson(cv: Cv): void {
    const blob = new Blob([JSON.stringify(cv, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (cv.name || 'cv').replace(/\s+/g, '_') + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
  importJson(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        let cv = JSON.parse(String(e.target?.result)) as Cv;
        if (!cv.data) throw new Error('invalid');
        cv.id = this.uid();
        cv = this.normalize(cv);
        this.cvs.update((list) => [cv, ...list]);
        this.currentId.set(cv.id);
        this.view.set('editor');
      } catch {
        this.notify('Fichier JSON invalide.', 'error');
      }
    };
    reader.readAsText(file);
  }
  async exportPng(cv: Cv): Promise<void> {
    const node = document.getElementById('cv-print');
    if (!node) {
      this.notify('Export PNG indisponible.', 'error');
      return;
    }
    try {
      const { default: html2canvas } = await import('html2canvas');
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const a = document.createElement('a');
      a.href = canvas.toDataURL('image/png');
      a.download = (cv.name || 'cv').replace(/\s+/g, '_') + '.png';
      a.click();
      this.notify('Image PNG téléchargée.', 'success');
    } catch {
      this.notify('Échec de la génération PNG.', 'error');
    }
  }
  exportPdf(): void {
    window.print();
  }
}
