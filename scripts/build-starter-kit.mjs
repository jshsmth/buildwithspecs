import { readdir, readFile, mkdir, writeFile, cp, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative, sep } from "node:path";
import { zipSync } from "fflate";

const root = fileURLToPath(new URL("../", import.meta.url));
const source = join(root, "starter-kit");
const entries = {};
async function collect(directory) {
	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);
		if (entry.isDirectory()) await collect(path);
		else if (entry.isFile()) {
			const name = relative(source, path).split(sep).join("/");
			entries[`build-with-specs-starter-kit/${name}`] = [
				new Uint8Array(await readFile(path)),
				{ mtime: new Date("2026-09-28T00:00:00Z") },
			];
		}
	}
}
await collect(source);
await mkdir(join(root, "public/downloads"), { recursive: true });
await rm(join(root, "public/starter-kit"), { recursive: true, force: true });
await cp(source, join(root, "public/starter-kit"), { recursive: true });
const archive = zipSync(entries, { level: 9 });
await writeFile(
	join(root, "public/downloads/build-with-specs-starter-kit-v1.zip"),
	archive,
);
console.log(
	`Starter kit: ${Object.keys(entries).length} files, ${archive.length} bytes.`,
);
