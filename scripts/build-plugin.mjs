#!/usr/bin/env node
// Generates plugin/KleponTokens.cs from tokens.json. Run: node scripts/build-plugin.mjs
// Do not hand-edit plugin/KleponTokens.cs — it's a build output.
//
// Written against System.Windows.Media.Color (WPF), the common case for a
// Revit add-in's own dialogs/ribbon UI. If the plugin's UI layer is WinForms
// instead, swap the `using` and the Color.FromRgb calls for
// System.Drawing.Color.FromArgb — the hex constants below are framework-
// agnostic either way.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

function pascalCase(key) {
  const cased = key
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
  // C# identifiers can't start with a digit (radius keys "2xl"/"3xl").
  return /^[0-9]/.test(cased) ? `R${cased}` : cased;
}

function hexToRgbComponents(hex) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

const lines = [];
lines.push("// GENERATED FILE — do not hand-edit.");
lines.push("// Source: tokens.json — run `node scripts/build-plugin.mjs` to regenerate.");
lines.push("");
lines.push("using System.Windows.Media;");
lines.push("");
lines.push("namespace Klepon.Brand");
lines.push("{");
lines.push("    /// <summary>");
lines.push("    /// KLEPON design tokens, generated from the shared klepon-brand repo's");
lines.push("    /// tokens.json. This is the plugin-side counterpart of the marketing");
lines.push("    /// site's web/tokens.css — same source, same values.");
lines.push("    /// </summary>");
lines.push("    public static class KleponColors");
lines.push("    {");

function emitColorGroup(groupName, group) {
  for (const [key, token] of Object.entries(group)) {
    if (typeof token.value !== "string" || !token.value.startsWith("#")) continue;
    const { r, g, b } = hexToRgbComponents(token.value);
    const name = pascalCase(`${groupName}-${key}`);
    const roleComment = token.role ? `        /// <summary>${token.role}</summary>\n` : "";
    lines.push(roleComment.trimEnd());
    lines.push(
      `        public static readonly Color ${name} = Color.FromRgb(${r}, ${g}, ${b}); // ${token.value}`,
    );
  }
}

emitColorGroup("Brand", tokens.color.brand);
lines.push("");
lines.push(`        public static readonly Color Bg = Color.FromRgb(${hexToRgbComponents(tokens.color.neutral.bg.value).r}, ${hexToRgbComponents(tokens.color.neutral.bg.value).g}, ${hexToRgbComponents(tokens.color.neutral.bg.value).b}); // ${tokens.color.neutral.bg.value}`);
lines.push(`        public static readonly Color Surface = Color.FromRgb(${hexToRgbComponents(tokens.color.neutral.surface.value).r}, ${hexToRgbComponents(tokens.color.neutral.surface.value).g}, ${hexToRgbComponents(tokens.color.neutral.surface.value).b}); // ${tokens.color.neutral.surface.value}`);

lines.push("    }");
lines.push("");
lines.push("    public static class KleponType");
lines.push("    {");
lines.push(`        public const string FontFamily = "${tokens.typography.fontFamily.brand}";`);
lines.push(`        public const int HeadingWeight = ${tokens.typography.heading.fontWeight};`);
lines.push(`        public const int BodyWeight = ${tokens.typography.body.fontWeight};`);
lines.push("    }");
lines.push("");
lines.push("    public static class KleponRadius");
lines.push("    {");
for (const [key, token] of Object.entries(tokens.radius)) {
  const name = pascalCase(key);
  const px = parseFloat(token.value);
  lines.push(`        public const double ${name} = ${Number.isFinite(px) ? px : 9999};`);
}
lines.push("    }");
lines.push("}");
lines.push("");

writeFileSync(join(root, "plugin", "KleponTokens.cs"), lines.join("\n"));
console.log("Wrote plugin/KleponTokens.cs");
