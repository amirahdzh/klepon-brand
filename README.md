# klepon-brand

Single source of design truth for KLEPON — colors, type scale, radii,
spacing, shadows, and brand assets, shared by the marketing site and the
Revit plugin. Edit `tokens.json`; nothing else.

## Structure

```
tokens.json    Hand-edited source of truth.
source/        Raw brand kit as delivered (logo, pattern, imagery). Read-only.
web/           Generated: tokens.css (Tailwind v4 @theme block) + web assets.
plugin/        Generated: KleponTokens.cs, KleponBrand.xaml + PNG assets.
scripts/       Generators: build-web.mjs, build-plugin.mjs, build-plugin-xaml.mjs.
```

## Making a change

1. Edit `tokens.json`.
2. Run the generator(s) that apply:
   ```bash
   node scripts/build-web.mjs
   node scripts/build-plugin.mjs
   node scripts/build-plugin-xaml.mjs
   ```
3. Commit `tokens.json` + the generated files together.
4. Update consumers:
   - `klepon-marketing`: `git submodule update --remote vendor/klepon-brand`, commit the pointer.
   - Plugin: not connected as a submodule (deliberate). Sync `AmaiTheme.xaml` by hand if a value drifts.
