export function initTooltip(triggerSelector: string) {
	const tooltipTrigger = document.querySelector(triggerSelector);
	if (!tooltipTrigger) return;

	tooltipTrigger.addEventListener('click', (e) => {
		e.preventDefault();
		tooltipTrigger.classList.toggle('active');
	});

	document.addEventListener('click', (e) => {
		const target = e.target as HTMLElement;
		if (!target.closest('.info-tooltip-wrapper')) {
			tooltipTrigger.classList.remove('active');
		}
	});
}
