/**
 * DOMAIN MODEL: EXPENSE
 * Definition of the core data structures for the BalanceMe application.
 */


export type ExpenseCategory = 'VITAL' | 'EMOTIONAL'; 


export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: Date;
  category: ExpenseCategory;
  emotion?: string; 
}