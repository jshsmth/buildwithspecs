import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";
import { parseHTML } from "linkedom";
import { unzipSync } from "fflate";
import { starterKit, starterKitDownload } from "../src/data/starter-kit.ts";

test("built pages have working local links, fragments, and accessible fallback content", async () => {
	const pages = new Map<string, ReturnType<typeof parseHTML>["document"]>();
	for (const [route, file] of [
		["/", "dist/index.html"],
		["/start", "dist/start/index.html"],
	] as const) {
		const { document } = parseHTML(await readFile(file!, "utf8"));
		pages.set(route, document);
		assert.equal(document.querySelectorAll("main#main-content").length, 1);
		assert.equal(document.querySelectorAll("h1").length, 1);
	}
	for (const [route, document] of pages) {
		for (const anchor of document.querySelectorAll("a[href]")) {
			const url = new URL(
				anchor.getAttribute("href")!,
				`https://example.test${route}`,
			);
			if (url.origin !== "https://example.test") continue;
			if (pages.has(url.pathname)) {
				if (url.hash)
					assert.ok(
						pages.get(url.pathname)!.getElementById(url.hash.slice(1)),
						url.href,
					);
			} else {
				await readFile(`dist${decodeURIComponent(url.pathname)}`);
			}
		}
	}
	const panels = pages.get("/")!.querySelectorAll(".stage-panel");
	assert.equal(panels.length, 6);
	for (const panel of panels) assert.equal(panel.hasAttribute("hidden"), false);
});

test("shipped archive contains exactly the current starter-kit source", async () => {
	const zip = unzipSync(await readFile(`dist${starterKitDownload}`));
	const entries = await readdir("starter-kit", {
		recursive: true,
		withFileTypes: true,
	});
	const files = entries.filter((entry) => entry.isFile());
	assert.equal(Object.keys(zip).length, files.length);
	for (const entry of files) {
		const file = `${entry.parentPath}/${entry.name}`;
		const relative = file.slice("starter-kit/".length);
		assert.deepEqual(
			Buffer.from(zip[`${starterKit.archiveDirectory}/${relative}`]!),
			await readFile(file),
		);
	}
});
