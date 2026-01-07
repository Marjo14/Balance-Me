import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
})
export class InputComponent{
  @Input() label = '';
  @Input() type: 'text' | 'number' = 'text';
  @Input() placeholder = '';
  @Input() disabled = false;

}
