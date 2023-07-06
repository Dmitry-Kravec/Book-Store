import { BookExtendedItemType } from '../../types/BooksTypes';
import {
	FETCH_BOOK_DETAILS_FAILURE,
	FETCH_BOOK_DETAILS_REQUESTED,
	FETCH_BOOK_DETAILS_SUCCESS,
	RESET_BOOK_DETAILS_INFO,
} from '../actionConstants';

export const fetchBookDetailsRequested = () => ({
	type: FETCH_BOOK_DETAILS_REQUESTED,
});

export const fetchBookDetailsSuccess = (data: BookExtendedItemType) => ({
	type: FETCH_BOOK_DETAILS_SUCCESS,
	payload: data,
});

export const fetchBookDetailsFailure = (error: Error | null) => ({
	type: FETCH_BOOK_DETAILS_FAILURE,
	payload: error,
});

export const resetBookDetailsInfo = () => ({
	type: RESET_BOOK_DETAILS_INFO,
});
