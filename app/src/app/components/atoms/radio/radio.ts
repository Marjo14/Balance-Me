import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio',
  imports: [],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
})
export class Radio {
  @Input() label = 'Option';
  @Input() variant: 'neutral' | 'emotional' = 'neutral';
  @Input() checked = false;
  @Input() disabled = false;

  /** Emits "true" when user selects this option */
  @Output() checkedChange = new EventEmitter<boolean>();

  select(): void {
    if (this.disabled) return;
    this.checkedChange.emit(true);
  }

}
