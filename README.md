# ⚖️ Balance-Me : Ma Sérénité Financière

> **Le compagnon budgétaire qui allie psychologie positive et ingénierie logicielle.**
> ## 📄 Livrable du projet
[![View PDF](https://img.shields.io/badge/Consulter%20le%20Livrable-PDF-3E7F5A?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](./Balance-Me.pdf)

Balance-Me n'est pas qu'une simple application de gestion de compte. C'est un outil conçu pour désamorcer l'anxiété financière des jeunes actifs en introduisant la **"Pause Intentionnelle"** : un mécanisme qui sépare le besoin vital de l'impulsion émotionnelle avant chaque dépense.

---

## 🚀 Vision & Stratégie UX

L'application repose sur une démarche de conception centrée sur l'utilisateur (UCD) :
* **Problématique** : 60% des jeunes actifs ressentent du stress face à des interfaces bancaires froides et complexes.
* **Solution** : Une interface "Lifestyle" et apaisante utilisant une sémantique visuelle claire (**Possible / Risqué / Impossible**).
* **Personas** : Conception adaptée à **Émilie** (besoin de repères simples contre les achats impulsifs) et **Thomas** (optimisation de l'épargne sans frustration).

---

## 🎨 Design System & Industrialisation

Le projet utilise un **Design System atomique** rigoureux pour garantir une cohérence totale entre la conception Figma et le code Angular :

* **Design Tokens** : Centralisation des variables (couleurs `#3E7F5A` pour le succès, `#E7B6C2` pour l'alerte, grille de 8px, arrondis de 20-28px).
* **Atomic Design** : 
    * **Atomes** : `UiButton`, `UiInputAmount`, `UiTagIntent`.
    * **Molécules** : `TransactionItem`, `MoodSelector`.
* **Storybook** : Initialisé via `npx storybook@latest init`, il sert de documentation vivante pour valider les états (Focus, Hover, Error) et l'accessibilité de manière isolée.

---

## 🛠️ Architecture Technique & Patterns

Développé avec **Angular 17+**, le projet respecte les standards de qualité industrielle :

* **Architecture Modulaire** : Découplage strict entre la couche UI (Shared), la logique métier (Core) et les fonctionnalités applicatives (Features).
* **Design Patterns** :
    * **Strategy Pattern** : Gestion dynamique de la logique de calcul de risque selon l'intention de dépense (Vital vs Émotionnel).
    * **Observer (Signals)** : Implémentation des Angular Signals pour une gestion d'état granulaire et ultra-performante.
* **Éco-conception (Green IT)** : Optimisation de la détection de changement pour réduire la charge CPU.

---

## 📦 Installation & Lancement

### 1. Pré-requis
* Node.js (v18+)
* Angular CLI (`npm install -g @angular/cli`)

### 2. Initialisation & Installation
Si vous clonez le projet pour la première fois :
```bash
# Installation de l'Angular CLI globalement (si nécessaire)
npm install -g @angular/cli

# Clonage du dépôt
git clone https://github.com/Marjo14/Balance-Me.git
cd Balance-Me

# Installation des dépendances
npm install

### 3. Exécution
Lancer l'application en mode développement : npm start

Accès via : http://localhost:4200/

Lancer l'environnement de documentation des composants (Storybook) :npm run storybook

Accès via : http://localhost:6006/

## 📄 Livrable du projet
[![View PDF](https://img.shields.io/badge/Consulter%20le%20Livrable-PDF-3E7F5A?style=for-the-badge&logo=adobeacrobatreader&logoColor=white)](./Balance-Me.pdf)


