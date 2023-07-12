import { isLeft } from 'fp-ts/lib/Either';
import { useCallback, useState } from 'react';
import { ThunkAction } from 'redux-thunk';
import {
	fetchBookDetailsRequested,
	fetchBookDetailsSuccess,
	fetchBookDetailsFailure,
} from '../redux/actions/bookDetailsActionCreators';
import {
	ReduxStateType,
	BookDetailsActionsType,
	ErrorNames,
	BookExtendedItemType,
	BookExtendedItemTypeRuntime,
} from '../types/BooksTypes';
import { addCustomFields } from '../utils/customFields';
import { showNotification } from '../utils/notification';

export const fetchBookDetailsThunk = (
	isbn13: string,
	abortController: AbortController,
): ThunkAction<void, ReduxStateType, unknown, BookDetailsActionsType> =>
	(dispatch) => {
		dispatch(fetchBookDetailsRequested());

		fetch(`https://api.itbook.store/1.0/books/${isbn13}`, { signal: abortController.signal })
			.then((response) => {
				// if (Math.random() < 0.5) {
				// 	throw new Error('TEST ERROR');
				// }

				if (response.ok) {
					return response.json();
				}

				const error: Error = { message: 'Возникла сетевая ошибка', name: ErrorNames.network };

				if (response.status === 404) {
					error.message = 'Книга не найдена';
					error.name = ErrorNames.notFound;
				}

				return Promise.reject(error);
			})
			.then((json: Omit<BookExtendedItemType, 'date'>) => {
				const extendedBooks = addCustomFields<BookExtendedItemType, Omit<BookExtendedItemType, 'date'>>([json])[0];

				if (isLeft(BookExtendedItemTypeRuntime.decode(extendedBooks))) {
					const error: Error = {
						message: 'Произошла ошибка обработки данных',
						name: ErrorNames.validationError,
					};

					showNotification({
						message: error.message,
						type: 'error',
					});

					throw error;
				} else {
					dispatch(fetchBookDetailsSuccess(extendedBooks));
				}
			})
			.catch((error: Error) => {
				if (error.name !== 'AbortError') {
					dispatch(fetchBookDetailsFailure(error));
				}
			});
	};

export const useFetchBookDetails = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);
	const [book, setBook] = useState<BookExtendedItemType | null>(null);

	const getBooksDetails = useCallback((isbn13: string, abortController: AbortController) => {
		setIsLoading(true);
		setError(null);

		return fetch(`https://api.itbook.store/1.0/books/${isbn13}`, { signal: abortController.signal })
			.then((response) => {
				// if (Math.random() < 0.5) {
				// 	throw new Error('TEST ERROR');
				// }

				if (response.ok) {
					return response.json();
				}

				const error: Error = { message: 'Возникла сетевая ошибка', name: ErrorNames.network };

				if (response.status === 404) {
					error.message = 'Книга не найдена';
					error.name = ErrorNames.notFound;
				}

				return Promise.reject(error);
			})
			.then((json: Omit<BookExtendedItemType, 'date'>) => {
				const extendedBooks = addCustomFields<BookExtendedItemType, Omit<BookExtendedItemType, 'date'>>([json])[0];

				if (isLeft(BookExtendedItemTypeRuntime.decode(extendedBooks))) {
					const error: Error = {
						message: 'Произошла ошибка обработки данных',
						name: ErrorNames.validationError,
					};

					showNotification({
						message: error.message,
						type: 'error',
					});

					throw error;
				} else {
					setIsLoading(false);
					setBook(extendedBooks);
				}
			})
			.catch((error: Error) => {
				if (error.name !== 'AbortError') {
					setIsLoading(false);
					setError(error);
				}
			});
	}, []);

	return { isLoading, error, bookDetails: book, getBooksDetails };
};
