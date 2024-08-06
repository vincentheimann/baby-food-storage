# Baby Food Storage

## Description

Baby Food Storage est une application conçue pour aider les parents à gérer les aliments congelés pour leur bébé. L'application permet d'ajouter, consulter, modifier et suivre les dates de péremption des aliments de manière intuitive.

## Fonctionnalités

- **Ajout d'Aliments** : Ajouter des aliments avec leurs détails (nom, type, date de congélation, date de péremption, quantité de glaçons).
- **Consultation des Bacs** : Voir le contenu des différents bacs (Protéines, Légumes, Féculents, Fruits).
- **Notifications** : Recevoir des notifications pour les aliments proches de la péremption, avec des indicateurs de couleur pour l'urgence.
- **Modification d'Aliments** : Modifier les détails des aliments existants.
- **Gestion des Quantités** : Incrémenter ou décrémenter la quantité de glaçons pour chaque aliment.

## Parcours Utilisateurs

### Ajout d'Aliment

1. Sur la page d'accueil, cliquez sur "Ajouter un aliment".
2. Remplissez le formulaire avec les détails de l'aliment.
3. Soumettez le formulaire pour ajouter l'aliment à la liste.

### Consultation des Bacs

1. Sur la page d'accueil, consultez les bacs affichés.
2. Cliquez sur un bac pour voir les détails des aliments qu'il contient.

### Gestion des Notifications

1. Vérifiez le badge sur l'icône de cloche pour les notifications.
2. Ouvrez le Drawer des notifications pour voir les aliments proches de la péremption.
3. Marquez les notifications comme lues ou supprimez-les.

### Modification d'Aliment

1. Dans la liste des aliments, cliquez sur un aliment pour ouvrir le modal de modification.
2. Modifiez les champs nécessaires et sauvegardez les modifications.

## Installation

1. Clonez le repository :
   ```bash
   git clone https://github.com/vincentheimann/baby-food-storage.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd baby-food-storage
   ```
3. Installez les dépendances :
   ```bash
   npm install
   ```
4. Démarrez l'application :
   ```bash
   npm start
   ```

## Technologies Utilisées

- React
- Material-UI
- date-fns
- React Router
