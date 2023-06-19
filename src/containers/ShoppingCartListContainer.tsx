import { useSelector } from 'react-redux';
import ShoppingCartItemsList from '../components/ShoppingCartItemsList';
import { getSelectedBooks } from '../redux/selectors';

const ShoppingCartListContainer = () => { // не используется
	const booksData = useSelector(getSelectedBooks);

	let content = <ShoppingCartItemsList booksData={booksData} />;

	if (!booksData.length) content = <div>В вашей корзине нет товаров</div>;

	return (
		<div className="shopping-cart-list-container">
			{content}
		</div>
	);
};

export default ShoppingCartListContainer;
