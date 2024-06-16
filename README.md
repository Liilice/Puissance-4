# Puissance 4

## Introduction
Ce projet consiste à créer un plugin JavaScript modulable pour le célèbre jeu Puissance 4. Ce plugin permet d'implémenter une version personnalisable du jeu avec des options de configuration pour la grille et les couleurs des joueurs.

## Règles du Jeu
1. **Deux joueurs** : Traditionnellement les rouges et les jaunes.
2. **Grille de jeu** : Surface de dimensions variables.
3. **Tour à tour** : Les joueurs placent un pion dans une colonne de leur choix, le pion coulisse à la position la plus basse possible.
4. **Conditions de victoire** : Le premier joueur à aligner au moins 4 pions de sa couleur horizontalement, verticalement ou en diagonale remporte la partie.
5. **Fin de partie** : La partie se termine lorsqu'un joueur gagne ou qu'il n'y a plus de cases disponibles, déclarant ainsi la partie nulle.

## Fonctionnalités
- **Modularité** : Le jeu est implémenté sous forme de plugin JavaScript modulable.
- **Configuration des Dimensions** : Possibilité de configurer le nombre de lignes et de colonnes de la grille.
- **Configuration des Couleurs** : Possibilité de configurer les couleurs des joueurs, avec validation pour éviter les couleurs identiques.
- **Détection des Conditions de Victoire** : Détection automatique des conditions de victoire (alignement de 4 pions horizontalement, verticalement ou en diagonale).
- **Gestion des Tours** : Gestion automatique des tours des joueurs.

## Prérequis
- Navigateur web supportant JavaScript (ES6).

## Installation et Utilisation

### 1. Clonez le Répertoire du Projet
```bash
git clone git@github.com:Liilice/Puissance-4.git
cd Puissance-4
```

### 2. Configuration des Options
Le plugin accepte les options suivantes :
- `rows` : Nombre de lignes de la grille (par défaut : 6).
- `cols` : Nombre de colonnes de la grille (par défaut : 7).
- `player_1_name` : Nom du joueur 1 (par défaut : 1).
- `player_2_name` : Nom du joueur 1 (par défaut : 2).
- `player_1_color` : Couleur du joueur 1 (par défaut : 'red').
- `player_2_color` : Couleur du joueur 2 (par défaut : 'yellow').

### 4. Modification des options
Allez dans src/index.js, modifiez les valeurs 
```javascript
const game = new Puissance_4(document.getElementById("game"), {
  rows: 6,
  cols: 7,
  player_1_name: "Player 1",
  player_2_name: "Player 2",
  player_1_color: "orange",
  player_2_color: "purple",
});
```

### 5. Lancer le Jeu avec Live Server
Installer l'extension Live Server pour Visual Studio Code :

    Ouvrez Visual Studio Code.
    Allez dans l'onglet Extensions (icône de carré avec un quadrillage sur la barre latérale gauche).
    Recherchez "Live Server" et installez l'extension développée par Ritwick Dey.

Ouvrir le projet dans Visual Studio Code :

    Ouvrez le dossier Puissance-4 dans Visual Studio Code.

Lancer Live Server :

    Ouvrez le fichier index.html dans Visual Studio Code.
    Cliquez avec le bouton droit sur le fichier et sélectionnez "Open with Live Server".
    Votre navigateur par défaut s'ouvrira avec l'URL http://127.0.0.1:5500 (ou un port similaire), affichant votre jeu Puissance 4.
