import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const storiesDirectory = join(import.meta.dirname, "..", "stories");
const publicIndexFiles = [
  join(import.meta.dirname, "..", "packages", "ui-core", "src", "index.ts"),
  join(import.meta.dirname, "..", "packages", "ui-patterns", "src", "index.ts"),
];
const nonComponentExports = new Set(["buttonClassName"]);

function storySources(directory: string): string {
  return readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const path = join(directory, entry.name);

      if (entry.isDirectory()) {
        return [storySources(path)];
      }

      return entry.name.endsWith(".stories.tsx") ? [readFileSync(path, "utf8")] : [];
    })
    .join("\n");
}

function exportedComponentNames(): string[] {
  return publicIndexFiles
    .flatMap((indexFile) => [...readFileSync(indexFile, "utf8").matchAll(/^export \{ (\w+) \}/gm)])
    .map((match) => match[1]!)
    .filter((name) => !nonComponentExports.has(name))
    .sort();
}

describe("public component coverage", () => {
  it("keeps every public component in an executed Storybook story", () => {
    const exportedComponents = exportedComponentNames();
    const allStories = storySources(storiesDirectory);
    const uncoveredComponents = exportedComponents.filter(
      (name) => !new RegExp(`\\b${name}\\b`).test(allStories),
    );

    expect(exportedComponents).toHaveLength(78);
    expect(uncoveredComponents).toEqual([]);
  });
});
