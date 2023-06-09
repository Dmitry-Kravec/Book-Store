import { createSelector } from "reselect";
import { ReduxStateType } from "../types/BooksTypes";

export const getBooksData = (state: ReduxStateType) => state.books.booksData;
//export const getHasBooksLoadingError = (state: ReduxStateType) => state.books.hasBooksLoadingError;
export const getSort = (state: ReduxStateType) => state.books.sort;
export const getPublisherFilterValue = (state: ReduxStateType) => state.books.filters.publisher;
export const getAuthorsFilterValue = (state: ReduxStateType) => state.books.filters.authors;

export const getAllPublishers = createSelector(
    getBooksData,
    (books) => {
        const publishers = new Set(books.map((book) => book.publisher));
        return ['All', ...Array.from(publishers)];
    }
);

export const getAllAuthors = createSelector(
    getBooksData,
    (books) => {
        const authors = new Set(books.map((book) => book.authors));
        return ['All', ... Array.from(authors)];
    }
);