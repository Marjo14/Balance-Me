import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() label = '';
  @Input() options: Array<{ value: string; label: string }> = [];
  @Input() value: string | null = null;
  @Input() disabled = false;
  @Input() variant: UiSelectVariant = 'emotion';
  @Input() id = '';
  @Input() error = '';

  @Output() valueChange = new EventEmitter<string>();

  get selectId(): string {
    return this.id || 'ui-radio-' + Math.random().toString(36).substring(2, 9);
  }

  get rootClasses(): string[] {
    return [
      'ui-radio-group',
      `ui-select--${this.variant}`,
      this.error ? 'ui-radio-group--error' : '',
    ].filter(Boolean);
  }

  onRadioChange(newValue: string) {
    this.valueChange.emit(newValue);
  }
}