import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/** Inline SVG icon set (Lucide-style, matching the KAM 24px substitution). */
@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
         style="flex:none;display:block">
      @for (d of paths(); track d) {
        <path [attr.d]="d"></path>
      }
    </svg>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  readonly name = input.required<string>();
  readonly size = input<number>(20);

  private readonly map: Record<string, string[]> = {
    plus: ['M12 5v14', 'M5 12h14'],
    trash: ['M3 6h18', 'M8 6V4h8v2', 'M19 6l-1 14H6L5 6', 'M10 11v6', 'M14 11v6'],
    copy: ['M9 9h10v10H9z', 'M5 15V5h10'],
    back: ['M19 12H5', 'M12 19l-7-7 7-7'],
    download: ['M12 3v12', 'M7 10l5 5 5-5', 'M5 21h14'],
    image: ['M3 5h18v14H3z', 'M3 16l5-5 4 4 3-3 6 6'],
    file: ['M14 3H6v18h12V8z', 'M14 3v5h5'],
    up: ['M12 19V5', 'M5 12l7-7 7 7'],
    down: ['M12 5v14', 'M5 12l7 7 7-7'],
    chev: ['M6 9l6 6 6-6'],
    camera: ['M3 7h4l2-2h6l2 2h4v12H3z', 'M12 16a3 3 0 100-6 3 3 0 000 6'],
    x: ['M18 6L6 18', 'M6 6l12 12'],
    doc: ['M7 3h7l5 5v13H7z', 'M14 3v5h5', 'M9 13h6', 'M9 17h6'],
    grid: ['M3 3h8v8H3z', 'M13 3h8v8h-8z', 'M3 13h8v8H3z', 'M13 13h8v8h-8z'],
    palette: ['M12 3a9 9 0 100 18 2 2 0 002-2 2 2 0 012-2h1a4 4 0 004-4 9 9 0 00-13-10z', 'M7.5 11.5h.01', 'M10.5 7.5h.01', 'M14.5 7.5h.01'],
    code: ['M16 18l6-6-6-6', 'M8 6l-6 6 6 6'],
    chart: ['M5 20V11', 'M11 20V5', 'M17 20v-8', 'M3 20h18'],
    server: ['M3 4h18v6H3z', 'M3 14h18v6H3z', 'M7 7h.01', 'M7 17h.01'],
    shield: ['M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z'],
    briefcase: ['M3 8h18v12H3z', 'M8 8V5h8v3', 'M3 13h18'],
    sliders: ['M4 6h16', 'M4 12h16', 'M4 18h16', 'M9 6v0', 'M15 12v0', 'M7 18v0'],
    wrench: ['M14.7 6.3a4 4 0 00-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4 2.6-2.6z'],
    landmark: ['M3 21h18', 'M4 10h16', 'M5 10v8', 'M19 10v8', 'M10 10v8', 'M14 10v8', 'M12 3l8 5H4z'],
    heart: ['M12 21s-7-4.5-9.5-9A5 5 0 0112 5a5 5 0 019.5 7c-2.5 4.5-9.5 9-9.5 9z'],
    bag: ['M6 7h12l1 13H5z', 'M9 7a3 3 0 016 0'],
  };

  readonly paths = computed(() => this.map[this.name()] ?? []);
}
