# Éditeur de CV — (Angular)

Application **Angular standalone + signals** qui reprend l'éditeur de CV : bibliothèque de CV, galerie de modèles par métier, édition formulaire + aperçu A4 live, personnalisation des couleurs, et exports **PDF / PNG / JSON**. Tout est **local** (sauvegarde dans le `localStorage` du navigateur, aucun serveur).

> Généré comme portage du prototype HTML. Le style visuel suit le design system **kartenmacherei** (Forest / Linen / Sky Blue, accents Coral, typos Recoleta + Lato + Royal Palms).

## Lancer en local

Prérequis : **Node.js ≥ 18** et npm.

```bash
npm install
npm start
```

Puis ouvre `http://localhost:4200`.

Build de production :

```bash
npm run build      # sortie dans dist/kam-cv-editor
```

## Stack

- **Angular 18** (composants `standalone`, **signals**, nouvelle syntaxe de contrôle `@if` / `@for` / `@switch`).
- Changement de détection **OnPush** partout, état centralisé dans un service à base de signals.
- **html2canvas** pour l'export PNG ; `window.print()` + CSS `@media print` pour le PDF A4.
- Aucune autre dépendance UI.

## Architecture

```
src/
  styles.scss                 Tokens KAM (couleurs, polices, print) + reset
  assets/fonts/               Lato, Recoleta Alt, Royal Palms
  app/
    models/cv.model.ts        Types (Cv, CvData, Theme, Experience…)
    data/
      schemes.ts              7 thèmes de couleurs (Theme) + libellés
      styles.ts               19 styles (layout × thème), layouts, tris
      profiles.ts             10 catégories métier + contenus de départ
    services/
      cv-store.service.ts     Signals : cvs, currentId, état UI ; CRUD ;
                              persistance localStorage ; filtres/tri ; exports
    components/
      app.component.ts        Shell (header + bascule vue + overlay + nœud d'impression)
      library.component.ts    Bibliothèque (grille + tuile « + » + état vide)
      picker.component.ts      Galerie : rail catégories + filtres + tri + sélection
      editor.component.ts      Formulaire (gauche) + aperçu A4 mis à l'échelle (droite)
      cv-form.component.*      Formulaire complet (sections repliables)
      cv-preview.component.*   Rendu des 5 mises en page, piloté par le thème
      icon.component.ts        Jeu d'icônes SVG (style Lucide)
```

### Concept clé : un modèle = une coquille

Un **modèle** combine une **catégorie métier** (qui fournit un contenu de départ — nom, poste, expériences, compétences réalistes) et un **style** (mise en page + thème de couleurs). Une fois le CV créé, **tout** se personnalise dans l'éditeur : mise en page, thème, couleurs individuelles (accent, titres, panneau, fond), contenu, photo.

- **5 mises en page** : Colonne (sidebar), Bandeau, Centré, Minimal, Duo.
- **7 thèmes** : Forest, Linen, Encre, Ciel, Cherry, Terracotta, Sauge.
- **10 catégories** métier, chacune avec ses styles cohérents (sobres pour BTP/public, visuels pour design/commerce, modernes pour la tech, doux pour la santé…).

## Exports & notifications

Dans l'éditeur, le bouton **Télécharger** ouvre une **fenêtre d'export** : aperçu du CV + choix du format avant de confirmer.

- **PDF** : ouvre la boîte d'impression du navigateur ; choisis « Enregistrer en PDF » (format A4, sans marges).
- **PNG** : capture l'aperçu A4 via html2canvas (×2).
- **JSON** : télécharge les données du CV ; ré-importable via « Importer JSON ».

Un système de **notifications (toasts)** avertit l'utilisateur à chaque action (CV créé, dupliqué, supprimé, importé, photo ajoutée, export lancé/terminé, erreurs). Implémenté par le `CvStore` (signal `toasts` + `notify()`) et rendu par `toast.component.ts` ; la fenêtre d'export est `export-dialog.component.ts`.

## Personnalisation

- **Couleurs** : la section « Modèle & couleurs » expose des thèmes prédéfinis + des sélecteurs de couleur. Changer la couleur du panneau ajuste automatiquement la lisibilité du texte (clair/foncé).
- **Polices** : les `.ttf/.otf` KAM sont dans `src/assets/fonts`. Pour un usage hors marque, remplace-les et adapte `--font-*` dans `src/styles.scss`.

## Notes

- Ce projet a été généré sans être compilé dans l'environnement de conception — lance `npm install && npm start` pour le vérifier localement. Les versions Angular peuvent être montées (`ng update`) sans changement de code majeur (API signals/standalone stables depuis Angular 17).
- Les contenus de CV (noms, entreprises) sont des **exemples fictifs** par métier, à remplacer.
