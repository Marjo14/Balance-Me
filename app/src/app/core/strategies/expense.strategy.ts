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
    const nextBalance = currentBalance - amount;

    // Si le nouveau solde est négatif
    if (nextBalance < 0) {
      return { 
        isValid: true, 
        message: `Attention : Cette envie fera passer votre solde à ${nextBalance.toFixed(2)}€. Souhaitez-vous quand même l'enregistrer ?` 
      };
    }

    // Si le solde reste positif
    return { 
      isValid: true, 
      message: `Votre budget permet cet achat (nouveau solde : ${nextBalance.toFixed(2)}€). Est-ce vraiment ce dont vous avez besoin maintenant ?` 
    };
  }
}