import { Meta, StoryObj } from '@storybook/angular';
import { UiButtonComponent } from './button.component';

const meta: Meta<UiButtonComponent> = {
  title: 'Atoms/Button',
  component: UiButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'emotional', 'insight', 'brown', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
    },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
    fullWidth: { control: { type: 'boolean' } },
    ariaLabel: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<UiButtonComponent>;

export const Primary: Story = {
  args: { variant: 'primary', size: 'lg', fullWidth: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-button [variant]="variant" [size]="size" [fullWidth]="fullWidth">
          ENREGISTRER EN CONSCIENCE
        </ui-button>
      </div>
    `,
  }),
};

export const Ghost: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <ui-button [variant]="variant" [size]="size">BESOIN VITAL</ui-button>
      </div>
    `,
  }),
};

export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <ui-button [variant]="variant" [size]="size">BESOIN ?</ui-button>
      </div>
    `,
  }),
};

export const Emotional: Story = {
  args: { variant: 'emotional', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <ui-button [variant]="variant" [size]="size">ENVIE ?</ui-button>
      </div>
    `,
  }),
};

export const Insight: Story = {
  args: { variant: 'insight', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <ui-button [variant]="variant" [size]="size">CONSEIL</ui-button>
      </div>
    `,
  }),
};

export const Brown: Story = {
  args: { variant: 'brown', size: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <ui-button [variant]="variant" [size]="size">DERNIÈRES NOTES</ui-button>
      </div>
    `,
  }),
};

export const Loading: Story = {
  args: { variant: 'primary', size: 'md', loading: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="padding: 24px;">
        <ui-button [variant]="variant" [size]="size" [loading]="loading">
          ANALYSE EN COURS
        </ui-button>
      </div>
    `,
  }),
};
