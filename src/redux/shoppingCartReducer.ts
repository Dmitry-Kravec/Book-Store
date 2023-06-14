import { ShoppingCartActionsType, ShoppingCartBookItemType, ShoppingCartStateType } from '../types/BooksTypes';
import { ADD_BOOK_TO_CART, REMOVE_BOOK_FROM_CART } from './actionConstants';

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

const updateOrder = (state: ShoppingCartStateType, action: ShoppingCartActionsType) => {
	const existingBookIndex = state.selectedBooks.findIndex(
		({ book }) => (book.isbn13 === action.payload.book.isbn13),
	);

	const newBook = updateBookItem(state.selectedBooks, action.payload, existingBookIndex);

	return {
		...state,
		selectedBooks: updateSelectedBooks(state.selectedBooks, newBook, existingBookIndex),
	};
};

const shoppingCartReducer = (state = initialState, action: ShoppingCartActionsType) => {
	switch (action.type) {
		case ADD_BOOK_TO_CART: {
			return updateOrder(state, action);
		}
		case REMOVE_BOOK_FROM_CART: {
			return updateOrder(state, action);
		}
		default:
			return state;
	}
};

export default shoppingCartReducer;
