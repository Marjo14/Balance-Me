import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type UiSelectVariant = 'neutral' | 'emotion';

@Component({
  selector: 'ui-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiSelectComponent {
  /** Visible label above the select */
  @Input() label = '';

  /** Optional helper text (below) */
  @Input() hint = '';

  /** Error message (below). If set => aria-invalid + error styles */
  @Input() error = '';

  /** Visual variant */
  @Input() variant: UiSelectVariant = 'neutral';

  /** Native select props */
  @Input() id = '';
  @Input() name = '';
  @Input() value: string | null = null;
  @Input() disabled = false;
  @Input() required = false;

  /** Placeholder shown as first option */
  @Input() placeholder = 'Sélectionner...';

  /** Options list */
  @Input() options: Array<{ value: string; label: string }> = [];

  /** Emits selected value */
  @Output() valueChange = new EventEmitter<string>();

  /** Emits native change event if needed */
  @Output() changed = new EventEmitter<Event>();

  get selectId(): string {
    return this.id || this.name || 'ui-select';
  }

  get describedBy(): string | null {
    const ids: string[] = [];
    if (this.hint) ids.push(`${this.selectId}-hint`);
    if (this.error) ids.push(`${this.selectId}-error`);
    return ids.length ? ids.join(' ') : null;
  }

  get rootClasses(): string[] {
    return [
      'ui-select',
      `ui-select--${this.variant}`,
      this.error ? 'ui-select--error' : '',
      this.disabled ? 'ui-select--disabled' : '',
    ].filter(Boolean);
  }

  onChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    this.valueChange.emit(target.value);
    this.changed.emit(e);
  }
}
