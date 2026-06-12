import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStore, ExportFormat } from '../services/cv-store.service';
import { Cv } from '../models/cv.model';
import { IconComponent } from './icon.component';
import { CvPreviewComponent } from './cv-preview.component';

@Component({
  selector: 'app-export-dialog',
  standalone: true,
  imports: [CommonModule, IconComponent, CvPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="backdrop" (click)="store.closeExport()">
      <div class="modal" (click)="$event.stopPropagation()">
        <header class="head">
          <div class="head-left">
            <span class="logo"><app-icon name="download" [size]="20"></app-icon></span>
            <div>
              <h2>Télécharger ton CV</h2>
              <p>Vérifie l'aperçu et choisis le format d'export.</p>
            </div>
          </div>
          <button class="icon-btn" title="Fermer" (click)="store.closeExport()"><app-icon name="x" [size]="17"></app-icon></button>
        </header>

        <div class="body">
          <div class="thumb">
            <div class="thumb-inner"><app-cv-preview [cv]="cv()"></app-cv-preview></div>
          </div>
          <div class="options">
            @for (f of store.formats; track f.key) {
              <button class="opt" [class.on]="store.exportFormat() === f.key" (click)="store.setExportFormat(f.key)">
                <span class="opt-ic"><app-icon [name]="f.icon" [size]="18"></app-icon></span>
                <span class="opt-txt"><strong>{{ f.label }}</strong><small>{{ f.desc }}</small></span>
                <span class="radio" [class.on]="store.exportFormat() === f.key"></span>
              </button>
            }
          </div>
        </div>

        <footer class="foot">
          <span class="fname">« {{ cv().name || 'CV' }} »</span>
          <div class="actions">
            <button class="ghost" (click)="store.closeExport()">Annuler</button>
            <button class="primary" (click)="store.confirmExport(cv())">
              <app-icon name="download" [size]="16"></app-icon>Télécharger le {{ confirmLabel() }}
            </button>
          </div>
        </footer>
      </div>
    </div>
  `,
  styles: [`
    .backdrop { position: fixed; inset: 0; background: rgba(18,32,35,.5); display: flex; align-items: center; justify-content: center; z-index: 55; padding: 24px; }
    .modal { background: #fff; border-radius: 22px; width: 100%; max-width: 640px; box-shadow: var(--shadow-pop); overflow: hidden; animation: cvfade .26s var(--ease-out); }
    .head { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; padding: 24px 28px 6px; }
    .head-left { display: flex; align-items: center; gap: 14px; }
    .logo { width: 44px; height: 44px; flex: none; background: var(--kam-forest); border-radius: 46% 54% 63% 37% / 45% 38% 62% 55%; display: flex; align-items: center; justify-content: center; color: var(--kam-linen); }
    .head h2 { font: 500 26px var(--font-display); color: var(--kam-forest); margin: 0; }
    .head p { font: 400 13px var(--font-body); color: var(--fg-secondary); margin: 3px 0 0; }
    .body { display: flex; gap: 22px; padding: 12px 28px 8px; align-items: flex-start; }
    .thumb { flex: none; width: 150px; height: 212px; border-radius: 6px; overflow: hidden; border: 1px solid rgba(18,32,35,.12); box-shadow: var(--shadow-card); position: relative; pointer-events: none; }
    .thumb-inner { position: absolute; top: 0; left: 0; width: 794px; transform: scale(0.1889); transform-origin: top left; }
    .options { flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .opt { display: flex; align-items: center; gap: 13px; width: 100%; text-align: left; padding: 13px 14px; border-radius: 12px; cursor: pointer; background: #fff; border: 1.5px solid rgba(18,32,35,.12); transition: all .14s; }
    .opt.on { background: rgba(0,76,88,.06); border-color: var(--kam-forest); }
    .opt-ic { width: 38px; height: 38px; flex: none; border-radius: 10px; background: var(--kam-linen); color: var(--kam-forest); display: flex; align-items: center; justify-content: center; transition: all .14s; }
    .opt.on .opt-ic { background: var(--kam-forest); color: var(--kam-linen); }
    .opt-txt { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
    .opt-txt strong { font: 700 13.5px var(--font-body); color: var(--kam-dark-black); }
    .opt-txt small { font: 400 12px/1.4 var(--font-body); color: var(--fg-muted); }
    .radio { width: 20px; height: 20px; flex: none; border-radius: 999px; border: 2px solid rgba(18,32,35,.25); transition: all .14s; }
    .radio.on { border: 6px solid var(--kam-forest); }
    .foot { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 14px 28px 24px; margin-top: 6px; border-top: 1px solid rgba(18,32,35,.08); }
    .fname { font: 400 12.5px var(--font-body); color: var(--fg-muted); }
    .actions { display: flex; gap: 10px; }
    .icon-btn { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; cursor: pointer; color: var(--kam-forest); transition: background .14s; }
    .icon-btn:hover { background: rgba(0,76,88,.1); }
    button.ghost, button.primary { display: inline-flex; align-items: center; gap: 7px; font: 700 13px var(--font-body); cursor: pointer; white-space: nowrap; }
    .ghost { background: transparent; color: var(--kam-forest); padding: 9px 14px; border-radius: 999px; border: none; transition: background .14s; }
    .ghost:hover { background: rgba(0,76,88,.07); }
    .primary { background: var(--kam-forest); color: var(--kam-linen); padding: 9px 18px; border-radius: 999px; border: none; transition: opacity .14s; }
    .primary:hover { opacity: .9; }
  `],
})
export class ExportDialogComponent {
  readonly store = inject(CvStore);
  readonly cv = input.required<Cv>();
  readonly confirmLabel = computed<string>(() => {
    const f: ExportFormat = this.store.exportFormat();
    return f === 'json' ? 'JSON' : f.toUpperCase();
  });
}
