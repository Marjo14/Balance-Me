import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ✅ imports de tes atoms
import { Button } from '../../components/atoms/button/button';
import { InputComponent } from '../../components/atoms/input/input';
import { Radio } from '../../components/atoms/radio/radio';
import { PlusIcon } from '../../components/atoms/plus-icon/plus-icon';
import { Tag } from '../../components/atoms/tag/tag';

type ExpenseType = 'necessary' | 'emotional';
type Emotion = 'stress' | 'ennui' | 'plaisir' | 'reconfort';
type ResultVariant = 'positive' | 'warning' | 'negative';

interface ResultState {
  variant: ResultVariant;
  title: string;
  message: string;
  newRemaining: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Button, InputComponent, Radio, PlusIcon, Tag],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home {
  // MVP: solde initial en dur (tu pourras le rendre modifiable après)
  remainingAmount = 500;

  // Form state
  amount = ''; // string -> conversion en number seulement à l'analyse
  type: ExpenseType = 'necessary';
  emotion: Emotion | '' = '';

  // UI state
  amountError = '';
  emotionError = '';
  result: ResultState | null = null;
  liveMessage = '';

  get isEmotional(): boolean {
    return this.type === 'emotional';
  }

  get canAnalyze(): boolean {
    const value = this.parseAmount();
    if (value === null) return false;
    if (this.isEmotional && !this.emotion) return false;
    return true;
  }

  // Helpers for Tag
  get resultTagVariant(): 'positive' | 'warning' | 'negative' | 'neutral' {
    if (!this.result) return 'neutral';
    return this.result.variant === 'positive'
      ? 'positive'
      : this.result.variant === 'warning'
      ? 'warning'
      : 'negative';
  }

  // UI events
  onAmountChange(v: string) {
    this.amount = v;
    this.amountError = '';
    this.result = null;
  }

  onTypeChange(next: ExpenseType) {
    this.type = next;
    this.result = null;
    this.emotionError = '';
    if (next !== 'emotional') this.emotion = '';
  }

 onAnalyze() {
  this.amountError = '';
  this.emotionError = '';
  this.result = null;

  const expense = this.parseAmount();
  if (expense === null) {
    this.amountError = 'Veuillez entrer un montant valide (> 0).';
    this.liveMessage = this.amountError;
    return;
  }

  if (this.isEmotional && !this.emotion) {
    this.emotionError = 'Veuillez sélectionner une émotion.';
    this.liveMessage = this.emotionError;
    return;
  }

  const newRemaining = this.remainingAmount - expense;

  // ✅ si dépassement : on affiche le négatif mais on NE met pas à jour remainingAmount
  if (expense > this.remainingAmount) {
    this.result = {
      variant: 'negative',
      title: 'Impossible',
      message: 'Cette dépense dépasse votre solde restant.',
      newRemaining, // <- ici c'est NEGATIF et on l'affiche
    };
    this.liveMessage = 'Résultat : Impossible.';
    return;
  }

  // ✅ cas warning émotionnel
  if (this.isEmotional && (this.emotion === 'stress' || this.emotion === 'ennui')) {
    this.remainingAmount = newRemaining;
    this.result = {
      variant: 'warning',
      title: 'Risqué',
      message: 'Attention : cette dépense pourrait réduire votre marge de sécurité financière.',
      newRemaining,
    };
    this.liveMessage = 'Résultat : Risqué.';
    this.resetFormAfterAnalyze();
    return;
  }
  // ✅ cas possible
  this.remainingAmount = newRemaining;
  this.result = {
    variant: 'positive',
    title: 'Possible',
    message: 'Cette dépense semble compatible avec votre budget actuel.',
    newRemaining,
  };
  this.liveMessage = 'Résultat : Possible.';
  this.resetFormAfterAnalyze();
}

private resetFormAfterAnalyze() {
  this.amount = '';
  this.emotion = '';
  this.type = 'necessary';
}



  onReset() {
    this.amount = '';
    this.type = 'necessary';
    this.emotion = '';
    this.amountError = '';
    this.emotionError = '';
    this.result = null;
    this.liveMessage = 'Formulaire réinitialisé.';
  }

  private parseAmount(): number | null {
    const normalized = this.amount.replace(',', '.').trim();
    const value = Number(normalized);
    if (!Number.isFinite(value) || value <= 0) return null;
    return value;
  }
}
