import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStore } from './services/cv-store.service';
import { IconComponent } from './components/icon.component';
import { LibraryComponent } from './components/library.component';
import { EditorComponent } from './components/editor.component';
import { PickerComponent } from './components/picker.component';
import { CvPreviewComponent } from './components/cv-preview.component';
import { ExportDialogComponent } from './components/export-dialog.component';
import { ToastComponent } from './components/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, IconComponent, LibraryComponent, EditorComponent, PickerComponent, CvPreviewComponent, ExportDialogComponent, ToastComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app">
      <header class="bar">
        <div class="brand">
          <span class="mark">cv</span>
          <span class="brand-name">Éditeur de CV</span>
        </div>

        <div class="bar-right">
          @if (store.view() === 'editor' && store.current(); as cur) {
            <button class="ghost" (click)="store.backToLibrary()"><app-icon name="back" [size]="16"></app-icon>Mes CV</button>
            <input class="name" [value]="cur.name" (input)="store.setMeta({ name: value($event) })">
            <span class="divider"></span>
            <button class="primary" (click)="store.openExport()"><app-icon name="download" [size]="16"></app-icon>Télécharger</button>
          } @else {
            <label class="outline file">
              <app-icon name="file" [size]="15"></app-icon>Importer JSON
              <input type="file" accept="application/json,.json" (change)="onImport($event.target)" hidden>
            </label>
            <button class="primary" (click)="store.openPicker()"><app-icon name="plus" [size]="16"></app-icon>Nouveau CV</button>
          }
        </div>
      </header>

      <div class="view">
        @if (store.view() === 'editor' && store.current(); as cur) {
          <app-editor [cv]="cur"></app-editor>
        } @else {
          <app-library></app-library>
        }
      </div>
    </div>

    @if (store.picking()) { <app-picker></app-picker> }

    @if (store.exporting() && store.current(); as cur) { <app-export-dialog [cv]="cur"></app-export-dialog> }

    <app-toast></app-toast>

    @if (store.current(); as cur) {
      <div id="cv-print"><app-cv-preview [cv]="cur"></app-cv-preview></div>
    }
  `,
  styles: [`
    .app { display: flex; flex-direction: column; height: 100vh; background: #EAE6DD; overflow: hidden; }
    .bar { flex: none; height: 62px; display: flex; align-items: center; justify-content: space-between; padding: 0 22px; background: #fff; border-bottom: 1px solid rgba(18,32,35,.08); z-index: 5; }
    .brand { display: flex; align-items: center; gap: 12px; }
    .mark { width: 32px; height: 32px; flex: none; background: var(--kam-forest); border-radius: 46% 54% 63% 37% / 45% 38% 62% 55%; display: flex; align-items: center; justify-content: center; color: var(--kam-linen); font: 500 15px var(--font-display); }
    .brand-name { font: 500 20px var(--font-display); color: var(--kam-forest); letter-spacing: -0.01em; }
    .bar-right { display: flex; align-items: center; gap: 10px; }
    .name { width: 200px; padding: 8px 11px; font: 700 13px var(--font-body); color: var(--kam-dark-black); border: 1px solid rgba(18,32,35,.14); border-radius: 8px; outline: none; }
    .name:focus { border-color: var(--kam-forest); box-shadow: 0 0 0 3px rgba(0,76,88,.12); }
    .divider { width: 1px; height: 26px; background: rgba(18,32,35,.12); }
    .view { flex: 1; min-height: 0; display: flex; }

    button, .file { display: inline-flex; align-items: center; gap: 7px; font: 700 13px var(--font-body); cursor: pointer; white-space: nowrap; }
    .primary { background: var(--kam-forest); color: var(--kam-linen); padding: 9px 16px; border-radius: 999px; border: none; transition: opacity .14s; }
    .primary:hover { opacity: .9; }
    .outline { background: transparent; color: var(--kam-forest); padding: 9px 16px; border-radius: 999px; border: 1.5px solid var(--kam-forest); transition: all .14s; }
    .outline:hover { background: var(--kam-forest); color: var(--kam-linen); }
    .ghost { background: transparent; color: var(--kam-forest); padding: 8px 12px; border-radius: 8px; border: none; transition: background .14s; }
    .ghost:hover { background: rgba(0,76,88,.07); }
    .file { padding: 9px 14px; border-radius: 999px; }

    #cv-print { position: fixed; left: -99999px; top: 0; width: 794px; background: #fff; }
  `],
})
export class AppComponent {
  readonly store = inject(CvStore);

  value(e: Event): string {
    return (e.target as HTMLInputElement).value;
  }
  onImport(input: EventTarget | null): void {
    const file = (input as HTMLInputElement)?.files?.[0];
    if (file) this.store.importJson(file);
  }
}
