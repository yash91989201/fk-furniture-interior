---
name: FK Editorial
description: Welcoming, formal editorial design for FK Furniture & Interior.
colors:
  ice-silver: "#DDE3E8"
  aubergine: "#3A0F34"
  marigold: "#EAAA00"
typography:
  display:
    fontFamily: "EB Garamond Variable, serif"
    fontWeight: 500
  body:
    fontFamily: "Instrument Sans Variable, sans-serif"
    fontWeight: 400
rounded:
  base: "0.25rem"
---

# FK Editorial design foundations

## Overview

The approved direction is editorial, welcoming, formal, and professional. Preserve the approved nine-section homepage composition and interactions when implementation begins. The homepage itself is not implemented by this foundation change.

Starting preset: [shadcn/create b8Al5ydee8](https://ui.shadcn.com/create?preset=b8Al5ydee8), Base UI / Sera / Mist / Amber / Lucide, with EB Garamond headings and Instrument Sans body text. The preset is provenance, not the complete customized theme. Reapplying it resets brand customizations.

## Colors

Ice silver is the main light surface, aubergine is text and secondary actions, and marigold is the primary action color with aubergine text. Supporting surfaces, muted text, borders, focus rings, and a matching dark theme are defined in `packages/ui/src/styles/globals.css`. Its OKLCH values are the executable source of truth; the three hex swatches above identify the approved brand primitives.

Light body contrast is 12.50:1; primary button contrast is 7.90:1; muted text on muted surfaces is 5.36:1. Preserve distinct destructive colors; do not use marigold as an error color. Accent tokens represent hover and selection surfaces, rather than arbitrary decoration.

## Typography

EB Garamond medium gives headings their editorial voice; italic is available for occasional phrase emphasis. Instrument Sans carries body, navigation, labels, and controls. Fonts are self-hosted through Fontsource variable packages. Shared buttons and labels use sentence case; card and empty-state headings retain the serif family without forced uppercase. Homepage sections run role ladders rather than one-off sizes: the hero card scales its display, body, and metadata roles together from one fluid ramp, with leading and spacing from the same scale; dense sections keep their own compact ladders. Shared controls keep their control-role label size inside the hero.

## Layout

Preserve the approved editorial prototype as the future homepage reference. Shared token customization does not prescribe a generic card-based page layout.

The hero is one viewport tall at every size, never padded with a fixed-height floor. When viewport height drops below 38rem (landscape phones, short windows) the card switches to a compact ramp and tighter padding so the whole card, caption included, stays above the fold; below 22rem wide the card narrows its padding and display step. Coarse pointers get 44px-tall hero actions.

## Elevation & Depth

Use restrained borders and tonal surfaces. The approved scrolled navigation glass effect belongs to that component; it is not a universal surface style.

## Shapes

Sera controls remain square. The base radius token is 4px for components that consume the radius scale. Photo masks and testimonial cards may retain their approved shapes independently.

## Components

Customize existing shared components and semantic variants in `packages/ui`; compose homepage sections in `apps/web`. Default buttons consume primary/marigold, while secondary buttons consume aubergine. Use semantic color utilities rather than per-instance brand color overrides. The web document defaults to light; dark tokens remain available for explicitly dark surfaces/themes.

## Do's and Don'ts

- Do preserve keyboard focus, readable contrast, responsive text, and reduced-motion behavior.
- Do verify typography with actual font files rather than the image-generated concept boards.
- Don't reapply the stock preset over customized tokens without reviewing the diff.
- Don't invent client quotations, project claims, or proof metrics.
