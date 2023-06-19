import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getShoppingCartTotalCost } from '../redux/selectors';
import useFetchPayment from '../requests/ShoppingCartRequests';
import Modal from '../hoc/Modal';

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
				<div className="shopping-cart-payment__modal-container">
					{isPaymentLoading ? (
						<div>Loading...</div>
					) : null}
					{paymentHasSuccess ? (
						<>
							<span className="shopping-cart-payment__modal-title">Оплата завершена</span>
							<NavLink to="/" className="shopping-cart-payment__modal-link">Вернуться на главную</NavLink>
						</>
					) : null}
					{paymentHasError ? (
						<>
							<div className="shopping-cart-payment__modal-title">Ошибка при выполнении операции</div>
							<button className="shopping-cart-payment__payment-button" type="button" onClick={doPayment}>Повторить</button>
						</>
					) : null}
				</div>
			</Modal>
		</div>
	);
};

export default ShoppingCartPayment;
