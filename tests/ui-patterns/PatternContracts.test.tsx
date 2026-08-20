import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ErrorState } from "../../packages/ui-patterns/src/ErrorState";
import { NotificationCard } from "../../packages/ui-patterns/src/NotificationCard";
import { Pagination } from "../../packages/ui-patterns/src/Pagination";
import { Stepper } from "../../packages/ui-patterns/src/Stepper";

const paginationLabels = {
  navigation: "Pagination",
  previous: "Page précédente",
  next: "Page suivante",
  page: (page: number) => `Page ${page}`,
  status: (current: number, total: number, results: number) => `${current}/${total}, ${results} résultats`,
};

describe("ui-patterns contracts", () => {
  it("keeps notification opening and deletion as distinct consumer actions", async () => {
    const user = userEvent.setup();
    const onOpen = vi.fn();
    const onDelete = vi.fn();
    render(
      <NotificationCard
        notification={{ id: "notification-42", title: "Nouvelle réservation", read: false }}
        unreadLabel="Non lue"
        deleteLabel="Supprimer"
        onOpen={onOpen}
        onDelete={onDelete}
      />,
    );

    expect(screen.getByLabelText("Non lue")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /Nouvelle réservation/ }));
    await user.click(screen.getByRole("button", { name: "Supprimer" }));

    expect(onOpen).toHaveBeenCalledWith("notification-42");
    expect(onDelete).toHaveBeenCalledWith("notification-42");
  });

  it("renders pagination boundaries, current page and localized status", () => {
    render(
      <Pagination
        currentPage={8}
        totalPages={12}
        totalResults={145}
        hrefForPage={(page) => `/studios?page=${page}`}
        labels={paginationLabels}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Page 8" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Page précédente" })).toHaveAttribute("href", "/studios?page=7");
    expect(screen.getByText("8/12, 145 résultats")).toBeInTheDocument();
  });

  it("preserves the action type chosen by an error state consumer", async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(
      <ErrorState
        code="500"
        icon={<span />}
        title="Indisponible"
        description="Réessaie dans un instant."
        actions={[
          { label: "Réessayer", onClick: onRetry },
          { label: "Accueil", href: "/" },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Réessayer" }));
    expect(onRetry).toHaveBeenCalledOnce();
    expect(screen.getByRole("link", { name: "Accueil" })).toHaveAttribute("href", "/");
  });

  it("marks only the active step and exposes completed steps to assistive tech", () => {
    render(
      <Stepper
        ariaLabel="Réservation"
        completedStepLabel="Étape terminée"
        currentStep={2}
        steps={[
          { id: "date", label: "Date" },
          { id: "payment", label: "Paiement" },
          { id: "done", label: "Confirmation" },
        ]}
      />,
    );

    expect(screen.getByRole("list", { name: "Réservation" })).toBeInTheDocument();
    expect(screen.getByText("Paiement").closest("li")).toHaveAttribute("aria-current", "step");
    expect(screen.getByLabelText("Étape terminée")).toBeInTheDocument();
  });
});
