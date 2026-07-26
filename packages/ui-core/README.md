# @recordair/ui-core

Primitives React accessibles et typées du design system Record'air : boutons, cartes, formulaires, feedback, navigation, contenu et icônes.

## Installation

```bash
npm install @recordair/ui-core @recordair/theme-recordair tailwindcss
```

Peer dependencies : React `18.2+` et React DOM `18.2+`.

## Configuration CSS obligatoire

Dans `app/globals.css` :

```css
@import "tailwindcss";
@import "@recordair/theme-recordair";

@source "../node_modules/@recordair/ui-core/dist";
```

Pour `src/app/globals.css`, remplacez `../node_modules` par `../../node_modules`.

## Utilisation

```tsx
import { Accordion, Button, Field, Input } from "@recordair/ui-core";
import { SearchIcon } from "@recordair/ui-core/icons";

const SearchForm = () => (
  <Field label="Rechercher" htmlFor="search">
    <Input id="search" icon={<SearchIcon aria-hidden="true" />} />
  </Field>
);

export { SearchForm };
```

Les boutons de rôle utilisent directement les tokens Record'air :

```tsx
import { Button } from "@recordair/ui-core";

const RoleActions = () => (
  <div className="flex gap-3">
    <Button variant="artist">Continuer comme artiste</Button>
    <Button variant="studio">Continuer comme studio</Button>
    <Button variant="pro">Continuer comme pro</Button>
  </div>
);

export { RoleActions };
```

`LinkButton` accepte une prop `as` pour injecter le composant de navigation du projet sans ajouter Next.js ou `next-intl` aux dépendances du package.

Les icônes doivent être importées depuis `@recordair/ui-core/icons`. N'importez pas les fichiers internes de `dist`.

Les composants émettent uniquement des événements React et n'importent ni route, ni service, ni traduction applicative. Ajoutez `"use client"` dans le composant consommateur lorsqu'il conserve un état ou fournit des callbacks.

Les contrôles de formulaire (`Input`, `Select`, `Checkbox`, `Toggle`, `Radio` et `Textarea`) utilisent les tokens sémantiques du thème et s'adaptent automatiquement au mode sombre.

## Dépannage

Si les composants sont rendus mais restent sans style, vérifiez la directive `@source`, supprimez `.next`, puis redémarrez le serveur de développement.

## Licence

Licence propriétaire, tous droits réservés. Voir le fichier `LICENSE` inclus dans le package.
