import { BookListActionsType, BooksStateType, SortField, SortMethod, SortType } from '../types/BooksTypes';
import { FETCH_NEW_BOOKS_REQUESTED, FETCH_NEW_BOOKS_FAILURE, FETCH_NEW_BOOKS_SUCCESS, CHANGE_SORT_TYPE, CHANGE_PUBLISHER_FILTER_VALUE, CHANGE_AUTHORS_FILTER_VALUE } from './actionConstants';

const initialState: BooksStateType = {
	booksData: [],
	sort: {},
	filters: {
		authors: 'All',
		publisher: 'All',
	},
};

const booksReducer = (state = initialState, action: BookListActionsType): BooksStateType => {
	switch (action.type) {
		case CHANGE_SORT_TYPE:
			return {
				...state,
				sort: action.payload,
			};
		case CHANGE_PUBLISHER_FILTER_VALUE:
			return {
				...state,
				filters: {
					...state.filters,
					publisher: action.payload,
				},
			};
		case CHANGE_AUTHORS_FILTER_VALUE:
			return {
				...state,
				filters: {
					...state.filters,
					authors: action.payload,
				},
			};
		case FETCH_NEW_BOOKS_REQUESTED:
			return {
				...state,
				booksData: [],
			};
		case FETCH_NEW_BOOKS_SUCCESS:
			return {
				...state,
				booksData: action.payload,
			};
		default:
			return state;
	}
};

export default booksReducer;
