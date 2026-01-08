import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiCardComponent } from '../../atoms/card/card.component';

export interface ModalContent {
  type: 'vital' | 'emotional';
  title: string;
  description: string;
  checklistTitle?: string;
  items: string[];
  footerNote?: string;
  buttonText: string;
}

@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [CommonModule, UiCardComponent],
  template: `
    <div class="modal-overlay" 
         role="dialog" 
         aria-modal="true" 
         (click)="close.emit()">
      
      <ui-card 
        variant="neutral" 
        padding="lg" 
        elevation="lg" 
        class="modal-card-layout"
        (click)="$event.stopPropagation()">
        
        <button class="close-btn" (click)="close.emit()" aria-label="Close modal">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L13 1M1 1L13 13" stroke="#B0B0B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <h2 class="modal-title">{{ content.title }}</h2>

        <p class="modal-description">{{ content.description }}</p>

        <div *ngIf="content.type === 'emotional'" class="pink-box">
          <h3 class="checklist-title" *ngIf="content.checklistTitle">{{ content.checklistTitle }}</h3>
          <ul class="checklist-list">
            <li *ngFor="let item of content.items">
              <span class="icon" aria-hidden="true">✨</span>
              <span class="text">{{ item }}</span>
            </li>
          </ul>
        </div>

        <div *ngIf="content.type === 'vital'" class="vital-list-container">
          <ul class="vital-list">
            <li *ngFor="let item of content.items">
              <span class="icon" *ngIf="item.includes('Logement')" aria-hidden="true">🏠</span>
              <span class="icon" *ngIf="item.includes('Alimentation')" aria-hidden="true">🍎</span>
              <span class="icon" *ngIf="item.includes('Santé')" aria-hidden="true">💊</span>
              <span class="icon" *ngIf="item.includes('Transport')" aria-hidden="true">🚌</span>
              <span class="text">{{ item }}</span>
            </li>
          </ul>
        </div>

        <p *ngIf="content.footerNote" class="footer-note">
          {{ content.footerNote }}
        </p>

        <div class="action-area">
          <button class="action-btn" (click)="confirm.emit()">
            {{ content.buttonText }}
          </button>
        </div>

      </ui-card>
    </div>
  `,
  styles: [`
    /* --- 1. OVERLAY --- */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; width: 100%; height: 100%;
      background-color: rgba(69, 90, 75, 0.45);
      backdrop-filter: blur(5px);
      display: flex; justify-content: center; align-items: center;
      z-index: 9999;
      padding: 1rem;
      animation: fadeIn 0.3s ease-out;
    }

    /* --- 2. LAYOUT (Overrides Card) --- */
    .modal-card-layout {
      width: 100%;
      max-width: 420px;
      position: relative;
      max-height: 90vh; 
      overflow-y: auto; 
      display: flex; 
      flex-direction: column;
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* --- 3. GLOBAL ELEMENTS --- */
    .close-btn {
      position: absolute; top: 1.5rem; right: 1.5rem;
      background: transparent; border: none; cursor: pointer;
      padding: 0.5rem; transition: transform 0.2s;
      z-index: 10;
    }
    .close-btn:hover { transform: scale(1.1); }

    .modal-title {
      font-family: 'DM Sans', sans-serif;
      font-size: 1.6rem; font-weight: 700; color: #1A2E22;
      margin: 0.5rem 0 0.8rem 0; line-height: 1.1;
    }
    /* Mobile Responsive Typography */
    @media (max-width: 480px) { .modal-title { font-size: 1.4rem; } }

    .modal-description {
      color: #5C6B62; font-size: 0.9rem; line-height: 1.5;
      margin-bottom: 1.2rem;
    }

    /* --- 4. STYLE: EMOTIONAL (Pink Box) --- */
    .pink-box {
      background-color: #FFF5F5;
      border: 1px solid #FFE0E0;
      border-radius: 16px;
      padding: 1rem 1.2rem;
      margin-bottom: 1.2rem;
    }

    .checklist-title {
      color: #E0AFA0; font-size: 0.65rem; font-weight: 700;
      letter-spacing: 1.2px; text-transform: uppercase;
      margin-bottom: 0.8rem;
    }

    .checklist-list { list-style: none; padding: 0; margin: 0; }
    .checklist-list li {
      display: flex; align-items: flex-start; gap: 10px;
      margin-bottom: 0.6rem; 
      font-size: 0.85rem; 
      color: #444; line-height: 1.35;
    }
    .checklist-list li .icon { font-size: 0.9rem; margin-top: 1px; }

    /* --- 5. STYLE: VITAL (Simple List) --- */
    .vital-list-container { margin-bottom: 1.5rem; }
    .vital-list { list-style: none; padding: 0; margin: 0; }
    .vital-list li {
      display: flex; align-items: center; gap: 10px;
      margin-bottom: 0.8rem; font-size: 0.95rem; color: #4A5550;
    }

    /* --- 6. FOOTER --- */
    .footer-note {
      font-size: 0.75rem; color: #9AA6A0; font-style: italic;
      margin-bottom: 1.5rem; line-height: 1.4;
    }

    .action-area { margin-top: auto; }

    .action-btn {
      width: 100%; padding: 1rem;
      background-color: #537C60; color: white;
      font-weight: 700; font-size: 0.85rem; letter-spacing: 1px;
      text-transform: uppercase; border: none; border-radius: 50px;
      cursor: pointer; transition: background 0.2s;
    }
    .action-btn:hover { background-color: #42634d; }
    .action-btn:focus-visible { outline: 3px solid #DFAFA0; } /* Accessibility Focus */

    /* --- ANIMATIONS --- */
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class UiModalComponent {
  @Input() content!: ModalContent;
  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  // A11y: Close modal when pressing ESCAPE key
 @HostListener('document:keydown.escape')
  onEscKey() {
    this.close.emit();
  }
}