---
name: slice-work
description: Break an agreed specification into small verifiable tickets with explicit dependency relationships.
license: MIT
---

# Slice work

Read the specification and the existing architecture. Identify the smallest changes that deliver complete, verifiable behaviour. Prefer vertical slices across the necessary layers rather than separate tickets for every technical layer.

For each ticket, state the outcome, relevant context, scope, acceptance criteria, verification, and blockers. Name the tickets that must finish before it starts. A ticket without blockers can start immediately.

For mechanical changes that cannot land independently, describe an expand–migrate–contract sequence or an explicit integration boundary. Do not promise independent delivery where the code cannot support it.

Return a proposed breakdown for review. Keep tickets as local drafts unless external publication is explicitly in scope. Finish when every part of the spec is accounted for, dependencies are acyclic, and each ticket has a meaningful completion check.
