# 🎨 Design System — BalanceMe

Ce document présente le **Design System** du projet *BalanceMe*. 

L’objectif du design system est de garantir :
- 🎯 une cohérence visuelle sur l’ensemble de l’application,
- 🧩 une meilleure lisibilité et maintenabilité du code,
- 🔗 une continuité entre la conception (Figma) et le développement (Angular). [cite: 56]

---

## 🔗 Liens Figma

- 🌈 **Moodboard** [Lien Figma](https://www.figma.com/design/2Vu4J6yLkhqhuKeK3JJ0Vq/BalanceMe?node-id=449-342)
- 🎨 **Design System — Couleurs & Typographie** [Lien Figma](https://www.figma.com/design/2Vu4J6yLkhqhuKeK3JJ0Vq/BalanceMe?node-id=442-2491)
- 🧱 **Composants (Atomic Design)** [Lien Figma](https://www.figma.com/design/2Vu4J6yLkhqhuKeK3JJ0Vq/BalanceMe?node-id=481-372)

---

## 🧩 1. Design Tokens

[cite_start]Les design tokens sont les variables de design qui garantissent la cohérence visuelle à travers tout le produit. [cite: 330] [cite_start]Ils stockent les valeurs esthétiques sous forme de données réutilisables. [cite: 331]

### 🎨 1.1 Couleurs
[cite_start]Les couleurs sont définies via des variables CSS pour assurer la cohérence et faciliter le thème. [cite: 333]

| Token              | Rôle UX                                         | Valeur HEX |
|--------------------|-------------------------------------------------|------------|
| `color-primary`    | Solde positif / état rassurant                  | #3E7F5A    |
| `color-secondary`  | Boutons secondaires / actions neutres           | #4FA6A6    |
| `color-emotional`  | États émotionnels / solde négatif               | #E8B6C1    |
| `color-insight`    | Focus accessibilité / information clé           | #F2D37C    |
| `color-neutral`    | Fond neutre / cartes                            | #7A5A4A    |
| `color-black`      | Texte principal                                 | #1C1C1C    |
| `color-white`      | Fond principal                                  | #FFFFFF    |

### 🔤 1.2 Typographie
La police choisie est **Plus Jakarta Sans**, sélectionnée pour sa modernité et son excellente lisibilité sur interface numérique.

| Style   | Taille (Desktop) | Usage |
|:--------|:-----------------|:------|
| `H1`    | 48px             | Titre principal (Budget) |
| `H2`    | 36px             | Titres de section |
| `H3`    | 32px             | Sous-titres |
| `Body M`| 16px             | Texte courant / Inputs |
| `Body S`| 12px             | Texte secondaire / Labels |

### 📏 1.3 Espacements (Spacing)
Le système repose sur une échelle de base 8 pour garantir un rythme visuel harmonieux et prévisible.

| Token      | Valeur | Usage |
|:-----------|:-------|:------|
| `space-sm` | 8px    | Gaps entre les boutons et tags |
| `space-md` | 16px   | Padding interne des cartes |
| `space-lg` | 24px   | Marges entre les sections principales |

### 📐 1.4 Arrondis (Radius)
Les rayons larges renforcent l'aspect bienveillant et sécurisant de l'interface.

| Token       | Valeur | Usage |
|:------------|:-------|:------|
| `radius-lg` | 20px   | Boutons et éléments interactifs |
| `radius-xl` | 28px   | Cartes de dashboard et formulaires |

---

## ⚛️ 2. Atomic Design

[cite_start]L'application suit la méthodologie **Atomic Design** pour construire un système évolutif et maintenable. [cite: 325]

### ⚪ 2.1 Atomes
[cite_start]Éléments de base indivisibles : [cite: 320]
- **Boutons :** Primaires et secondaires.
- **Inputs :** Champs de saisie montant et titre.
- **Tags :** Badges de catégories (Vital / Emotional).

### 🧬 2.2 Molécules
[cite_start]Combinaisons simples d'atomes : [cite: 322]
- **Transaction Item :** Ligne d'historique (icône + texte + montant).
- **Card Budget :** Bloc de solde avec variante dynamique (Positive/Danger).

---

## 🧠 3. Choix UX & Accessibilité

[cite_start]BalanceMe adopte une approche **centrée utilisateur** et bienveillante de la finance. [cite: 228]

- [cite_start]**♿ Accessibilité :** Utilisation de balises sémantiques et gestion rigoureuse du focus clavier via le token `color-insight` (contour orange de 3px). [cite: 158, 207]
- **Sémantique :** Le vert rassure, tandis que le rose émotionnel invite à la réflexion sans culpabilisation.
- [cite_start]**🌱 Éco-conception :** Optimisation des performances via les **Signals Angular**, limitant les cycles de détection de changement pour réduire la consommation énergétique. [cite: 208, 216]

---

## 🚧 4. Limites du Design System (MVP)

- ❌ Gestion simplifiée des états `hover` et `active`.
- 🎯 Focus sur les composants critiques nécessaires au flux d'intention d'achat.
