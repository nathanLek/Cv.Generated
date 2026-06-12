import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv, Education, Experience } from '../models/cv.model';

/** Renders a CV at native A4 size (794 × 1123 px). Parents scale it via CSS transform. */
@Component({
  selector: 'app-cv-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cv-preview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CvPreviewComponent {
  readonly cv = input.required<Cv>();

  readonly t = computed(() => this.cv().theme);
  readonly d = computed(() => this.cv().data);
  readonly layout = computed(() => this.cv().layout);
  readonly showPhoto = computed(() => this.cv().showPhoto && !!this.cv().data.photo);

  readonly range5 = [1, 2, 3, 4, 5];

  contact(): string[] {
    const x = this.d();
    return [x.email, x.phone, x.location, x.website].filter(Boolean);
  }
  bullets(desc: string): string[] {
    return (desc || '').split('\n').map((s) => s.trim()).filter(Boolean);
  }
  interests(): string[] {
    return (this.d().interests || '').split(',').map((s) => s.trim()).filter(Boolean);
  }
  interestsJoined(): string {
    return this.interests().join(' · ');
  }
  initials(): string {
    const n = (this.d().fullName || '').trim().split(/\s+/).map((w) => w[0] || '').slice(0, 2).join('').toUpperCase();
    return n || 'CV';
  }
  company(e: Experience): string {
    return [e.company, e.location].filter(Boolean).join(' · ');
  }
  linkText(l: { label: string; url: string }): string {
    return l.url ? `${l.label} — ${l.url}` : l.label;
  }
  skillWidth(level: number): string {
    return `${(level / 5) * 100}%`;
  }
  langValue(name: string, level: string): string {
    return `${name} (${level})`;
  }
  languagesLine(): string {
    return this.d().languages.map((l) => `${l.name} (${l.level})`).join(', ');
  }
}
