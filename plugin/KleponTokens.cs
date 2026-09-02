// GENERATED FILE — do not hand-edit.
// Source: tokens.json — run `node scripts/build-plugin.mjs` to regenerate.

using System.Windows.Media;

namespace Klepon.Brand
{
    /// <summary>
    /// KLEPON design tokens, generated from the shared klepon-brand repo's
    /// tokens.json. This is the plugin-side counterpart of the marketing
    /// site's web/tokens.css — same source, same values.
    /// </summary>
    public static class KleponColors
    {
        /// <summary>= color.neutral.bg. Duplicate-named on purpose: the website's markup uses the utility class bg-brand-bg (not bg-bg) in several places, so this alias has to exist under this exact key for that class to keep resolving.</summary>
        public static readonly Color BrandBg = Color.FromRgb(242, 242, 242); // #F2F2F2
        /// <summary>Primary ink. Body text, headings, and — at full opacity as a fill — the dark 'premium panel' surface (footer, CTA banners).</summary>
        public static readonly Color BrandNavy = Color.FromRgb(0, 46, 58); // #002E3A
        /// <summary>Lighter navy step, used sparingly (e.g. Nav.astro hover states).</summary>
        public static readonly Color BrandNavy700 = Color.FromRgb(10, 63, 77); // #0A3F4D
        /// <summary>The one accent. Literal fill color in the real logo file (klepon-mark / klepon-logo) — not a guess. Anchors ramp step 600.</summary>
        public static readonly Color BrandGreen = Color.FromRgb(17, 164, 110); // #11A46E

        public static readonly Color BrandGreen100 = Color.FromRgb(230, 248, 239); // #E6F8EF

        public static readonly Color BrandGreen200 = Color.FromRgb(194, 238, 218); // #C2EEDA

        public static readonly Color BrandGreen300 = Color.FromRgb(143, 223, 185); // #8FDFB9

        public static readonly Color BrandGreen400 = Color.FromRgb(85, 203, 146); // #55CB92

        public static readonly Color BrandGreen500 = Color.FromRgb(43, 184, 122); // #2BB87A
        /// <summary>= brand.green. Large fills: buttons, icon badges.</summary>
        public static readonly Color BrandGreen600 = Color.FromRgb(17, 164, 110); // #11A46E
        /// <summary>Deliberately darker than a straight tonal step — this is the text-sized green (body/label/links) on a light ground. A literal mid-green step fails WCAG AA there; 700 passes.</summary>
        public static readonly Color BrandGreen700 = Color.FromRgb(12, 125, 85); // #0C7D55

        public static readonly Color BrandGreen800 = Color.FromRgb(9, 94, 64); // #095E40

        public static readonly Color BrandGreen900 = Color.FromRgb(6, 67, 45); // #06432D
        /// <summary>Secondary accent, not yet wired into either consumer. General-purpose (data viz, illustration) — not a semantic error/warning color.</summary>
        public static readonly Color BrandSlate = Color.FromRgb(48, 56, 61); // #30383D
        /// <summary>Secondary accent, not yet wired into either consumer.</summary>
        public static readonly Color BrandTeal = Color.FromRgb(64, 98, 108); // #40626C
        /// <summary>Secondary accent, not yet wired into either consumer.</summary>
        public static readonly Color BrandOrange = Color.FromRgb(217, 85, 39); // #D95527
        /// <summary>Secondary accent — sparing highlight moments (kicker underlines, single-word emphasis).</summary>
        public static readonly Color BrandAmber = Color.FromRgb(217, 161, 39); // #D9A127

        public static readonly Color Bg = Color.FromRgb(242, 242, 242); // #F2F2F2
        public static readonly Color Surface = Color.FromRgb(233, 233, 234); // #E9E9EA
    }

    public static class KleponType
    {
        public const string FontFamily = "Urbanist";
        public const int HeadingWeight = 800;
        public const int BodyWeight = 400;
    }

    public static class KleponRadius
    {
        public const double Sm = 2;
        public const double Md = 4;
        public const double Lg = 7;
        public const double R2xl = 16;
        public const double R3xl = 22;
        public const double Full = 9999;
    }
}
