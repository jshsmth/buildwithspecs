import { resolveTabNavigation } from "./navigation.ts";

interface TabPair {
	tab: HTMLAnchorElement;
	panel: HTMLElement;
}
interface WorkflowElements {
	nav: HTMLElement;
	pairs: TabPair[];
}

/** Validate the complete mapping before hiding any progressively rendered content. */
function readWorkflowElements(root: HTMLElement): WorkflowElements | null {
	const nav = root.querySelector<HTMLElement>(".stage-nav");
	const tabs = Array.from(
		root.querySelectorAll<HTMLAnchorElement>("[data-stage]"),
	);
	const panels = Array.from(root.querySelectorAll<HTMLElement>(".stage-panel"));
	if (!nav || !tabs.length || tabs.length !== panels.length) return null;
	const pairs: TabPair[] = [];
	const used = new Set<HTMLElement>();
	for (const tab of tabs) {
		const panel = panels.find(
			(candidate) => `#${candidate.id}` === tab.getAttribute("href"),
		);
		if (!tab.id || !nav.contains(tab) || !panel || used.has(panel)) return null;
		used.add(panel);
		pairs.push({ tab, panel });
	}
	return { nav, pairs };
}

function applyTabSemantics({ nav, pairs }: WorkflowElements): void {
	nav.setAttribute("role", "tablist");
	for (const { tab, panel } of pairs) {
		tab.setAttribute("role", "tab");
		tab.setAttribute("aria-controls", panel.id);
		panel.setAttribute("role", "tabpanel");
		panel.setAttribute("aria-labelledby", tab.id);
		panel.tabIndex = 0;
	}
}

function activateTab(pairs: TabPair[], index: number, moveFocus = false): void {
	for (const [position, { tab, panel }] of pairs.entries()) {
		const selected = position === index;
		tab.setAttribute("aria-selected", String(selected));
		tab.tabIndex = selected ? 0 : -1;
		panel.hidden = !selected;
	}
	if (moveFocus) pairs[index]?.tab.focus();
}

function findInitialTab(pairs: TabPair[], hash: string): number {
	const match = pairs.findIndex(({ tab }) => tab.getAttribute("href") === hash);
	return match < 0 ? 0 : match;
}

function handleKeydown(
	event: KeyboardEvent,
	pairs: TabPair[],
	index: number,
): void {
	const navigation = resolveTabNavigation(event.key, index, pairs.length);
	if (!navigation) return;
	event.preventDefault();
	activateTab(pairs, navigation.index, navigation.moveFocus);
}

function bindTabEvents(pairs: TabPair[]): void {
	for (const [index, { tab }] of pairs.entries()) {
		tab.addEventListener("click", (event) => {
			event.preventDefault();
			activateTab(pairs, index);
		});
		tab.addEventListener("keydown", (event) =>
			handleKeydown(event, pairs, index),
		);
	}
}

/** Enhance one workflow; incomplete markup retains ordinary links and visible panels. */
export function enhanceWorkflow(root: HTMLElement, hash: string): void {
	const elements = readWorkflowElements(root);
	if (!elements || elements.nav.getAttribute("role") === "tablist") return;
	applyTabSemantics(elements);
	activateTab(elements.pairs, findInitialTab(elements.pairs, hash));
	bindTabEvents(elements.pairs);
}
