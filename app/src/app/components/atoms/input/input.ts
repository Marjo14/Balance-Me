import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent{
  @Input() id = '';
  @Input() name = '';

  @Input() label = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;

  /** Controlled value (string to keep typing flexible) */
  @Input() value = '';
  /** Emits value on each input event */
  @Output() valueChange = new EventEmitter<string>();

}
