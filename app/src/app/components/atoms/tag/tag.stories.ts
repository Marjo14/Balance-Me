import type { Meta, StoryObj } from '@storybook/angular';
import { Tag } from './tag';

const meta: Meta<Tag> = {
  title: 'Atoms/Tag',
  component: Tag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<Tag>;

export const Positive: Story = { args: { label: 'Possible', variant: 'positive' } };
export const Warning: Story = { args: { label: 'Risqué', variant: 'warning' } };
export const Negative: Story = { args: { label: 'Impossible', variant: 'negative' } };
export const Neutral: Story = { args: { label: 'Info', variant: 'neutral' } };
