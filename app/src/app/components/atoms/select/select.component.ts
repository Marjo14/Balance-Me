import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal } from '@angular/core';
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
  @Input() placeholder = 'Sélectionner...';
  @Input() options: Array<{ value: string; label: string }> = [];
  @Input() value: string | null = null;
  @Input() disabled = false;
  @Input() variant: UiSelectVariant = 'emotion';
  @Input() id = '';
  @Input() error = '';

  @Output() valueChange = new EventEmitter<string>();

  isOpen = false;

  get selectId(): string {
    return this.id || 'ui-select-' + Math.random().toString(36).substring(2, 9);
  }

  get selectedLabel(): string {
    const found = this.options.find(o => o.value === this.value);
    return found ? found.label : '';
  }

  get rootClasses(): string[] {
    return [
      'ui-select',
      `ui-select--${this.variant}`,
      this.isOpen ? 'is-open' : '',
      this.error ? 'ui-select--error' : '',
      this.disabled ? 'ui-select--disabled' : '',
    ].filter(Boolean);
  }

  toggleDropdown() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  selectOption(opt: { value: string; label: string }) {
    this.value = opt.value;
    this.valueChange.emit(opt.value);
    this.isOpen = false;
  }
}