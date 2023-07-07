import moment from 'moment';
import { BookListActionsType, BooksStateType } from '../../types/BooksTypes';
import {
	FETCH_BOOKS_SUCCESS,
	CHANGE_SORT_TYPE,
	CHANGE_PUBLISHER_FILTER_VALUE,
	CHANGE_AUTHORS_FILTER_VALUE,
	CHANGE_VIEW,
	UPDATE_SEARCH_QUERRY,
	FETCH_BOOKS_FAILURE,
	FETCH_BOOKS_REQUESTED,
	CHANGE_DATE_FILTER_VALUE,
	SET_UTC_OFFSET,
} from '../actionConstants';

const initialState: BooksStateType = {
	booksData: [],
	booksDataRequestError: null,
	searchQuerry: '',
	sort: {},
	filters: {
		authors: 'All',
		publisher: 'All',
		date: {},
	},
	utcOffset: moment().utcOffset() / 60,
	view: 'grid',
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
		case CHANGE_DATE_FILTER_VALUE:
			return {
				...state,
				filters: {
					...state.filters,
					date: action.payload,
				},
			};
		case UPDATE_SEARCH_QUERRY:
			return {
				...state,
				searchQuerry: action.payload,
			};
		case SET_UTC_OFFSET:
			return {
				...state,
				utcOffset: action.payload,
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
		default:
			return state;
	}
};

export default booksReducer;
