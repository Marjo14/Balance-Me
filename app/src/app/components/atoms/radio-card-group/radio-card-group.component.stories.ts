import { Meta, StoryObj } from '@storybook/angular';
import { UiRadioCardGroupComponent } from './radio-card-group.component';

type Intent = 'vital' | 'emotional';

const meta: Meta<UiRadioCardGroupComponent<Intent>> = {
  title: 'Atoms/RadioCardGroup',
  component: UiRadioCardGroupComponent,
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'radio' }, options: ['vital', 'emotional'] },
  },
};

export default meta;
type Story = StoryObj<UiRadioCardGroupComponent<Intent>>;

export const Default: Story = {
  args: {
    legend: "L'intention derrière l'acte",
    name: 'intent',
    value: 'vital',
    options: [
      { value: 'vital', label: 'Besoin vital', helperLeft: 'BESOIN ?' },
      { value: 'emotional', label: 'Envie émotionnelle', helperRight: 'ENVIE ?' },
    ],
  },
  render: (args) => ({
    props: {
      ...args,
      valueChange: (v: Intent) => (args.value = v),
    },
    template: `
      <div style="max-width: 720px; padding: 24px;">
        <ui-radio-card-group
          [legend]="legend"
          [name]="name"
          [options]="options"
          [value]="value"
          (valueChange)="valueChange($event)"
        ></ui-radio-card-group>
      </div>
    `,
  }),
};
