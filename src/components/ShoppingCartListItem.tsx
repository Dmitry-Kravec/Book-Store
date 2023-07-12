import { memo } from 'react';
import ShoppingCartFormContainer from '../containers/ShoppingCartFormContainer';
import { ShoppingCartBookItemType } from '../types/BooksTypes';

import { onImageError } from '../utils/helpers';

interface ShoppingCartListItemProps {
	shoppingCartBook: ShoppingCartBookItemType
}

const ShoppingCartListItem = ({
	shoppingCartBook: { quantity, book },
}: ShoppingCartListItemProps) => {
	const { image, price, title } = book;

	const priceCurrency = price[0];
	const priceValue = Number(price.slice(1));
	const totalPrice = `${priceCurrency}${(priceValue * quantity).toFixed(2)}`;

	return (
		<div className="shopping-cart-list-item">
			<div className="shopping-cart-list-item__block">
				<img
					className="shopping-cart-list-item__image"
					src={image}
					onError={onImageError}
					alt="Book"
					width="50"
					height="50"
				/>
				<div className="shopping-cart-list-item__title">{title}</div>
				<div className="shopping-cart-list-item__price">{priceValue}</div>
			</div>
			<div className="shopping-cart-list-item__block">
				<ShoppingCartFormContainer quantity={quantity} book={book} />
				<div className="shopping-cart-list-item__total-price">{totalPrice}</div>
			</div>
		</div>
	);
};

export default memo(ShoppingCartListItem);
