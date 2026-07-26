import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Range } from "@recordair/ui-core";

/**
 * Curseur accessible (`<input type="range">` sous-jacent, piste et thumb
 * restylés en tokens du DS). Toujours contrôlé (`value` requis) : combiner
 * avec un état local ou un formulaire pour piloter la valeur via `onChange`.
 */
const meta = {
  title: "Core/Forms/Range",
  component: Range,
  tags: ["autodocs"],
  argTypes: {
    min: {
      description: "Valeur minimale.",
      control: "number",
    },
    max: {
      description: "Valeur maximale.",
      control: "number",
    },
    value: {
      description: "Valeur courante (toujours contrôlé).",
      control: "number",
    },
    disabled: {
      description: "Désactive l'interaction.",
      control: "boolean",
    },
  },
  args: {
    min: 0,
    max: 100,
    value: 40,
  },
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Range>;

type Story = StoryObj<typeof meta>;

const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="w-80">
        <Range {...args} value={value} onChange={(event) => setValue(Number(event.target.value))} />
      </div>
    );
  },
};

const CustomBounds: Story = {
  name: "Bornes personnalisées (ex. prix 20-200€)",
  args: { min: 20, max: 200, value: 80 },
  render: (args) => {
    const [value, setValue] = useState(args.value);
    return (
      <div className="flex w-80 flex-col gap-2">
        <span className="text-sm font-semibold text-neutral-900">{value} €</span>
        <Range {...args} value={value} onChange={(event) => setValue(Number(event.target.value))} />
      </div>
    );
  },
};

const Disabled: Story = {
  args: { disabled: true },
};

export default meta;
export { CustomBounds, Default, Disabled };
