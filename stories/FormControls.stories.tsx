import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import {
  Checkbox,
  Field,
  Input,
  NativeSelect,
  Radio,
  SearchInput,
  Select,
  Textarea,
  Toggle,
} from "@recordair/ui-core";
import { MailIcon } from "@recordair/ui-core/icons";

/**
 * Contrôles de formulaire, toujours enveloppés dans `Field` (label + hint +
 * erreur) sauf `SearchInput`, `NativeSelect`, `Checkbox`, `Radio` et `Toggle`
 * qui gèrent leur propre libellé. `Select` est le picker stylé maison,
 * `NativeSelect` garde le `<select>` natif (menu système, meilleure
 * accessibilité mobile).
 */
const meta = {
  title: "Core/Forms/Overview",
  parameters: {
    layout: "centered",
  },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Catalog: Story = {
  render: () => (
    <form className="flex w-full max-w-lg flex-col gap-6 rounded-lg border border-neutral-200 bg-neutral-0 p-8">
      <Field label="Nom du studio" htmlFor="studio-name" hint="Visible publiquement.">
        <Input id="studio-name" defaultValue="Studio République" leadingIcon={<MailIcon aria-hidden className="size-4" />} />
      </Field>
      <Field label="Rechercher" htmlFor="search">
        <SearchInput id="search" placeholder="Studio, ville ou équipement" />
      </Field>
      <Field label="Ville" htmlFor="city">
        <Select id="city" options={["Lille", "Lyon", "Marseille", "Paris"]} />
      </Field>
      <Field label="Description" htmlFor="description" hint="Présente l’ambiance et les équipements.">
        <Textarea id="description" placeholder="Décris ton studio" />
      </Field>
      <fieldset className="flex flex-col gap-3">
        <legend className="mb-2 text-sm font-semibold text-neutral-900">Type de session</legend>
        <Radio name="session" label="Enregistrement" description="Voix et instruments" defaultChecked />
        <Radio name="session" label="Répétition" description="Groupe complet" />
      </fieldset>
      <Field label="Type" htmlFor="type">
        <NativeSelect id="type" defaultValue="recording">
          <option value="recording">Studio d’enregistrement</option>
          <option value="rehearsal">Studio de répétition</option>
        </NativeSelect>
      </Field>
      <label className="flex items-start gap-3 text-sm text-neutral-700">
        <Checkbox defaultChecked />
        J’accepte les conditions générales
      </label>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-neutral-900">Notifications email</span>
        <Toggle name="email" defaultChecked ariaLabel="Activer les notifications email" />
      </div>
    </form>
  ),
};

const FieldStory: Story = {
  name: "Field",
  render: () => (
    <div className="w-96"><Field label="Nom public" htmlFor="field-demo" hint="Visible sur ton profil."><Input id="field-demo" /></Field></div>
  ),
};

const InputStory: Story = {
  name: "Input",
  render: () => <div className="w-96"><Input aria-label="Adresse email" placeholder="artiste@recordair.com" leadingIcon={<MailIcon aria-hidden className="size-4" />} /></div>,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Adresse email" });
    await userEvent.type(input, "artiste@recordair.com");
    await expect(input).toHaveValue("artiste@recordair.com");
  },
};

const SearchInputStory: Story = {
  name: "SearchInput",
  render: () => <div className="w-96"><SearchInput aria-label="Rechercher un studio" placeholder="Studio, ville ou équipement" /></div>,
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("searchbox", { name: "Rechercher un studio" });
    await userEvent.type(input, "Lille");
    await expect(input).toHaveValue("Lille");
  },
};

const TextareaStory: Story = {
  name: "Textarea",
  render: () => <div className="w-96"><Textarea aria-label="Description" placeholder="Décris ton projet" /></div>,
  play: async ({ canvasElement }) => {
    const textarea = within(canvasElement).getByRole("textbox", { name: "Description" });
    await userEvent.type(textarea, "Session acoustique");
    await expect(textarea).toHaveValue("Session acoustique");
  },
};

const SelectStory: Story = {
  name: "Select",
  render: () => <div className="w-96"><Select aria-label="Ville" options={["Lille", "Lyon", "Marseille", "Paris"]} /></div>,
};

const NativeSelectStory: Story = {
  name: "NativeSelect",
  render: () => <div className="w-96"><NativeSelect aria-label="Type de studio"><option>Enregistrement</option><option>Répétition</option></NativeSelect></div>,
  play: async ({ canvasElement }) => {
    const select = within(canvasElement).getByRole("combobox", { name: "Type de studio" });
    await userEvent.selectOptions(select, "Répétition");
    await expect(select).toHaveValue("Répétition");
  },
};

const CheckboxStory: Story = {
  name: "Checkbox",
  render: () => <label className="flex items-center gap-3 text-sm"><Checkbox defaultChecked />Conditions acceptées</label>,
  play: async ({ canvasElement }) => {
    const checkbox = within(canvasElement).getByRole("checkbox", { name: "Conditions acceptées" });
    await userEvent.click(checkbox);
    await expect(checkbox).not.toBeChecked();
  },
};

const RadioStory: Story = {
  name: "Radio",
  render: () => <Radio name="format" label="Session studio" description="Réservation avec ingénieur son" defaultChecked />,
  play: async ({ canvasElement }) => {
    const radio = within(canvasElement).getByRole("radio", { name: /Session studio/ });
    await expect(radio).toBeChecked();
  },
};

const ToggleStory: Story = {
  name: "Toggle",
  render: () => <Toggle ariaLabel="Activer les notifications" defaultChecked />,
  play: async ({ canvasElement }) => {
    const toggle = within(canvasElement).getByRole("checkbox", { name: "Activer les notifications" });
    await userEvent.click(toggle);
    await expect(toggle).not.toBeChecked();
  },
};

export default meta;
export {
  Catalog,
  CheckboxStory,
  FieldStory,
  InputStory,
  NativeSelectStory,
  RadioStory,
  SearchInputStory,
  SelectStory,
  TextareaStory,
  ToggleStory,
};
