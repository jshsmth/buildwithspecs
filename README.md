# Build with Specs

A practical field guide for developers adopting an agent workflow: project context, planning, specifications, tickets, implementation, and verification.

The Astro site includes a six-stage interactive example, a skills catalogue, and a setup guide with a downloadable starter kit. The example is illustrative; it is not an implemented application or evidence of performed checks.

## Develop

```sh
npm ci
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

The existing Vercel adapter remains configured. Neither a local build nor a preview deploys the site.

## Starter kit

Edit the original materials in `starter-kit/`. `npm run kit` publishes readable copies under `public/starter-kit/` and generates `public/downloads/build-with-specs-starter-kit-v1.zip`. Development and production builds run this automatically. Generated copies are ignored by Git.

The kit uses the included MIT license. It contains original skill templates, repository context seeds, work templates, and a worked example. The workflow is tool-independent. Plasma Wiki is an optional indexing example; its setup and agent compatibility references are documented in the kit.

The original `public/downloads/spec-architect.md` remains available as a legacy download.

## Design

`PRODUCT.md` records product scope. `DESIGN.md` records the implemented system. The homepage direction and interaction contract live in `.impeccable/surfaces/`. Fonts are self-hosted; licenses and sources live in `public/fonts/`.
