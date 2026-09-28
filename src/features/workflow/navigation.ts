export interface TabNavigation {
	index: number;
	moveFocus: boolean;
}

/** Resolve keyboard intent without reading or changing the document. */
export function resolveTabNavigation(
	key: string,
	current: number,
	count: number,
): TabNavigation | null {
	if (count < 1 || current < 0 || current >= count) return null;
	switch (key) {
		case "ArrowRight":
			return { index: (current + 1) % count, moveFocus: true };
		case "ArrowLeft":
			return { index: (current + count - 1) % count, moveFocus: true };
		case "Home":
			return { index: 0, moveFocus: true };
		case "End":
			return { index: count - 1, moveFocus: true };
		case " ":
			return { index: current, moveFocus: false };
		default:
			return null;
	}
}
