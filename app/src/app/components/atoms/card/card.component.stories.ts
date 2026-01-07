import { Meta, StoryObj } from '@storybook/angular';
import { UiCardComponent } from './card.component';

const meta: Meta<UiCardComponent> = {
  title: 'Atoms/Card',
  component: UiCardComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['neutral', 'positive', 'danger', 'info', 'soft'],
    },
    padding: {
      control: { type: 'select' },
      options: ['md', 'lg'],
    },
    elevation: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    fullHeight: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<UiCardComponent>;

/* =========================
   Neutral
   ========================= */
export const Neutral: Story = {
  args: { variant: 'neutral', padding: 'lg', elevation: 'md', fullHeight: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:.55; font-weight:800;">
            🧘 Dernières réflexions
          </div>
          <div style="margin-top:12px; font-size:18px; font-weight:500; color:#344054;">
            “La clarté commence par une respiration.”
          </div>
        </ui-card>
      </div>
    `,
  }),
};

/* =========================
   Positive
   ========================= */
export const Positive: Story = {
  args: { variant: 'positive', padding: 'lg', elevation: 'md', fullHeight: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">

          <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:.85; font-weight:800;">
            🌱 ÉNERGIE FINANCIÈRE
          </div>

          <div style="margin-top:16px; font-size:56px; font-weight:800; line-height:1;">
            1420,75 <span style="font-size:28px; opacity:.75;">€</span>
          </div>

          <div style="margin-top:22px; padding-top:18px; border-top:1px solid rgba(255,255,255,.16);">
            <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:.85; font-weight:800;">
              💭 Pensée du jour
            </div>
            <div style="margin-top:10px; font-size:18px; font-style:italic; opacity:.9;">
              “Chaque choix est une direction.”
            </div>
          </div>

        </ui-card>
      </div>
    `,
  }),
};

/* =========================
   Danger
   ========================= */
export const Danger: Story = {
  args: { variant: 'danger', padding: 'lg', elevation: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">

          <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:.85; font-weight:800;">
            ⚠️ ÉQUILIBRE DU JOUR
          </div>

          <div style="margin-top:16px; font-size:56px; font-weight:800; line-height:1;">
            -120,50 <span style="font-size:28px; opacity:.75;">€</span>
          </div>

          <div style="margin-top:22px; padding-top:18px; border-top:1px solid rgba(255,255,255,.16);">
            <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:.85; font-weight:800;">
              🚦 RAPPEL DE CONSCIENCE
            </div>

            <div style="margin-top:10px; font-size:18px; font-style:italic; opacity:.9;">
              “Pause. Ton énergie est en négatif : priorise l’essentiel et reporte l’envie.”
            </div>
          </div>

        </ui-card>
      </div>
    `,
  }),
};

/* =========================
   Soft
   ========================= */
export const Soft: Story = {
  args: { variant: 'soft', padding: 'lg', elevation: 'md', fullHeight: false },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="font-size:12px; letter-spacing:0.16em; text-transform:uppercase; opacity:.8; font-weight:800; color: var(--color-danger);">
            🌸 RÉFLEXION CONSCIENTE
          </div>
          <div style="margin-top:12px; font-size:18px; font-style:italic;">
            “Avant d’acheter, demandez-vous : est-ce un besoin ou une fuite ?”
          </div>
        </ui-card>
      </div>
    `,
  }),
};
