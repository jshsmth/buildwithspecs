import { fileURLToPath } from "node:url";
import { buildStarterKit } from "./starter-kit/build.ts";

const root = fileURLToPath(new URL("../", import.meta.url));
const result = await buildStarterKit(root);
console.log(
	`Starter kit: ${result.fileCount} files, ${result.archiveBytes} bytes.`,
);
