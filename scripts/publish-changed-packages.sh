#!/usr/bin/env bash
set -euo pipefail

# Publie uniquement les packages modifiés entre deux commits Git.
# Exécuté par GitHub Actions après un push sur main via npm trusted publishing.

BASE_SHA="${1:?Usage: publish-changed-packages.sh <base-sha> <head-sha>}"
HEAD_SHA="${2:?Usage: publish-changed-packages.sh <base-sha> <head-sha>}"
DRY_RUN="${DRY_RUN:-0}"

workspaces=("theme-recordair" "ui-core" "ui-patterns" "media-utils")
changed_files="$(git diff --name-only "$BASE_SHA" "$HEAD_SHA")"
packages_to_publish=()

run() {
  echo "+ $*"
  if [ "$DRY_RUN" = "0" ]; then
    "$@"
  fi
}

for workspace in "${workspaces[@]}"; do
  if grep -q "^packages/${workspace}/" <<<"$changed_files"; then
    packages_to_publish+=("$workspace")
  fi
done

if [ "${#packages_to_publish[@]}" -eq 0 ]; then
  echo "Aucun package publiable modifié."
  exit 0
fi

printf 'Packages à publier : %s\n' "${packages_to_publish[*]}"

run npm run typecheck
run npm run build

for workspace in "${packages_to_publish[@]}"; do
  run npm version patch --workspace="@recordair/${workspace}" --no-git-tag-version
done

run npm install --package-lock-only --ignore-scripts

for workspace in "${packages_to_publish[@]}"; do
  run npm publish "./packages/${workspace}" --access public --tag latest
done

run git config user.name "github-actions[bot]"
run git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
run git add package.json package-lock.json packages/*/package.json
run git commit -m "chore(release): publie ${packages_to_publish[*]} [skip ci]"
run git push
