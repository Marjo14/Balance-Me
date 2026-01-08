import { Meta, StoryObj } from '@storybook/angular';
import { UiTagComponent } from './tag.component';

const meta: Meta<UiTagComponent> = {
  title: 'Atoms/Tag',
  component: UiTagComponent,
  tags: ['autodocs'],
  argTypes: {
    tone: { control: { type: 'select' }, options: ['neutral','primary','secondary','emotional','insight','brown'] },
    size: { control: { type: 'select' }, options: ['sm','md'] },
    ghost: { control: { type: 'boolean' } },
    dot: { control: { type: 'boolean' } },
    icon: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<UiTagComponent>;

export const EnergyLabel: Story = {
  args: { tone: 'neutral', size: 'sm', dot: true, icon: '🌀' },
  render: (args) => ({
    props: args,
    template: `
      <ui-tag [tone]="tone" [size]="size" [dot]="dot" [icon]="icon">
        ÉNERGIE FINANCIÈRE
      </ui-tag>
    `,
  }),
};

export const Besoin: Story = {
  args: { tone: 'secondary', size: 'sm', ghost: true },
  render: (args) => ({
    props: args,
    template: `
      <ui-tag [tone]="tone" [size]="size" [ghost]="ghost">BESOIN ?</ui-tag>
    `,
  }),
};

export const Envie: Story = {
  args: { tone: 'emotional', size: 'sm', ghost: true },
  render: (args) => ({
    props: args,
    template: `
      <ui-tag [tone]="tone" [size]="size" [ghost]="ghost">ENVIE ?</ui-tag>
    `,
  }),
};

export const HeaderChip: Story = {
  args: { tone: 'neutral', size: 'md', ghost: true, icon: '✨' },
  render: (args) => ({
    props: args,
    template: `
      <ui-tag [tone]="tone" [size]="size" [ghost]="ghost" [icon]="icon">
        NOUVELLE ÉNERGIE
      </ui-tag>
    `,
  }),
};
