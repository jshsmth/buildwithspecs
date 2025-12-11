export function initModal(modalId: string) {
	const modal = document.getElementById(modalId);
	if (!modal) return;

	const closeBtn = modal.querySelector('.modal-close');
	const continueBtn = modal.querySelector('.continue-btn');

	function showModal() {
		modal.removeAttribute('aria-hidden');
		modal.classList.add('active');

		requestAnimationFrame(() => {
			const focusableElements = modal.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
			if (focusableElements.length > 0) {
				(focusableElements[0] as HTMLElement)?.focus();
			}
		});
	}

	function hideModal() {
		modal.classList.remove('active');
		modal.setAttribute('aria-hidden', 'true');
	}

	closeBtn?.addEventListener('click', hideModal);
	continueBtn?.addEventListener('click', hideModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			hideModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && modal.classList.contains('active')) {
			hideModal();
		}
	});

	return { showModal, hideModal };
}

export function initDownloadModal(modalId: string, downloadSelector: string) {
	const modalControls = initModal(modalId);
	if (!modalControls) return;

	const downloadLinks = document.querySelectorAll(downloadSelector);

	downloadLinks.forEach(link => {
		link.addEventListener('click', () => {
			setTimeout(() => {
				modalControls.showModal();
			}, 500);
		});
	});

	return modalControls;
}
