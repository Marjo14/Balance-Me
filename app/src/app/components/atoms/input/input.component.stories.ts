import { Meta, StoryObj } from '@storybook/angular';
import { UiInputComponent } from './input.component';

const meta: Meta<UiInputComponent> = {
  title: 'Atoms/Input',
  component: UiInputComponent,
  tags: ['autodocs'],
  argTypes: {
    type: { control: { type: 'select' }, options: ['text', 'number', 'email', 'password'] },
  },
};

export default meta;
type Story = StoryObj<UiInputComponent>;

export const Amount: Story = {
  args: {
    id: 'amount',
    label: 'Quelle somme investissez-vous ?',
    placeholder: '0.00',
    type: 'number',
    suffix: '€',
    hint: '',
    error: '',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:520px; padding:24px;">
        <ui-input
          [id]="id"
          [label]="label"
          [placeholder]="placeholder"
          [type]="type"
          [suffix]="suffix"
          [hint]="hint"
          [error]="error"
        ></ui-input>
      </div>
    `,
  }),
};

export const Text: Story = {
  args: {
    id: 'desc',
    label: "Quel est l'objet de ce flux ?",
    placeholder: 'Ex: Moment partagé...',
    type: 'text',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:520px; padding:24px;">
        <ui-input
          [id]="id"
          [label]="label"
          [placeholder]="placeholder"
          [type]="type"
        ></ui-input>
      </div>
    `,
  }),
};

export const Error: Story = {
  args: {
    id: 'amount',
    label: 'Quelle somme investissez-vous ?',
    placeholder: '0.00',
    type: 'number',
    suffix: '€',
    error: 'Veuillez renseigner un montant valide.',
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width:520px; padding:24px;">
        <ui-input
          [id]="id"
          [label]="label"
          [placeholder]="placeholder"
          [type]="type"
          [suffix]="suffix"
          [error]="error"
        ></ui-input>
      </div>
    `,
  }),
};
