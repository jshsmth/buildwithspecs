interface SkillSummary {
	readonly name: string;
	readonly action: string;
	readonly category: string;
	readonly description: string;
	readonly input: string;
	readonly output: string;
}

export const skills = [
	{
		name: "shape-work",
		action: "Find the right problem.",
		category: "Plan",
		description:
			"Clarify the outcome, challenge assumptions, and record the decisions that matter.",
		input: "An idea or unresolved problem",
		output: "Decisions, scope, and open questions",
	},
	{
		name: "write-spec",
		action: "Make the outcome clear.",
		category: "Specify",
		description:
			"Turn settled decisions into observable behaviour and acceptance criteria.",
		input: "Agreed direction and project context",
		output: "A specification with a verification plan",
	},
	{
		name: "slice-work",
		action: "Make the next step small.",
		category: "Organise",
		description:
			"Break a spec into complete slices with explicit blockers and a way to verify each.",
		input: "An agreed specification",
		output: "Dependency-linked ticket drafts",
	},
	{
		name: "implement-slice",
		action: "Build one useful change.",
		category: "Build",
		description:
			"Implement a ready ticket within the project’s existing patterns and boundaries.",
		input: "A ready ticket, its spec, and context",
		output: "A scoped change and check results",
	},
	{
		name: "review-change",
		action: "Check what actually changed.",
		category: "Verify",
		description:
			"Review behaviour against the spec and identify concrete, actionable regressions.",
		input: "A defined diff and expected behaviour",
		output: "Evidence-backed findings or review limits",
	},
	{
		name: "maintain-context",
		action: "Leave the map up to date.",
		category: "Maintain",
		description:
			"Update the existing topic when behaviour changes, then check the docs and index.",
		input: "Verified changes and current documentation",
		output: "Accurate, discoverable project knowledge",
	},
] satisfies readonly SkillSummary[];
