# Web logo assets

## Source and analysis

Source: `docs/brief/logo-file.jpeg`, a 1254 × 1254 JPEG with an opaque textured cream background. The identity combines a black serif F, wood-grain K, pendant lamp, chair, serif company name, divider, and the slogan “DESIGNING SPACES, CREATING LIFE”.

The full lockup suits large placements. Use the wordmark in narrow navigation areas and the monogram for small square placements. The slogan and furniture details lose legibility at favicon sizes; the monogram carries the identity there.

## Deliverables

Public URLs are relative to `apps/web/public`.

| URL | Use | Background |
| --- | --- | --- |
| `/brand/logo-full.png` | Complete lockup with slogan | Transparent |
| `/brand/logo-full.webp` | Lossless WebP of the full lockup | Transparent |
| `/brand/logo-mark.png` | FK monogram, lamp, and chair | Transparent |
| `/brand/logo-mark.webp` | Lossless WebP of the monogram | Transparent |
| `/brand/logo-wordmark.png` | Company name without monogram or slogan | Transparent |
| `/brand/logo-full-white.png` | Full lockup on dark backgrounds | Transparent |
| `/brand/logo-mark-white.png` | White monogram on dark backgrounds | Transparent |
| `/brand/logo-wordmark-white.png` | White wordmark on dark backgrounds | Transparent |
| `/favicon.ico` | Browser compatibility; 16, 32, and 48 px frames | Cream |
| `/favicon-16x16.png` | 16 px browser icon export | Cream |
| `/favicon-32x32.png` | 32 px browser icon | Cream |
| `/apple-touch-icon.png` | 180 px Apple touch icon | Cream |
| `/android-chrome-192x192.png` | 192 px manifest icon | Cream |
| `/android-chrome-512x512.png` | 512 px manifest icon | Cream |
| `/site.webmanifest` | Browser manifest and icon references | — |

Cream icon backgrounds (`#F7F1E9`) are intentional: they keep the dark monogram visible in both light and dark browser chrome. Manifest icons use `purpose: any`; they are not certified maskable icons. The manifest retains normal browser display and does not add an offline app.

The root route includes favicon, Apple touch icon, and manifest links. The shared navbar uses the original-color transparent monogram and wordmark, while the shared footer uses the full original-color transparent lockup. Both brand links return home. White variants are available as exports but are not used in either placement. `logo-assets-preview.png` shows the exports on light and dark backgrounds; those preview backgrounds are not baked into the logo files.

## Production notes

Generated with the built-in ImageGen tool, then cropped, resized, and exported with ImageMagick. Transparent PNG and WebP files have actual alpha, including internal negative space. White variants preserve alpha. The original JPEG remains unchanged.

This is an AI-cleaned raster reproduction, not an exact vector master. Minor changes to grain, letter outlines, and furniture details are possible. Use the original designer's vector artwork for exact brand reproduction or large-format print. No SVG was fabricated from the bitmap.

Render at the intended aspect ratio, set explicit image width and height to prevent layout shift, and provide descriptive alternative text when the logo supplies the accessible brand name. Avoid displaying above the exported pixel dimensions. Keep the full lockup large enough for its slogan to remain readable; use the wordmark or monogram below that size.

## Generation prompt

> Use case: background-extraction. Asset: production web logo extracted from the supplied FK Furniture & Interior JPEG. Remove the entire cream/beige paper background to genuine alpha transparency, including all negative spaces inside letters, between the pendant cord and monogram, and around chair. Preserve the original design with extreme fidelity: black serif F, wood-grain brown K, pendant lamp and chair; the exact original serif text 'Fk Furniture & Interior', divider line, and spaced slogan 'DESIGNING SPACES, CREATING LIFE'. Preserve relative layout, proportions, kerning, textures, details, colors, and exact spelling. Do not redesign, add, reinterpret, or replace typography. Remove background paper noise, beige edge halos, and cast shadows. Output one crisp high resolution complete logo lockup, tightly framed with a small transparent safe margin. No mockup, no checkerboard painted into the image, no additional elements.
