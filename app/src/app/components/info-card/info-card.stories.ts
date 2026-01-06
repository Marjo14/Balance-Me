import type { Meta, StoryObj } from '@storybook/angular';
import { InfoCard } from './info-card';

const meta: Meta<InfoCard> = {
  title: 'Molecules/InfoCard',
  component: InfoCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<InfoCard>;

export const Insight: Story = {
  args: {
    title: 'Titre card',
    variant: 'insight',
  },
};

export const Secondary: Story = {
  args: {
    title: 'Titre card',
    variant: 'secondary',
  },
};
