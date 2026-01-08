import { Meta, StoryObj } from '@storybook/angular';
import { TransactionItemComponent } from './transaction-item.component';

/* * COMPONENT METADATA
 * Defines the location in the Storybook sidebar and the component under test.
 */
const meta: Meta<TransactionItemComponent> = {
  title: 'Molecules/Transaction Item',
  component: TransactionItemComponent,
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Name of the transaction' },
    amount: { control: 'number', description: 'Transaction amount (negative for expense)' },
    date: { control: 'text', description: 'Formatted date string' },
    tagLabel: { control: 'text', description: 'Category label (e.g., VITAL, EMOTIONAL)' },
    emotion: { control: 'text', description: 'Optional emotional context' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Display a single transaction line with emotional context. Part of the "Last Reflections" list.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<TransactionItemComponent>;

/* * SCENARIO 1: EMOTIONAL SPENDING (The Core Use Case)
 * Demonstrates the "Danger" tag variant when the category involves emotions.
 * The component logic detects "EMOTION" in the tag and applies the pink style.
 */
export const EmotionalExpense: Story = {
  args: {
    title: 'Intuition Purchase',
    amount: -50.00,
    date: '8 JANV. 2026',
    tagLabel: 'EMOTIONNEL', // Triggers the visual change
    emotion: 'BESOIN DE RÉCONFORT',
  },
};

/* * SCENARIO 2: VITAL NEED (Neutral/Safe)
 * Shows a standard expense like groceries or rent.
 * The tag should appear in the default "Light" variant.
 */
export const VitalNeed: Story = {
  args: {
    title: 'Organic Groceries',
    amount: -85.20,
    date: '7 JANV. 2026',
    tagLabel: 'BESOIN VITAL',
    emotion: 'SEREIN', // Positive emotion
  },
};

/* * SCENARIO 3: NO EMOTION CONTEXT
 * Tests the layout when the optional 'emotion' input is missing.
 * The separator dot should not appear.
 */
export const SimpleExpense: Story = {
  args: {
    title: 'Electricity Bill',
    amount: -120.50,
    date: '5 JANV. 2026',
    tagLabel: 'CHARGES',
    emotion: '', // Empty context
  },
};