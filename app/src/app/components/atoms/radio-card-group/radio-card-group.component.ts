import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type UiRadioCardTone = 'neutral' | 'positive' | 'danger';

export interface UiRadioCardOption<T extends string = string> {
  value: T;
  label: string;
  helperLeft?: string;   // ex: "BESOIN ?"
  helperRight?: string;  // ex: "ENVIE ?"
  tone?: UiRadioCardTone;
  disabled?: boolean;
}

@Component({
  selector: 'ui-radio-card-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-card-group.component.html',
  styleUrls: ['./radio-card-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiRadioCardGroupComponent<T extends string = string> {
  /** Accessible legend */
  @Input() legend = "L'intention derrière l'acte";

  /** Name attribute for radio grouping */
  @Input() name = 'ui-radio-card-group';

  /** Options */
  @Input() options: UiRadioCardOption<T>[] = [];

  /** Selected value */
  @Input() value!: T;

  /** Emits when selection changes */
  @Output() valueChange = new EventEmitter<T>();

  onSelect(v: T) {
    this.valueChange.emit(v);
  }

  trackByValue = (_: number, o: UiRadioCardOption<T>) => o.value;
}
