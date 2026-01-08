import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // On crée une sortie (Output) pour prévenir le parent (Home) qu'on veut reset
  @Output() resetAll = new EventEmitter<void>();

  onResetClick(): void {
    // On émet l'événement au lieu de coder la logique ici
    // Cela permet à la page Home d'ouvrir SA modale du Design System
    this.resetAll.emit();
  }
}