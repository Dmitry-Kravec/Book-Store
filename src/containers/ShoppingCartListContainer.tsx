import { useSelector } from 'react-redux';
import ShoppingCartItemsList from '../components/ShoppingCartItemsList';
import { getSelectedBooks } from '../redux/selectors';

const ShoppingCartListContainer = () => {
	const booksData = useSelector(getSelectedBooks);

	if (!booksData.length) {
		return (
			<div>В вашей корзине нет товаров</div>
		);
	}

	return (
		<ShoppingCartItemsList booksData={booksData} />
	);
};

export default ShoppingCartListContainer;
