import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, sep } from "node:path";
import { zipSync, type Zippable } from "fflate";
import { starterKit } from "../../src/data/starter-kit.ts";

interface SourceFile {
	path: string;
	bytes: Uint8Array;
}

function resolveBuildPaths(root: string) {
	return {
		source: join(root, "starter-kit"),
		readable: join(root, "public/starter-kit"),
		archive: join(root, "public/downloads", starterKit.filename),
	};
}

/** Read a single source snapshot for both outputs. Links are rejected, never followed. */
async function readSourceFiles(source: string): Promise<SourceFile[]> {
	const entries = await readdir(source, {
		recursive: true,
		withFileTypes: true,
	});
	const files: SourceFile[] = [];
	for (const entry of entries) {
		if (entry.isDirectory()) continue;
		if (!entry.isFile())
			throw new Error(`Unsupported starter-kit entry: ${entry.name}`);
		const path = join(entry.parentPath, entry.name);
		files.push({
			path: relative(source, path).split(sep).join("/"),
			bytes: await readFile(path),
		});
	}
	return files;
}

/** Stable ordering and timestamps make identical sources produce identical ZIP bytes. */
export function createArchive(files: readonly SourceFile[]): Uint8Array {
	const entries: Zippable = {};
	for (const file of [...files].sort((a, b) =>
		a.path < b.path ? -1 : a.path > b.path ? 1 : 0,
	)) {
		entries[`${starterKit.archiveDirectory}/${file.path}`] = [
			file.bytes,
			{
				mtime: new Date(starterKit.archiveTimestamp),
			},
		];
	}
	return zipSync(entries, { level: 9 });
}

async function publishReadableFiles(
	destination: string,
	files: readonly SourceFile[],
): Promise<void> {
	await rm(destination, { recursive: true, force: true });
	await mkdir(destination, { recursive: true });
	for (const file of files) {
		const path = join(destination, file.path);
		await mkdir(dirname(path), { recursive: true });
		await writeFile(path, file.bytes);
	}
}

async function publishArchive(
	destination: string,
	archive: Uint8Array,
): Promise<void> {
	await mkdir(dirname(destination), { recursive: true });
	await writeFile(destination, archive);
}

/** Build integration: complete source reading and encoding before replacing generated files. */
export async function buildStarterKit(root: string) {
	const paths = resolveBuildPaths(root);
	const files = await readSourceFiles(paths.source);
	const archive = createArchive(files);
	await publishReadableFiles(paths.readable, files);
	await publishArchive(paths.archive, archive);
	return { fileCount: files.length, archiveBytes: archive.length };
}
