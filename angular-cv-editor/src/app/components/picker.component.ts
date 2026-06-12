import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStore } from '../services/cv-store.service';
import { PROFILES } from '../data/profiles';
import { LAYOUTS, SORTS, StyleDef } from '../data/styles';
import { Cv } from '../models/cv.model';
import { IconComponent } from './icon.component';
import { CvPreviewComponent } from './cv-preview.component';

@Component({
  selector: 'app-picker',
  standalone: true,
  imports: [CommonModule, IconComponent, CvPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="backdrop" (click)="store.closePicker()">
      <div class="modal" (click)="$event.stopPropagation()">
        <header class="head">
          <div class="head-left">
            <span class="logo"><app-icon name="grid" [size]="20"></app-icon></span>
            <div>
              <h2>Galerie de modèles</h2>
              <p>{{ profiles.length }} métiers, chacun avec ses mises en page adaptées — 100&#8239;% personnalisable ensuite.</p>
            </div>
          </div>
          <button class="icon-btn" title="Fermer" (click)="store.closePicker()"><app-icon name="x" [size]="17"></app-icon></button>
        </header>

        <div class="body">
          <nav class="rail">
            <div class="rail-label">Catégorie de métier</div>
            @for (p of profiles; track p.key) {
              <button class="cat" [class.active]="p.key === store.pickerCat()"
                      (click)="store.pickerCat.set(p.key); store.pickerLayout.set('all')">
                <span class="cat-ic"><app-icon [name]="p.icon" [size]="18"></app-icon></span>
                <span class="cat-txt"><strong>{{ p.label }}</strong><small>{{ p.short }}</small></span>
              </button>
            }
          </nav>

          <div class="content">
            <div class="filterbar">
              <div class="chips">
                <span class="chips-ic"><app-icon name="sliders" [size]="16"></app-icon></span>
                @for (o of chips(); track o.key) {
                  <button class="chip" [class.on]="store.pickerLayout() === o.key" (click)="store.pickerLayout.set(o.key)">{{ o.label }}</button>
                }
              </div>
              <div class="sort">
                <span>Trier</span>
                <select [value]="store.pickerSort()" (change)="store.pickerSort.set($any($event.target).value)">
                  @for (s of sorts; track s.key) { <option [value]="s.key">{{ s.label }}</option> }
                </select>
              </div>
            </div>

            <div class="grid-wrap">
              <div class="grid-head">
                <span class="gh-title">{{ prof().label }}</span>
                <span class="gh-count">{{ styles().length }} modèle{{ styles().length > 1 ? 's' : '' }}</span>
              </div>
              <div class="grid">
                @for (s of styles(); track s.key) {
                  <button class="card" (click)="store.chooseModel(store.pickerCat(), s.key)">
                    <div class="thumb">
                      <div class="thumb-inner"><app-cv-preview [cv]="sample(s)"></app-cv-preview></div>
                    </div>
                    <div class="card-label">{{ s.label }}</div>
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .backdrop { position: fixed; inset: 0; background: rgba(18,32,35,.5); display: flex; align-items: center; justify-content: center; z-index: 50; padding: 24px; }
    .modal { background: var(--kam-linen); border-radius: 22px; width: 100%; max-width: 1120px; height: 88vh; display: flex; flex-direction: column; box-shadow: var(--shadow-pop); overflow: hidden; animation: cvfade .26s var(--ease-out); }
    .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 24px 28px 18px; background: #fff; border-bottom: 1px solid rgba(18,32,35,.08); }
    .head-left { display: flex; align-items: center; gap: 14px; }
    .logo { width: 44px; height: 44px; flex: none; background: var(--kam-forest); border-radius: 46% 54% 63% 37% / 45% 38% 62% 55%; display: flex; align-items: center; justify-content: center; color: var(--kam-linen); }
    .head h2 { font: 500 26px var(--font-display); color: var(--kam-forest); margin: 0; }
    .head p { font: 400 13px var(--font-body); color: var(--fg-secondary); margin: 3px 0 0; }
    .body { display: flex; flex: 1; min-height: 0; }
    .rail { width: 246px; flex: none; border-right: 1px solid rgba(18,32,35,.1); background: #fff; padding: 16px 12px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
    .rail-label { font: 700 10.5px var(--font-body); letter-spacing: .08em; text-transform: uppercase; color: var(--fg-muted); padding: 4px 12px 8px; }
    .cat { display: flex; align-items: center; gap: 11px; width: 100%; text-align: left; padding: 11px 12px; border-radius: 11px; border: none; cursor: pointer; background: transparent; color: var(--kam-dark-black); transition: background .14s; }
    .cat:hover { background: rgba(0,76,88,.06); }
    .cat.active { background: var(--kam-forest); color: var(--kam-linen); }
    .cat-ic { flex: none; color: var(--kam-forest); display: inline-flex; }
    .cat.active .cat-ic { color: var(--kam-linen); }
    .cat-txt { display: flex; flex-direction: column; min-width: 0; }
    .cat-txt strong { font: 700 13px var(--font-body); }
    .cat-txt small { font: 400 11px var(--font-body); color: var(--fg-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .cat.active .cat-txt small { color: rgba(246,242,235,.8); }
    .content { flex: 1; min-width: 0; display: flex; flex-direction: column; }
    .filterbar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 24px; border-bottom: 1px solid rgba(18,32,35,.08); flex-wrap: wrap; }
    .chips { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
    .chips-ic { display: inline-flex; color: var(--fg-muted); }
    .chip { font: 700 12px var(--font-body); padding: 6px 12px; border-radius: 999px; cursor: pointer; border: 1.5px solid rgba(18,32,35,.14); background: #fff; color: var(--kam-dark-black); transition: all .14s; }
    .chip.on { border-color: var(--kam-forest); background: var(--kam-forest); color: var(--kam-linen); }
    .sort { display: flex; align-items: center; gap: 8px; }
    .sort span { font: 400 12px var(--font-body); color: var(--fg-muted); }
    .sort select { font: 400 13.5px var(--font-body); padding: 7px 10px; border: 1px solid rgba(18,32,35,.14); border-radius: 8px; background: #fff; cursor: pointer; color: var(--kam-dark-black); }
    .grid-wrap { flex: 1; overflow-y: auto; padding: 20px 24px 28px; }
    .grid-head { display: flex; align-items: baseline; gap: 8px; margin-bottom: 14px; }
    .gh-title { font: 500 18px var(--font-display); color: var(--kam-forest); }
    .gh-count { font: 400 12.5px var(--font-body); color: var(--fg-muted); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(148px, 1fr)); gap: 16px; }
    .card { display: flex; flex-direction: column; align-items: center; gap: 9px; padding: 11px; border-radius: 13px; border: 1.5px solid rgba(18,32,35,.1); background: #fff; cursor: pointer; box-shadow: var(--shadow-card); transition: all .18s var(--ease-soft); }
    .card:hover { transform: translateY(-5px); border-color: var(--kam-forest); box-shadow: var(--shadow-card-hover); }
    .thumb { width: 138px; height: 195px; position: relative; overflow: hidden; border-radius: 6px; border: 1px solid rgba(18,32,35,.08); pointer-events: none; }
    .thumb-inner { position: absolute; top: 0; left: 0; width: 794px; transform: scale(0.1738); transform-origin: top left; }
    .card-label { font: 700 11.5px var(--font-body); color: var(--kam-dark-black); text-align: center; }
    .icon-btn { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; cursor: pointer; color: var(--kam-forest); transition: background .14s; }
    .icon-btn:hover { background: rgba(0,76,88,.1); }
  `],
})
export class PickerComponent {
  readonly store = inject(CvStore);
  readonly profiles = PROFILES;
  readonly sorts = SORTS;

  readonly prof = computed(() => PROFILES.find((p) => p.key === this.store.pickerCat()) ?? PROFILES[0]);
  readonly styles = computed<StyleDef[]>(() => this.store.filteredStyles());
  readonly chips = computed<{ key: string; label: string }[]>(() => {
    const avail = this.store.availableLayouts(this.store.pickerCat());
    return [{ key: 'all', label: 'Tous' }, ...LAYOUTS.filter((l) => avail.has(l.key))];
  });

  private cache: Record<string, Cv> = {};
  sample(style: StyleDef): Cv {
    const cat = this.store.pickerCat();
    const key = cat + '|' + style.key;
    if (!this.cache[key]) {
      this.cache[key] = this.store.makeCv('Aperçu', cat, style.layout, style.scheme);
    }
    return this.cache[key];
  }
}
