import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import ShoppingCartPayment from '../components/ShoppingCartPayment';
// import ShoppingCartListContainer from '../containers/ShoppingCartListContainer';
import { getSelectedBooks } from '../redux/selectors';

import ShoppingCartItemsList from '../components/ShoppingCartItemsList';

const ShoppingCartPage = () => {
	const navigate = useNavigate();
	const booksData = useSelector(getSelectedBooks);

	const goBack = () => navigate(-1);

	return (
		<article className="shopping-cart-page">
			<h3 className="shopping-cart-page__title-container">
				<button className="shopping-cart-page__go-back-button" type="button" onClick={goBack}> </button>
				<span className="shopping-cart-page__title">Корзина</span>
			</h3>
			{
				booksData.length
					? (
						<>
							<ShoppingCartItemsList booksData={booksData} />
							<ShoppingCartPayment />
						</>
					)
					: (
						<div className="shopping-cart-page__empty">Корзина пуста</div>
					)

			}

		</article>
	);
};

export default ShoppingCartPage;
