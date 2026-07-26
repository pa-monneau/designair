# Design'air

Lib UI React/TypeScript partagée entre les apps Record'air, Home'air et Bi'air, publiée sous le scope npm historique [`@recordair`](https://www.npmjs.com/org/recordair) (nom de scope inchangé pour ne pas casser les packages déjà publiés).

- `@recordair/ui-core` : primitives accessibles, formulaires, feedback, navigation et icônes.
- `@recordair/ui-patterns` : assemblages réutilisables construits avec `ui-core`.
- `@recordair/theme-recordair` : tokens Record'air pour Tailwind CSS v4.

## Démarrage rapide avec Next.js

### 1. Prérequis

- React `18.2` ou supérieur.
- React DOM `18.2` ou supérieur.
- Tailwind CSS `4` ou supérieur.
- Un projet qui traite la feuille CSS globale avec Tailwind, par exemple Next.js avec `@tailwindcss/postcss`.

Avec un nouveau projet Next.js, activez Tailwind CSS lors de la création du projet :

```bash
npx create-next-app@latest mon-projet --typescript --tailwind --app
cd mon-projet
```

### 2. Installer le design system

Choisissez la commande correspondant au gestionnaire du projet :

```bash
# npm
npm install @recordair/ui-core @recordair/ui-patterns @recordair/theme-recordair tailwindcss

# pnpm
pnpm add @recordair/ui-core @recordair/ui-patterns @recordair/theme-recordair tailwindcss

# yarn
yarn add @recordair/ui-core @recordair/ui-patterns @recordair/theme-recordair tailwindcss
```

Installez les trois packages pour disposer du catalogue complet. `ui-patterns` utilise `ui-core` comme peer dependency.

### 3. Charger le thème et déclarer les sources Tailwind

Tailwind CSS ignore `node_modules` pendant sa détection automatique. La feuille CSS globale doit donc importer le thème et déclarer explicitement les deux packages de composants.

Pour `app/globals.css` :

```css
@import "tailwindcss";
@import "@recordair/theme-recordair";

@source "../node_modules/@recordair/ui-core/dist";
@source "../node_modules/@recordair/ui-patterns/dist";
```

Pour `src/app/globals.css` :

```css
@import "tailwindcss";
@import "@recordair/theme-recordair";

@source "../../node_modules/@recordair/ui-core/dist";
@source "../../node_modules/@recordair/ui-patterns/dist";
```

Les chemins `@source` sont relatifs au fichier CSS qui les contient :

| Emplacement de la feuille CSS | Préfixe vers `node_modules` |
| --- | --- |
| `globals.css` à la racine | `./node_modules` |
| `app/globals.css` | `../node_modules` |
| `src/app/globals.css` | `../../node_modules` |

Si le projet n'utilise pas `ui-patterns`, retirez sa dépendance et sa directive `@source`.

Le layout Next.js doit importer cette feuille une seule fois :

```tsx
import "./globals.css";

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="fr">
    <body>{children}</body>
  </html>
);

export default RootLayout;
```

### 4. Utiliser les composants

```tsx
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Field,
  Input,
} from "@recordair/ui-core";
import { ProfileSectionCard } from "@recordair/ui-patterns";

const ProfileForm = () => (
  <ProfileSectionCard title="Profil" subtitle="Informations publiques">
    <Field label="Nom" htmlFor="name">
      <Input id="name" name="name" />
    </Field>
    <Button type="submit">Enregistrer</Button>
  </ProfileSectionCard>
);

const CustomCard = () => (
  <Card variant="elevated">
    <CardHeader>
      <CardTitle>Ma carte</CardTitle>
    </CardHeader>
    <CardContent>Contenu du projet consommateur.</CardContent>
  </Card>
);

export { CustomCard, ProfileForm };
```

Les icônes possèdent un point d'entrée dédié :

```tsx
import { SearchIcon } from "@recordair/ui-core/icons";
```

### 5. Utiliser un composant interactif dans Next.js

Ajoutez `"use client"` dans le composant consommateur lorsqu'il conserve un état ou fournit des callbacks :

```tsx
"use client";

import { useState } from "react";
import { Button, Modal } from "@recordair/ui-core";

const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Ouvrir</Button>
      <Modal isOpen={isOpen} title="Confirmation" onClose={() => setIsOpen(false)}>
        Contenu de la modale
      </Modal>
    </>
  );
};

export { ModalExample };
```

Aucune option `transpilePackages` n'est nécessaire : les packages npm contiennent déjà le JavaScript ESM et les déclarations TypeScript compilés.

## Vérifier l'installation

Après l'installation ou une modification des directives `@source` :

```bash
rm -rf .next
npm run dev
```

Vérifiez qu'un `Button` possède sa couleur, ses espacements, son rayon et son état de focus. Une interface presque entièrement noire et blanche, sans padding ni cartes, signifie généralement que Tailwind ne scanne pas les packages.

## Dépannage

### Les composants s'affichent sans styles

1. Vérifiez que `globals.css` contient les deux imports et les deux directives `@source`.
2. Vérifiez le nombre de `../` selon l'emplacement réel de `globals.css`.
3. Vérifiez que le layout importe `globals.css`.
4. Supprimez `.next`, puis redémarrez le serveur de développement.
5. Vérifiez que Tailwind CSS est en version `4` ou supérieure.

### Les tokens sont présents, mais les cartes et boutons restent bruts

Le thème est chargé, mais les dossiers `dist` ne sont pas scannés. Corrigez les chemins `@source` ; il n'est pas nécessaire de safelister chaque classe manuellement.

### Une icône ne peut pas être importée

Utilisez le sous-chemin public :

```tsx
import { BellIcon } from "@recordair/ui-core/icons";
```

N'importez pas directement un fichier interne de `dist`.

### Erreur de peer dependency

Installez ensemble React, React DOM, Tailwind CSS et les packages Record'air :

```bash
npm install react react-dom tailwindcss @recordair/ui-core @recordair/ui-patterns @recordair/theme-recordair
```

## Personnaliser le thème

Les composants utilisent des tokens sémantiques. Un projet peut surcharger les variables sources après l'import du thème :

```css
:root {
  --recordair-color-brand-primary: var(--color-brand-project);
  --recordair-color-brand-gradient-from: var(--color-brand-project);
  --recordair-color-brand-gradient-to: var(--color-accent-project);
  --recordair-font-sans: var(--font-project);
}
```

Conservez les noms de tokens et fournissez les valeurs depuis le système de variables du projet consommateur.

## Documentation du catalogue

- Storybook : exemples, états, contrôles et code source de chaque famille.
- [Catalogue des composants](./docs/COMPONENT_CATALOG.md).
- [Inventaire de migration](./docs/MIGRATION_INVENTORY.md).
- [Standard de documentation](./docs/DOCUMENTATION_STANDARD.md).

`ui-core` expose 42 primitives et sous-composants. `ui-patterns` expose 28 assemblages. L'inventaire source suit séparément les composants volontairement conservés dans le produit Record'air.

## Développement du monorepo

```bash
npm install
npm run typecheck
npm run build
npm run storybook
```

Avant une publication :

```bash
npm run build-storybook
npm run pack:dry-run
```

## Licence

Licence propriétaire, tous droits réservés. La disponibilité publique sur npm ne confère aucun droit d'utilisation, de copie, de modification ou de redistribution sans autorisation écrite préalable. Voir [LICENSE](./LICENSE).
