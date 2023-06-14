import { ReactNode } from 'react';

import '../styles/shopping-cart.scss';

type ShoppingCartProps = {
    children: ReactNode
}

const ShoppingCart = ({ children } : ShoppingCartProps) => (
	<div className="shopping-cart">
		{children}
		<div className="shopping-cart__dropdown">
			{/* / */}
		</div>
	</div>
);

export default ShoppingCart;
