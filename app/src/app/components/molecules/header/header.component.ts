import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ui-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="app-header">
      <div class="header-content">
        <h1>Balance <span class="accent">Me</span></h1>
        <p>Votre sanctuaire financier</p>
      </div>
      <button class="reset-btn" (click)="onReset.emit()">🔄 RÉINITIALISER</button>
    </header>
  `,
  styles: [`
    .app-header {
      height: 280px; width: 100%; border-radius: 0 0 40px 40px; margin-bottom: 2rem;
      background-image: url('/bg-zen.jpg'); background-size: cover; background-position: center;
      display: flex; justify-content: center; align-items: center; position: relative;
    }
    .header-content { background: rgba(255,255,255,0.7); backdrop-filter: blur(8px); padding: 1.5rem 3rem; border-radius: 24px; text-align: center; }
    h1 { margin: 0; font-size: 2.8rem; color: #1A2E22; font-weight: 800; }
    .accent { color: #E7B6C2; font-style: italic; }
    p { margin: 0.5rem 0 0; color: #5C6B62; text-transform: uppercase; letter-spacing: 1px; font-size: 0.75rem; }
    .reset-btn { position: absolute; top: 1.5rem; right: 1.5rem; background: white; border: none; padding: 8px 16px; border-radius: 50px; cursor: pointer; font-size: 10px; font-weight: bold; color: #d9534f; }
  `]
})
export class UiHeaderComponent { @Output() onReset = new EventEmitter<void>(); }