import { BookItemType, ShoppingCartBookItemType } from '../../types/BooksTypes';
import { UPDATE_BOOK_IN_CART } from '../actionConstants';

export const updateBookInCart = (book: BookItemType, quantity: number) => ({
	type: UPDATE_BOOK_IN_CART,
	payload: {
		book,
		quantity,
	},
});

export const TESTEXPORT = () => {};
