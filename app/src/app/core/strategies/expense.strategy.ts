
// =========================================================
// 1. THE INTERFACE (The Contract)
// Enforces that all future strategies must implement the 'validate' method.
// =========================================================
export interface ExpenseStrategy {
  label: string;                 // Display name (e.g., 'BESOIN VITAL')
  tone: 'primary' | 'emotional'; // UI Hint: Determines the tag color (Green vs Pink)
  
  /**
   * Contains the specific business logic for the strategy.
   * @param amount - The cost of the transaction
   * @param currentBalance - The user's current money available
   * @returns An object containing the validation status and a feedback message
   */
  validate(amount: number, currentBalance: number): { isValid: boolean; message: string };
}

// =========================================================
// 2. CONCRETE STRATEGY A: VITAL NEED (Flexible Logic)
// =========================================================
export class VitalNeedStrategy implements ExpenseStrategy {
  label = 'BESOIN VITAL';
  tone: 'primary' = 'primary'; // Maps to the Green/Teal theme

  validate(amount: number, currentBalance: number) {
    // Business Rule: A vital need is (almost) always authorized, 
    // even if the balance is low, because it is essential for survival.
    return { 
        isValid: true, 
        message: "Dépense essentielle enregistrée." // "Essential expense recorded."
    };
  }
}

// =========================================================
// 3. CONCRETE STRATEGY B: EMOTIONAL DESIRE (Strict Logic)
// =========================================================
export class EmotionalDesireStrategy implements ExpenseStrategy {
  label = 'ENVIE ÉMOTIONNELLE';
  tone: 'emotional' = 'emotional'; // Maps to the Pink theme

  validate(amount: number, currentBalance: number) {
    // Business Rule: Emotional wants are strictly forbidden if 
    // the user does not have the budget (cannot go into overdraft for a want).
    if (currentBalance - amount < 0) {
      return { 
        isValid: false, 
        message: "Attention : Votre solde ne permet pas cette envie pour le moment." 
        // "Warning: Your current balance does not allow this desire at the moment."
      };
    }
    
    // If funds are sufficient:
    return { 
        isValid: true, 
        message: "Plaisir accordé en conscience." // "Pleasure granted consciously."
    };
  }
}