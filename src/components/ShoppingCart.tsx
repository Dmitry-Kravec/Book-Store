import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';
import { Popover } from 'antd';

import '../styles/shopping-cart.scss';
import ShoppingCartListContainer from '../containers/ShoppingCartListContainer';

type ShoppingCartProps = {
    children: ReactNode
}

const ShoppingCart = () => (
	<>
		<ShoppingCartListContainer />
		<NavLink to="/cart">CART</NavLink>
	</>
);

export default ShoppingCart;
