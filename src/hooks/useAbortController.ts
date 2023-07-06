import { useEffect, useState } from 'react';

const useAbortController = (request: (abortController: AbortController, ...args: any) => void) => {
	const [currentAC, setAC] = useState<AbortController>(new AbortController());

	useEffect(() => {
		const abortController = new AbortController();

		setAC(abortController);

		return () => abortController.abort();
	}, [request]);

	return currentAC;
};

export default useAbortController;
