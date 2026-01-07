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

export const Amount: Story = {
  args: {
    label: 'Montant de la dépense',
    type: 'number',
    placeholder: 'Ex : 50€',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Montant indisponible',
    disabled: true,
  },

  decorators: [
  (story) => ({
    template: `<div style="max-width: 375px; padding: 16px;">${story()}</div>`,
  }),
],

};
