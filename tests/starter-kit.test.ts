import assert from "node:assert/strict";
import {
	mkdtemp,
	mkdir,
	readFile,
	writeFile,
	rm,
	symlink,
	access,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { unzipSync } from "fflate";
import {
	buildStarterKit,
	createArchive,
} from "../scripts/starter-kit/build.ts";
import { starterKit } from "../src/data/starter-kit.ts";

test("archive encoding is independent of source enumeration order", () => {
	const files = [
		{ path: "nested/é.md", bytes: new Uint8Array([0, 10, 255]) },
		{ path: "README.md", bytes: new TextEncoder().encode("Example") },
	];
	assert.deepEqual(createArchive(files), createArchive([...files].reverse()));
});

test("build publishes matching files, removes stale copies, and preserves other downloads", async (t) => {
	const root = await mkdtemp(join(tmpdir(), "starter-kit-test-"));
	t.after(() => rm(root, { recursive: true, force: true }));
	await mkdir(join(root, "starter-kit/nested"), { recursive: true });
	await mkdir(join(root, "public/downloads"), { recursive: true });
	await writeFile(join(root, "starter-kit/nested/é.md"), "Unicode example\n");
	await writeFile(join(root, "starter-kit/README.md"), "Read me\n");
	await writeFile(join(root, "public/downloads/legacy.md"), "Preserved");
	const result = await buildStarterKit(root);
	assert.equal(result.fileCount, 2);
	const zipPath = join(root, "public/downloads", starterKit.filename);
	const first = await readFile(zipPath);
	const entries = unzipSync(first);
	for (const path of ["README.md", "nested/é.md"]) {
		const expected = await readFile(join(root, "starter-kit", path));
		assert.deepEqual(
			Buffer.from(entries[`${starterKit.archiveDirectory}/${path}`]!),
			expected,
		);
		assert.deepEqual(
			await readFile(join(root, "public/starter-kit", path)),
			expected,
		);
	}
	await writeFile(join(root, "public/starter-kit/stale.md"), "Old");
	await buildStarterKit(root);
	assert.deepEqual(await readFile(zipPath), first);
	await assert.rejects(access(join(root, "public/starter-kit/stale.md")), {
		code: "ENOENT",
	});
	assert.equal(
		await readFile(join(root, "public/downloads/legacy.md"), "utf8"),
		"Preserved",
	);
	// Invalid inputs must fail before replacing either existing output.
	await symlink(
		join(root, "starter-kit/README.md"),
		join(root, "starter-kit/link.md"),
	);
	await assert.rejects(buildStarterKit(root), /Unsupported starter-kit entry/);
	assert.deepEqual(await readFile(zipPath), first);
	await rm(join(root, "starter-kit"), { recursive: true });
	await assert.rejects(buildStarterKit(root), { code: "ENOENT" });
	assert.equal(
		await readFile(join(root, "public/starter-kit/README.md"), "utf8"),
		"Read me\n",
	);
	assert.deepEqual(await readFile(zipPath), first);
});
