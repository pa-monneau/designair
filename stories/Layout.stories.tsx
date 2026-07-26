import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "@recordair/ui-core";

/**
 * `Divider` : séparateur horizontal fin entre deux sections de contenu.
 */
const meta = {
  title: "Core/Layout/Divider",
  component: Divider,
  parameters: { layout: "centered" },
} satisfies Meta<typeof Divider>;

type Story = StoryObj<typeof meta>;

const InSection: Story = {
  name: "Entre deux sections",
  render: () => (
    <div className="w-96 space-y-4">
      <span className="text-sm text-neutral-700">Section supérieure</span>
      <Divider />
      <span className="text-sm text-neutral-700">Section inférieure</span>
    </div>
  ),
};

export default meta;
export { InSection };
