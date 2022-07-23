export function clickOutside(node: HTMLElement) {
	const handleClick: any = (event: InputEvent) => {
		if (node && event.target && !node.contains(event.target as any) && !event.defaultPrevented) {
			node.dispatchEvent(new CustomEvent('click_outside', node as any));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}
