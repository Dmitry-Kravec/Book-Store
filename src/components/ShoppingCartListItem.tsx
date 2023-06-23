import ShoppingCartFormContainer from '../containers/ShoppingCartFormContainer';
import { ShoppingCartBookItemType } from '../types/BooksTypes';

import defaultBookImage from '../images/default-book.png';

type ShoppingCartListItemProps = {
	shoppingCartBook: ShoppingCartBookItemType
}

const ShoppingCartListItem = ({
	shoppingCartBook: { quantity, book },
}: ShoppingCartListItemProps) => {
	const { image, price, title } = book;
	const priceCurrency = price[0];
	const priceValue = Number(price.slice(1));

	return (
		<div className="shopping-cart-list-item">
			<div className="shopping-cart-list-item__block">
				<img
					className="shopping-cart-list-item__image"
					src={image}
					onError={(e) => {
						e.currentTarget.onerror = null;
						e.currentTarget.src = defaultBookImage;
					}}
					alt="Book"
					width="50"
					height="50"
				/>
				<div className="shopping-cart-list-item__title">{title}</div>
				<div className="shopping-cart-list-item__price">{price}</div>
			</div>
			<div className="shopping-cart-list-item__block">
				<ShoppingCartFormContainer quantity={quantity} book={book} />
				<div className="shopping-cart-list-item__total-price">{priceCurrency + (priceValue * quantity).toFixed(2)}</div>
			</div>
		</div>
	);
};

export default ShoppingCartListItem;
