# 🎨 Design System — BalanceMe

Ce document présente le **Design System** du projet *BalanceMe*.

L’objectif du design system est de garantir :
- 🎯 une cohérence visuelle sur l’ensemble de l’application,
- 🧩 une meilleure lisibilité et maintenabilité du code,
- 🔗 une continuité entre la conception (Figma) et le développement (Angular).

Le design system a été volontairement limité aux éléments nécessaires au **MVP**.

---

## 🔗 Liens Figma : 

- 🌈 **Moodboard**  
  https://www.figma.com/design/2Vu4J6yLkhqhuKeK3JJ0Vq/BalanceMe?node-id=449-342

- 🎨 **Design System — Couleurs & Typographie**  
  https://www.figma.com/design/2Vu4J6yLkhqhuKeK3JJ0Vq/BalanceMe?node-id=442-2491

- 🧱 **Composants (Atomic Design)**  
  https://www.figma.com/design/2Vu4J6yLkhqhuKeK3JJ0Vq/BalanceMe?node-id=481-372
  
---

## 🧩 1. Design Tokens

Les design tokens correspondent aux variables de design utilisées dans le projet.  
Ils permettent de centraliser les choix esthétiques et de les rendre réutilisables
dans l’interface et dans le code.

---

### 🎨 1.1 Couleurs

Les couleurs sont définies sous forme de variables afin d’assurer leur cohérence
dans l’ensemble de l’application.

| Token              | Rôle UX                                         | Valeur HEX |
|--------------------|-------------------------------------------------|------------|
| color-primary      | Solde positif / état rassurant                  | #3E7F5A    |
| color-secondary    | Boutons secondaires / actions neutres           | #4FA6A6    |
| color-emotional    | États émotionnels / solde négatif               | #E8B6C1    |
| color-insight      | Mise en avant / information clé                | #F2D37C    |
| color-neutral      | Fond neutre / cartes                           | #7A5A4A    |
| color-black        | Texte principal                                 | #1C1C1C    |
| color-white        | Fond principal                                  | #FFFFFF    |

👉 Ces couleurs sont définies dans Figma via des **Variables** et seront utilisées
comme **design tokens** dans le CSS du projet Angular.

---

### 🔤 1.2 Typographie

Une seule police est utilisée afin de garantir la lisibilité et la cohérence visuelle :

- **Inter**

Les styles typographiques sont définis sous forme de **Text Styles** dans Figma.

| Style  | Taille | Usage |
|-------|--------|-------|
| H1    | 48px   | Titre principal |
| H2    | 36px   | Titres de section |
| H3    | 32px   | Sous-titres |
| Body L| 24px   | Texte important |
| Body M| 16px   | Texte courant |
| Body S| 12px   | Texte secondaire |

👉 Ces styles sont réutilisés sur l’ensemble des écrans afin de maintenir une hiérarchie claire.

---

## ⚛️ 2. Atomic Design

Le design system suit la méthodologie **Atomic Design** afin de structurer les composants
de manière claire et évolutive.

---

### ⚪ 2.1 Atomes

Les atomes sont les éléments UI de base, indivisibles :

- 🔘 Bouton primaire
- 🔹 Bouton secondaire
- ➕ Bouton d’ajout
- 🔘 Radio button
- 🔤 Styles typographiques
- 🎨 Couleurs (design tokens)

Ces éléments constituent la base de l’interface.

---

### 🧬 2.2 Molécules

Les molécules sont des combinaisons simples d’atomes :

- 💳 Carte “Solde restant” — état positif
- 💳 Carte “Solde restant” — état négatif
- 🧾 Carte de saisie (titre + zone de montant)

Ces composants correspondent directement aux éléments présents dans les wireframes
et dans l’interface finale.

---

## 🧠 3. Choix UX & cohérence

BalanceMe adopte une approche **bienveillante et éducative** de la gestion financière.

Le design ne cherche pas à être strictement bancaire, mais à accompagner l’utilisateur
dans sa prise de décision.

Exemples de choix UX :
- ✅ le solde positif est représenté par une couleur rassurante (vert),
- 💗 le solde négatif utilise une couleur émotionnelle douce (rose),
- 🤝 l’interface n’est pas culpabilisante : l’achat n’est pas encore effectué,
  l’utilisateur est invité à analyser sa dépense.

Ces choix sont cohérents avec la vocation sociale du projet et le persona ciblé.

---

## 🚧 4. Limites du Design System (MVP)

Dans le cadre de ce MVP, le design system est volontairement limité :

- ❌ pas de gestion exhaustive des états (hover, disabled),
- ❌ pas de composants complexes non nécessaires,
- 🎯 focus sur les éléments réellement utilisés dans l’application.

Ce choix permet de rester cohérent avec le périmètre du projet
et de faciliter l’implémentation technique.
