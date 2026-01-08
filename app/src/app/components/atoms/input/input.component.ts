import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'ui-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class UiInputComponent {
  /** BASIC ATTRIBUTES */
  @Input() id = '';              // Unique DOM ID used to link label and input (Crucial for A11y)
  @Input() label = '';           // The visible text label displayed above the field
  @Input() placeholder = '';     // Ghost text shown when the field is empty
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text'; // Native HTML input type
  @Input() value: string | number | null = null; // Current value of the input field

  /** BROWSER & MOBILE BEHAVIOR */
  @Input() autocomplete: string = 'off'; // Browser autofill suggestion (e.g., 'email', 'new-password', 'off')
  @Input() inputMode: string = 'text';   // Virtual keyboard layout on mobile (e.g., 'numeric' shows numbers)

  /** STATES & VALIDATION */
  @Input() required = false;     // Marks the field as mandatory (adds visual indicator)
  @Input() disabled = false;     // Disables interaction and dims the field opacity

  /** FEEDBACK & ACCESSIBILITY */
  @Input() hint = '';            // Neutral helper text displayed below the field
  @Input() error = '';           // Error message text. If present, turns the field red.

  /** VISUAL EXTRAS */
  @Input() suffix = '';          // Icon or symbol at the right end (e.g., "€", "%")

  /**
   * ACCESSIBILITY HELPER
   * Dynamically links the input to its description (error or hint) for screen readers.
   */
  get describedById(): string | null {
    if (this.error) return `${this.id}-error`; // Prioritize reading the error message
    if (this.hint) return `${this.id}-hint`;   // Otherwise read the hint
    return null;
  }
}
