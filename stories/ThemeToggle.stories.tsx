import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ThemeToggle } from "@recordair/ui-core";

/**
 * Bouton icône contrôlé qui bascule entre thème clair et sombre. Affiche
 * toujours l'icône du thème **à activer** (soleil en sombre, lune en clair)
 * — jamais l'état courant — pour signaler l'action plutôt que l'état.
 */
const meta = {
  title: "Core/Actions/Theme toggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  argTypes: {
    theme: {
      description: "Thème actuellement actif.",
      control: "radio",
      options: ["light", "dark"],
    },
    onToggle: {
      description: "Appelé au clic ; à l'appelant de changer le thème effectif.",
      control: false,
    },
    size: {
      description: "Taille du bouton, mêmes valeurs que `Button`.",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
  },
  args: {
    theme: "light",
    size: "md",
    onToggle: () => undefined,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ThemeToggle>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args) => {
    const [theme, setTheme] = useState(args.theme);
    return <ThemeToggle {...args} theme={theme} onToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />;
  },
};

export default meta;
export { Default };
