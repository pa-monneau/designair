import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Accordion } from "../../packages/ui-core/src/Accordion";
import { ChoiceChip } from "../../packages/ui-core/src/ChoiceChip";
import { MenuSelect } from "../../packages/ui-core/src/MenuSelect";
import { NavigationList } from "../../packages/ui-core/src/NavigationList";
import { Range } from "../../packages/ui-core/src/Range";
import { SuggestionListItem } from "../../packages/ui-core/src/SuggestionListItem";
import { Tabs } from "../../packages/ui-core/src/Tabs";
import { ThemeToggle } from "../../packages/ui-core/src/ThemeToggle";
import { Toast } from "../../packages/ui-core/src/Toast";

describe("interactive ui-core contracts", () => {
  it("keeps a single accordion panel open by default", async () => {
    const user = userEvent.setup();
    render(
      <Accordion
        items={[
          { id: "first", title: "Premier", content: "Contenu 1" },
          { id: "second", title: "Second", content: "Contenu 2" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Premier" }));
    expect(screen.getByRole("region", { name: "Premier" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Second" }));
    expect(screen.getByRole("button", { name: "Premier" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("region", { name: "Second" })).toBeVisible();
  });

  it("forwards selection actions without changing controlled state itself", async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    const onToggle = vi.fn();
    const onSelect = vi.fn();

    render(
      <>
        <ChoiceChip selected>Disponible</ChoiceChip>
        <Tabs
          label="Sections"
          activeId="overview"
          onChange={onTabChange}
          items={[
            { id: "overview", label: "Vue d’ensemble" },
            { id: "reviews", label: "Avis" },
          ]}
        />
        <ThemeToggle theme="light" onToggle={onToggle} />
        <MenuSelect
          label="Trier"
          options={[{ id: "recent", label: "Plus récent" }]}
          onSelect={onSelect}
        />
      </>,
    );

    expect(screen.getByRole("button", { name: "Disponible" })).toHaveAttribute("aria-pressed", "true");
    await user.click(screen.getByRole("tab", { name: "Avis" }));
    await user.click(screen.getByRole("button", { name: "Passer en thème sombre" }));
    await user.click(screen.getByRole("button", { name: "Trier" }));
    await user.click(screen.getByRole("menuitemradio", { name: "Plus récent" }));

    expect(onTabChange).toHaveBeenCalledWith("reviews");
    expect(onToggle).toHaveBeenCalledOnce();
    expect(onSelect).toHaveBeenCalledWith("recent");
    expect(screen.getByRole("button", { name: "Trier" })).toHaveFocus();
  });

  it("normalizes range values and preserves navigation matching semantics", () => {
    render(
      <>
        <Range aria-label="Budget" min={10} max={50} value={100} />
        <NavigationList
          label="Navigation"
          activeHref="/studios/42"
          items={[
            { href: "/studios", label: "Studios" },
            { href: "/bookings", label: "Réservations", exact: true },
          ]}
        />
      </>,
    );

    expect(screen.getByRole("slider", { name: "Budget" })).toHaveValue("50");
    expect(screen.getByRole("link", { name: "Studios" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Réservations" })).not.toHaveAttribute("aria-current");
  });

  it("does not emit selection events from disabled suggestions", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(
      <>
        <SuggestionListItem icon={<span />} title="Paris" onClick={onSelect} />
        <SuggestionListItem icon={<span />} title="Lyon" onClick={onSelect} disabled />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "Paris" }));
    expect(onSelect).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Lyon" })).toBeDisabled();
  });

  it("exposes the toast role and lets the consumer close it", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Toast open variant="error" message="Échec" closeLabel="Fermer" onClose={onClose} duration={0} />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Échec");
    await user.click(screen.getByRole("button", { name: "Fermer" }));
    expect(onClose).toHaveBeenCalledOnce();
  });
});
