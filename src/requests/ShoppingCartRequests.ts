import { useCallback, useEffect, useState } from 'react';

const useFetchPayment = () => {
	const [isPaymentLoading, setIsPaymentLoading] = useState(false);
	const [paymentHasSuccess, setPaymentHasSuccess] = useState(false);
	const [paymentHasError, setPaymentHasError] = useState(false);
	const [isNeedRequest, setIsNeedRequest] = useState(false);

	useEffect(() => {
		let isCanseled = false;
		if (isNeedRequest) {
			setIsPaymentLoading(true);
			setPaymentHasError(false);
			setPaymentHasSuccess(false);

			new Promise<void>((resolve, reject) => {
				setTimeout(() => {
					if (Math.random() < 0.3) {
						reject();
					}
					resolve();
				}, 2000);
			}).then(() => {
				if (!isCanseled) {
					setPaymentHasSuccess(true);
				}
			}).catch(() => {
				if (!isCanseled) {
					setPaymentHasError(true);
				}
			}).finally(() => {
				if (!isCanseled) {
					setIsNeedRequest(false);
					setIsPaymentLoading(false);
				}
			});
		}
		return () => { isCanseled = true; };
	}, [isNeedRequest]);

	const doPayment = useCallback(() => {
		setIsNeedRequest(true);
	}, []);

	const paymentReset = useCallback(() => {
		setIsNeedRequest(false);
		setIsPaymentLoading(false);
		setPaymentHasError(false);
		setPaymentHasSuccess(false);
	}, []);

	return { isPaymentLoading, paymentHasSuccess, paymentHasError, doPayment, paymentReset };
};

export default useFetchPayment;
