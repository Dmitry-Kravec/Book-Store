import { BookDetailsActionsType, BookDetailsStateType } from '../../types/BooksTypes';
import {
	FETCH_BOOK_DETAILS_FAILURE,
	FETCH_BOOK_DETAILS_REQUESTED,
	FETCH_BOOK_DETAILS_SUCCESS,
	RESET_BOOK_DETAILS_INFO,
} from '../actionConstants';

const initialState: BookDetailsStateType = {
	book: null,
	isLoading: false,
	error: null,
};

const bookDetailsReducer = (state = initialState, action: BookDetailsActionsType): BookDetailsStateType => {
	switch (action.type) {
		case FETCH_BOOK_DETAILS_REQUESTED:
			return {
				...state,
				isLoading: true,
				error: null,
			};
		case FETCH_BOOK_DETAILS_SUCCESS:
			return {
				...state,
				book: action.payload,
				isLoading: false,
			};
		case FETCH_BOOK_DETAILS_FAILURE:
			return {
				...state,
				isLoading: false,
				error: action.payload,
			};
		case RESET_BOOK_DETAILS_INFO:
			return {
				...state,
				book: null,
			};
		default:
			return {
				...state,
			};
	}
};

export default bookDetailsReducer;
