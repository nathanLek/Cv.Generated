import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvStore } from '../services/cv-store.service';
import { Cv, SchemeKey } from '../models/cv.model';
import { LAYOUTS } from '../data/styles';
import { SCHEMES, SCHEME_LABELS, SCHEME_ORDER } from '../data/schemes';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-cv-form',
  standalone: true,
  imports: [CommonModule, IconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cv-form.component.html',
  styleUrl: './cv-form.component.scss',
})
export class CvFormComponent {
  readonly store = inject(CvStore);
  readonly cv = input.required<Cv>();
  readonly d = computed(() => this.cv().data);
  readonly t = computed(() => this.cv().theme);

  readonly layouts = LAYOUTS;
  readonly schemeKeys = SCHEME_ORDER;
  readonly schemeLabels = SCHEME_LABELS;
  readonly schemes = SCHEMES;
  readonly levels = [1, 2, 3, 4, 5];
  readonly langLevels = ['Notions', 'Intermédiaire', 'Courant', 'Bilingue', 'Natif'];

  readonly open = signal<Record<string, boolean>>({ model: true, infos: true, summary: true, exp: true });
  toggle(key: string): void {
    this.open.update((o) => ({ ...o, [key]: !o[key] }));
  }
  isOpen(key: string): boolean {
    return !!this.open()[key];
  }

  schemeActive(key: SchemeKey): boolean {
    const sc = SCHEMES[key];
    const th = this.t();
    return th.panel === sc.panel && th.accent === sc.accent && th.page === sc.page;
  }

  onPhoto(target: EventTarget | null): void {
    const file = (target as HTMLInputElement)?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => this.store.setPhoto(String(e.target?.result));
    reader.readAsDataURL(file);
  }

  val(e: Event): string {
    return (e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement).value;
  }
  checked(e: Event): boolean {
    return (e.target as HTMLInputElement).checked;
  }
}
