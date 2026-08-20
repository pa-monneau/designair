import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button, ButtonGroup, IconButton, LinkButton, SubmitButton } from "@recordair/ui-core";
import { ArrowRightIcon, HeartIcon, SaveIcon } from "@recordair/ui-core/icons";

const ButtonCatalog = () => (
  <div className="flex max-w-2xl flex-col gap-6">
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primaire</Button>
      <Button variant="secondary">Secondaire</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="artist">Artiste</Button>
      <Button variant="studio">Studio</Button>
      <Button variant="pro">Pro</Button>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm" leadingIcon={<SaveIcon className="size-4" />}>Petit</Button>
      <Button trailingIcon={<ArrowRightIcon className="size-4" />}>Moyen</Button>
      <Button size="lg" shape="pill">Grand pill</Button>
      <IconButton label="Ajouter aux favoris" icon={<HeartIcon className="size-4" />} variant="secondary" />
      <LinkButton href="#" variant="soft" trailingIcon={<ArrowRightIcon className="size-4" />}>Lien bouton</LinkButton>
    </div>
    <ButtonGroup aria-label="Actions de réservation">
      <Button variant="secondary">Refuser</Button>
      <Button>Accepter</Button>
    </ButtonGroup>
  </div>
);

/**
 * Bouton d'action principal. Variantes neutres (`primary`/`secondary`/
 * `ghost`/`soft`/`danger`) et variantes par rôle (`artist`/`studio`/`pro`,
 * dégradé + ombre tokenisés par rôle). Famille `Button` : `LinkButton` (lien
 * stylé bouton), `IconButton` (icône seule, page dédiée Core/IconButton),
 * `SubmitButton` (état `pending` de formulaire) et `ButtonGroup` (regroupement
 * visuel de plusieurs boutons).
 */
const meta = {
  title: "Core/Actions/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "Palette : neutres (`primary`/`secondary`/`ghost`/`soft`/`danger`) ou par rôle (`artist`/`studio`/`pro`).",
      control: "select",
      options: ["primary", "secondary", "ghost", "soft", "danger", "artist", "studio", "pro"],
    },
    size: {
      description: "Hauteur et padding.",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    shape: {
      description: "Coins arrondis (`default`) ou capsule complète (`pill`).",
      control: "radio",
      options: ["default", "pill"],
    },
    block: {
      description: "Occupe toute la largeur du conteneur.",
      control: "boolean",
    },
    leadingIcon: {
      description: "Icône avant le texte.",
      control: false,
    },
    trailingIcon: {
      description: "Icône après le texte.",
      control: false,
    },
    loading: {
      description: "État de chargement : remplace le contenu par `loadingLabel` et désactive le bouton.",
      control: "boolean",
    },
    loadingLabel: {
      description: "Texte affiché pendant `loading` (annoncé aux lecteurs d'écran).",
      control: "text",
    },
  },
  args: {
    children: "Continuer",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

type Story = StoryObj<typeof meta>;

const Primary: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Continuer" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

const Danger: Story = {
  args: {
    variant: "danger",
    children: "Supprimer",
  },
};

const RoleVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button variant="artist">Continuer comme artiste</Button>
      <Button variant="studio">Continuer comme studio</Button>
      <Button variant="pro">Continuer comme pro</Button>
    </div>
  ),
};

const WithIcons: Story = {
  args: {
    leadingIcon: <SaveIcon className="size-4" />,
    trailingIcon: <ArrowRightIcon className="size-4" />,
  },
};

const Loading: Story = {
  args: {
    loading: true,
    onClick: fn(),
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

const Catalog: Story = {
  render: () => <ButtonCatalog />,
};

const LinkButtonStory: Story = {
  name: "LinkButton",
  render: () => <LinkButton href="#" trailingIcon={<ArrowRightIcon className="size-4" />}>Voir le studio</LinkButton>,
};

const ButtonGroupStory: Story = {
  name: "ButtonGroup",
  render: () => <ButtonGroup aria-label="Actions"><Button variant="secondary">Annuler</Button><Button>Confirmer</Button></ButtonGroup>,
};

const SubmitButtonStory: Story = {
  name: "SubmitButton",
  render: () => <form><SubmitButton pendingLabel="Enregistrement">Enregistrer</SubmitButton></form>,
};

export default meta;
export {
  ButtonGroupStory,
  Catalog,
  Danger,
  Ghost,
  LinkButtonStory,
  Loading,
  Primary,
  RoleVariants,
  Secondary,
  SubmitButtonStory,
  WithIcons,
};
