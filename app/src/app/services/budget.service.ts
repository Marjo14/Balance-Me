import { Injectable, signal, computed } from '@angular/core';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: 'VITAL' | 'EMOTIONAL';
  emotion?: string;
}

@Injectable({ providedIn: 'root' })
export class BudgetService {
  // --- STATE (Données brutes) ---
  expenses = signal<Transaction[]>([]);
  initialBudget = signal<number | null>(null);

  // --- COMPUTED (Données calculées) ---
  // Calcule le solde restant. Si le budget n'est pas fixé, on part de 0.
  remainingBudget = computed(() => {
    const totalExpenses = this.expenses().reduce((acc, t) => acc + t.amount, 0);
    const budget = this.initialBudget() || 0;
    return budget - totalExpenses;
  });

  constructor() {
    this.loadFromStorage();
  }

  // --- ACTIONS ---

  // Définit le budget de départ et le sauvegarde
  setInitialBudget(amount: number) {
    this.initialBudget.set(amount);
    localStorage.setItem('balance_initial_budget', amount.toString());
  }

  // Ajoute une dépense et sauvegarde la liste
  addExpense(title: string, amount: number, category: 'VITAL' | 'EMOTIONAL', emotion: string) {
    const newTx: Transaction = {
      id: Date.now().toString(),
      title,
      amount,
      date: new Date(),
      category,
      emotion
    };
    
    this.expenses.update(list => [newTx, ...list]);
    this.saveToStorage();
  }

  // Nettoyage complet pour la réinitialisation
  resetAll() {
    this.expenses.set([]);
    this.initialBudget.set(null);
    localStorage.removeItem('balance_expenses');
    localStorage.removeItem('balance_initial_budget');
  }

  // --- PERSISTENCE (Interne) ---

  private saveToStorage() {
    localStorage.setItem('balance_expenses', JSON.stringify(this.expenses()));
  }

  private loadFromStorage() {
    // 1. Charger le budget
    const savedBudget = localStorage.getItem('balance_initial_budget');
    if (savedBudget) {
      this.initialBudget.set(parseFloat(savedBudget));
    }

    // 2. Charger les transactions
    const data = localStorage.getItem('balance_expenses');
    if (data) {
      const parsedData = JSON.parse(data).map((t: any) => ({
        ...t,
        date: new Date(t.date) // Conversion string -> Date obligatoire
      }));
      this.expenses.set(parsedData);
    }
  }
}