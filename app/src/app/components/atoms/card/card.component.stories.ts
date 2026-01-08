import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { UiCardComponent } from './card.component';
import { UiButtonComponent } from '../button/button.component'; // Vérifie ce chemin
import { CommonModule } from '@angular/common';

const meta: Meta<UiCardComponent> = {
  title: 'Atoms/Card',
  component: UiCardComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, UiCardComponent, UiButtonComponent],
    }),
  ],
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
    fullHeight: { control: { type: 'boolean' } },
  },
};

export default meta;
type Story = StoryObj<UiCardComponent>;

/* --- 1. TA CARTE NEUTRE (Comme demandé) --- */
export const Neutral: Story = {
  args: { variant: 'neutral', padding: 'lg', elevation: 'sm' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:.5; font-weight:800; color:#667085;">
            🧘 Dernières réflexions
          </div>
          <div style="margin-top:12px; font-size:18px; font-weight:500; color:#101828; line-height:1.4;">
            “La clarté commence par une respiration.”
          </div>
        </ui-card>
      </div>
    `,
  }),
};

/* --- 2. TA MODAL "BESOIN VITAL" (Utilise le style Neutral) --- */
export const ModalExample: Story = {
  args: { variant: 'neutral', padding: 'lg', elevation: 'lg' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 480px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="position:absolute; top:24px; right:24px; color:#98A2B3; cursor:pointer; font-size: 20px;">✕</div>

          <h3 style="font-size:24px; font-weight:700; color:#101828; margin-bottom:16px; line-height:1.2;">
            Qu'est-ce qu'un Besoin<br>Vital ?
          </h3>
          
          <p style="font-size:16px; color:#475467; line-height:1.5; margin-bottom:24px;">
            Un <strong>Besoin Vital</strong> est une dépense non-négociable pour votre sécurité et votre santé.
          </p>

          <ul style="list-style:none; padding:0; margin:0 0 32px 0; display:flex; flex-direction:column; gap:12px;">
            <li style="display:flex; align-items:center; gap:10px; color:#344054; font-size:15px;">
              <span>🏠</span> Logement & Énergie
            </li>
            <li style="display:flex; align-items:center; gap:10px; color:#344054; font-size:15px;">
              <span>🍎</span> Alimentation de base
            </li>
            <li style="display:flex; align-items:center; gap:10px; color:#344054; font-size:15px;">
              <span>💊</span> Santé & Assurances
            </li>
            <li style="display:flex; align-items:center; gap:10px; color:#344054; font-size:15px;">
              <span>🚌</span> Transport essentiel
            </li>
          </ul>

          <ui-button variant="primary" [fullWidth]="true" size="lg">J'AI COMPRIS</ui-button>
        </ui-card>
      </div>
    `,
  }),
};

/* --- 3. LES AUTRES VARIANTES --- */
export const Positive: Story = {
  args: { variant: 'positive', padding: 'lg', elevation: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:.85; font-weight:800;">
            🌱 ÉNERGIE FINANCIÈRE
          </div>
          <div style="margin-top:12px; font-size:48px; font-weight:800; line-height:1;">
            1420,75 <span style="font-size:24px; opacity:.75;">€</span>
          </div>
          <div style="margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,.16);">
            <div style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:.85; font-weight:800;">
              💭 Pensée du jour
            </div>
            <div style="margin-top:8px; font-size:16px; font-style:italic; opacity:.95; line-height:1.4;">
              “Chaque choix est une direction vers soi.”
            </div>
          </div>
        </ui-card>
      </div>
    `,
  }),
};

export const Danger: Story = {
  args: { variant: 'danger', padding: 'lg', elevation: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:.9; font-weight:800;">
            ⚠️ ÉQUILIBRE DU JOUR
          </div>
          <div style="margin-top:12px; font-size:48px; font-weight:800; line-height:1;">
            -120,50 <span style="font-size:24px; opacity:.75;">€</span>
          </div>
          <div style="margin-top:24px; padding-top:20px; border-top:1px solid rgba(255,255,255,.16);">
            <div style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:.9; font-weight:800;">
              🚦 RAPPEL DE CONSCIENCE
            </div>
            <div style="margin-top:10px; font-size:16px; font-style:italic; opacity:.95; line-height:1.4;">
              “Pause. Ton énergie est basse : priorise l’essentiel.”
            </div>
          </div>
        </ui-card>
      </div>
    `,
  }),
};

export const Soft: Story = {
  args: { variant: 'soft', padding: 'lg', elevation: 'md' },
  render: (args) => ({
    props: args,
    template: `
      <div style="max-width: 520px; padding: 24px;">
        <ui-card [variant]="variant" [padding]="padding" [elevation]="elevation">
          <div style="font-size:11px; letter-spacing:0.12em; text-transform:uppercase; opacity:.8; font-weight:800; color: #B54708;">
            🌸 RÉFLEXION CONSCIENTE
          </div>
          <div style="margin-top:12px; font-size:18px; font-style:italic; line-height:1.5;">
            “Avant d’acheter, demandez-vous : est-ce un besoin ou une fuite ?”
          </div>
        </ui-card>
      </div>
    `,
  }),
};