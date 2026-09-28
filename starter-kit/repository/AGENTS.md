# Agent entry point

Read this file first. Before using this template, replace its project-specific prompts with verified guidance.

## Find context

Project knowledge lives in `docs/`. Start with `docs/_index.md`, or use the repository’s configured documentation index and search tools. Open the pages relevant to the task. Before architecture changes, read `docs/architecture.md` and the relevant decisions in `docs/decisions.md`. For local checks and delivery procedures, read `docs/development.md`.

## Boundaries

Read `guardrails.md` for actions affecting external systems, credentials, data, or deployment. Preserve unrelated working-tree changes. Derive validation commands from the project's current scripts and development guidance.

## Completion

For implementation, inspect the diff and run the relevant checks. Report what changed, evidence from checks, and any specific blocker. A local pass, a hosted CI pass, and a deployment are separate outcomes. Update the relevant docs when behaviour or decisions change.

## Project routing to fill in

Record the actual workspace paths, ownership, first-read documents, and supported verification commands here. Keep detailed procedures in the linked docs.
