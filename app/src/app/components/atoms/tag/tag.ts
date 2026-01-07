import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.html',
  styleUrl: './tag.scss',
})
export class Tag {
  @Input() label = 'Tag';
  @Input() variant: 'positive' | 'warning' | 'negative' | 'neutral' = 'neutral';

    get icon(): string {
    switch (this.variant) {
      case 'positive':
        return '✅';
      case 'warning':
        return '⚠️';
      case 'negative':
        return '❌';
      default:
        return 'ℹ️';
    }
  }
  
}
