#!/usr/bin/env node
// Generates plugin/KleponBrand.xaml from tokens.json. Run: node scripts/build-plugin-xaml.mjs
// Do not hand-edit plugin/KleponBrand.xaml — it's a build output.
//
// Key names match AMAI.Hydraulic.UI/Styles/AmaiTheme.xaml's EXISTING brush
// keys (confirmed against that file 2026-09-02) so this dictionary can be
// merged in and AmaiTheme.xaml's own hardcoded SolidColorBrush values
// swapped for StaticResource references into it, without renaming
// anything a XAML file already references.

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tokens = JSON.parse(readFileSync(join(root, "tokens.json"), "utf8"));

// AmaiTheme.xaml brush key -> tokens.json path. Confirmed by reading that
// file directly: every one of these hex values already matches the
// canonical token exactly except AmaiLightGrayBrush (#F1F1F1 there vs
// #F2F2F2 canonical — a real, small drift, not reconciled by this script).
const brushMap = [
  { key: "AmaiWhiteBrush", value: "#FFFFFFFF", note: "Plain white, not a brand token." },
  { key: "AmaiTealBrush", token: tokens.color.brand.navy },
  { key: "AmaiTealSoftBrush", token: tokens.color.brand.teal },
  { key: "AmaiOrangeBrush", token: tokens.color.brand.orange },
  { key: "AmaiTextBrush", token: tokens.color.brand.slate },
  { key: "AmaiMutedTextBrush", token: tokens.color.brand.teal },
  { key: "AmaiGreenBrush", token: tokens.color.brand.green },
];

function toArgbHex(hex) {
  const clean = hex.replace("#", "").toUpperCase();
  return `#FF${clean}`;
}

const lines = [];
lines.push('<!-- GENERATED FILE — do not hand-edit.');
lines.push(' Source: tokens.json — run `node scripts/build-plugin-xaml.mjs` to regenerate.');
lines.push('');
lines.push(' Key names match AmaiTheme.xaml\'s existing brushes, so that file can');
lines.push(' merge this in (<ResourceDictionary.MergedDictionaries>) and swap its');
lines.push(' own hardcoded SolidColorBrush values for StaticResource references');
lines.push(' here, instead of keeping a second hand-typed copy. Not wired in');
lines.push(' automatically — that edit needs someone who can build/verify WPF. -->');
lines.push('<ResourceDictionary xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"');
lines.push('                    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml">');
lines.push('');

for (const brush of brushMap) {
  const hex = brush.token ? toArgbHex(brush.token.value) : brush.value;
  const comment = brush.token?.role || brush.note;
  if (comment) lines.push(`    <!-- ${comment} -->`);
  lines.push(`    <SolidColorBrush x:Key="${brush.key}" Color="${hex}"/>`);
  lines.push('');
}

lines.push('</ResourceDictionary>');
lines.push('');

writeFileSync(join(root, "plugin", "KleponBrand.xaml"), lines.join("\n"));
console.log("Wrote plugin/KleponBrand.xaml");
