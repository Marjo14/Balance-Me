import type { Meta, StoryObj } from '@storybook/angular';
import { Button } from './button';

const meta: Meta<Button> = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<Button>;

export const Primary: Story = {
  args: {
    label: 'Bouton primaire',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    label: 'Bouton secondaire',
    variant: 'secondary',
    disabled: false,
  },
};

export const Emotional: Story = {
  args: {
    label: 'Bouton émotionnel',
    variant: 'emotional',
    disabled: false,
  },
};

export const Insight: Story = {
  args: {
    label: 'Bouton insight',
    variant: 'insight',
    disabled: false,
  },
};

export const Neutral: Story = {
  args: {
    label: 'Bouton neutre',
    variant: 'neutral',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Bouton désactivé',
    variant: 'primary',
    disabled: true,
  },
};
