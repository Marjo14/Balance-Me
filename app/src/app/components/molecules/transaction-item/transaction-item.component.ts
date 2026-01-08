import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiTagComponent, UiTagTone } from '../../atoms/tag/tag.component';

@Component({
  selector: 'app-transaction-item',
  standalone: true,
  imports: [CommonModule, UiTagComponent],
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss']
})
export class TransactionItemComponent {
  @Input() title: string = '';
  @Input() amount: number = 0;
  @Input() date: string = '';
  @Input() tagLabel: string = ''; 
  @Input() emotion: string = '';

  get computedTone(): UiTagTone {
    const label = (this.tagLabel || '').toUpperCase();
    if (label.includes('EMOTION') || label.includes('ENVIE')) return 'emotional';
    if (label.includes('VITAL') || label.includes('BESOIN')) return 'primary';
    return 'neutral';
  }
} 