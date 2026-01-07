import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type UiCardVariant = 'neutral' | 'positive' | 'danger' | 'info' | 'soft';
export type UiCardPadding = 'md' | 'lg';
export type UiCardElevation = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiCardComponent {
  @Input() variant: UiCardVariant = 'neutral';
  @Input() padding: UiCardPadding = 'lg';
  @Input() elevation: UiCardElevation = 'md';
  @Input() fullHeight = false;

  get hostClasses(): string {
    return [
      'ui-card',
      `ui-card--${this.variant}`,
      `ui-card--pad-${this.padding}`,
      `ui-card--elev-${this.elevation}`,
      this.fullHeight ? 'ui-card--full' : '',
    ]
      .filter(Boolean)
      .join(' ');
  }
}
