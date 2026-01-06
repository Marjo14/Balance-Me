import type { Meta, StoryObj } from '@storybook/angular';
import { Radio } from './radio';

const meta: Meta<Radio> = {
  title: 'Atoms/Radio',
  component: Radio,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<Radio>;

export const Unchecked: Story = {
  args: {
    label: 'Nécessaire',
    checked: false,
    disabled: false,
  },
};

export const Checked: Story = {
  args: {
    label: 'Émotionnelle',
    checked: true,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Option indisponible',
    checked: false,
    disabled: true,
  },
};
