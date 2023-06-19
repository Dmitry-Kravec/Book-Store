import { ShoppingCartActionsType, ShoppingCartBookItemType, ShoppingCartStateType } from '../types/BooksTypes';
import { UPDATE_BOOK_IN_CART } from './actionConstants';

const initialState: ShoppingCartStateType = {
	selectedBooks: [],
};

const updateBookItem = (
	selectedBooks: ShoppingCartBookItemType[],
	item: ShoppingCartBookItemType,
	existingBookIndex: number,
): ShoppingCartBookItemType => {
	if (existingBookIndex === -1) {
		return {
			...item,
		};
	}

	return {
		...item,
		quantity: selectedBooks[existingBookIndex].quantity + item.quantity,
	};
};

const updateSelectedBooks = (
	selectedBooks: ShoppingCartBookItemType[],
	newBook: ShoppingCartBookItemType,
	existingBookIndex: number,
) => {
	if (newBook.quantity < 1) {
		return selectedBooks.filter((bookItem) => bookItem.book.isbn13 !== newBook.book.isbn13);
	}

	if (existingBookIndex === -1) {
		return [
			...selectedBooks,
			newBook,
		];
	}

	return [
		...selectedBooks.slice(0, existingBookIndex),
		newBook,
		...selectedBooks.slice(existingBookIndex + 1),
	];
};

const shoppingCartReducer = (state = initialState, action: ShoppingCartActionsType) => {
	switch (action.type) {
		case UPDATE_BOOK_IN_CART: {
			const existingBookIndex = state.selectedBooks.findIndex(
				({ book }) => (book.isbn13 === action.payload.book.isbn13),
			);

			const newBook = updateBookItem(state.selectedBooks, action.payload, existingBookIndex);

			return {
				...state,
				selectedBooks: updateSelectedBooks(state.selectedBooks, newBook, existingBookIndex),
			};
		}
		default:
			return state;
	}
};

export default shoppingCartReducer;
