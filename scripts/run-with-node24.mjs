import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { spawnSync } from "node:child_process";

const targetScript = process.argv[2];
const node24Path = "/opt/homebrew/opt/node@24/bin/node";
const npmCli = process.env.npm_execpath;
const currentMajor = Number(process.versions.node.split(".")[0]);

if (!targetScript || !npmCli) {
  throw new Error("Usage interne : run-with-node24.mjs <script-npm>.");
}

const nodePath = currentMajor === 24 ? process.execPath : node24Path;

if (!existsSync(nodePath)) {
  throw new Error(
    "Node 24 est requis pour Storybook. Installe-le puis active-le avec `nvm use` (voir .nvmrc).",
  );
}

const result = spawnSync(nodePath, [npmCli, "run", targetScript], {
  env: {
    ...process.env,
    PATH: `${dirname(nodePath)}:${process.env.PATH}`,
  },
  stdio: "inherit",
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
