import { CommonModule } from '@angular/common';
import { Component, inject, signal, computed } from '@angular/core';

// --- UI IMPORTS (Atoms & Molecules) ---
import { UiCardComponent } from '../../components/atoms/card/card.component';
import { UiButtonComponent } from '../../components/atoms/button/button.component';
import { UiInputComponent } from '../../components/atoms/input/input.component';
import { UiTagComponent } from '../../components/atoms/tag/tag.component';
import { UiModalComponent, ModalContent } from '../../components/molecules/modal/modal.component';
import { TransactionItemComponent } from '../../components/molecules/transaction-item/transaction-item.component';
// Note: UiHeaderComponent is commented out until you create it to avoid errors
// import { UiHeaderComponent } from '../../components/atoms/ui-header/ui-header.component';

// --- LOGIC IMPORTS (Service & Strategy Pattern) ---
import { BudgetService } from '../../services/budget.service';
  import { ExpenseStrategy, VitalNeedStrategy, EmotionalDesireStrategy } from '../../core/strategies/expense.strategy';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    // UiHeaderComponent, 
    UiCardComponent, 
    UiButtonComponent, 
    UiTagComponent,
    UiModalComponent,
    UiInputComponent, 
    TransactionItemComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  
  // --- DEPENDENCY INJECTION ---
  private budgetService = inject(BudgetService);

  // --- 1. DATA BINDING (Signals) ---
  // We use signals to automatically update the UI when data changes in the service.
  transactions = this.budgetService.expenses;
  remainingBudget = this.budgetService.remainingBudget;

  // --- 2. HISTORY VISIBILITY ---
  // State to toggle between showing 3 items or the full list.
  showAllHistory = signal(false);

  // Computed signal: reacts to 'transactions' or 'showAllHistory' changes.
  visibleTransactions = computed(() => {
    const all = this.transactions();
    return this.showAllHistory() ? all : all.slice(0, 3);
  });

  toggleHistory() {
    this.showAllHistory.update(v => !v);
  }

  // --- 3. FORM STATE ---
  formTitle: string = '';
  formAmount: number | null = null;
  
  // --- STRATEGY PATTERN IMPLEMENTATION ---
  // We hold the CURRENT active strategy behavior in a signal.
  // Default is 'VitalNeedStrategy'.
  currentStrategy = signal<ExpenseStrategy>(new VitalNeedStrategy());

  // --- 4. MODAL STATE MANAGEMENT ---
  isModalOpen = false;
  currentModalContent!: ModalContent;

  // Static Data: Modal content for "Vital Need"
  private vitalContent: ModalContent = {
    type: 'vital',
    title: "Qu'est-ce qu'un Besoin Vital ?",
    description: "Un Besoin Vital est une dépense non-négociable pour votre sécurité et votre santé.",
    items: [
      "Logement & Énergie",
      "Alimentation de base",
      "Santé & Assurances",
      "Transport essentiel"
    ],
    buttonText: "J'AI COMPRIS"
  };

  // Static Data: Modal content for "Emotional Desire"
  private emotionalContent: ModalContent = {
    type: 'emotional',
    title: "L'Envie Émotionnelle",
    description: "Une envie naît souvent d'un besoin de combler un vide ou d'apaiser une tension. Pause HALT :",
    checklistTitle: "CHECKLIST DE CONSCIENCE",
    items: [
      "Est-ce que je serai toujours heureux de cet achat dans 3 jours ?",
      "Suis-je en train de fuir une émotion (stress, ennui) ?",
      "Mon budget 'Plaisir' du mois le permet-il sans stresser ?"
    ],
    footerNote: "Astuce : Attendez 24h. Si l'envie est toujours là, go.",
    buttonText: "J'AI COMPRIS"
  };

  constructor() {
    console.log('🏗️ HomeComponent initialized successfully.');
  }

  // --- USER ACTIONS: INPUTS ---

  onTitleChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.formTitle = inputElement.value;
  }

  onAmountChange(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.formAmount = Number(inputElement.value);
  }

  // --- USER ACTIONS: MODALS & HELPERS ---

  // Open specific modal info
  openVitalInfo() {
    this.currentModalContent = this.vitalContent;
    this.isModalOpen = true;
  }

  openEmotionalInfo() {
    this.currentModalContent = this.emotionalContent;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  // --- USER ACTIONS: STRATEGY SELECTION ---

  selectVital() {
    // Switch behavior to Vital Need
    this.currentStrategy.set(new VitalNeedStrategy());
  }

  selectEmotional() {
    // Switch behavior to Emotional Desire
    this.currentStrategy.set(new EmotionalDesireStrategy());
    // UX Enhancement: Trigger awareness modal automatically for emotional choices
    this.openEmotionalInfo();
  }

  // Helpers for UI styling (active class)
  isVitalActive(): boolean {
    return this.currentStrategy() instanceof VitalNeedStrategy;
  }
  
  isEmotionalActive(): boolean {
    return this.currentStrategy() instanceof EmotionalDesireStrategy;
  }

  // --- MAIN ACTION: ADD TRANSACTION ---
  
  addTransaction() {
    console.log('--- Attempting to add transaction ---');

    // 1. Basic Form Validation
    if (!this.formTitle || !this.formAmount) {
      alert("⚠️ Please fill in both the amount and the title.");
      return;
    }

    // 2. STRATEGY EXECUTION
    // We retrieve the active strategy object
    const strategy = this.currentStrategy();

    // 3. VALIDATION DELEGATION
    // We ask the strategy: "Is this expense allowed based on the current balance?"
    const validation = strategy.validate(this.formAmount, this.remainingBudget());

    if (!validation.isValid) {
      // Logic blocked by the strategy (e.g., Emotional expense while in debt)
      alert("🛑 " + validation.message);
      return; 
    }

    // 4. SUCCESS: Call Service
    // If validation passed, we proceed to add the expense via the service.
    // We map the Strategy Label to the Service Category ('VITAL' or 'EMOTIONAL')
    const categoryType = strategy.label === 'BESOIN VITAL' ? 'VITAL' : 'EMOTIONAL';

    this.budgetService.addExpense(
      this.formTitle,
      this.formAmount,
      categoryType, 
      'Serein' // Default emotion
    );

    console.log(`✅ Transaction added using strategy: ${strategy.label}`);

    // 5. Reset Form
    this.formTitle = '';
    this.formAmount = null;
  }
}