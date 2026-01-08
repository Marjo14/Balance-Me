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
  
  // Signal local pour stocker la saisie avant validation
  tempBudget = signal<number | null>(null);

  onTempBudgetChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.tempBudget.set(val ? parseFloat(val) : null);
  }

  onStart() {
    if (this.tempBudget() !== null) {
      // Met à jour le budget initial dans le service global
      this.budgetService.setInitialBudget(this.tempBudget()!);
    }
  }
}