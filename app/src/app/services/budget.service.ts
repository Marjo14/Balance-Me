import { Injectable, signal, computed } from '@angular/core';
import { Expense } from '../models/expense.model';

@Injectable({
  providedIn: 'root' // SINGLETON: Unique instance shared across the app
})
export class BudgetService {

  // 1. STATE (Private)
  // We use Signals for reactive state management.
  // Private to enforce encapsulation: only this service can modify data.
  private _expenses = signal<Expense[]>([
    { 
      id: '1', 
      title: 'Intuition', 
      amount: -50.00, 
      date: new Date(), 
      category: 'EMOTIONAL', 
      emotion: 'Besoin de réconfort' 
    },
    { 
      id: '2', 
      title: 'Courses Bio', 
      amount: -85.20, 
      date: new Date(), 
      category: 'VITAL', 
      emotion: 'Serein' 
    }
  ]);

  private _initialBudget = signal<number>(1500); // Monthly income example

  // 2. SELECTORS (Public Read-only)
  // Expose signals to components without allowing direct modification.
  readonly expenses = this._expenses.asReadonly();

  // 3. COMPUTED VALUES (The "Brain")
  // Automatically updates whenever _expenses changes.
  // No need to manually recalculate totals.
  totalExpenses = computed(() => {
    return this._expenses().reduce((sum, item) => sum + item.amount, 0);
  });

  remainingBudget = computed(() => {
    return this._initialBudget() + this.totalExpenses();
  });

  // 4. ACTIONS (Public Methods)
  
  /**
   * Adds a new expense to the state using immutability pattern.
   */
  addExpense(title: string, amount: number, category: 'VITAL' | 'EMOTIONAL', emotion?: string) {
    const newExpense: Expense = {
      id: Date.now().toString(),
      title,
      amount: -Math.abs(amount), // Ensure negative value
      date: new Date(),
      category,
      emotion
    };

    // Update the signal with a new array reference
    this._expenses.update(list => [newExpense, ...list]);
  }
}