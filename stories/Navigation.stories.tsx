import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button, ChoiceChip, EmptyState, IconBox, Progress, Tabs } from "@recordair/ui-core";
import { CalendarDaysIcon, MicIcon, SearchIcon } from "@recordair/ui-core/icons";

const tabItems = [
  { id: "upcoming", label: "À venir" },
  { id: "past", label: "Passées" },
  { id: "cancelled", label: "Annulées" },
] as const;

/**
 * Navigation locale et retours d'état : `Tabs` (onglets contrôlés,
 * `activeId`/`onChange`), `ChoiceChip` (sélection à bascule, `selected` +
 * `icon` optionnelle), `Progress` (barre de progression, `value` 0-100).
 * `EmptyState` a sa propre page (Core/EmptyState) — montré ici seulement en
 * contexte, à la suite d'une recherche sans résultat.
 */
const meta = {
  title: "Core/Navigation/Tabs and states",
  parameters: { layout: "centered" },
} satisfies Meta;

type Story = StoryObj<typeof meta>;

const Catalog: Story = {
  render: function Catalog() {
    const [activeTab, setActiveTab] = useState("upcoming");
    const [selectedChip, setSelectedChip] = useState("recording");

    return (
      <div className="flex w-full max-w-2xl flex-col gap-8">
        <Tabs items={tabItems} activeId={activeTab} label="Réservations" onChange={setActiveTab} />
        <div className="flex flex-wrap gap-2">
          <ChoiceChip selected={selectedChip === "recording"} onClick={() => setSelectedChip("recording")} icon={<MicIcon className="size-4" />}>Enregistrement</ChoiceChip>
          <ChoiceChip selected={selectedChip === "rehearsal"} onClick={() => setSelectedChip("rehearsal")} icon={<CalendarDaysIcon className="size-4" />}>Répétition</ChoiceChip>
        </div>
        <div className="flex flex-col gap-2"><span className="text-sm font-semibold text-neutral-900">Profil complété à 72 %</span><Progress value={72} label="Profil complété à 72 pour cent" /></div>
        <EmptyState
          icon={<IconBox tone="neutral" size="lg" icon={<SearchIcon />} />}
          title="Aucun studio trouvé"
          description="Modifie tes filtres ou élargis la zone de recherche."
          action={<Button variant="secondary">Réinitialiser les filtres</Button>}
        />
      </div>
    );
  },
};

const TabsStory: Story = {
  name: "Tabs",
  render: () => <Tabs items={tabItems} activeId="upcoming" label="Réservations" onChange={() => undefined} />,
};

const ChoiceChipStory: Story = {
  name: "ChoiceChip",
  render: () => <ChoiceChip selected icon={<MicIcon className="size-4" />}>Enregistrement</ChoiceChip>,
};

const ProgressStory: Story = {
  name: "Progress",
  render: () => <div className="w-96"><Progress value={72} label="Profil complété à 72 pour cent" /></div>,
};

export default meta;
export { Catalog, ChoiceChipStory, ProgressStory, TabsStory };
