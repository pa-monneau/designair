import { readdirSync, readFileSync } from "node:fs";
import { gzipSync } from "node:zlib";

const assetsDirectory = new URL("../storybook-static/assets/", import.meta.url);
const genericChunkBudget = 500_000;
const externalChunks = [
  { label: "Storybook preview", pattern: /^iframe-.*\.js$/, maxBytes: 1_300_000, maxGzipBytes: 400_000 },
  { label: "Storybook docs", pattern: /^DocsRenderer-.*\.js$/, maxBytes: 950_000, maxGzipBytes: 320_000 },
  { label: "Axe accessibility engine", pattern: /^axe-.*\.js$/, maxBytes: 650_000, maxGzipBytes: 190_000 },
];

const files = readdirSync(assetsDirectory, { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
  .map((entry) => entry.name);
const externalFiles = new Set();

for (const chunk of externalChunks) {
  const fileName = files.find((file) => chunk.pattern.test(file));
  if (!fileName) {
    throw new Error(`Budget Storybook : chunk externe introuvable (${chunk.label}).`);
  }

  externalFiles.add(fileName);
  const content = readFileSync(new URL(fileName, assetsDirectory));
  const gzipBytes = gzipSync(content).byteLength;

  if (content.byteLength > chunk.maxBytes || gzipBytes > chunk.maxGzipBytes) {
    throw new Error(
      `${chunk.label} dépasse son budget : ${content.byteLength} B brut / ${gzipBytes} B gzip.`,
    );
  }
}

const oversizedFirstPartyChunk = files
  .filter((file) => !externalFiles.has(file))
  .map((file) => ({ file, bytes: readFileSync(new URL(file, assetsDirectory)).byteLength }))
  .find(({ bytes }) => bytes > genericChunkBudget);

if (oversizedFirstPartyChunk) {
  throw new Error(
    `Chunk hors dépendance externe trop volumineux : ${oversizedFirstPartyChunk.file} (${oversizedFirstPartyChunk.bytes} B).`,
  );
}

console.log("Storybook bundle budgets: OK");
