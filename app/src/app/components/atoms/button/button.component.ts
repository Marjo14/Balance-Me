import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common'; 

export type UiButtonVariant =
  | 'primary'
  | 'secondary'
  | 'emotional'
  | 'insight'
  | 'brown'
  | 'ghost';

export type UiButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'ui-button',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiButtonComponent {
  @Input() variant: UiButtonVariant = 'primary';
  @Input() size: UiButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() fullWidth = false;

  @Input() ariaLabel?: string;

  @Output() pressed = new EventEmitter<MouseEvent>();

  get isDisabled(): boolean {
    return this.disabled || this.loading;
  }

  get hostClasses(): string[] {
    return [
      'ui-btn',
      `ui-btn--${this.variant}`,
      `ui-btn--${this.size}`,
      this.fullWidth ? 'ui-btn--full' : '',
      this.loading ? 'ui-btn--loading' : '',
    ].filter(Boolean);
  }

  onClick(e: MouseEvent) {
    if (this.isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.pressed.emit(e);
  }
}