import type { Meta, StoryObj } from '@storybook/angular';
import { PlusIcon } from './plus-icon';

const meta: Meta<PlusIcon> = {
  title: 'Atoms/PlusIcon',
  component: PlusIcon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<PlusIcon>;

export const Default: Story = {};
