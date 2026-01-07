import type { Meta, StoryObj } from '@storybook/angular';
import { RemainingAmountCard } from './remaining-amount-card';

const meta: Meta<RemainingAmountCard> = {
  title: 'Molecules/RemainingAmountCard',
  component: RemainingAmountCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<RemainingAmountCard>;

export const Positive: Story = {
  args: {
    amount: 500,
  },
};

export const Negative: Story = {
  args: {
    amount: -100,
  },
};
