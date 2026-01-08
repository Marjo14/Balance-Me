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
  // --- STATE ---
  expenses = signal<Transaction[]>([]);
  initialBudget = signal<number>(1350.00);

  // --- COMPUTED ---
  // Calculates the balance. If expenses > 1350, it naturally goes negative.
  remainingBudget = computed(() => {
    const total = this.expenses().reduce((acc, t) => acc + t.amount, 0);
    return this.initialBudget() - total;
  });

  constructor() {
    this.loadFromStorage();
  }

  // --- METHODS ---

  /**
   * Adds an expense to the list. 
   * Validation is handled by the Strategy in the component, 
   * but the service allows any amount (supports negative balance).
   */
  addExpense(title: string, amount: number, category: 'VITAL' | 'EMOTIONAL', emotion: string) {
    const newTx: Transaction = {
      id: Date.now().toString(),
      title,
      amount, // Substracted regardless of the final balance
      date: new Date(),
      category,
      emotion
    };
    
    this.expenses.update(list => [newTx, ...list]);
    this.saveToStorage();
  }

  resetAll() {
    this.expenses.set([]);
    localStorage.removeItem('balance_expenses');
  }

  hasData(): boolean {
    return this.expenses().length > 0;
  }

  // --- PERSISTENCE ---

  private saveToStorage() {
    localStorage.setItem('balance_expenses', JSON.stringify(this.expenses()));
  }

  private loadFromStorage() {
    const data = localStorage.getItem('balance_expenses');
    if (data) {
      // Re-parse dates because JSON stringify transforms them into strings
      const parsedData = JSON.parse(data).map((t: any) => ({
        ...t,
        date: new Date(t.date)
      }));
      this.expenses.set(parsedData);
    }
  }
}