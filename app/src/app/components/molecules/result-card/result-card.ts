import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Tag } from '../../atoms/tag/tag';

type ResultStatus = 'positive' | 'warning' | 'negative' | 'neutral';

@Component({
  selector: 'app-result-card',
  imports: [CommonModule,Tag],
  templateUrl: './result-card.html',
  styleUrl: './result-card.scss',
})
export class ResultCard {
  @Input() title = 'Résultat';
  @Input() status: ResultStatus = 'neutral';
  @Input() label = 'Info';
  @Input() message = 'Message…';

}
