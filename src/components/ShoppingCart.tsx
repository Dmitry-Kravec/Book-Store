import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../styles/shopping-cart.scss';
// import ShoppingCartListContainer from '../containers/ShoppingCartListContainer';
import { getSelectedBooks } from '../redux/selectors';
import ShoppingCartItemsList from './ShoppingCartItemsList';

type ShoppingCartProps = {
    children: ReactNode
}

const ShoppingCart = () => {
	const booksData = useSelector(getSelectedBooks);

	return (
		<div className="shopping-cart-mini">
			{
				booksData.length
					? <ShoppingCartItemsList booksData={booksData} />
					: <div>Вашей корзине нет товаров</div>
			}
			<NavLink to="/cart">В корзину</NavLink>
		</div>
	);
};

export default ShoppingCart;
