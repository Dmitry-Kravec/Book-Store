import { ShoppingCartBookItemType } from '../types/BooksTypes';
import ShoppingCartListItem from './ShoppingCartListItem';

import '../styles/shopping-cart-items-list.scss';

type ShoppingCartItemsListProps = {
	booksData: ShoppingCartBookItemType[]
}

const ShoppingCartItemsList = ({ booksData }: ShoppingCartItemsListProps) => (
	<div className="shopping-cart-items-list">
		{
			booksData.map(
				(shoppingCartBook) => (
					<ShoppingCartListItem
						shoppingCartBook={shoppingCartBook}
						key={shoppingCartBook.book.isbn13}
					/>
				),
			)
		}
	</div>
);

export default ShoppingCartItemsList;
