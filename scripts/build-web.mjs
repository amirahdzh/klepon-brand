#!/usr/bin/env node
// Generates web/tokens.css from tokens.json. Run: node scripts/build-web.mjs
// Do not hand-edit web/tokens.css — it's a build output.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

const lines = [];
lines.push("/* GENERATED FILE — do not hand-edit.");
lines.push(" * Source: tokens.json — run `node scripts/build-web.mjs` to regenerate.");
lines.push(" *");
lines.push(" * Written as a Tailwind CSS v4 @theme block (the only current web");
lines.push(" * consumer, klepon-marketing, is Tailwind v4) — @import this file");
lines.push(" * before any local @theme block; Tailwind merges multiple @theme");
lines.push(" * blocks in a build. A non-Tailwind consumer can still read these as");
lines.push(" * plain custom properties (`@theme` behaves like `:root` for that");
lines.push(" * purpose outside of Tailwind's own build step), but won't get");
lines.push(" * Tailwind's automatic utility-class generation from them. */");
lines.push("");
lines.push("@theme {");

for (const [key, token] of Object.entries(tokens.color.brand)) {
  lines.push(`  --color-brand-${key}: ${token.value};`);
}
for (const [key, token] of Object.entries(tokens.color.neutral)) {
  lines.push(`  --color-${key}: ${token.value};`);
}

lines.push("");
lines.push(`  --font-brand: "${tokens.typography.fontFamily.brand}", ${tokens.typography.fontFamily.fallback.join(", ")};`);

lines.push("");
for (const [key, token] of Object.entries(tokens.typography.scale)) {
  lines.push(`  --text-${key}: ${token.value};`);
}

lines.push("");
for (const [key, token] of Object.entries(tokens.radius)) {
  lines.push(`  --radius-${key}: ${token.value};`);
}

lines.push("");
lines.push(`  --spacing: ${tokens.spacing.base.value};`);

lines.push("");
for (const [key, token] of Object.entries(tokens.shadow)) {
  lines.push(`  --shadow-${key}: ${token.value};`);
}

lines.push("}");
lines.push("");

const out = lines.join("\n");
writeFileSync(join(root, "web", "tokens.css"), out);
console.log("Wrote web/tokens.css");
