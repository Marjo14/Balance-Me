import type { Meta, StoryObj } from '@storybook/angular';
import { UiModalComponent } from './modal.component';

// 1. Configuration de base du composant pour Storybook
const meta: Meta<UiModalComponent> = {
  title: 'Molecules/Modal',
  component: UiModalComponent,
  tags: ['autodocs'], // Crée une page de doc auto
  argTypes: {
    // Permet de voir les logs quand on clique (Actions)
    close: { action: 'Event: close clicked' },
    confirm: { action: 'Event: confirm clicked' },
  },
  parameters: {
    // Optionnel : force un fond sombre pour mieux voir la modale
    backgrounds: { default: 'light' },
    layout: 'fullscreen', // Pour que l'overlay prenne tout l'écran
  },
};

export default meta;
type Story = StoryObj<UiModalComponent>;

// 2. SCÉNARIO 1 : La Modale "Besoin Vital" (Verte/Neutre)
export const VitalNeed: Story = {
  name: '🟢 Besoin Vital',
  args: {
    content: {
      type: 'vital',
      title: "Qu'est-ce qu'un Besoin Vital ?",
      description: "Un Besoin Vital est une dépense non-négociable pour votre sécurité et votre santé.",
      items: [
        "Logement & Énergie",
        "Alimentation de base",
        "Santé & Assurances",
        "Transport essentiel"
      ],
      buttonText: "J'AI COMPRIS"
    }
  },
};

// 3. SCÉNARIO 2 : La Modale "Envie Émotionnelle" (Rose/Checklist)
export const EmotionalDesire: Story = {
  name: '🌸 Envie Émotionnelle',
  args: {
    content: {
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
    }
  },
};