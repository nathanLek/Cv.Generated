import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStore } from '../services/cv-store.service';
import { LAYOUTS } from '../data/styles';
import { Cv } from '../models/cv.model';
import { IconComponent } from './icon.component';
import { CvPreviewComponent } from './cv-preview.component';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, IconComponent, CvPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (store.cvs().length === 0) {
      <div class="empty">
        <div class="blob"><app-icon name="doc" [size]="38"></app-icon></div>
        <div>
          <h2>Aucun CV pour l'instant</h2>
          <p>Choisis un modèle pour démarrer — un contenu pré-rempli adapté au métier t'attend, prêt à être personnalisé.</p>
        </div>
        <button class="btn primary" (click)="store.openPicker()"><app-icon name="plus" [size]="16"></app-icon>Choisir un modèle</button>
      </div>
    } @else {
      <div class="page">
        <div class="inner">
          <div class="topline">
            <div>
              <h1>Mes CV</h1>
              <p>{{ store.cvs().length }} {{ store.cvs().length > 1 ? 'documents enregistrés' : 'document enregistré' }}</p>
            </div>
            <span class="auto"><app-icon name="download" [size]="14"></app-icon>Sauvegarde automatique locale</span>
          </div>
          <div class="grid">
            <button class="addtile" (click)="store.openPicker()">
              <app-icon name="plus" [size]="32"></app-icon>Nouveau CV
            </button>
            @for (cv of store.cvs(); track cv.id) {
              <div class="cell">
                <div class="thumb-card" (click)="store.openCv(cv.id)">
                  <div class="thumb"><div class="thumb-inner"><app-cv-preview [cv]="cv"></app-cv-preview></div></div>
                </div>
                <div class="meta">
                  <div class="meta-txt">
                    <div class="name">{{ cv.name }}</div>
                    <div class="sub">{{ layoutLabel(cv.layout) }} · {{ cv.data.fullName }}</div>
                  </div>
                  <div class="actions">
                    <button class="icon-btn" title="Dupliquer" (click)="store.duplicateCv(cv.id)"><app-icon name="copy" [size]="17"></app-icon></button>
                    <button class="icon-btn danger" title="Supprimer" (click)="confirmDelete(cv.id)"><app-icon name="trash" [size]="17"></app-icon></button>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: block; flex: 1; min-height: 0; overflow-y: auto; }
    .empty { height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; padding: 40px; text-align: center; }
    .blob { width: 88px; height: 88px; background: var(--kam-sky-blue); border-radius: 46% 54% 63% 37% / 45% 38% 62% 55%; display: flex; align-items: center; justify-content: center; color: var(--kam-forest); }
    .empty h2 { font: 500 30px var(--font-display); color: var(--kam-forest); margin: 0 0 8px; }
    .empty p { font: 400 15px var(--font-body); color: var(--fg-secondary); margin: 0; max-width: 380px; }
    .page { padding: 32px 40px 60px; }
    .inner { max-width: 1100px; margin: 0 auto; }
    .topline { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 22px; flex-wrap: wrap; gap: 10px; }
    .topline h1 { font: 500 32px var(--font-display); color: var(--kam-forest); margin: 0; }
    .topline p { font: 400 14px var(--font-body); color: var(--fg-muted); margin: 4px 0 0; }
    .auto { display: flex; align-items: center; gap: 6px; font: 400 12.5px var(--font-body); color: var(--kam-forest); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(232px, 1fr)); gap: 26px; }
    .addtile { width: 232px; height: 328px; align-self: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; border: 1.5px dashed rgba(0,76,88,.3); border-radius: 10px; background: transparent; color: var(--fg-muted); cursor: pointer; transition: all .16s; font: 700 13.5px var(--font-body); }
    .addtile:hover { border-color: var(--kam-forest); color: var(--kam-forest); background: rgba(0,76,88,.04); }
    .cell { display: flex; flex-direction: column; gap: 12px; }
    .thumb-card { cursor: pointer; border-radius: 10px; overflow: hidden; background: #fff; box-shadow: var(--shadow-card); transition: all .2s var(--ease-soft); align-self: center; }
    .thumb-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-card-hover); }
    .thumb { width: 232px; height: 328px; position: relative; overflow: hidden; }
    .thumb-inner { position: absolute; top: 0; left: 0; width: 794px; transform: scale(0.2922); transform-origin: top left; pointer-events: none; }
    .meta { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
    .meta-txt { min-width: 0; }
    .name { font: 700 14px var(--font-body); color: var(--kam-dark-black); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { font: 400 12px var(--font-body); color: var(--fg-muted); }
    .actions { display: flex; flex: none; }
    .icon-btn { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; cursor: pointer; color: var(--kam-forest); transition: background .14s; }
    .icon-btn:hover { background: rgba(0,76,88,.1); }
    .icon-btn.danger { color: var(--kam-coral); }
    .btn { display: inline-flex; align-items: center; gap: 7px; font: 700 13px var(--font-body); padding: 9px 16px; border-radius: 999px; cursor: pointer; border: none; }
    .btn.primary { background: var(--kam-forest); color: var(--kam-linen); }
    .btn.primary:hover { opacity: .9; }
  `],
})
export class LibraryComponent {
  readonly store = inject(CvStore);

  layoutLabel(key: string): string {
    return LAYOUTS.find((l) => l.key === key)?.label ?? key;
  }
  confirmDelete(id: string): void {
    if (confirm('Supprimer ce CV ?')) this.store.deleteCv(id);
  }
  trackCv(_i: number, cv: Cv): string {
    return cv.id;
  }
}
