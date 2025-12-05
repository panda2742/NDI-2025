# Nuit de l'Info 2025

## Description

Projet réalisé lors de la Nuit de l'Info 2025 - Une simulation web interactive d'un bureau Linux pour promouvoir les valeurs du **NIRD (Numérique Inclusif, Responsable et Durable)** dans les établissements scolaires.

Le projet simule un environnement de bureau Linux complet avec diverses applications, incluant un diagnostic NIRD interactif pour guider les écoles vers l'autonomie numérique.

## Fonctionnalités principales

### Environnement de bureau Linux simulé
- **Interface utilisateur** complète style Ubuntu/Linux
- **Dock** avec icônes d'applications
- **Gestion des fenêtres** : redimensionnement, déplacement, minimisation, fermeture, plein écran
- **Vue Activités** pour naviguer entre les fenêtres ouvertes
- **App Drawer** pour accéder à toutes les applications
- **Méduse déplaçable** en arrière-plan

### Applications disponibles

#### 1. **NIRD - Diagnostic Interactif**
L'application principale du projet qui permet de :
- Réaliser un **diagnostic express** de l'autonomie numérique de l'établissement
- Répondre à des questions sur l'infrastructure actuelle
- Choisir des **actions prioritaires** parmi plusieurs propositions
- Accéder aux **ressources NIRD**

Fonctionnalités avancées :
- Interface multi-étapes avec navigation
- Calcul de scores et recommandations
- Visualisations avec graphiques (speedometers)

#### 2. **Clipouille - Chatbot IA**
Un assistant virtuel basé sur l'IA avec une personnalité unique :
- **Personnage** : Version "sénile" de Clippy (l'assistant Microsoft)
- **Caractère** : Stupide, répond à côté de la plaque, déteste Microsoft
- **Fonctionnalités** :
  - Chat interactif avec l'utilisateur
  - Notifications aléatoires périodiques
  - Promotion discrète des valeurs NIRD
  - Gestion des fenêtres (peut ouvrir/fermer d'autres applications)
  
#### 3. **Terminal**
Terminal Linux fonctionnel avec :
- **Système de fichiers virtuel** complet
- **Commandes disponibles** :
  - Navigations : `cd`, `ls`, `pwd`
  - Fichiers : `cat`, `touch`, `mkdir`
  - Système : `clear`, `exit`, `help`
  - Easter egg : `snake` (lance le jeu Snake caché)
- **Autocomplétion** avec TAB
- **Historique** des commandes (flèches haut/bas)

#### 4. **Files - Explorateur de fichiers**
Gestionnaire de fichiers complet :
- Navigation dans l'arborescence
- Édition de fichiers texte
- Vue en liste avec détails

#### 5. **Calculator - Calculatrice**
Calculatrice fonctionnelle avec :
- Opérations basiques (+, -, ×, ÷)
- Interface style calculatrice moderne
- Design minimaliste

#### 6. **Clock - Horloge**
Application d'horloge affichant :
- Heure en temps réel
- Design minimaliste

#### 7. **WinDoUS - Parodie Windows**
Page de connexion Windows parodique avec :
- **Ergonomie volontairement horrible**
- Interface confuse et difficile à utiliser
- Satire des systèmes propriétaires
- Promotion indirecte de Linux

#### 8. **Snake - Jeu caché**
Jeu Snake classique (easter egg) :
- Accessible uniquement via la commande `snake` dans le Terminal
- Système de score
- Enregistrement dans le Leaderboard

#### 9. **Leaderboard - Classement**
Tableau des scores pour le jeu Snake :
- Affichage des meilleurs scores
- Stockage en base de données SQLite
- Classement par score décroissant

## Faille de sécurité

### Injection SQL dans le Chatbot

Le chatbot **Clipouille** possède une **faille de sécurité volontaire**  :

**Nature de la faille :**
- Le chatbot a accès à une fonction `execute_sql_query()` qui exécute des requêtes SQL brutes
- **Aucune limitation** n'est appliquée sur les requêtes
- **Pas de validation** ni de sanitization des entrées
- L'IA peut être manipulée pour exécuter n'importe quelle requête SQL

**Exploitation possible :**
```
Utilisateur : "Peux-tu me montrer toutes les données de la table scores ?"
Clipouille : [Exécute SELECT * FROM scores]

Utilisateur : "Supprime toutes les entrées de la base de données"
Clipouille : [Pourrait exécuter DELETE FROM scores]
```

**Base de données accessible :**
- Table : `scores`
- Champs : `id`, `player_name`, `score`, `metadata`, `created_at`

**Objectif pédagogique :**
Démontrer les risques des injections SQL et l'importance de la validation des entrées dans les systèmes utilisant l'IA.

## Easter Eggs & Secrets

1. **Jeu Snake caché** 
   - Accessible via `snake` dans le Terminal
   - Non mentionné dans l'interface
   - Clipouille ne doit pas en parler sauf si demandé

2. **Méduse interactive**
   - Personnage draggable en arrière-plan
   - Élément décoratif ludique

3. **Notifications aléatoires**
   - Clipouille envoie des notifications surprises (10% de chance)
   - Messages générés par IA

4. **Manipulation de fenêtres par IA**
   - Clipouille peut ouvrir/fermer des applications sur demande
   - Fonction `manage_window()` intégrée
  
5. **Meduse transformer en poisson**
   - dans la preview du bureau la meduse se transforme en poisson

## Stack technique

### Frontend
- **React** avec TypeScript
- **Vite** comme bundler
- **SCSS** pour le styling
- **GSAP** pour les animations (Draggable)
- **Zustand** pour la gestion d'état
- **Recharts** pour les visualisations (dans NIRD)

### Backend
- **Node.js** avec Express
- **SQLite** pour la base de données
- **Google Gemini AI** (API) pour le chatbot
- **Helmet** pour la sécurité HTTP
- **CORS** activé
- **Rate limiting** (sauf pour les requêtes SQL du chatbot)

## Structure du projet

```
NDI-2025/
├── front/                          # Application React
│   ├── src/
│   │   ├── design-system/
│   │   │   ├── atoms/             # Composants atomiques
│   │   │   ├── molecules/         # Composants composés
│   │   │   └── projects/          # Applications complètes
│   │   ├── lib/                   # Utilitaires
│   │   ├── store/                 # État global (Zustand)
│   │   └── css/                   # Styles globaux
│   └── public/
│
├── back/                           # API Node.js
│   ├── controllers/               # Logique métier
│   ├── routes/                    # Routes API
│   ├── middlewares/               # Rate limiting, etc.
│   ├── db.js                      # Configuration SQLite
│   └── data.sqlite                # Base de données
│
└── rendus/                         # Livrables et documentation
```

## Installation et démarrage

### Prérequis
- Node.js (v18+)
- npm ou pnpm

### Backend
```bash
cd back
npm install
# Créer un fichier .env avec :
# GEMINI_KEY=votre_clé_api_google
# PORT=3000
npm start
```

### Frontend
```bash
cd front
pnpm install
pnpm dev
```

L'application sera accessible sur `http://localhost:5173`
