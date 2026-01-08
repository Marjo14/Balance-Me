import { Component, inject, signal, computed, OnInit } from '@angular/core';
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
    CommonModule, UiCardComponent, UiButtonComponent, UiInputComponent, 
    UiTagComponent, UiSelectComponent, UiModalComponent, TransactionItemComponent,
    OnboardingComponent, HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private budgetService = inject(BudgetService);

  initialBudget = this.budgetService.initialBudget;
  transactions = this.budgetService.expenses;
  remainingBudget = this.budgetService.remainingBudget;

  showAllHistory = signal(false);
  formTitle = '';
  formAmount: number | null = null;
  formEmotion = '';
  showErrors = false;
  showEmotionSelect = false;
  isModalOpen = false;
  currentModalContent!: ModalContent;

  budgetVariant = computed<UiCardVariant>(() => this.remainingBudget() < 0 ? 'danger' : 'positive');
  visibleTransactions = computed(() => this.showAllHistory() ? this.transactions() : this.transactions().slice(0, 3));
  
  // Correction 1 : Initialisation explicite sur Vital
  currentStrategy = signal<ExpenseStrategy>(new VitalNeedStrategy());

  emotionOptions = [
    { value: 'Stress', label: 'Stressé(e)' },
    { value: 'Ennui', label: 'Ennui' },
    { value: 'Platitude', label: 'Platitude' },
    { value: 'Besoin de réconfort', label: 'Besoin de réconfort' }
  ];

  ngOnInit() { console.log('🏗️ BalanceMe Home Initialized'); }

  handleReset() {
    this.currentModalContent = {
      type: 'vital',
      title: "Remise à zéro",
      description: "Voulez-vous vraiment réinitialiser toutes vos données ?",
      buttonText: "OUI, RÉINITIALISER"
    };
    this.isModalOpen = true;
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

  onEmotionChange(val: string) { this.formEmotion = val; }
  onTitleChange(e: Event) { this.formTitle = (e.target as HTMLInputElement).value; }
  onAmountChange(e: Event) { this.formAmount = Number((e.target as HTMLInputElement).value); }

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
      description: "Une envie naît souvent d'un besoin de combler un vide. Faites une pause consciente :",
      checklistTitle: "CHECKLIST DE CONSCIENCE",
      items: ["Serais-je heureux dans 3 jours ?", "Fuite d'émotion ?", "Budget permis ?"],
      footerNote: "Astuce : Attendez 24h avant d'agir.",
      buttonText: "J'AI COMPRIS"
    };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    // Si l'utilisateur ferme la modale d'information émotionnelle, on affiche le select d'humeur
    if (this.isEmotionalActive()) {
      this.showEmotionSelect = true; 
    }
  }

  onPreSubmit() {
    this.showErrors = true;
    if (!this.formTitle || !this.formAmount) return;
    if (this.isEmotionalActive() && !this.formEmotion) return;
    const result = this.currentStrategy().validate(this.formAmount, this.remainingBudget());
    this.currentModalContent = {
      type: result.isValid ? 'analysis' : 'emotional',
      title: result.isValid ? 'Analyse : Accordée' : 'Analyse : Bloquée',
      description: result.message,
      buttonText: result.isValid ? 'CONFIRMER' : 'COMPRIS'
    };
    this.isModalOpen = true;
  }

  confirmModalAction() {
    if (this.currentModalContent.title === "Remise à zéro") {
      this.budgetService.resetAll();
      this.isModalOpen = false;
    } else if (this.currentModalContent.title.includes('Accordée')) {
      this.budgetService.addExpense(
        this.formTitle, 
        this.formAmount!, 
        this.isEmotionalActive() ? 'EMOTIONAL' : 'VITAL', 
        this.isEmotionalActive() ? this.formEmotion : 'Serein'
      );
      // Correction 2 : Reset complet après succès
      this.resetFormFields();
      this.isModalOpen = false;
    } else {
        // Pour les modales d'information "J'AI COMPRIS"
        this.closeModal();
    }
  }

  private resetFormFields() { 
    this.formTitle = ''; 
    this.formAmount = null; 
    this.formEmotion = ''; 
    this.showErrors = false;
    // Correction 3 : Retour à l'état initial par défaut
    this.showEmotionSelect = false;
    this.currentStrategy.set(new VitalNeedStrategy());
  }

  isVitalActive() { return this.currentStrategy() instanceof VitalNeedStrategy; }
  isEmotionalActive() { return this.currentStrategy() instanceof EmotionalDesireStrategy; }
  toggleHistory() { this.showAllHistory.update(v => !v); }
}