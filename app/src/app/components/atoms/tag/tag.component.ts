import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type UiTagTone = 'neutral' | 'primary' | 'secondary' | 'emotional' | 'insight' | 'brown';
export type UiTagSize = 'sm' | 'md';

@Component({
  selector: 'ui-tag',
  standalone: true,
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiTagComponent {
  /** Visual tone mapped to design tokens */
  @Input() tone: UiTagTone = 'neutral';

  /** Size */
  @Input() size: UiTagSize = 'sm';

  /** If true, renders as a pill with border (like "BESOIN ?") */
  @Input() ghost = false;

  /** Optional leading dot (like your "• ÉNERGIE FINANCIÈRE") */
  @Input() dot = false;

  /** Optional emoji/icon */
  @Input() icon?: string;

  get hostClasses(): string[] {
    return [
      'ui-tag',
      `ui-tag--${this.tone}`,
      `ui-tag--${this.size}`,
      this.ghost ? 'ui-tag--ghost' : '',
      this.dot ? 'ui-tag--dot' : '',
      this.icon ? 'ui-tag--icon' : '',
    ].filter(Boolean);
  }
}
