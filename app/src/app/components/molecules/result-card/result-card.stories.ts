import type { Meta, StoryObj } from '@storybook/angular';
import { ResultCard } from './result-card';

const meta: Meta<ResultCard> = {
  title: 'Molecules/ResultCard',
  component: ResultCard,
  tags: ['autodocs'],
  decorators: [
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `
          <div class="sb-mobile">
            ${story.template}
          </div>
        `,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<ResultCard>;

export const Positive: Story = {
  args: {
    title: 'Résultat',
    status: 'positive',
    label: 'Possible',
    message: 'Cette dépense semble compatible avec votre budget actuel.',
  },
};

export const Warning: Story = {
  args: {
    title: 'Résultat',
    status: 'warning',
    label: 'Risqué',
    message:
      'Attention : cette dépense pourrait réduire votre marge de sécurité financière.',
  },
};

export const Negative: Story = {
  args: {
    title: 'Résultat',
    status: 'negative',
    label: 'Impossible',
    message:
      'Cette dépense vous mettrait en difficulté financière. Il est préférable de la reporter.',
  },
};

export const Neutral: Story = {
  args: {
    title: 'Résultat',
    status: 'neutral',
    label: 'Information',
    message:
      'Sélectionnez un type de dépense afin d’obtenir une analyse plus précise.',
  },
};
