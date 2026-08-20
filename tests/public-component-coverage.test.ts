import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const storiesDirectory = join(import.meta.dirname, "..", "stories");
const publicIndexFiles = [
  join(import.meta.dirname, "..", "packages", "ui-core", "src", "index.ts"),
  join(import.meta.dirname, "..", "packages", "ui-patterns", "src", "index.ts"),
];
const nonComponentExports = new Set(["buttonClassName"]);

type StorySource = {
  fileName: string;
  source: string;
};

function storyFiles(directory: string): StorySource[] {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const entryPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        return storyFiles(entryPath);
      }

      return entry.name.endsWith(".stories.tsx")
        ? [{ fileName: entry.name, source: readFileSync(entryPath, "utf8") }]
        : [];
    });
}

function exportedComponentNames(): string[] {
  return publicIndexFiles
    .flatMap((indexFile) => [...readFileSync(indexFile, "utf8").matchAll(/^export \{ (\w+) \}/gm)])
    .map((match) => match[1]!)
    .filter((name) => !nonComponentExports.has(name))
    .sort();
}

function importedComponentAliases(source: string, componentNames: ReadonlySet<string>): Map<string, string> {
  const aliases = new Map<string, string>();
  const packageImports = source.matchAll(
    /^import[ \t]*\{([^}]*)\}[ \t]*from[ \t]*"@recordair\/(?:ui-core|ui-patterns)"/gm,
  );

  for (const packageImport of packageImports) {
    for (const importedEntry of packageImport[1]!.split(",")) {
      const match = importedEntry.trim().match(/^(\w+)(?:\s+as\s+(\w+))?$/);

      if (match && componentNames.has(match[1]!)) {
        aliases.set(match[1]!, match[2] ?? match[1]!);
      }
    }
  }

  return aliases;
}

function isRenderedByStory(source: string, localName: string): boolean {
  const escapedName = localName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  return new RegExp(`<${escapedName}(?=[\\s/>])`).test(source)
    || new RegExp(`\\bcomponent\\s*:\\s*${escapedName}\\b`).test(source);
}

describe("public component coverage", () => {
  it("keeps every public component in an executed Storybook story", () => {
    const exportedComponents = exportedComponentNames();
    const componentNames = new Set(exportedComponents);
    const renderedComponents = new Set<string>();

    for (const { source } of storyFiles(storiesDirectory)) {
      for (const [componentName, localName] of importedComponentAliases(source, componentNames)) {
        if (isRenderedByStory(source, localName)) {
          renderedComponents.add(componentName);
        }
      }
    }

    const uncoveredComponents = exportedComponents.filter((name) => !renderedComponents.has(name));

    expect(exportedComponents).toHaveLength(78);
    expect(uncoveredComponents).toEqual([]);
  });
});
