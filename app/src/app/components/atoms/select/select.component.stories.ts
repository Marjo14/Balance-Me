import { Meta, StoryObj } from '@storybook/angular';
import { UiSelectComponent } from './select.component';

const meta: Meta<UiSelectComponent> = {
  title: 'Atoms/Select',
  component: UiSelectComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: { type: 'select' }, options: ['neutral', 'emotion'] },
    disabled: { control: { type: 'boolean' } },
    required: { control: { type: 'boolean' } },
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

export const Neutral: Story = {
  args: {
    label: 'Sélection',
    placeholder: 'Choisir…',
    options: baseOptions,
    variant: 'neutral',
    value: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:520px; padding:24px;">
        <ui-select
          [label]="label"
          [placeholder]="placeholder"
          [options]="options"
          [variant]="variant"
          [value]="value"
        />
      </div>
    `,
  }),
};

export const Emotion: Story = {
  args: {
    label: 'HUMEUR AU MOMENT DU CHOIX',
    placeholder: 'Stressé(e)',
    options: baseOptions,
    variant: 'emotion',
    value: 'stress',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:720px; padding:24px;">
        <ui-select
          [label]="label"
          [placeholder]="placeholder"
          [options]="options"
          [variant]="variant"
          [value]="value"
        />
      </div>
    `,
  }),
};

export const Disabled: Story = {
  args: {
    label: 'HUMEUR AU MOMENT DU CHOIX',
    placeholder: 'Stressé(e)',
    options: baseOptions,
    variant: 'emotion',
    value: 'stress',
    disabled: true,
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:720px; padding:24px;">
        <ui-select
          [label]="label"
          [placeholder]="placeholder"
          [options]="options"
          [variant]="variant"
          [value]="value"
          [disabled]="disabled"
        />
      </div>
    `,
  }),
};

export const Error: Story = {
  args: {
    label: 'HUMEUR AU MOMENT DU CHOIX',
    placeholder: 'Choisir…',
    options: baseOptions,
    variant: 'emotion',
    value: '',
    error: 'Veuillez choisir une humeur.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:720px; padding:24px;">
        <ui-select
          [label]="label"
          [placeholder]="placeholder"
          [options]="options"
          [variant]="variant"
          [value]="value"
          [error]="error"
        />
      </div>
    `,
  }),
};
