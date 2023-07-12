import { createSelector } from 'reselect';
import moment from 'moment';
import {
	ReduxStateType,
	SortField,
	SortMethod,
	SortType,
	BookItemType,
	FilterableFields,
} from '../types/BooksTypes';
import { dateTimeFormat } from '../constants';

export const getBooksData = (state: ReduxStateType) => state.books.booksData;
export const getBooksDataRequestError = (state: ReduxStateType) => state.books.booksDataRequestError;
export const getView = (state: ReduxStateType) => state.books.view;
export const getSort = (state: ReduxStateType) => state.books.sort;
export const getSearchQuerry = (state: ReduxStateType) => state.books.searchQuerry;
export const getPublisherFilterValue = (state: ReduxStateType) => state.books.filters.publisher;
export const getAuthorsFilterValue = (state: ReduxStateType) => state.books.filters.authors;
export const getFilters = (state: ReduxStateType) => state.books.filters;
export const getDateFilterValues = (state: ReduxStateType) => state.books.filters.date;
export const getBookDetails = (state: ReduxStateType) => state.bookDetails.book;
export const getBookDetailsIsLoading = (state: ReduxStateType) => state.bookDetails.isLoading;
export const getBookDetailsError = (state: ReduxStateType) => state.bookDetails.error;
export const getUtcOffset = (state: ReduxStateType) => state.books.utcOffset;

export const getFilteredBooksData = createSelector(
	getBooksData,
	getFilters,
	(books, filters) => {
		const filtersKeys = Object.keys(filters) as FilterableFields[];
		const filteredBooks = books.filter((book) => {
			const isRightBook = filtersKeys.findIndex((key) => {
				if (typeof filters[key] === 'string') {
					return filters[key] !== 'All' && book[key] !== filters[key];
				}
				if (key === 'date') {
					const { rangeStart, rangeEnd } = filters[key];

					if (!rangeStart && !rangeEnd) return false;

					const bookDateMoment = moment.utc(book[key], dateTimeFormat);
					const rangeEndMoment = rangeEnd
						? moment.utc(rangeEnd, dateTimeFormat) : moment.utc(moment.utc(), dateTimeFormat);

					if (!rangeStart) {
						return !bookDateMoment.isBefore(rangeEndMoment);
					}

					const rangeStartMoment = moment.utc(rangeStart, dateTimeFormat);

					return !bookDateMoment.isBetween(rangeStartMoment, rangeEndMoment, null, '[]');
				}

				return false;
			});

			return isRightBook === -1;
		});

		return filteredBooks;
	},
);

function sortHelper(sort: SortType, books: BookItemType[]) {
	const { field } = sort;
	const directionMultiplier = sort.direction === SortMethod.asc ? -1 : 1;

	switch (field) {
		case SortField.authors:
		case SortField.publisher: {
			return [...books].sort((a, b) =>
				a[field].toLowerCase().localeCompare(b[field].toLowerCase()) * directionMultiplier);
		}
		case SortField.price: {
			return [...books].sort((a, b) => {
				const aValue = Number(a[field].slice(1));
				const bValue = Number(b[field].slice(1));
				return (bValue - aValue) * directionMultiplier;
			});
		}
		case SortField.date: {
			return [...books].sort((a, b) => ((moment.utc(b.date).unix() - moment.utc(a.date).unix()) * directionMultiplier));
		}
		default:
			return books;
	}
}

export const getSortedAndFilteredBooksData = createSelector(
	getFilteredBooksData,
	getSort,
	(books, sort) => {
		if (sort.field && sort.direction) {
			return sortHelper(sort, books);
		}

		return books;
	},
);

export const getSelectedBooks = (state: ReduxStateType) => state.shoppingCart.selectedBooks;

export const getShoppingCartTotalCost = createSelector(
	getSelectedBooks,
	(selectedBooks) => {
		const currencyLetter = selectedBooks.length ? selectedBooks[0].book.price[0] : '';
		return currencyLetter + selectedBooks.reduce((sum, cartItem) => {
			const price = Number(cartItem.book.price.slice(1));
			return Number((sum + cartItem.quantity * price).toFixed(2));
		}, 0);
	},
);
