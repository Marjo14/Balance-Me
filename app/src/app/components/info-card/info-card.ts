import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  imports: [],
  templateUrl: './info-card.html',
  styleUrl: './info-card.scss',
})
export class InfoCard {
  @Input() title = 'Titre card';
  @Input() variant: 'insight' | 'secondary' = 'insight';

}
