import { BookExtendedItemType, BookItemType, SortType, ViewType } from '../../types/BooksTypes';
import {
	FETCH_BOOK_DETAILS_FAILURE,
	FETCH_BOOK_DETAILS_SUCCESS,
	FETCH_BOOKS_FAILURE,
	FETCH_BOOKS_SUCCESS,
	CHANGE_SORT_TYPE,
	CHANGE_PUBLISHER_FILTER_VALUE,
	CHANGE_AUTHORS_FILTER_VALUE,
	CHANGE_VIEW,
	UPDATE_SEARCH_QUERRY,
	FETCH_BOOK_DETAILS_REQUESTED,
	FETCH_BOOKS_REQUESTED,
} from '../actionConstants';

export const changeSortType = (sort: SortType) => ({
	type: CHANGE_SORT_TYPE,
	payload: sort,
});

export const changeView = (view: ViewType) => ({
	type: CHANGE_VIEW,
	payload: view,
});

export const changePublisherFilterValue = (value: string) => ({
	type: CHANGE_PUBLISHER_FILTER_VALUE,
	payload: value,
});

export const changeAuthorsFilterValue = (value: string) => ({
	type: CHANGE_AUTHORS_FILTER_VALUE,
	payload: value,
});

export const updateSearchQuerry = (newQuerry: string) => ({
	type: UPDATE_SEARCH_QUERRY,
	payload: newQuerry,
});

export const fetchBooksRequested = () => ({
	type: FETCH_BOOKS_REQUESTED,
});

export const fetchBooksSuccess = (data: BookItemType[]) => ({
	type: FETCH_BOOKS_SUCCESS,
	payload: data,
});

export const fetchBooksFailure = (error: Error) => ({
	type: FETCH_BOOKS_FAILURE,
	payload: error,
});

export const fetchBookDetailsRequested = () => ({
	type: FETCH_BOOK_DETAILS_REQUESTED,
});

export const fetchBookDetailsSuccess = (data: BookExtendedItemType) => ({
	type: FETCH_BOOK_DETAILS_SUCCESS,
	payload: data,
});

export const fetchBookDetailsError = (error: any) => ({
	type: FETCH_BOOK_DETAILS_FAILURE,
});
