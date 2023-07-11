import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getSelectedBooks } from '../redux/selectors';
import ShoppingCartItemsList from './ShoppingCartItemsList';

const ShoppingCartPopover = () => {
	const booksData = useSelector(getSelectedBooks);

	return (
		<div className="shopping-cart-popover">
			{
				booksData.length
					? <ShoppingCartItemsList booksData={booksData} />
					: <div className="shopping-cart-popover__empty-message">В вашей корзине нет товаров</div>
			}
			<NavLink to="/cart" className="shopping-cart-popover__nav-link">В корзину</NavLink>
		</div>
	);
};

export default ShoppingCartPopover;
