import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy,
  computed, inject, input, signal, viewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cv } from '../models/cv.model';
import { CvFormComponent } from './cv-form.component';
import { CvPreviewComponent } from './cv-preview.component';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, CvFormComponent, CvPreviewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="editor">
      <aside class="form-panel"><app-cv-form [cv]="cv()"></app-cv-form></aside>
      <div class="preview-panel" #panel>
        <div class="sizer" [style.width.px]="794 * scale()" [style.height.px]="1123 * scale()">
          <div class="scaled" [style.transform]="'scale(' + scale() + ')'">
            <app-cv-preview [cv]="cv()"></app-cv-preview>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { flex: 1; min-height: 0; display: flex; }
    .editor { flex: 1; display: flex; min-height: 0; }
    .form-panel { width: 440px; flex: none; background: #fff; border-right: 1px solid rgba(18,32,35,.08); overflow-y: auto; padding: 4px 26px 60px; }
    .preview-panel { flex: 1; min-width: 0; overflow: auto; background: #D8D4CB; padding: 28px; display: flex; justify-content: center; align-items: flex-start; }
    .sizer { position: relative; filter: drop-shadow(0 14px 34px rgba(0,0,0,.16)); }
    .scaled { position: absolute; top: 0; left: 0; width: 794px; transform-origin: top left; border-radius: 4px; overflow: hidden; }
  `],
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  readonly cv = input.required<Cv>();
  readonly panel = viewChild<ElementRef<HTMLElement>>('panel');

  private readonly previewW = signal(800);
  readonly scale = computed(() => Math.min(1, (this.previewW() - 56) / 794));

  private ro?: ResizeObserver;

  ngAfterViewInit(): void {
    const el = this.panel()?.nativeElement;
    if (!el) return;
    this.previewW.set(el.clientWidth);
    this.ro = new ResizeObserver(() => this.previewW.set(el.clientWidth));
    this.ro.observe(el);
  }
  ngOnDestroy(): void {
    this.ro?.disconnect();
  }
}
