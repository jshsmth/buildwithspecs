# Build with Specs starter kit

Version 1.0.0 · 28 September 2026

A practical starting point for project context, planning, specifications, tickets, implementation, and verification. These are original Build with Specs templates, not copies of third-party skills or private company documentation.

## Add to an existing repository

1. Read this kit and your existing agent instructions before changing anything.
2. Merge the useful parts of `repository/AGENTS.md` and `repository/guardrails.md` into your current instructions. Preserve existing constraints and replace the project-specific prompts with your real rules.
3. Adapt the files in `repository/docs/` to describe actual project behaviour. These files are plain Markdown seeds you can maintain with your existing tools.
4. Give agents a compact index with links to relevant topics. Start with `docs/_index.md`; add search, generated indexes, or wiki tooling if the documentation grows. No particular product is required.
5. Choose the skills you need from `skills/`. Install each complete skill folder in a directory supported by your agent. User-level `~/.agents/skills` is useful for clients that discover it; repository-local placement varies by client. Verify discovery in the client before relying on a skill. These files use the open Agent Skills format without client-specific tool bindings.
6. Start with one small feature. Use the planning and spec templates only to the depth the work needs. Tickets can remain local Markdown; a connected tracker is optional.
7. Review and verify the change, then update the relevant documentation page.

## Start a new project

Create a repository using your normal framework tooling. Add the adapted repository templates, install the chosen skills, and follow the same setup above. This kit does not scaffold or install an application, agent client, credentials, or a tracker.

## What's included

- `skills/`: six original, focused SKILL.md templates.
- `repository/`: agent routing, project boundaries, and documentation seeds.
- `templates/`: reusable plan, spec, ticket, and handoff formats.
- `examples/notifications/`: a worked planning-to-handoff example. It is illustrative, not an implemented application or evidence of executed checks.
- `SOURCES.md`: upstream tools and format references.

## Find project knowledge

Start with `AGENTS.md`, follow the index in `docs/_index.md`, and open the relevant topic. Use your project's existing search tools when needed. Keep the index useful and update topic pages when behaviour changes.

## Optional example: Plasma Wiki

Plasma Wiki is one option for indexing Markdown documentation and navigating it through a CLI. It is not required by this kit. Explore it at https://www.plasma.ai/research/wiki and follow the current setup guide at https://github.com/plasma-ai/wiki.

If you choose it, install `plasma-wiki` from PyPI in an isolated environment. For a new documentation directory, `wiki init --path docs` initialises the wiki. For existing docs, commit or back up your work and review the initialisation changes. `wiki config --path docs` configures an existing wiki clone.

After setup, a lookup might look like this:

```sh
wiki map --path docs
wiki search "notifications" --path docs
wiki read notifications --path docs
```

Use the actual page name returned by your wiki. Refresh generated indexes with `wiki update --path docs` and check structure with `wiki lint --path docs`. If you keep a plain Markdown index instead, maintain its links directly.

## Adapting the skills

Inspect a skill before installing it. Keep its name and description aligned with its job. Add project-specific details to repository docs and point to them rather than copying those details into every skill. The SKILL.md format is portable; client discovery, invocation, and available tools still differ. See https://agentskills.io/specification.

No command here publishes tickets, creates a PR, or deploys software. Those actions depend on your chosen tools and explicit task scope.
