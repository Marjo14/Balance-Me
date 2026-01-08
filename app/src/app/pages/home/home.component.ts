import { Component, inject, signal, computed, ViewChild, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// --- UI ATOMS & MOLECULES ---
import { UiCardComponent, UiCardVariant } from '../../components/atoms/card/card.component';
import { UiButtonComponent } from '../../components/atoms/button/button.component';
import { UiInputComponent } from '../../components/atoms/input/input.component';
import { UiTagComponent } from '../../components/atoms/tag/tag.component';
import { UiSelectComponent } from '../../components/atoms/select/select.component';
import { UiModalComponent, ModalContent } from '../../components/molecules/modal/modal.component';
import { TransactionItemComponent } from '../../components/molecules/transaction-item/transaction-item.component';

// --- LOGIC & STRATEGY ---
import { BudgetService } from '../../services/budget.service';
import { ExpenseStrategy, VitalNeedStrategy, EmotionalDesireStrategy } from '../../core/strategies/expense.strategy';
import { OnboardingComponent } from '../../components/features/onboarding/onboarding.component';
import { HeaderComponent } from '../../components/features/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    UiCardComponent, 
    UiButtonComponent, 
    UiInputComponent, 
    UiTagComponent, 
    UiSelectComponent, 
    UiModalComponent, 
    TransactionItemComponent,
    OnboardingComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private budgetService = inject(BudgetService);

  @ViewChild('submitBtnRef') submitBtnRef!: ElementRef;

  // --- SIGNALS DU SERVICE ---
  initialBudget = this.budgetService.initialBudget;
  transactions = this.budgetService.expenses;
  remainingBudget = this.budgetService.remainingBudget;

  // --- ETATS LOCAUX ---
  showAllHistory = signal(false);
  tempBudgetInput: number | null = null; 
  formTitle = '';
  formAmount: number | null = null;
  formEmotion = '';
  showErrors = false;
  showEmotionSelect = false;
  isModalOpen = false;
  currentModalContent!: ModalContent;

  // --- SIGNALS CALCULÉS ---

  // Détermine la variante de couleur (Rose/Danger si solde < 0) [cite: 57, 149]
  budgetVariant = computed<UiCardVariant>(() => {
    return this.remainingBudget() < 0 ? 'danger' : 'positive';
  });

  visibleTransactions = computed(() => {
    const all = this.transactions();
    return this.showAllHistory() ? all : all.slice(0, 3);
  });

  currentStrategy = signal<ExpenseStrategy>(new VitalNeedStrategy());

  emotionOptions = [
    { value: 'Stress', label: 'Stressé(e)' },
    { value: 'Ennui', label: 'Ennui' },
    { value: 'Platitude', label: 'Platitude' },
    { value: 'Besoin de réconfort', label: 'Besoin de réconfort' }
  ];

  ngOnInit() {
    console.log('🏗️ BalanceMe Home Initialized');
  }

  // ==========================================
  // METHODE CORRIGÉE : handleReset
  // ==========================================
  handleReset() {
    if(confirm("Voulez-vous vraiment réinitialiser toutes vos données ?")) {
      this.budgetService.resetAll();
    }
  }

  // --- ACTIONS ONBOARDING ---

  onTempBudgetChange(e: Event) {
    this.tempBudgetInput = Number((e.target as HTMLInputElement).value);
  }

  onStartExperience() {
    if (this.tempBudgetInput && this.tempBudgetInput > 0) {
      this.budgetService.setInitialBudget(this.tempBudgetInput);
    }
  }

  // --- LOGIQUE FORMULAIRE ---

  toggleHistory() {
    this.showAllHistory.update(v => !v);
  }

  selectVital() {
    this.currentStrategy.set(new VitalNeedStrategy());
    this.showEmotionSelect = false;
    this.formEmotion = '';
  }

  selectEmotional() {
    this.currentStrategy.set(new EmotionalDesireStrategy());
    this.openEmotionalInfo(); 
  }

  onEmotionChange(val: string) {
    this.formEmotion = val;
  }

  onTitleChange(e: Event) {
    this.formTitle = (e.target as HTMLInputElement).value;
  }

  onAmountChange(e: Event) {
    this.formAmount = Number((e.target as HTMLInputElement).value);
  }

  // --- GESTION DES MODALES ---

  openVitalInfo() {
    this.currentModalContent = {
      type: 'vital',
      title: "Qu'est-ce qu'un Besoin Vital ?",
      description: "Un Besoin Vital est une dépense non-négociable pour votre sécurité et votre santé.",
      items: ["Logement & Énergie", "Alimentation de base", "Santé & Assurances", "Transport essentiel"],
      buttonText: "J'AI COMPRIS"
    };
    this.isModalOpen = true;
  }

  openEmotionalInfo() {
    this.currentModalContent = {
      type: 'emotional',
      title: "L'Envie Émotionnelle",
      description: "Une envie naît souvent d'un besoin de combler un vide. Pause HALT :",
      checklistTitle: "CHECKLIST DE CONSCIENCE",
      items: [
        "Est-ce que je serai toujours heureux dans 3 jours ?",
        "Suis-je en train de fuir une émotion ?",
        "Mon budget 'Plaisir' le permet-il ?"
      ],
      footerNote: "Astuce : Attendez 24h. Si l'envie est toujours là, go.",
      buttonText: "J'AI COMPRIS"
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    if (this.isEmotionalActive()) {
      this.showEmotionSelect = true; 
    }
  }

  onPreSubmit() {
    this.showErrors = true;
    if (!this.formTitle || !this.formAmount) return;
    if (this.isEmotionalActive() && !this.formEmotion) return;

    const strategy = this.currentStrategy();
    const result = strategy.validate(this.formAmount, this.remainingBudget());

    this.currentModalContent = {
      type: result.isValid ? 'vital' : 'emotional',
      title: result.isValid ? 'Analyse : Accordée' : 'Analyse : Bloquée',
      description: result.message,
      buttonText: result.isValid ? 'CONFIRMER' : 'COMPRIS'
    };
    this.isModalOpen = true;
  }

  confirmModalAction() {
    if (this.currentModalContent.title.includes('Accordée')) {
      this.budgetService.addExpense(
        this.formTitle, 
        this.formAmount!, 
        this.isEmotionalActive() ? 'EMOTIONAL' : 'VITAL', 
        this.isEmotionalActive() ? this.formEmotion : 'Serein'
      );
      this.formTitle = ''; 
      this.formAmount = null; 
      this.formEmotion = ''; 
      this.showErrors = false;
    }
    this.closeModal();
  }

  isVitalActive() { return this.currentStrategy() instanceof VitalNeedStrategy; }
  isEmotionalActive() { return this.currentStrategy() instanceof EmotionalDesireStrategy; }
}