import type { Preview } from "@storybook/react-vite";
import * as iconExports from "@recordair/ui-core/icons";
import "../stories/storybook.css";

/**
 * Les icônes sont des ré-exports aliasés de lucide-react (`Mail as MailIcon`) :
 * le nom interne d'un composant reste celui de lucide, donc le code source
 * généré par Storybook afficherait `<Mail />` alors que l'export public — et
 * donc l'import à écrire — est `MailIcon`. Copier tel quel donnerait du code
 * qui ne compile pas.
 *
 * La correspondance est reconstruite ici depuis les exports réels plutôt que
 * codée en dur, pour rester juste quand une icône est ajoutée. Le renommage
 * est fait au niveau de l'affichage seulement : muter `displayName` dans le
 * package publié ajouterait un side-effect au chargement du module d'icônes
 * et casserait son tree-shaking chez les consommateurs.
 */
const exportedNameByInternalName = new Map<string, string>();

for (const [exportedName, exported] of Object.entries(iconExports)) {
  if (typeof exported !== "function" && typeof exported !== "object") continue;
  if (exported === null) continue;

  const candidate = exported as { displayName?: string; name?: string; render?: { name?: string } };
  const internalName = candidate.displayName ?? candidate.render?.name ?? candidate.name;

  if (internalName && internalName !== exportedName) {
    exportedNameByInternalName.set(internalName, exportedName);
  }
}

/** Remplace les noms internes d'icônes par leur nom d'export public dans le code affiché. */
const useExportedIconNames = (code: string): string =>
  code.replace(/<(\/?)([A-Z][A-Za-z0-9]*)/g, (match, slash: string, name: string) => {
    const exportedName = exportedNameByInternalName.get(name);
    return exportedName ? `<${slash}${exportedName}` : match;
  });

const preview: Preview = {
  tags: ["autodocs"],

  parameters: {
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundations",
          "Core",
          ["Actions", "Forms", "Feedback", "Data display", "Navigation", "Layout"],
          "Patterns",
          "Record'air specific",
        ],
      },
    },
    docs: {
      canvas: {
        sourceState: "shown",
      },
      source: {
        type: "dynamic",
        transform: useExportedIconNames,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "error",
    },
    backgrounds: {
      options: {
        page: { name: "page", value: "#fafafa" },
        white: { name: "white", value: "#ffffff" },
        inverted: { name: "inverted", value: "#0f0f1a" }
      }
    },
  },

  initialGlobals: {
    backgrounds: {
      value: "page"
    }
  }
};

export default preview;
