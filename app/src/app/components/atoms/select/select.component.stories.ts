import { Meta, StoryObj } from '@storybook/angular';
import { UiSelectComponent } from './select.component';

const meta: Meta<UiSelectComponent> = {
  title: 'Atoms/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { 
      control: { type: 'select' }, 
      options: ['neutral', 'emotion'] 
    },
    disabled: { control: { type: 'boolean' } },
    error: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<UiSelectComponent>;

const baseOptions = [
  { value: 'stress', label: 'Stressé(e)' },
  { value: 'ennui', label: 'Ennui' },
  { value: 'platitude', label: 'Platitude' },
  { value: 'reconfort', label: 'Besoin de réconfort' },
];

// --- VARIANTE EMOTION (LES PASTILLES ROSES) ---
export const Emotion: Story = {
  args: {
    label: 'HUMEUR AU MOMENT DU CHOIX',
    options: baseOptions,
    variant: 'emotion',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:400px; padding:24px; background-color: #FBF6EE;">
        <p style="font-size: 12px; color: #667085; margin-bottom: 16px;">
          ✨ <strong>Version Radio :</strong> Plus de menu déroulant, sélection directe.
        </p>
        <ui-select
          [label]="label"
          [options]="options"
          [variant]="variant"
          [value]="value"
          (valueChange)="value = $event"
        ></ui-select>
      </div>
    `,
  }),
};

// --- VARIANTE NEUTRE (LES PASTILLES VERTES/GRISES) ---
export const Neutral: Story = {
  args: {
    label: 'Catégorie de dépense',
    options: baseOptions,
    variant: 'neutral',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:400px; padding:24px; background-color: #FBF6EE;">
        <ui-select
          [label]="label"
          [options]="options"
          [variant]="variant"
          [value]="value"
          (valueChange)="value = $event"
        ></ui-select>
      </div>
    `,
  }),
};

// --- ÉTAT ERREUR ---
export const Error: Story = {
  args: {
    label: 'HUMEUR AU MOMENT DU CHOIX',
    options: baseOptions,
    variant: 'emotion',
    value: '',
    error: 'Veuillez choisir une humeur pour continuer.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:400px; padding:24px; background-color: #FBF6EE;">
        <ui-select
          [label]="label"
          [options]="options"
          [variant]="variant"
          [value]="value"
          [error]="error"
          (valueChange)="value = $event"
        ></ui-select>
      </div>
    `,
  }),
};

// --- ÉTAT DÉSACTIVÉ ---
export const Disabled: Story = {
  args: {
    label: 'HUMEUR AU MOMENT DU CHOIX',
    options: baseOptions,
    variant: 'emotion',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:400px; padding:24px; background-color: #FBF6EE;">
        <ui-select
          [label]="label"
          [options]="options"
          [variant]="variant"
          [disabled]="disabled"
        ></ui-select>
      </div>
    `,
  }),
};