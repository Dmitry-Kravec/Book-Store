import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getShoppingCartTotalCost } from '../redux/selectors';
import useFetchPayment from '../requests/ShoppingCartRequests';
import Modal from '../hoc/Modal';

import '../styles/shopping-cart-payment.scss';

const ShoppingCartPayment = () => {
	const totalCost = useSelector(getShoppingCartTotalCost);

	const {
		isPaymentLoading,
		paymentHasSuccess,
		paymentHasError,
		doPayment,
		paymentReset,
	} = useFetchPayment();

	return (
		<div className="shopping-cart-payment">
			<div className="shopping-cart-payment__total-cost-container">
				<div className="shopping-cart-payment__total-cost-title">Итого:</div>
				<div className="shopping-cart-payment__total-cost">{totalCost}</div>
			</div>
			<button className="shopping-cart-payment__payment-button" type="button" onClick={doPayment}>Оплатить</button>
			<Modal
				isActive={paymentHasSuccess || isPaymentLoading || paymentHasError}
				closeHandler={paymentReset}
			>
				{isPaymentLoading ? (
					<div>Loading...</div>
				) : null}
				{paymentHasSuccess ? (
					<div className="shopping-cart-payment-modal-content">
						<span className="shopping-cart-payment-modal-content__title">Оплата завершена</span>
						<NavLink to="/" className="shopping-cart-payment-modal-content__link">Вернуться на главную</NavLink>
					</div>
				) : null}
				{paymentHasError ? (
					<div className="shopping-cart-payment-modal-content">
						<div className="shopping-cart-payment-modal-content__title">Ошибка при выполнении операции</div>
						<button className="shopping-cart-payment__payment-button" type="button" onClick={doPayment}>Повторить</button>
					</div>
				) : null}
			</Modal>
		</div>
	);
};

export default ShoppingCartPayment;
