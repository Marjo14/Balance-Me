import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent } from './input';

const meta: Meta<InputComponent> = {
  title: 'Atoms/Input',
  component: InputComponent,
  tags: ['autodocs'],
  decorators: [
    (storyFn) => {
      const story = storyFn();
      return {
        ...story,
        template: `<div class="sb-mobile">${story.template}</div>`,
      };
    },
  ],
};

export default meta;
type Story = StoryObj<InputComponent>;

/* =========================
   Default amount input
   ========================= */
export const Amount: Story = {
  args: {
    label: 'Montant de la dépense',
    type: 'number',
    placeholder: 'Ex : 50€',
    value: '',
  },
};

/* =========================
   Disabled state
   ========================= */
export const Disabled: Story = {
  args: {
    label: 'Montant indisponible',
    type: 'number',
    placeholder: '—',
    disabled: true,
    value: '',
  },
};

/* =========================
   Interactive (valueChange)
   ========================= */
export const Interactive: Story = {
  render: (args) => ({
    props: {
      ...args,
      value: '50',
      onValueChange: (v: string) => {
        console.log('valueChange:', v);
      },
    },
    template: `
      <app-input
        [label]="label"
        [type]="type"
        [placeholder]="placeholder"
        [value]="value"
        (valueChange)="onValueChange($event)"
      ></app-input>
    `,
  }),
  args: {
    label: 'Montant de la dépense',
    type: 'number',
    placeholder: 'Ex : 50',
  },
};
