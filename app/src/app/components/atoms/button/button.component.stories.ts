import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiButtonComponent } from './button.component';
import { CommonModule } from '@angular/common';

const meta: Meta<UiButtonComponent> = {
  title: 'Atoms/UiButton',
  component: UiButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UiButtonComponent],
    }),
  ],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<UiButtonComponent>;

// PAR DÉFAUT : GRIS (GHOST)
export const Default: Story = {
  args: { variant: 'ghost', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 24px;"><ui-button [variant]="variant">BOUTON PAR DÉFAUT</ui-button></div>`,
  }),
};

// VERT : ENREGISTRER
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

// BLEU : BESOIN ?
export const Secondary: Story = {
  args: { variant: 'secondary', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 24px;"><ui-button [variant]="variant">BESOIN ?</ui-button></div>`,
  }),
};

// ROSE : ENVIE ?
export const Emotional: Story = {
  args: { variant: 'emotional', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 24px;"><ui-button [variant]="variant">ENVIE ?</ui-button></div>`,
  }),
};

// JAUNE : CONSEIL
export const Insight: Story = {
  args: { variant: 'insight', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 24px;"><ui-button [variant]="variant">CONSEIL</ui-button></div>`,
  }),
};

// MARRON : NOTES
export const Brown: Story = {
  args: { variant: 'brown', size: 'md' },
  render: (args) => ({
    props: args,
    template: `<div style="padding: 24px;"><ui-button [variant]="variant">DERNIÈRES NOTES</ui-button></div>`,
  }),
};

// CHARGEMENT
export const Loading: Story = {
  args: { variant: 'primary', size: 'lg', loading: true },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-button [variant]="variant" [size]="size" [loading]="loading">
          ANALYSE EN COURS
        </ui-button>
      </div>
    `,
  }),
};