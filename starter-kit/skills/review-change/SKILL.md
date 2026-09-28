---
name: review-change
description: Review a specified diff for concrete behavioural regressions against its requirements and existing contracts.
license: MIT
---

# Review a change

Establish the exact diff or revision range. Read the expected behaviour and the surrounding contracts before evaluating the patch.

Trace changed behaviour through its callers, data, and error paths. Verify plausible findings against the code or a targeted check. Report actionable regressions with the trigger, effect, location, and supporting evidence; distinguish findings from questions or unverified risks.

Prioritize problems that affect correctness, access, data, recovery, or the stated acceptance criteria. Keep style preferences separate from defects.

A review request alone is read-only. When review-and-fix is authorized, fix confirmed in-scope issues and rerun the relevant checks. Finish with findings, verification performed, and concrete limits. State when no actionable findings were found without implying exhaustive correctness.
