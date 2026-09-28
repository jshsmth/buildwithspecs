---
name: implement-slice
description: Implement a ready, bounded ticket using its specification and project conventions, then report relevant verification.
license: MIT
---

# Implement a slice

Read the ticket, its specification, and the relevant project guidance. Check that its blockers are complete and inspect the working tree before editing.

Implement the scoped behaviour using the existing interfaces and patterns. Preserve unrelated changes. When a new decision would change the agreed outcome, identify it before committing to dependent work.

Run focused checks for the changed behaviour and complete the repository's required local validation for the requested delivery stage. Inspect the resulting diff. Fix task-caused failures and rerun affected checks; name environmental or unrelated failures accurately.

Finish with the change summary, verification evidence, and any remaining blocker. Keep commit, push, PR creation, and deployment within the user's authorized scope. Update project context when implemented behaviour changes it.
