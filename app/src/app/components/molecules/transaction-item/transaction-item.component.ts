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
  /** Title of the transaction (e.g., "Grocery Shopping") */
  @Input() title: string = '';

  /** Transaction amount. Negative usually implies an expense. */
  @Input() amount: number = 0;

  /** Formatted date string (e.g., "JAN 8, 2026") */
  @Input() date: string = '';
  
  /** Category label displayed inside the Tag (e.g., "VITAL NEED", "EMOTIONAL") */
  @Input() tagLabel: string = ''; 
  
  /** Optional emotional context text (e.g., "BOREDOM", "STRESS") */
  @Input() emotion: string = '';

  /**
   * Computes the visual tone of the Tag and Icon based on the category label.
   * Maps business logic keywords to Design System tokens.
   * * @returns {UiTagTone} - The color variant ('emotional', 'primary', or 'neutral').
   */
  get computedTone(): UiTagTone {
    const label = this.tagLabel.toUpperCase();

    // CASE 1: Emotional / Impulse Purchase -> PINK (Danger/Emotional Tone)
    if (label.includes('EMOTION') || label.includes('ENVIE') || label.includes('PLAISIR')) {
      return 'emotional';
    }

    // CASE 2: Vital Need / Necessary -> TEAL (Primary Tone)
    // Matches the "BESOIN ?" tag from the Design System.
    if (label.includes('VITAL') || label.includes('BESOIN') || label.includes('NECESSAIRE')) {
      return 'primary'; 
    }

    // DEFAULT: Standard category -> GREY (Neutral Tone)
    return 'neutral'; 
  }
}