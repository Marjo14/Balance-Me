import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import indispensable pour utiliser <ui-button> dans le template
import { UiButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  // On déclare le bouton ici pour corriger ton erreur de compilation
  imports: [CommonModule, UiButtonComponent], 
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  // On émet l'événement vers le parent (Home)
  @Output() resetAll = new EventEmitter<void>();

  onResetClick(): void {
    this.resetAll.emit();
  }
}