# Code architecture

Build with Specs is a static Astro website with two routes. Content renders as HTML at build time. The workflow tabs are the only application-owned browser interaction; disclosures use native HTML. The starter-kit build produces the downloadable materials from version-controlled sources.

## Responsibilities

```text
src/pages/                 Route composition and setup-guide prose
src/layouts/               Document metadata, fonts, analytics, skip link
src/components/layout/    Header and footer
src/components/sections/  Coherent homepage sections and workflow markup
src/data/                  Typed editorial content and starter-kit metadata
src/features/workflow/     Keyboard policy and scoped DOM enhancement
src/styles/                Ordered global styles and responsive overrides
scripts/starter-kit/       Source snapshot, archive encoding, publication
starter-kit/               Original downloadable materials
tests/                    Behavioral, filesystem, and built-site checks
```

Keep editorial HTML in Astro. Extract a section when it has a clear responsibility; do not turn each paragraph into a configurable abstraction. The setup guide remains one readable document because it has no application logic to separate.

## IOSP at the behavior seams

IOSP separates logic operations from integrations that compose application-owned behavior. Native DOM, filesystem, and library calls may be part of an operation. Static markup does not need service layers.

### Workflow

- `resolveTabNavigation` is a pure operation: a key, current index, and count produce a navigation intent or no action.
- `readWorkflowElements` validates and maps the DOM before enhancement. It pairs panels by link target, not source order.
- `applyTabSemantics` and `activateTab` are DOM operations. Selection updates the visible panel, ARIA state, and tab order together.
- `handleKeydown`, `bindTabEvents`, and `enhanceWorkflow` integrate those operations. The Astro script supplies the root and current hash.

An incomplete mapping leaves all content visible as ordinary linked sections. Initialization is idempotent. Plain Enter follows the anchor's click behavior; Space selects without moving focus; arrow keys and Home/End move selection and focus. There is no global event listener or client-side router lifecycle to manage.

### Starter-kit generation

`buildStarterKit(root)` integrates explicit path resolution, source reading, archive encoding, and publication. Filesystem details stay in its module. `createArchive` is deterministic for the same path/byte inputs: entry order is sorted and ZIP timestamps are fixed. ZIP timestamps are deliberately timezone-free because the format stores local calendar fields.

Both outputs use the same in-memory source snapshot. Symbolic links and other non-regular entries fail before output replacement, preventing differences between readable copies and the ZIP. Missing sources also preserve previous output. Publication replaces only generated kit paths and keeps unrelated downloads, including the original agent file.

Publication is not a transaction: disk failures during writing can leave incomplete local generated output. The build fails in that case; rerun after fixing the filesystem. Deployment must only publish a successful build. A transactional file store would be unnecessary complexity for disposable build artifacts.

## Styles

`site.css` is the ordered entry point: base/shell, field guide, setup guide, then responsive overrides. The split preserves the original cascade. Shared reading and button styles remain global; do not reorder imports without checking both routes at desktop and mobile widths.

## Refactoring plan and acceptance

1. Remove the unreachable former landing-page implementation and stop tracking generated Vercel output.
2. Separate keyboard decisions from DOM integration and archive construction from filesystem operations.
3. Split coherent homepage sections, declare content contracts, and share archive metadata between the guide and builder.
4. Establish one local/CI command for formatting, types, behavior tests, build, and built-link/download validation.
5. Verify the approved desktop/mobile design and browser keyboard behavior remain intact.

The public routes, legacy download, content, and visual design are compatibility requirements. Dependency upgrades and new site behavior are separate changes.

## Verification

Run `npm run validate` before proposing changes. Tests exercise pure keyboard decisions, real DOM enhancement, temporary-directory packaging, and the built pages' local links, fragments, fallback content, and archive parity. Browser acceptance is still needed after presentation or interaction changes: automated DOM tests do not establish actual focus behavior or visual quality.
