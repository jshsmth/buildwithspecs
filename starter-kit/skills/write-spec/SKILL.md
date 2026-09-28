---
name: write-spec
description: Turn agreed feature decisions into a specification with observable acceptance criteria and a verification plan.
license: MIT
---

# Write a specification

Use the agreed direction and relevant project documentation. Inspect the existing contracts and test boundaries affected by the feature.

Write the problem, intended behaviour, scope, non-goals, important decisions, acceptance criteria, and verification approach. Each criterion should describe observable behaviour. Include failure, recovery, permission, and accessibility states when the feature exposes them.

Keep implementation detail only when it captures an important decision or constraint. Link existing sources of truth. Mark unresolved decisions rather than silently choosing an answer.

Deliver a local specification or draft by default. Publish to a tracker only when the user has authorized that action and its destination. Finish when the scope is bounded and each acceptance criterion has a plausible way to verify it.
