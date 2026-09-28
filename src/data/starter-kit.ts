/** Shared by the download page and build pipeline; the public URL is stable. */
export const starterKit = {
	version: "1.0.0",
	filename: "build-with-specs-starter-kit-v1.zip",
	archiveDirectory: "build-with-specs-starter-kit",
	archiveTimestamp: "2026-09-28T00:00:00",
} as const;

export const starterKitDownload = `/downloads/${starterKit.filename}`;
