# Build with Specs

A practical field guide for developers adopting an agent workflow: project context, planning, specifications, tickets, implementation, and verification.

The Astro site includes a six-stage interactive example, a skills catalogue, and a setup guide with a downloadable starter kit. The example is illustrative; it is not an implemented application or evidence of performed checks.

## Develop

Use Node.js 24 (see `.node-version`).

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

Vercel must build from source. Never commit `.vercel/output/`: Vercel treats that directory as prebuilt output and can publish stale pages without running the build. The directory is ignored, and CI rejects tracked files inside it. Production updates after the changes reach `main` and Vercel completes a fresh build.

## Starter kit

Edit the original materials in `starter-kit/`. `npm run kit` publishes readable copies under `public/starter-kit/` and generates `public/downloads/build-with-specs-starter-kit-v1.zip`. Development and production builds run this automatically. Generated copies are ignored by Git.

The kit uses the included MIT license. It contains original skill templates, repository context seeds, work templates, and a worked example. The workflow is tool-independent. Plasma Wiki is an optional indexing example; its setup and agent compatibility references are documented in the kit.

The original `public/downloads/spec-architect.md` remains available as a legacy download.

## Design

`PRODUCT.md` records product scope. `DESIGN.md` records the implemented system. The homepage direction and interaction contract live in `.impeccable/surfaces/`. Fonts are self-hosted; licenses and sources live in `public/fonts/`.

## Contribute and validate

```sh
npm run validate
```

This runs formatting, Astro and tooling type checks, focused behavior tests, a production build, then checks built links and download contents. GitHub Actions runs the same command. `npm run format` applies formatting; `npm test` runs the fast behavioral tests; `npm run test:site` requires a completed build.

See [ARCHITECTURE.md](ARCHITECTURE.md) for module responsibilities, IOSP decisions, and the refactoring plan. The browser interaction separates keyboard policy from DOM effects; kit generation separates source reading, deterministic encoding, and publication. Generated files under `dist/`, `.astro/`, `.vercel/output/`, and `public/starter-kit/` are not source code.

Keep the approved design and public download URLs stable. Check both routes on desktop and mobile after presentation changes, including keyboard navigation and the readable fallback without JavaScript.
