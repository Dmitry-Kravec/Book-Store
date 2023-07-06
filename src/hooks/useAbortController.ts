import { useEffect, useState } from 'react';

const useAbortController = (request: (abortController: AbortController) => void) => {
	const [requestWithAC, setRequestWithAC] = useState<() => void>(() => () => {});
	useEffect(() => {
		const abortController = new AbortController();

		setRequestWithAC(() => () => request(abortController));

		return () => abortController.abort();
	}, [request]);

	return requestWithAC;
};

export default useAbortController;
