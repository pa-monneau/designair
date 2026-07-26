import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, Badge, IconBox } from "@recordair/ui-core";
import { AudioLinesIcon } from "@recordair/ui-core/icons";

/**
 * Identité visuelle d'une personne ou d'un studio : `Avatar` (initiales de
 * repli si pas d'image, `size`), `IconBox` (icône encadrée, `tone`). `Badge`
 * a sa propre page (Core/Badge) — montré ici seulement en contexte, à côté
 * d'un avatar.
 */
const meta = {
  title: "Core/Data display/Identity",
  parameters: { layout: "centered" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Catalog: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      <Avatar name="Camille Dupont" />
      <Badge tone="success" dot>Vérifié</Badge>
      <IconBox tone="brand" icon={<AudioLinesIcon />} />
    </div>
  ),
};
const AvatarStory: Story = { name: "Avatar", render: () => <Avatar name="Camille Dupont" size="lg" /> };
const IconBoxStory: Story = { name: "IconBox", render: () => <IconBox tone="brand" icon={<AudioLinesIcon />} /> };

export default meta;
export { AvatarStory, Catalog, IconBoxStory };
