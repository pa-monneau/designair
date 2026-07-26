import type { Meta, StoryObj } from "@storybook/react-vite";
import { EmptyState, IconBox, LinkButton } from "@recordair/ui-core";
import { SearchIcon } from "@recordair/ui-core/icons";

/**
 * État vide générique : icône + titre + description + action optionnelle,
 * dans un cadre pointillé. Utilisé notamment sur `/explore/search`
 * (Record'air) quand une recherche ne remonte aucun studio.
 */
const meta = {
  title: "Core/Feedback/Empty state",
  component: EmptyState,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      description: "Illustration au-dessus du titre (ex. un `IconBox`). Omis si absent.",
      control: false,
    },
    title: {
      description: "Titre principal, requis.",
      control: "text",
    },
    description: {
      description: "Texte secondaire sous le titre. Omis si absent.",
      control: "text",
    },
    action: {
      description: "Élément d'action sous la description (ex. un `LinkButton` ou `Button`). Omis si absent.",
      control: false,
    },
    className: {
      description: "Classes additionnelles sur le conteneur.",
      control: "text",
    },
  },
  args: {
    title: "Aucun studio trouvé",
    description: "Modifie tes filtres ou élargis la zone de recherche.",
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EmptyState>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args) => (
    <div className="w-[32rem]">
      <EmptyState {...args} icon={<IconBox tone="neutral" size="lg" icon={<SearchIcon />} />} />
    </div>
  ),
};

const WithAction: Story = {
  name: "Avec action (résultats de recherche)",
  render: (args) => (
    <div className="w-[32rem]">
      <EmptyState
        {...args}
        icon={<IconBox tone="neutral" size="lg" icon={<SearchIcon />} />}
        action={<LinkButton href="#" variant="secondary">Réinitialiser les filtres</LinkButton>}
      />
    </div>
  ),
};

const TitleOnly: Story = {
  name: "Titre seul (sans icône ni description)",
  render: (args) => (
    <div className="w-[32rem]">
      <EmptyState title={args.title} />
    </div>
  ),
};

export default meta;
export { Default, WithAction, TitleOnly };
