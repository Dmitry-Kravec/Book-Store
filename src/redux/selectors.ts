import { createSelector } from "reselect";
import { FiltersType, ReduxStateType, SortField, SortMethod, SortType } from "../types/BooksTypes";
import { BookItemType } from "../types/BooksTypes";

export const getBooksData = (state: ReduxStateType) => state.books.booksData;
//export const getHasBooksLoadingError = (state: ReduxStateType) => state.books.hasBooksLoadingError;
export const getSort = (state: ReduxStateType) => state.books.sort;
export const getPublisherFilterValue = (state: ReduxStateType) => state.books.filters.publisher;
export const getAuthorsFilterValue = (state: ReduxStateType) => state.books.filters.authors;
export const getFilters = (state: ReduxStateType) => state.books.filters;

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

export const getFilteredBooksData = createSelector(
    getBooksData,
    getFilters,
    (books, filters) => {
        const filtersEntries = Object.entries(filters);

        const filteredBooks = books.filter((book) => {
            const isRightBook = filtersEntries.reduce<boolean>((acc,[key, value]) => {
                const keyWithType = key as keyof FiltersType;
                if(acc && book[keyWithType] !== value && value !== 'All') {
                    return false;
                }

                return acc;
            }, true)

            return isRightBook;
        })

        return filteredBooks;
    }
);

function sortHelper(sort: SortType, books: BookItemType[]) {
    const field = sort.field;
    const directionMultiplier = sort.direction === SortMethod.asc ? -1 : 1;

    switch(field) {
        case SortField.authors:
        case SortField.publisher: {
            return [...books].sort((a, b) =>
                a[field].toLowerCase().localeCompare(b[field].toLowerCase()) * directionMultiplier
            );
        }
        case SortField.price: {

            return [...books].sort((a, b) => {
                const aValue = Number(a[field].slice(1));
                const bValue = Number(b[field].slice(1));
                return (bValue - aValue) * directionMultiplier
            });
        }
        default:
            return books;
    }
}

export const getSortedAndFilteredBooksData = createSelector(
    getFilteredBooksData,
    getSort,
    (books, sort) => {
        if(sort.field && sort.direction) {
            return sortHelper(sort, books);
        }

        return books;
    }
);