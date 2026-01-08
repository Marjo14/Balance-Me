import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../../../services/budget.service'; 
import { UiCardComponent } from '../../atoms/card/card.component';
import { UiInputComponent } from '../../atoms/input/input.component';
import { UiButtonComponent } from '../../atoms/button/button.component';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [
    CommonModule, 
    UiCardComponent, 
    UiInputComponent, 
    UiButtonComponent
  ],
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  private budgetService = inject(BudgetService);
  tempBudget = signal<number | null>(null);

  onTempBudgetChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    // On s'assure que la valeur est un nombre positif
    const parsed = parseFloat(val);
    this.tempBudget.set(!isNaN(parsed) && parsed > 0 ? parsed : null);
  }

  onStart() {
    const budget = this.tempBudget();
    if (budget !== null && budget > 0) {
      // Met à jour le budget et ferme l'onboarding
      this.budgetService.setInitialBudget(budget);
    }
  }
}