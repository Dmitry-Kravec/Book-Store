import { BookListActionsType, BooksStateType } from '../types/BooksTypes';
import {
	FETCH_BOOKS_SUCCESS,
	CHANGE_SORT_TYPE,
	CHANGE_PUBLISHER_FILTER_VALUE,
	CHANGE_AUTHORS_FILTER_VALUE,
	CHANGE_VIEW,
	UPDATE_SEARCH_QUERRY,
	FETCH_BOOK_DETAILS_SUCCESS,
	FETCH_BOOK_DETAILS_REQUESTED,
	FETCH_BOOKS_FAILURE,
	FETCH_BOOKS_REQUESTED,
} from './actionConstants';

const initialState: BooksStateType = {
	booksData: [],
	booksDataRequestError: null,
	searchQuerry: '',
	sort: {},
	filters: {
		authors: 'All',
		publisher: 'All',
	},
	view: 'grid',

	singleBookDetails: null,
};

const booksReducer = (state = initialState, action: BookListActionsType): BooksStateType => {
	switch (action.type) {
		case CHANGE_VIEW:
			return {
				...state,
				view: action.payload,
			};
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
		case UPDATE_SEARCH_QUERRY:
			return {
				...state,
				searchQuerry: action.payload,
			};
		case FETCH_BOOKS_REQUESTED:
			return {
				...state,
				booksData: [],
				booksDataRequestError: null,
			};
		case FETCH_BOOKS_SUCCESS:
			return {
				...state,
				booksData: action.payload,
			};
		case FETCH_BOOKS_FAILURE:
			return {
				...state,
				booksDataRequestError: action.payload,
			};
		case FETCH_BOOK_DETAILS_REQUESTED:
			return {
				...state,
				singleBookDetails: null,
			};
		case FETCH_BOOK_DETAILS_SUCCESS:
			return {
				...state,
				singleBookDetails: action.payload,
			};
		default:
			return state;
	}
};

export default booksReducer;
