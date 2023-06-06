import { Dispatch } from "redux"
import { BookExtendedItemType, BookItemType } from "../../types/BooksTypes"
import { FETCH_BOOK_DETAILS, FETCH_BOOK_DETAILS_ERROR, FETCH_BOOK_DETAILS_SUCCESS, FETCH_NEW_BOOKS, FETCH_NEW_BOOKS_ERROR, FETCH_NEW_BOOKS_SUCCESS } from "../actionConstants"

import BookStoreService from "../../services/bookStoreService";

export const fetchNewBooks = () => {
    return {
        type: FETCH_NEW_BOOKS
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
        type: FETCH_NEW_BOOKS_ERROR
    }
}

export const fetchBookDetails = () => {
    return {
        type: FETCH_BOOK_DETAILS
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
        type: FETCH_BOOK_DETAILS_ERROR
    }
}

export const newBooksRequest = (bookStoreService: BookStoreService, dispatch : Dispatch) => {
    dispatch(fetchNewBooks());
  
      bookStoreService.fetchNewBooks()
        .then((data: any) => {
          console.log(data);
          dispatch(fetchNewBooksSuccess(data.books));
        })
        .catch((err) => dispatch(fetchNewBooksError(err)))
}

export const booksDetailsRequest = (bookStoreService: BookStoreService, dispatch : Dispatch, isbn13: string) => {
    dispatch(fetchBookDetails());
  
      bookStoreService.fetchBookDetails(isbn13)
        .then((data: any) => {
          console.log(data);
          dispatch(fetchNewBooksSuccess(data.books));
        })
        .catch((err) => dispatch(fetchNewBooksError(err)))
}