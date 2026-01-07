import { Component, Input } from '@angular/core';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class UiInputComponent {
  @Input() id = '';
  @Input() label = '';
  @Input() placeholder = '';
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() value: string | number | null = null;

  @Input() required = false;
  @Input() disabled = false;

  // Accessibility + UI states
  @Input() hint = '';          // helper text under field
  @Input() error = '';         // error message (if not empty => error state)

  // Optional right unit (€, etc.)
  @Input() suffix = '';        // e.g. "€"

  get describedById(): string | null {
    if (this.error) return `${this.id}-error`;
    if (this.hint) return `${this.id}-hint`;
    return null;
  }
}
