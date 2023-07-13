import { memo } from 'react';
import { NavLink } from 'react-router-dom';

import Modal from '../hoc/Modal';
import usePayment from '../requests/ShoppingCartRequests';
import LoadingIndicator from './LoadingIndicator';
import ShoppingCartTotalCost from './ShoppingCartTotalCost';

const ShoppingCartPayment = () => {
	const {
		isLoading,
		isSuccess,
		hasError,
		request,
		onClose,
	} = usePayment();

	return (
		<div className="shopping-cart-payment">
			<div className="shopping-cart-payment__total-cost-container">
				<div className="shopping-cart-payment__total-cost-title">Итого:</div>
				<ShoppingCartTotalCost className="shopping-cart-payment__total-cost" />
			</div>
			<button className="shopping-cart-payment__payment-button" type="button" onClick={request}>Оплатить</button>
			<Modal
				isActive={isLoading || isSuccess || hasError}
				onClose={onClose}
			>
				<div className="shopping-cart-payment__modal-container">
					{isLoading ? (
						<LoadingIndicator />
					) : null}
					{isSuccess ? (
						<>
							<span className="shopping-cart-payment__modal-title">Оплата завершена</span>
							<NavLink to="/" className="shopping-cart-payment__modal-link">Вернуться на главную</NavLink>
						</>
					) : null}
					{hasError ? (
						<>
							<div className="shopping-cart-payment__modal-title">Ошибка при выполнении операции</div>
							<button
								className="shopping-cart-payment__payment-button"
								type="button"
								onClick={request}
							>
								Повторить
							</button>
						</>
					) : null}
				</div>
			</Modal>
		</div>
	);
};

// const ShoppingCartPayment = () => {
// 	const {
// 		isPaymentLoading,
// 		paymentHasSuccess,
// 		paymentHasError,
// 		request,
// 		requestReset,
// 	} = useFetchPayment();

// 	return (
// 		<div className="shopping-cart-payment">
// 			<div className="shopping-cart-payment__total-cost-container">
// 				<div className="shopping-cart-payment__total-cost-title">Итого:</div>
// 				<ShoppingCartTotalCost className="shopping-cart-payment__total-cost" />
// 			</div>
// 			<button className="shopping-cart-payment__payment-button" type="button" onClick={request}>Оплатить</button>
// 			<Modal
// 				isActive={paymentHasSuccess || isPaymentLoading || paymentHasError}
// 				onClose={requestReset}
// 			>
// 				<div className="shopping-cart-payment__modal-container">
// 					{isPaymentLoading ? (
// 						<LoadingIndicator />
// 					) : null}
// 					{paymentHasSuccess ? (
// 						<>
// 							<span className="shopping-cart-payment__modal-title">Оплата завершена</span>
// 							<NavLink to="/" className="shopping-cart-payment__modal-link">Вернуться на главную</NavLink>
// 						</>
// 					) : null}
// 					{paymentHasError ? (
// 						<>
// 							<div className="shopping-cart-payment__modal-title">Ошибка при выполнении операции</div>
// 							<button
// 								className="shopping-cart-payment__payment-button"
// 								type="button"
// 								onClick={request}
// 							>
// 								Повторить
// 							</button>
// 						</>
// 					) : null}
// 				</div>
// 			</Modal>
// 		</div>
// 	);
// };

export default memo(ShoppingCartPayment);
