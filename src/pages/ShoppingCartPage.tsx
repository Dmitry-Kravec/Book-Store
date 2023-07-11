import { useSelector } from 'react-redux';

import { getSelectedBooks } from '../redux/selectors';
import ShoppingCartPayment from '../components/ShoppingCartPayment';
import ShoppingCartItemsList from '../components/ShoppingCartItemsList';
import NavigationBackButton from '../components/NavigationBackButton';

const ShoppingCartPage = () => {
	const booksData = useSelector(getSelectedBooks);

	return (
		<article className="shopping-cart-page">
			<h3 className="shopping-cart-page__title-container">
				<NavigationBackButton className="shopping-cart-page__go-back-button" />
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
