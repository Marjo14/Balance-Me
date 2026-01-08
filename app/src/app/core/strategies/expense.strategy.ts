export interface ExpenseStrategy {
  label: string;
  tone: 'secondary' | 'emotional' | 'neutral';
  validate(amount: number, currentBalance: number): { isValid: boolean; message: string };
}

export class VitalNeedStrategy implements ExpenseStrategy {
  label = 'BESOIN VITAL';
  tone: 'secondary' = 'secondary'; 

  validate(amount: number, currentBalance: number) {
    return { 
      isValid: true, 
      message: "Cette dépense est essentielle. Elle sera déduite de votre solde." 
    };
  }
}

export class EmotionalDesireStrategy implements ExpenseStrategy {
  label = 'ENVIE ÉMOTIONNELLE';
  tone: 'emotional' = 'emotional'; 

  validate(amount: number, currentBalance: number) {
    // Si la dépense dépasse le solde
    if (currentBalance - amount < 0) {
      return { 
        isValid: true, // On met à TRUE pour que la modale de confirmation s'ouvre
        message: `Attention : Cette envie dépasse votre budget de ${Math.abs(currentBalance - amount).toFixed(2)}€. Souhaitez-vous quand même l'enregistrer ?` 
      };
    }
    return { 
      isValid: true, 
      message: "Votre budget permet cet achat. Est-ce vraiment ce dont vous avez besoin maintenant ?" 
    };
  }
}