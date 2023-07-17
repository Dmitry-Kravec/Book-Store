import { useCallback, useRef, useState } from 'react';

export const usePayment = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [hasError, sethasError] = useState(false);
	const ref = useRef<Promise<void> | null>(null);

	const request = useCallback(() => {
		setIsLoading(true);
		setIsSuccess(false);
		sethasError(false);

		const currentPromise = new Promise<void>((resolve, reject) => {
			setTimeout(() => {
				if (Math.random() < 0.3) {
					reject();
				}
				resolve();
			}, 2000);
		}).then(() => {
			if (ref.current === currentPromise) {
				setIsSuccess(true);
			}
		}).catch(() => {
			if (ref.current === currentPromise) {
				sethasError(true);
			}
		}).finally(() => {
			if (ref.current === currentPromise) {
				setIsLoading(false);
			}
		});

		ref.current = currentPromise;
	}, []);

	const onClose = useCallback(() => {
		setIsSuccess(false);
		sethasError(false);
		setIsLoading(false);
		ref.current = null;
	}, []);

	return { isLoading, isSuccess, hasError, request, onClose };
};

export default usePayment;
