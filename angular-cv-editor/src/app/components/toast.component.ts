import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStore, ToastType } from '../services/cv-store.service';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (store.toasts().length) {
      <div class="toasts">
        @for (t of store.toasts(); track t.id) {
          <div class="toast" [style.borderLeftColor]="color(t.type)">
            <span class="ic" [style.background]="color(t.type)"><app-icon [name]="icon(t.type)" [size]="15"></app-icon></span>
            <span class="msg">{{ t.message }}</span>
            <button class="x" title="Fermer" (click)="store.dismissToast(t.id)"><app-icon name="x" [size]="17"></app-icon></button>
          </div>
        }
      </div>
    }
  `,
  styles: [`
    .toasts { position: fixed; right: 22px; bottom: 22px; z-index: 60; display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
    .toast { display: flex; align-items: center; gap: 11px; background: #fff; border-radius: 12px; padding: 11px 12px 11px 14px; box-shadow: var(--shadow-pop); min-width: 250px; max-width: 380px; border-left: 4px solid var(--kam-forest); animation: cvfade .24s var(--ease-out); }
    .ic { width: 26px; height: 26px; flex: none; border-radius: 999px; color: #fff; display: flex; align-items: center; justify-content: center; }
    .msg { font: 400 13px/1.4 var(--font-body); color: var(--kam-dark-black); flex: 1; }
    .x { width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center; border: none; background: transparent; border-radius: 8px; cursor: pointer; color: var(--kam-forest); transition: background .14s; }
    .x:hover { background: rgba(0,76,88,.1); }
  `],
})
export class ToastComponent {
  readonly store = inject(CvStore);
  color(t: ToastType): string {
    return t === 'info' ? '#2A6FDB' : t === 'error' ? 'var(--kam-coral)' : 'var(--kam-forest)';
  }
  icon(t: ToastType): string {
    return t === 'info' ? 'bell' : t === 'error' ? 'x' : 'check';
  }
}
