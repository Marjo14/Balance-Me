import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-remaining-amount-card',
  imports: [],
  templateUrl: './remaining-amount-card.html',
  styleUrl: './remaining-amount-card.scss',
})
export class RemainingAmountCard {
@Input() amount = 0;
}
