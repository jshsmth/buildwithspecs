export const stages = [
	{
		id: "context",
		name: "Context",
		title: "Start with what’s already true.",
		description:
			"Before an agent changes your project, help it find the architecture, decisions, and constraints that matter to the task.",
		input: "A feature idea + your repository",
		output: "Relevant project knowledge",
		file: "docs/notifications.md",
		heading: "Notification preferences",
		intro:
			"Project context for the example feature. Read this before changing how reminders are sent.",
		rows: [
			[
				"Current behaviour",
				"Members receive a daily reminder at their chosen time.",
			],
			[
				"Existing boundary",
				"The server owns preferences. The scheduler checks them before sending.",
			],
			[
				"Constraint",
				"Turning off reminders must not disable account or security messages.",
			],
		],
		code: "Start: AGENTS.md\nIndex: docs/_index.md\nRead:  docs/notifications.md",
		note: "A compact map first. The relevant page next.",
	},
	{
		id: "plan",
		name: "Plan",
		title: "Resolve the questions that change the work.",
		description:
			"Challenge the idea, inspect existing behaviour, and settle the decisions that would otherwise turn into guesswork during implementation.",
		input: "Project context + an open question",
		output: "A clear, bounded direction",
		file: "examples/notifications/plan.md",
		heading: "What does “pause reminders” mean?",
		intro:
			"Decision: add a single daily-reminder toggle to Settings. Start with the smallest useful change.",
		rows: [
			[
				"Decide",
				"The preference applies to daily reminders on every signed-in device.",
			],
			["Preserve", "Existing members keep their current reminder setting."],
			[
				"Exclude",
				"Quiet hours, per-channel controls, and temporary snoozing are future work.",
			],
			[
				"Verify",
				"Test saving the preference and the scheduler’s decision to send.",
			],
		],
		code: null,
		note: "Record the decision and its reason, not the whole conversation.",
	},
	{
		id: "spec",
		name: "Spec",
		title: "Make the intended behaviour explicit.",
		description:
			"Turn the agreed direction into a shared contract: the problem, scope, acceptance criteria, and how the behaviour will be tested.",
		input: "Agreed decisions",
		output: "An implementable specification",
		file: "examples/notifications/spec.md",
		heading: "Let members control daily reminders",
		intro:
			"Members can turn daily reminders on or off in Settings without affecting other messages.",
		rows: [
			[
				"Accept 01",
				"The saved preference appears when Settings opens, including on another device.",
			],
			[
				"Accept 02",
				"Switching off prevents future daily reminders after the save succeeds.",
			],
			[
				"Accept 03",
				"A failed save restores the previous setting and offers a retry.",
			],
			["Accept 04", "Account and security messages remain unchanged."],
		],
		code: null,
		note: "Acceptance criteria describe behaviour a person can observe.",
	},
	{
		id: "tickets",
		name: "Tickets",
		title: "Slice the work into verifiable changes.",
		description:
			"Give each ticket a useful outcome and explicit dependencies. Start work only when its blockers are complete.",
		input: "An agreed specification",
		output: "Small tickets with blocking relationships",
		file: "examples/notifications/tickets.md",
		heading: "One feature. Three complete slices.",
		intro:
			"Each ticket connects the behaviour to its verification. The order follows real dependencies.",
		rows: [
			[
				"01 · No blockers",
				"Persist a reminder preference and enforce it in the scheduler. Verify defaults and message exclusions.",
			],
			[
				"02 · Blocked by 01",
				"Expose the saved preference in Settings. Verify a successful change across sessions.",
			],
			[
				"03 · Blocked by 02",
				"Complete failure recovery and keyboard interaction. Verify retry, rollback, and focus.",
			],
		],
		code: null,
		note: "Small fixes can skip ticket breakdown. Structure should fit the work.",
	},
	{
		id: "build",
		name: "Build",
		title: "Give each agent a bounded piece of work.",
		description:
			"Keep the spec, relevant context, and completion criteria within reach. Implement a ready ticket, then inspect and test the resulting change.",
		input: "A ready ticket + its context",
		output: "A scoped, reviewable change",
		file: "examples/notifications/build.md",
		heading: "Implement ticket 02",
		intro:
			"Read the spec and the preferences contract delivered by ticket 01. Follow the existing Settings patterns.",
		rows: [
			[
				"Scope",
				"Show the current value, save a changed value, and display the confirmed result.",
			],
			[
				"Reuse",
				"Use the existing preferences client and accessible switch component.",
			],
			[
				"Check",
				"Verify initial loading, successful saving, and persistence after reopening Settings.",
			],
			[
				"Handoff",
				"Describe the change and test results. Leave failure recovery visible as ticket 03.",
			],
		],
		code: null,
		note: "Parallel work is useful when the tasks are actually independent.",
	},
	{
		id: "verify",
		name: "Verify",
		title: "Finish with evidence. Leave better context.",
		description:
			"Review the change against the spec, fix confirmed issues, and update the project docs. Report what was checked and what still needs to happen.",
		input: "Implementation + acceptance criteria",
		output: "Review evidence + updated documentation",
		file: "examples/notifications/verification.md",
		heading: "A handoff you can inspect",
		intro:
			"Illustrative report format only. These are example statuses, not tests run against an application.",
		rows: [
			[
				"Local checks · Passed in example",
				"Preference persistence, scheduler exclusions, failed-save recovery, and keyboard interaction.",
			],
			[
				"Review · Resolved in example",
				"Confirmed the disabled setting leaves security messages unchanged.",
			],
			[
				"Documentation · Updated in example",
				"The notification contract now includes the preference and its default.",
			],
			[
				"Deployment · Not performed",
				"Hosted checks and post-deployment acceptance are separate evidence.",
			],
		],
		code: null,
		note: "A passing local check is evidence for that check, not proof of deployment.",
	},
];

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
];
