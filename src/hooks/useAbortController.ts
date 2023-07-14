import { useEffect, useState } from 'react';

const useAbortController = <T extends unknown[]>(request: (abortController: AbortController, ...args: T) => void) => {
	const [requestWithAC, setRequestWithAC] = useState<(...agrs: T) => void>(() => () => {});

	useEffect(() => {
		const abortController = new AbortController();

		setRequestWithAC(() => (...args: T) => request(abortController, ...args));

		return () => abortController.abort();
	}, [request]);

	return requestWithAC;
};

export default useAbortController;
