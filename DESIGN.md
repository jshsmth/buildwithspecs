---
name: "Build with Specs"
description: "An engineering field guide in warm paper, near-black ink, and violet annotations."
colors:
  paper: "#f7f5ef"
  surface: "#fffefa"
  ink: "#262820"
  muted: "#66685d"
  line: "#d9d9ce"
  violet: "#65508c"
  violet-dark: "#4c376f"
  lavender: "#eee9f4"
  sage: "#e8eade"
  white: "#fff"
  workbench: "#eeeee5"
  code-surface: "#f2f1eb"
  closing-button: "#352640"
  closing-button-hover: "#4a345b"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(52px, 6.3vw, 83px)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "clamp(36px, 4vw, 52px)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "\"DM Sans\", sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: 1.35
    letterSpacing: "-0.3px"
  body:
    fontFamily: "\"DM Sans\", sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  reading:
    fontFamily: "\"DM Sans\", sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "\"DM Sans\", sans-serif"
    fontSize: "12px"
    fontWeight: 400
    letterSpacing: "0.08em"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.9
rounded:
  document: "0"
  code: "2px"
  button: "4px"
spacing:
  compact: "12px"
  code-inset: "16px"
  callout-inset: "20px"
  group: "24px"
  document-inset: "28px"
  workbench-inset: "32px"
  gutter: "40px"
  section-mobile: "64px"
  section: "100px"
components:
  button-primary:
    backgroundColor: "{colors.violet}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "14px 22px"
  button-primary-hover:
    backgroundColor: "{colors.violet-dark}"
    textColor: "{colors.white}"
  button-closing:
    backgroundColor: "{colors.closing-button}"
    textColor: "{colors.white}"
    rounded: "{rounded.button}"
    padding: "14px 22px"
  button-closing-hover:
    backgroundColor: "{colors.closing-button-hover}"
    textColor: "{colors.white}"
  text-link:
    textColor: "{colors.ink}"
    padding: "5px 0"
  navigation:
    textColor: "{colors.ink}"
  stage-selector:
    textColor: "{colors.ink}"
    padding: "20px 16px"
  stage-selector-selected:
    backgroundColor: "{colors.lavender}"
    textColor: "{colors.violet-dark}"
  artifact:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.document}"
  repository-map:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
    rounded: "{rounded.document}"
    padding: "24px 28px"
  skill-disclosure:
    textColor: "{colors.ink}"
    padding: "25px 0"
---

# Design System: Build with Specs

## Overview

**Creative North Star: "The Engineering Field Guide"**

The engineering field guide makes technical material feel readable and inspectable. Warm paper, near-black ink, editorial serif headings, and quiet violet annotations frame real document structures. Keep the Build with Specs name and ghost mark.

Generous outer spacing surrounds compact working material. Fine rules, unboxed reading sections, and square document surfaces establish hierarchy; the interactive artifact viewer is the signature pattern. Motion is brief and tied to a change of content.

**Key Characteristics:**

- Editorial headings with practical sans-serif reading text.
- Paper surfaces, fine rules, and restrained violet emphasis.
- Inspectable documents with accessible, progressively enhanced interactions.

This is the implemented system for the home and setup pages. `src/styles/site.css` is the ordered entry point for the styles in `src/styles/`; the frontmatter records its reusable values. The sidecar's synthesized tonal ramps are palette previews, not additional shipping tokens.

## Colors

Warm, slightly green neutrals balance a restrained violet accent.

### Primary

- **Violet** (`violet`): primary actions, italic emphasis, annotations, and selected-stage rules. **Deep violet** (`violet-dark`) supplies hover and selected text.
- **Lavender** (`lavender`): selected and hovered stages, and setup callouts.
- **Closing plum** (`closing-button`, `closing-button-hover`): the existing darker action variant on the closing lavender band. White is reserved for button text.

### Neutral

- **Warm paper** (`paper`): page canvas. **Document paper** (`surface`): artifact and verification sheets.
- **Near-black ink** (`ink`): headings and primary text. **Muted ink** (`muted`): supporting prose and metadata.
- **Fine rule** (`line`): boundaries and dividers. **Workbench paper** (`workbench`) and **code paper** (`code-surface`): nested reading surfaces.
- **Sage paper** (`sage`): the repository map, a quiet contextual surface rather than a second action color.

**The Annotation Rule.** Use violet for actions, selected stages, and editorial emphasis; keep ordinary reading text in ink or muted ink.

## Typography

Self-hosted Newsreader supplies regular editorial headings and italic annotations, with Georgia and serif fallbacks. Self-hosted DM Sans supplies body text, controls, and document titles. System monospace supplies paths, commands, and numbered stages. Fonts use `font-display: swap`.

The frontmatter defines the home display, section headline, artifact title, body, reading, label, and code roles. This is an observed hierarchy, not a fixed-ratio scale. Labels with tracked lettering are uppercase metadata, not all small text.

Home display type changes to `clamp(45px, 8.3vw, 62px)` at the mobile breakpoint and to 42px on the smallest screens. Setup display type uses `clamp(48px, 6vw, 72px)` and 50px on mobile. Section-specific headings remain editorial; document headings remain sans-serif. Keep introductory prose bounded (535px on home; 630px on setup).

## Layout

The shared container is centered, capped at 1184px, with 40px gutters. Gutters reduce to 28px at 1000px, 22px at 760px, and 16px at 370px. Section rhythm changes from the frontmatter's desktop spacing to its mobile spacing at 760px. At 1600px and above, the home hero receives more vertical space.

Desktop pairs reading and evidence in unequal or equal columns, with generous gaps. At 760px and below, major paired sections stack, document key/value rows become single-column, and the footer wraps. Avoid a global card grid.

The workbench uses a six-column stage rail and a two-column explanation/document panel; mobile uses a three-column, two-row rail above the document. Setup uses a sticky 220px contents column and a reading column capped at 760px; the contents column narrows at 1000px and becomes a wrapping, non-sticky row at 760px.

## Elevation & Depth

There are no box shadows on these pages. Tonal paper layers, fine borders, and whitespace establish depth. The verification sheet alone has a one-degree desktop rotation and a violet top rule; mobile removes the rotation.

**The Document Rule.** Use tonal surfaces and fine rules to distinguish documents; do not add drop shadows to the current flat system.

## Shapes

Documents, callouts, and repository maps are square. Only code blocks and buttons receive the small radii in the frontmatter. Fine one-pixel rules separate content; selected-stage underlines and the verification sheet's top edge use two pixels. Icons are spare inline SVG strokes; preserve the existing ghost identity.

## Components

### Buttons and text links

Primary actions are compact violet rectangles with white text, medium sans-serif labels, and a trailing arrow or download icon. They have a minimum height of 50px and darken on hover over 0.2s. The closing action uses the plum variant. Mobile reduces button padding to 13px 18px and labels to 12px; the smallest breakpoint reduces horizontal padding to 14px.

Secondary actions are underlined text links, not filled buttons. Hover strengthens their bottom rule and darkens text. All links, buttons, summaries, and focusable panels use a two-pixel violet focus outline with a five-pixel offset.

### Navigation

The masthead pairs the ghost wordmark with text navigation and a ruled starter-kit link. At 760px, only the starter-kit link remains beside the brand. Footer links wrap and gain an underline on hover. Setup's contents links follow the responsive behavior described in Layout; there is no implemented active-section tracking.

### Artifact viewer

The stage rail uses monospace numbers, sans-serif labels, and lavender selection with a violet bottom rule. Selecting a stage updates both its explanation and document. Enhanced tabs use roving focus, Left/Right arrows, Home/End, and Space; the initial URL fragment may select a panel. Without JavaScript, the links point to all six visible sections.

Documents have a ruled filename bar, square paper surface, sans-serif title, key/value rows, optional code block, and italic violet note. Body padding follows the document inset on desktop, reduces at the middle breakpoint, and becomes 22px 18px on mobile. The filename wraps; the optional file-type label disappears on mobile.

Panel entry settles over 0.28s with `cubic-bezier(0.16, 1, 0.3, 1)`, moving four pixels while sharpening from a one-pixel blur. Reduced motion disables animation, transitions, and smooth scrolling.

### Reading containers and disclosures

The repository map uses sage paper, monospace paths, a fine tree rule, and aligned explanations. Verification uses a paper sheet with ruled facts. These are content surfaces, not clickable cards.

Skills use native `details` rows with category, serif action title, monospace filename, and a plus/minus indicator. Hover colors the title violet; opening reveals the description and input/output details. Setup FAQs use simpler native disclosures. No input fields, chips, dialogs, or disabled/error control variants are part of the current page system.

## Do's and Don'ts

### Do:

- Do preserve the ghost mark and the self-hosted Newsreader / DM Sans pairing.
- Do keep document paths and commands monospace, and allow long content to wrap or scroll within its surface.
- Do preserve visible focus, meaningful content without JavaScript, and reduced-motion behavior.
- Do keep illustrative labels adjacent to worked examples.

### Don't:

- Don't replace ruled reading sections with a uniform grid of rounded cards.
- Don't use violet for long passages or add decorative gradients and ambient shadows.
- Don't hide essential artifact content to make the mobile composition fit.
