import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() label = 'Bouton';
  @Input() variant: 'primary' | 'secondary' | 'emotional' | 'insight' | 'neutral' = 'primary';
  @Input() disabled = false;

  /** Allows usage inside forms */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  /** UI interaction event (NOT business logic) */
  @Output() pressed = new EventEmitter<void>();

  onClick(): void {
    if (this.disabled) return;
    this.pressed.emit();
  }

}
