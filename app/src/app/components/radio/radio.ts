import { Component, Input } from '@angular/core';

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

}
