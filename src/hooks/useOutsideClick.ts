import { useCallback, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement >(ref: React.RefObject<T>, onClickOutside: () => void) => {
	const modalCloseHandler = useCallback((e: MouseEvent) => {
		const el = ref.current;

		if (!el || el.contains(e.target as Node)) return;

		onClickOutside();
	}, [ref, onClickOutside]);

	useEffect(() => {
		window.addEventListener('click', modalCloseHandler);

		return () => window.removeEventListener('click', modalCloseHandler);
	}, [modalCloseHandler]);
};

export default useOutsideClick;
