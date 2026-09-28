import assert from "node:assert/strict";
import { test } from "node:test";
import { parseHTML } from "linkedom";
import { resolveTabNavigation } from "../src/features/workflow/navigation.ts";
import { enhanceWorkflow } from "../src/features/workflow/tabs.ts";

for (const [key, current, index, moveFocus] of [
	["ArrowRight", 5, 0, true],
	["ArrowLeft", 0, 5, true],
	["Home", 3, 0, true],
	["End", 2, 5, true],
	[" ", 2, 2, false],
] as const) {
	test(`${key} resolves the next selection from ${current}`, () => {
		assert.deepEqual(resolveTabNavigation(key, current, 6), {
			index,
			moveFocus,
		});
	});
}

test("unrelated keys and invalid collections do not trigger navigation", () => {
	for (const key of ["Tab", "Escape", "ArrowDown", "Enter"]) {
		assert.equal(resolveTabNavigation(key, 1, 6), null);
	}
	assert.equal(resolveTabNavigation("Home", 0, 0), null);
	assert.equal(resolveTabNavigation("Home", -1, 3), null);
	assert.equal(resolveTabNavigation("Home", 3, 3), null);
});

function fixture() {
	const { document, window } = parseHTML(`<html><body>
	<div id="workflow"><div class="stage-nav">
	<a id="tab-a" data-stage="a" href="#panel-a">A</a>
	<a id="tab-b" data-stage="b" href="#panel-b">B</a>
	</div><section id="panel-b" class="stage-panel">B</section>
	<section id="panel-a" class="stage-panel">A</section></div>
	<section id="outside" class="stage-panel">Unrelated content</section>
	</body></html>`);
	const root = document.getElementById("workflow")!;
	return { document, window, root };
}

test("enhancement pairs panels by identity, honors the hash, and stays inside its root", () => {
	const { document, window, root } = fixture();
	enhanceWorkflow(root, "#panel-b");
	const a = document.getElementById("tab-a")!;
	const b = document.getElementById("tab-b")!;
	assert.equal(b.getAttribute("aria-selected"), "true");
	assert.equal(document.getElementById("panel-b")!.hidden, false);
	assert.equal(document.getElementById("panel-a")!.hidden, true);
	assert.equal(document.getElementById("outside")!.hasAttribute("role"), false);
	const click = new window.Event("click", { cancelable: true });
	a.dispatchEvent(click);
	assert.equal(click.defaultPrevented, true);
	assert.equal(a.getAttribute("aria-selected"), "true");
	assert.equal(a.getAttribute("tabindex"), "0");
	assert.equal(b.getAttribute("tabindex"), "-1");
	assert.equal(document.getElementById("panel-a")!.hidden, false);
	// Repeated setup must not reset a user's current selection.
	enhanceWorkflow(root, "#panel-b");
	assert.equal(a.getAttribute("aria-selected"), "true");
});

test("incomplete markup remains readable and does not claim tab semantics", () => {
	const { document, root } = fixture();
	document.getElementById("panel-b")!.remove();
	enhanceWorkflow(root, "");
	assert.equal(root.querySelector(".stage-nav")!.hasAttribute("role"), false);
	assert.equal(document.getElementById("panel-a")!.hidden, false);
});
