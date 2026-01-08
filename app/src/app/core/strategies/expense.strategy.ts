/**
 * DESIGN PATTERN : STRATEGY
 * Permet de définir des comportements de validation différents 
 * selon la nature de la dépense (Besoin vs Envie).
 */

export interface ExpenseStrategy {
  label: string;
  tone: 'secondary' | 'emotional' | 'neutral';
  validate(amount: number, currentBalance: number): { isValid: boolean; message: string };
}

export class VitalNeedStrategy implements ExpenseStrategy {
  label = 'BESOIN VITAL';
  tone: 'secondary' = 'secondary'; 

  validate(amount: number, currentBalance: number) {
    // Un besoin vital est toujours validé car essentiel à la survie/sécurité.
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

    // CAS 1 : La dépense entraîne un solde négatif
    if (nextBalance < 0) {
      return { 
        isValid: true, // On laisse l'utilisateur décider (conscience)
        message: `Attention : Cette envie fera passer votre solde à ${nextBalance.toFixed(2)}€. Souhaitez-vous quand même l'enregistrer ?` 
      };
    }

    // CAS 2 : Le budget est suffisant
    return { 
      isValid: true, 
      message: `Votre budget permet cet achat (nouveau solde prévu : ${nextBalance.toFixed(2)}€). Est-ce vraiment ce dont vous avez besoin maintenant ?` 
    };
  }
}