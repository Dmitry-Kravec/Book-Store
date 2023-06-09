import { Dispatch } from "redux"
import { BookExtendedItemType, BookItemType, SortType } from "../../types/BooksTypes"
import { FETCH_BOOK_DETAILS_REQUESTED, FETCH_BOOK_DETAILS_FAILURE, FETCH_BOOK_DETAILS_SUCCESS, FETCH_NEW_BOOKS_REQUESTED, FETCH_NEW_BOOKS_FAILURE, FETCH_NEW_BOOKS_SUCCESS, CHANGE_SORT_TYPE, CHANGE_PUBLISHER_FILTER_VALUE, CHANGE_AUTHORS_FILTER_VALUE } from "../actionConstants"

//import BookStoreService from "../../services/bookStoreService";

export const changeSortType = (sort: SortType) => {
    return {
        type: CHANGE_SORT_TYPE,
        payload: sort,
    }
}

export const changePublisherFilterValue = (value: string) => {
    return {
        type: CHANGE_PUBLISHER_FILTER_VALUE,
        payload: value,
    }
}

export const changeAuthorsFilterValue = (value: string) => {
    return {
        type: CHANGE_AUTHORS_FILTER_VALUE,
        payload: value,
    }
}

export const fetchNewBooks = () => {
    return {
        type: FETCH_NEW_BOOKS_REQUESTED
    }
}

export const fetchNewBooksSuccess = (data: BookItemType[]) => {
    return {
        type: FETCH_NEW_BOOKS_SUCCESS,
        payload: data,
    }
}

export const fetchNewBooksError = (error: any) => {
    return {
        type: FETCH_NEW_BOOKS_FAILURE
    }
}

export const fetchBookDetails = () => {
    return {
        type: FETCH_BOOK_DETAILS_REQUESTED
    }
}

export const fetchBookDetailsSuccess = (data: BookExtendedItemType) => {
    return {
        type: FETCH_BOOK_DETAILS_SUCCESS,
        payload: data,
    }
}

export const fetchBookDetailsError = (error: any) => {
    return {
        type: FETCH_BOOK_DETAILS_FAILURE
    }
}

// export const getNewBooksRequest = (bookStoreService: BookStoreService, dispatch: Dispatch) => {
//     dispatch(fetchNewBooks());

//       bookStoreService.getNewBooks()
//         .then((data: any) => {
//           console.log(data);
//           dispatch(fetchNewBooksSuccess(data.books));
//         })
//         .catch((err) => dispatch(fetchNewBooksError(err)))
// }

// export const getBooksDetailsRequest = (bookStoreService: BookStoreService, dispatch: Dispatch, isbn13: string) => {
//     dispatch(fetchBookDetails());

//       bookStoreService.getBookDetails(isbn13)
//         .then((data: any) => {
//           console.log(data);
//           dispatch(fetchBookDetailsSuccess(data));
//         })
//         .catch((err) => dispatch(fetchBookDetailsError(err)))
// }